//! 企业微信 API 客户端

use {
    anyhow::{Context, Result},
    secrecy::{ExposeSecret, Secret},
};
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{debug, info, warn};

const API_BASE: &str = "https://qyapi.weixin.qq.com/cgi-bin";

/// Access Token 缓存
#[derive(Clone)]
pub struct AccessTokenCache {
    token: Arc<RwLock<Option<CachedToken>>>,
}

#[derive(Clone)]
struct CachedToken {
    token: String,
    expires_at: std::time::Instant,
}

impl AccessTokenCache {
    pub fn new() -> Self {
        Self {
            token: Arc::new(RwLock::new(None)),
        }
    }

    /// 获取有效的 access_token，自动刷新
    pub async fn get_token(
        &self,
        corp_id: &str,
        corp_secret: &str,
        client: &reqwest::Client,
    ) -> Result<String> {
        // 检查缓存
        {
            let cached = self.token.read().await;
            if let Some(ref token) = *cached {
                if token.expires_at > std::time::Instant::now() {
                    debug!("Using cached access_token");
                    return Ok(token.token.clone());
                }
            }
        }

        // 刷新 token
        info!("Fetching new access_token");
        let resp = client
            .get(format!("{API_BASE}/gettoken"))
            .query(&[("corpid", corp_id), ("corpsecret", corp_secret)])
            .send()
            .await
            .context("Failed to request access_token")?
            .json::<serde_json::Value>()
            .await
            .context("Failed to parse access_token response")?;

        let errcode = resp["errcode"].as_i64().unwrap_or(0);
        if errcode != 0 {
            let errmsg = resp["errmsg"].as_str().unwrap_or("unknown error");
            anyhow::bail!("Failed to get access_token: {} ({})", errmsg, errcode);
        }

        let token = resp["access_token"]
            .as_str()
            .context("Missing access_token in response")?
            .to_string();

        let expires_in = resp["expires_in"].as_u64().unwrap_or(7200);
        
        // 提前 5 分钟过期，避免边界问题
        let expires_at = std::time::Instant::now()
            + std::time::Duration::from_secs(expires_in.saturating_sub(300));

        // 更新缓存
        {
            let mut cached = self.token.write().await;
            *cached = Some(CachedToken {
                token: token.clone(),
                expires_at,
            });
        }

        info!("Access token refreshed, expires in {}s", expires_in);
        Ok(token)
    }
}

/// 企业微信 API 客户端
#[derive(Clone)]
pub struct WecomApiClient {
    corp_id: String,
    corp_secret: Secret<String>,
    agent_id: i64,
    client: reqwest::Client,
    token_cache: AccessTokenCache,
}

impl WecomApiClient {
    pub fn new(corp_id: String, corp_secret: Secret<String>, agent_id: i64) -> Self {
        Self {
            corp_id,
            corp_secret,
            agent_id,
            client: reqwest::Client::new(),
            token_cache: AccessTokenCache::new(),
        }
    }

    async fn get_access_token(&self) -> Result<String> {
        self.token_cache
            .get_token(
                &self.corp_id,
                self.corp_secret.expose_secret(),
                &self.client,
            )
            .await
    }

    /// 下载临时素材
    pub async fn download_media(&self, media_id: &str) -> Result<(Vec<u8>, Option<String>)> {
        use reqwest::header::CONTENT_TYPE;

        let access_token = self.get_access_token().await?;

        let response = self
            .client
            .get(format!("{API_BASE}/media/get"))
            .query(&[("access_token", access_token.as_str()), ("media_id", media_id)])
            .send()
            .await
            .context("Failed to download media")?;

        let content_type = response
            .headers()
            .get(CONTENT_TYPE)
            .and_then(|v| v.to_str().ok())
            .map(|v| v.to_string());

        let bytes = response
            .bytes()
            .await
            .context("Failed to read media response body")?
            .to_vec();

        if content_type
            .as_deref()
            .is_some_and(|ct| ct.contains("application/json"))
            || bytes.first().is_some_and(|b| *b == b'{')
        {
            if let Ok(value) = serde_json::from_slice::<serde_json::Value>(&bytes) {
                let errcode = value["errcode"].as_i64().unwrap_or(0);
                if errcode != 0 {
                    let errmsg = value["errmsg"].as_str().unwrap_or("unknown error");
                    anyhow::bail!("Failed to download media: {} ({})", errmsg, errcode);
                }
            }
        }

        Ok((bytes, content_type))
    }

    /// 发送文本消息
    pub async fn send_text(&self, to_user: &str, content: &str) -> Result<()> {
        let access_token = self.get_access_token().await?;

        let body = serde_json::json!({
            "touser": to_user,
            "msgtype": "text",
            "agentid": self.agent_id,
            "text": {
                "content": content
            }
        });

        let resp = self
            .client
            .post(format!("{API_BASE}/message/send"))
            .query(&[("access_token", &access_token)])
            .json(&body)
            .send()
            .await
            .context("Failed to send message")?
            .json::<serde_json::Value>()
            .await
            .context("Failed to parse send response")?;

        let errcode = resp["errcode"].as_i64().unwrap_or(0);
        if errcode != 0 {
            let errmsg = resp["errmsg"].as_str().unwrap_or("unknown error");
            warn!("Failed to send message: {} ({})", errmsg, errcode);
            anyhow::bail!("Failed to send message: {} ({})", errmsg, errcode);
        }

        debug!("Message sent successfully to {}", to_user);
        Ok(())
    }

    /// 上传临时素材
    pub async fn upload_media(
        &self,
        media_type: &str,
        filename: &str,
        data: Vec<u8>,
    ) -> Result<String> {
        let access_token = self.get_access_token().await?;

        let part = reqwest::multipart::Part::bytes(data).file_name(filename.to_string());
        let form = reqwest::multipart::Form::new().part("media", part);

        let resp = self
            .client
            .post(format!("{API_BASE}/media/upload"))
            .query(&[("access_token", &access_token), ("type", &media_type.to_string())])
            .multipart(form)
            .send()
            .await
            .context("Failed to upload media")?
            .json::<serde_json::Value>()
            .await
            .context("Failed to parse upload response")?;

        let errcode = resp["errcode"].as_i64().unwrap_or(0);
        if errcode != 0 {
            let errmsg = resp["errmsg"].as_str().unwrap_or("unknown error");
            anyhow::bail!("Failed to upload media: {} ({})", errmsg, errcode);
        }

        let media_id = resp["media_id"]
            .as_str()
            .context("Missing media_id in response")?
            .to_string();

        debug!("Media uploaded successfully: {}", media_id);
        Ok(media_id)
    }

    /// 发送图片消息
    pub async fn send_image(&self, to_user: &str, media_id: &str) -> Result<()> {
        let access_token = self.get_access_token().await?;

        let body = serde_json::json!({
            "touser": to_user,
            "msgtype": "image",
            "agentid": self.agent_id,
            "image": {
                "media_id": media_id
            }
        });

        let resp = self
            .client
            .post(format!("{API_BASE}/message/send"))
            .query(&[("access_token", &access_token)])
            .json(&body)
            .send()
            .await
            .context("Failed to send image")?
            .json::<serde_json::Value>()
            .await
            .context("Failed to parse send response")?;

        let errcode = resp["errcode"].as_i64().unwrap_or(0);
        if errcode != 0 {
            let errmsg = resp["errmsg"].as_str().unwrap_or("unknown error");
            anyhow::bail!("Failed to send image: {} ({})", errmsg, errcode);
        }

        debug!("Image sent successfully to {}", to_user);
        Ok(())
    }

    /// 发送文件消息
    pub async fn send_file(&self, to_user: &str, media_id: &str) -> Result<()> {
        let access_token = self.get_access_token().await?;

        let body = serde_json::json!({
            "touser": to_user,
            "msgtype": "file",
            "agentid": self.agent_id,
            "file": {
                "media_id": media_id
            }
        });

        let resp = self
            .client
            .post(format!("{API_BASE}/message/send"))
            .query(&[("access_token", &access_token)])
            .json(&body)
            .send()
            .await
            .context("Failed to send file")?
            .json::<serde_json::Value>()
            .await
            .context("Failed to parse send response")?;

        let errcode = resp["errcode"].as_i64().unwrap_or(0);
        if errcode != 0 {
            let errmsg = resp["errmsg"].as_str().unwrap_or("unknown error");
            anyhow::bail!("Failed to send file: {} ({})", errmsg, errcode);
        }

        debug!("File sent successfully to {}", to_user);
        Ok(())
    }

    /// 发送语音消息
    pub async fn send_voice(&self, to_user: &str, media_id: &str) -> Result<()> {
        let access_token = self.get_access_token().await?;

        let body = serde_json::json!({
            "touser": to_user,
            "msgtype": "voice",
            "agentid": self.agent_id,
            "voice": {
                "media_id": media_id
            }
        });

        let resp = self
            .client
            .post(format!("{API_BASE}/message/send"))
            .query(&[("access_token", &access_token)])
            .json(&body)
            .send()
            .await
            .context("Failed to send voice")?
            .json::<serde_json::Value>()
            .await
            .context("Failed to parse send response")?;

        let errcode = resp["errcode"].as_i64().unwrap_or(0);
        if errcode != 0 {
            let errmsg = resp["errmsg"].as_str().unwrap_or("unknown error");
            anyhow::bail!("Failed to send voice: {} ({})", errmsg, errcode);
        }

        debug!("Voice sent successfully to {}", to_user);
        Ok(())
    }
}
