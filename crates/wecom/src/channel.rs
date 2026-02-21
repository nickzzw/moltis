//! 企业微信 Channel 插件实现

use {
    anyhow::{Context, Result},
    async_trait::async_trait,
    base64::Engine,
    moltis_channels::{
        ChannelEvent, ChannelEventSink, ChannelHealthSnapshot, ChannelMessageKind,
        ChannelMessageMeta, ChannelOutbound, ChannelPlugin, ChannelReplyTarget, ChannelStatus,
        ChannelType, message_log::MessageLog, message_log::MessageLogEntry,
    },
    moltis_common::types::{ChatType, ReplyPayload},
    secrecy::ExposeSecret,
    std::collections::HashMap,
    std::process::Stdio,
    std::sync::Arc,
    time::OffsetDateTime,
    tokio::{io::AsyncWriteExt, process::Command, sync::RwLock},
    tracing::{debug, info, warn},
};

use crate::{api::WecomApiClient, config::WecomConfig};

/// 企业微信 Channel 插件
pub struct WecomChannelPlugin {
    accounts: Arc<RwLock<HashMap<String, WecomAccount>>>,
    outbound: WecomOutbound,
    message_log: Option<Arc<dyn MessageLog>>,
    event_sink: Option<Arc<dyn ChannelEventSink>>,
}

/// 企业微信账号实例
struct WecomAccount {
    config: WecomConfig,
    api_client: WecomApiClient,
}

/// 企业微信出站发送器
pub struct WecomOutbound {
    accounts: Arc<RwLock<HashMap<String, WecomAccount>>>,
}

impl WecomChannelPlugin {
    pub fn new() -> Self {
        info!("Initializing WecomChannelPlugin");
        let accounts = Arc::new(RwLock::new(HashMap::new()));
        let outbound = WecomOutbound {
            accounts: Arc::clone(&accounts),
        };
        Self {
            accounts,
            outbound,
            message_log: None,
            event_sink: None,
        }
    }

    /// 设置事件接收器（用于分发消息）
    pub fn with_event_sink(mut self, sink: Arc<dyn ChannelEventSink>) -> Self {
        self.event_sink = Some(sink);
        self
    }

    /// 设置消息日志（用于 sender 列表等）
    pub fn with_message_log(mut self, log: Arc<dyn MessageLog>) -> Self {
        self.message_log = Some(log);
        self
    }

    /// 获取共享的出站发送器
    pub fn shared_outbound(&self) -> Arc<dyn ChannelOutbound> {
        Arc::new(WecomOutbound {
            accounts: Arc::clone(&self.accounts),
        })
    }

    /// 列出所有已启动账号
    pub async fn account_ids(&self) -> Vec<String> {
        let accounts = self.accounts.read().await;
        accounts.keys().cloned().collect()
    }

    /// 获取账号配置（序列化）
    pub async fn account_config(&self, account_id: &str) -> Option<serde_json::Value> {
        let accounts = self.accounts.read().await;
        accounts
            .get(account_id)
            .and_then(|s| serde_json::to_value(&s.config).ok())
    }

    /// 更新账号配置（不重启）
    pub async fn update_account_config(
        &self,
        account_id: &str,
        config: serde_json::Value,
    ) -> Result<()> {
        let wecom_config: WecomConfig = serde_json::from_value(config)?;
        let mut accounts = self.accounts.write().await;
        if let Some(state) = accounts.get_mut(account_id) {
            state.config = wecom_config;
            Ok(())
        } else {
            Err(anyhow::anyhow!("account not found: {account_id}"))
        }
    }

    /// 获取账号配置（用于 webhook 处理）
    pub async fn get_account_config(&self, account_id: &str) -> Option<WecomConfig> {
        self.accounts
            .read()
            .await
            .get(account_id)
            .map(|acc| acc.config.clone())
    }

    /// 处理入站消息（从 webhook 调用）
    pub async fn handle_inbound_message(
        &self,
        account_id: &str,
        from_user: &str,
        content: &str,
    ) -> Result<()> {
        debug!(
            "Handling inbound message from {} via account {}",
            from_user, account_id
        );

        let (config, message_log, event_sink) = {
            let accounts = self.accounts.read().await;
            let account = accounts
                .get(account_id)
                .ok_or_else(|| anyhow::anyhow!("account {} not found", account_id))?;
            (
                account.config.clone(),
                self.message_log.clone(),
                self.event_sink.clone(),
            )
        };

        // 检查用户权限
        let access_granted = config.is_user_allowed(from_user);
        if !access_granted {
            warn!("User {} is not in allow_from list", from_user);
        }

        // 记录消息日志
        if let Some(ref log) = message_log {
            let now = OffsetDateTime::now_utc().unix_timestamp();
            let entry = MessageLogEntry {
                id: 0,
                account_id: account_id.to_string(),
                channel_type: ChannelType::Wecom.to_string(),
                peer_id: from_user.to_string(),
                username: Some(from_user.to_string()),
                sender_name: Some(from_user.to_string()),
                chat_id: from_user.to_string(),
                chat_type: match ChatType::Dm {
                    ChatType::Dm => "dm",
                    ChatType::Group => "group",
                    ChatType::Channel => "channel",
                }
                .into(),
                body: content.to_string(),
                access_granted,
                created_at: now,
            };
            if let Err(e) = log.log(entry).await {
                warn!(account_id, "failed to log message: {e}");
            }
        }

        // Emit channel event for real-time UI updates.
        if let Some(ref sink) = event_sink {
            sink.emit(ChannelEvent::InboundMessage {
                channel_type: ChannelType::Wecom,
                account_id: account_id.to_string(),
                peer_id: from_user.to_string(),
                username: Some(from_user.to_string()),
                sender_name: Some(from_user.to_string()),
                message_count: None,
                access_granted,
            })
            .await;
        }

        if !access_granted {
            return Ok(());
        }

        // 如果有事件接收器，分发消息
        if let Some(ref sink) = event_sink {
            let reply_target = ChannelReplyTarget {
                channel_type: ChannelType::Wecom,
                account_id: account_id.to_string(),
                chat_id: from_user.to_string(),
                message_id: None,
            };

            let meta = ChannelMessageMeta {
                channel_type: ChannelType::Wecom,
                sender_name: Some(from_user.to_string()),
                username: Some(from_user.to_string()),
                message_kind: Some(ChannelMessageKind::Text),
                model: None,
                audio_filename: None,
            };

            sink.dispatch_to_chat(content, reply_target, meta).await;
        } else {
            warn!("No event sink configured, message will be dropped");
        }

        Ok(())
    }

    /// 处理入站语音消息
    pub async fn handle_inbound_voice(
        &self,
        account_id: &str,
        from_user: &str,
        media_id: &str,
        format: Option<&str>,
        msg_id: Option<&str>,
        create_time: i64,
    ) -> Result<()> {
        debug!(
            "Handling inbound voice from {} via account {}",
            from_user, account_id
        );

        let (config, message_log, event_sink, api_client) = {
            let accounts = self.accounts.read().await;
            let account = accounts
                .get(account_id)
                .ok_or_else(|| anyhow::anyhow!("account {} not found", account_id))?;
            (
                account.config.clone(),
                self.message_log.clone(),
                self.event_sink.clone(),
                account.api_client.clone(),
            )
        };

        let access_granted = config.is_user_allowed(from_user);
        if !access_granted {
            warn!("User {} is not in allow_from list", from_user);
        }

        if let Some(ref log) = message_log {
            let entry = MessageLogEntry {
                id: 0,
                account_id: account_id.to_string(),
                channel_type: ChannelType::Wecom.to_string(),
                peer_id: from_user.to_string(),
                username: Some(from_user.to_string()),
                sender_name: Some(from_user.to_string()),
                chat_id: from_user.to_string(),
                chat_type: match ChatType::Dm {
                    ChatType::Dm => "dm",
                    ChatType::Group => "group",
                    ChatType::Channel => "channel",
                }
                .into(),
                body: "[Voice message]".to_string(),
                access_granted,
                created_at: if create_time > 0 {
                    create_time
                } else {
                    OffsetDateTime::now_utc().unix_timestamp()
                },
            };
            if let Err(e) = log.log(entry).await {
                warn!(account_id, "failed to log voice message: {e}");
            }
        }

        if let Some(ref sink) = event_sink {
            sink.emit(ChannelEvent::InboundMessage {
                channel_type: ChannelType::Wecom,
                account_id: account_id.to_string(),
                peer_id: from_user.to_string(),
                username: Some(from_user.to_string()),
                sender_name: Some(from_user.to_string()),
                message_count: None,
                access_granted,
            })
            .await;
        }

        if !access_granted {
            return Ok(());
        }

        let Some(ref sink) = event_sink else {
            warn!("No event sink configured, voice message will be dropped");
            return Ok(());
        };

        if !sink.voice_stt_available().await {
            if let Err(e) = api_client.send_text(
                from_user,
                "I can't understand voice, you did not configure it, please visit Settings -> Voice",
            ).await
            {
                warn!(account_id, "failed to send STT setup hint: {e}");
            }
            return Ok(());
        }

        let (audio_data, content_type) = api_client.download_media(media_id).await?;
        let format_hint = format
            .map(|f| f.to_string())
            .or_else(|| guess_audio_format(content_type.as_deref()))
            .unwrap_or_else(|| "amr".to_string());

        let reply_target = ChannelReplyTarget {
            channel_type: ChannelType::Wecom,
            account_id: account_id.to_string(),
            chat_id: from_user.to_string(),
            message_id: msg_id.map(|id| id.to_string()),
        };

        let filename = msg_id
            .map(|id| format!("voice-wecom-{id}.{format_hint}"))
            .unwrap_or_else(|| format!("voice-wecom-{create_time}.{format_hint}"));
        let audio_filename = sink
            .save_channel_voice(&audio_data, &filename, &reply_target)
            .await;

        let (stt_audio, stt_format) = if needs_stt_transcode(&format_hint) {
            match transcode_audio_to_wav(&audio_data).await {
                Ok(wav) => (wav, "wav".to_string()),
                Err(e) => {
                    warn!(account_id, error = %e, "voice transcode failed, using original for STT");
                    (audio_data.clone(), format_hint.clone())
                },
            }
        } else {
            (audio_data.clone(), format_hint.clone())
        };

        let body = match sink.transcribe_voice(&stt_audio, &stt_format).await {
            Ok(text) if text.trim().is_empty() => {
                "[Voice message - could not transcribe]".to_string()
            },
            Ok(text) => text,
            Err(e) => {
                warn!(account_id, error = %e, "voice transcription failed");
                "[Voice message - transcription unavailable]".to_string()
            },
        };

        let meta = ChannelMessageMeta {
            channel_type: ChannelType::Wecom,
            sender_name: Some(from_user.to_string()),
            username: Some(from_user.to_string()),
            message_kind: Some(ChannelMessageKind::Voice),
            model: None,
            audio_filename,
        };

        sink.dispatch_to_chat(&body, reply_target, meta).await;

        Ok(())
    }
}

fn guess_audio_format(content_type: Option<&str>) -> Option<String> {
    let ct = content_type?.to_ascii_lowercase();
    if ct.contains("amr") {
        Some("amr".to_string())
    } else if ct.contains("mp3") {
        Some("mp3".to_string())
    } else if ct.contains("m4a") || ct.contains("mp4") {
        Some("m4a".to_string())
    } else if ct.contains("ogg") {
        Some("ogg".to_string())
    } else {
        None
    }
}

impl Default for WecomChannelPlugin {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl ChannelPlugin for WecomChannelPlugin {
    fn id(&self) -> &str {
        "wecom"
    }

    fn name(&self) -> &str {
        "企业微信"
    }

    async fn start_account(&mut self, account_id: &str, config: serde_json::Value) -> Result<()> {
        info!("Starting WecomChannel account: {}", account_id);
        
        let wecom_config: WecomConfig = serde_json::from_value(config)
            .map_err(|e| anyhow::anyhow!("Invalid WecomConfig: {}", e))?;
        
        // 验证必需字段
        if wecom_config.corp_id.is_empty() {
            anyhow::bail!("corp_id is required");
        }
        if wecom_config.corp_secret.expose_secret().is_empty() {
            anyhow::bail!("corp_secret is required");
        }

        let api_client = WecomApiClient::new(
            wecom_config.corp_id.clone(),
            wecom_config.corp_secret.clone(),
            wecom_config.agent_id,
        );

        let account = WecomAccount {
            config: wecom_config,
            api_client,
        };

        self.accounts.write().await.insert(account_id.to_string(), account);
        
        info!("WecomChannel account {} started successfully", account_id);
        Ok(())
    }

    async fn stop_account(&mut self, account_id: &str) -> Result<()> {
        info!("Stopping WecomChannel account: {}", account_id);
        self.accounts.write().await.remove(account_id);
        Ok(())
    }

    fn outbound(&self) -> Option<&dyn ChannelOutbound> {
        Some(&self.outbound)
    }

    fn status(&self) -> Option<&dyn ChannelStatus> {
        Some(self)
    }
}

#[async_trait]
impl ChannelOutbound for WecomOutbound {
    async fn send_text(
        &self,
        account_id: &str,
        to: &str,
        text: &str,
        _reply_to: Option<&str>,
    ) -> Result<()> {
        debug!("Sending text message to {} via account {}", to, account_id);
        
        let accounts = self.accounts.read().await;
        let account = accounts
            .get(account_id)
            .ok_or_else(|| anyhow::anyhow!("account {} not found", account_id))?;
        
        // 检查用户权限
        if !account.config.is_user_allowed(to) {
            warn!("User {} is not in allow_from list", to);
            return Ok(()); // 静默忽略未授权用户
        }

        // 分块发送长文本（企业微信限制 2048 字符）
        const MAX_LENGTH: usize = 2000;
        let chunks: Vec<&str> = text
            .as_bytes()
            .chunks(MAX_LENGTH)
            .map(|chunk| std::str::from_utf8(chunk).unwrap_or(""))
            .collect();

        for (i, chunk) in chunks.iter().enumerate() {
            if chunk.trim().is_empty() {
                continue;
            }
            
            account.api_client.send_text(to, chunk).await?;
            
            // 避免发送过快
            if i < chunks.len() - 1 {
                tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
            }
        }

        info!("Text message sent successfully to {} via account {}", to, account_id);
        Ok(())
    }

    async fn send_media(
        &self,
        account_id: &str,
        to: &str,
        payload: &ReplyPayload,
        _reply_to: Option<&str>,
    ) -> Result<()> {
        debug!("Sending media message to {} via account {}", to, account_id);
        
        let accounts = self.accounts.read().await;
        let account = accounts
            .get(account_id)
            .ok_or_else(|| anyhow::anyhow!("account {} not found", account_id))?;
        
        // 检查用户权限
        if !account.config.is_user_allowed(to) {
            warn!("User {} is not in allow_from list", to);
            return Ok(());
        }

        // 如果有媒体附件，处理媒体
        if let Some(ref media) = payload.media {
            let mime_type = &media.mime_type;
            let url = &media.url;

            let (bytes, content_type) = if url.starts_with("data:") {
                decode_data_url(url)?
            } else {
                let response = reqwest::get(url).await?;
                let content_type = response
                    .headers()
                    .get(reqwest::header::CONTENT_TYPE)
                    .and_then(|v| v.to_str().ok())
                    .map(|v| v.to_string());
                let bytes = response.bytes().await?.to_vec();
                (bytes, content_type)
            };

            let effective_mime = content_type
                .as_deref()
                .unwrap_or(mime_type.as_str());

            let (media_type, filename, bytes) = if effective_mime.starts_with("image/") {
                ("image", "image.jpg".to_string(), bytes)
            } else if effective_mime.starts_with("video/") {
                ("video", "video.mp4".to_string(), bytes)
            } else if effective_mime.starts_with("audio/") {
                let ext = audio_extension(effective_mime);
                let filename = format!("audio.{ext}");
                if is_wecom_voice_mime(effective_mime) {
                    ("voice", filename, bytes)
                } else {
                    match transcode_audio_to_amr(&bytes).await {
                        Ok(amr_bytes) => ("voice", "audio.amr".to_string(), amr_bytes),
                        Err(error) => {
                            warn!(
                                account_id,
                                error = %error,
                                "voice transcode failed, sending as file"
                            );
                            ("file", filename, bytes)
                        },
                    }
                }
            } else {
                ("file", "file.bin".to_string(), bytes)
            };
            
            // 上传到企业微信
            let media_id = account
                .api_client
                .upload_media(media_type, &filename, bytes)
                .await?;
            
            // 发送对应类型的消息
            match media_type {
                "image" => account.api_client.send_image(to, &media_id).await?,
                "voice" => account.api_client.send_voice(to, &media_id).await?,
                "file" | "video" => account.api_client.send_file(to, &media_id).await?,
                _ => {}
            }
        }
        
        // 如果有文本内容，也发送文本
        if !payload.text.is_empty() {
            account.api_client.send_text(to, &payload.text).await?;
        }

        info!("Media message sent successfully to {} via account {}", to, account_id);
        Ok(())
    }
}

fn decode_data_url(url: &str) -> Result<(Vec<u8>, Option<String>)> {
    let (meta, data) = url
        .split_once(',')
        .context("invalid data url: missing comma")?;
    let meta = meta.strip_prefix("data:").unwrap_or(meta);
    let mut parts = meta.split(';');
    let mime = parts
        .next()
        .filter(|value| !value.is_empty())
        .map(|value| value.to_string());
    let is_base64 = parts.any(|value| value.eq_ignore_ascii_case("base64"));
    if !is_base64 {
        anyhow::bail!("unsupported data url encoding");
    }
    let bytes = base64::engine::general_purpose::STANDARD
        .decode(data)
        .context("invalid base64 data url payload")?;
    Ok((bytes, mime))
}

fn audio_extension(mime: &str) -> &'static str {
    if mime.contains("amr") {
        "amr"
    } else if mime.contains("ogg") {
        "ogg"
    } else if mime.contains("mpeg") || mime.contains("mp3") {
        "mp3"
    } else if mime.contains("aac") || mime.contains("m4a") {
        "m4a"
    } else if mime.contains("wav") || mime.contains("pcm") {
        "wav"
    } else {
        "bin"
    }
}

fn is_wecom_voice_mime(mime: &str) -> bool {
    let lower = mime.to_ascii_lowercase();
    lower.contains("amr") || lower.contains("speex")
}

fn needs_stt_transcode(format: &str) -> bool {
    let lower = format.to_ascii_lowercase();
    lower.contains("amr") || lower.contains("speex")
}

async fn transcode_audio_to_amr(input: &[u8]) -> Result<Vec<u8>> {
    let mut child = Command::new("ffmpeg")
        .args([
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            "pipe:0",
            "-acodec",
            "libopencore_amrnb",
            "-ac",
            "1",
            "-ar",
            "8000",
            "-f",
            "amr",
            "pipe:1",
        ])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .context("failed to spawn ffmpeg for AMR transcode")?;

    let mut stdin = child
        .stdin
        .take()
        .context("ffmpeg stdin unavailable")?;
    let write_result = stdin.write_all(input).await;
    stdin.shutdown().await.ok();
    drop(stdin);

    let output = child
        .wait_with_output()
        .await
        .context("failed to wait for ffmpeg transcode")?;

    if let Err(err) = write_result {
        let detail = format_ffmpeg_error(&output.stderr);
        let message = if detail.is_empty() {
            err.to_string()
        } else {
            format!("{err}: {detail}")
        };
        anyhow::bail!(message);
    }

    if !output.status.success() {
        let detail = format_ffmpeg_error(&output.stderr);
        anyhow::bail!("ffmpeg transcode failed: {}", detail);
    }

    Ok(output.stdout)
}

fn format_ffmpeg_error(stderr: &[u8]) -> String {
    let raw = String::from_utf8_lossy(stderr);
    let trimmed = raw.trim();
    if trimmed.is_empty() {
        return "ffmpeg transcode error".to_string();
    }
    if trimmed.len() > 200 {
        let truncated: String = trimmed.chars().take(200).collect();
        format!("{truncated}…")
    } else {
        trimmed.to_string()
    }
}

async fn transcode_audio_to_wav(input: &[u8]) -> Result<Vec<u8>> {
    let mut child = Command::new("ffmpeg")
        .args([
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            "pipe:0",
            "-ac",
            "1",
            "-ar",
            "16000",
            "-f",
            "wav",
            "pipe:1",
        ])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .context("failed to spawn ffmpeg for WAV transcode")?;

    let mut stdin = child
        .stdin
        .take()
        .context("ffmpeg stdin unavailable")?;
    let write_result = stdin.write_all(input).await;
    stdin.shutdown().await.ok();
    drop(stdin);

    let output = child
        .wait_with_output()
        .await
        .context("failed to wait for ffmpeg transcode")?;

    if let Err(err) = write_result {
        let detail = format_ffmpeg_error(&output.stderr);
        let message = if detail.is_empty() {
            err.to_string()
        } else {
            format!("{err}: {detail}")
        };
        anyhow::bail!(message);
    }

    if !output.status.success() {
        let detail = format_ffmpeg_error(&output.stderr);
        anyhow::bail!("ffmpeg transcode failed: {}", detail);
    }

    Ok(output.stdout)
}

#[async_trait]
impl ChannelStatus for WecomChannelPlugin {
    async fn probe(&self, account_id: &str) -> Result<ChannelHealthSnapshot> {
        let accounts = self.accounts.read().await;
        let connected = accounts.contains_key(account_id);
        
        Ok(ChannelHealthSnapshot {
            connected,
            account_id: account_id.to_string(),
            details: if connected {
                Some("Account active".to_string())
            } else {
                Some("Account not found".to_string())
            },
        })
    }
}
