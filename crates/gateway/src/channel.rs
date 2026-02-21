use std::sync::Arc;

use {
    async_trait::async_trait,
    serde_json::Value,
    tokio::sync::RwLock,
    tracing::{error, info, warn},
};

use {
    moltis_channels::ChannelPlugin,
    moltis_telegram::TelegramPlugin,
    moltis_wecom::WecomChannelPlugin,
};

use {
    moltis_channels::{
        message_log::MessageLog,
        store::{ChannelStore, StoredChannel},
    },
    moltis_sessions::metadata::SqliteSessionMetadata,
};

use crate::services::{ChannelService, ServiceResult};

fn unix_now() -> i64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs() as i64
}

/// Live channel service backed by `TelegramPlugin`.
pub struct LiveChannelService {
    telegram: Arc<RwLock<TelegramPlugin>>,
    wecom: Arc<RwLock<WecomChannelPlugin>>,
    store: Arc<dyn ChannelStore>,
    message_log: Arc<dyn MessageLog>,
    session_metadata: Arc<SqliteSessionMetadata>,
}

impl LiveChannelService {
    pub fn new(
        telegram: TelegramPlugin,
        wecom: WecomChannelPlugin,
        store: Arc<dyn ChannelStore>,
        message_log: Arc<dyn MessageLog>,
        session_metadata: Arc<SqliteSessionMetadata>,
    ) -> Self {
        Self {
            telegram: Arc::new(RwLock::new(telegram)),
            wecom: Arc::new(RwLock::new(wecom)),
            store,
            message_log,
            session_metadata,
        }
    }

    async fn resolve_channel_type(&self, params: &Value, account_id: &str) -> String {
        if let Some(channel_type) = params.get("type").and_then(|v| v.as_str()) {
            return channel_type.to_string();
        }

        match self.store.get(account_id).await {
            Ok(Some(stored)) => stored.channel_type,
            _ => "telegram".to_string(),
        }
    }
}

#[async_trait]
impl ChannelService for LiveChannelService {
    async fn status(&self) -> ServiceResult {
        let mut channels = Vec::new();

        {
            let tg = self.telegram.read().await;
            let account_ids = tg.account_ids();

            if let Some(status) = tg.status() {
                for aid in &account_ids {
                    match status.probe(aid).await {
                        Ok(snap) => {
                            let mut entry = serde_json::json!({
                                "type": "telegram",
                                "name": format!("Telegram ({})", aid),
                                "account_id": aid,
                                "status": if snap.connected { "connected" } else { "disconnected" },
                                "details": snap.details,
                            });
                            if let Some(cfg) = tg.account_config(aid) {
                                entry["config"] = cfg;
                            }

                            // Include bound sessions and active session mappings.
                            let bound = self
                                .session_metadata
                                .list_account_sessions("telegram", aid)
                                .await;
                            let active_map = self
                                .session_metadata
                                .list_active_sessions("telegram", aid)
                                .await;
                            let sessions: Vec<_> = bound
                                .iter()
                                .map(|s| {
                                    let is_active = active_map.iter().any(|(_, sk)| sk == &s.key);
                                    serde_json::json!({
                                        "key": s.key,
                                        "label": s.label,
                                        "messageCount": s.message_count,
                                        "active": is_active,
                                    })
                                })
                                .collect();
                            if !sessions.is_empty() {
                                entry["sessions"] = serde_json::json!(sessions);
                            }

                            channels.push(entry);
                        },
                        Err(e) => {
                            channels.push(serde_json::json!({
                                "type": "telegram",
                                "name": format!("Telegram ({})", aid),
                                "account_id": aid,
                                "status": "error",
                                "details": e.to_string(),
                            }));
                        },
                    }
                }
            }
        }

        {
            let wecom = self.wecom.read().await;
            let account_ids = wecom.account_ids().await;

            if let Some(status) = wecom.status() {
                for aid in &account_ids {
                    match status.probe(aid).await {
                        Ok(snap) => {
                            let mut entry = serde_json::json!({
                                "type": "wecom",
                                "name": format!("WeCom ({})", aid),
                                "account_id": aid,
                                "status": if snap.connected { "connected" } else { "disconnected" },
                                "details": snap.details,
                            });
                            if let Some(cfg) = wecom.account_config(aid).await {
                                entry["config"] = cfg;
                            }

                            let bound = self
                                .session_metadata
                                .list_account_sessions("wecom", aid)
                                .await;
                            let active_map = self
                                .session_metadata
                                .list_active_sessions("wecom", aid)
                                .await;
                            let sessions: Vec<_> = bound
                                .iter()
                                .map(|s| {
                                    let is_active = active_map.iter().any(|(_, sk)| sk == &s.key);
                                    serde_json::json!({
                                        "key": s.key,
                                        "label": s.label,
                                        "messageCount": s.message_count,
                                        "active": is_active,
                                    })
                                })
                                .collect();
                            if !sessions.is_empty() {
                                entry["sessions"] = serde_json::json!(sessions);
                            }

                            channels.push(entry);
                        },
                        Err(e) => {
                            channels.push(serde_json::json!({
                                "type": "wecom",
                                "name": format!("WeCom ({})", aid),
                                "account_id": aid,
                                "status": "error",
                                "details": e.to_string(),
                            }));
                        },
                    }
                }
            }
        }

        Ok(serde_json::json!({ "channels": channels }))
    }

    async fn add(&self, params: Value) -> ServiceResult {
        let channel_type = params
            .get("type")
            .and_then(|v| v.as_str())
            .unwrap_or("telegram");

        let account_id = params
            .get("account_id")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'account_id'".to_string())?;

        let config = params
            .get("config")
            .cloned()
            .unwrap_or(Value::Object(Default::default()));

        match channel_type {
            "telegram" => {
                info!(account_id, "adding telegram channel account");

                let mut tg = self.telegram.write().await;
                tg.start_account(account_id, config.clone())
                    .await
                    .map_err(|e| {
                        error!(error = %e, account_id, "failed to start telegram account");
                        e.to_string()
                    })?;

                let now = unix_now();
                if let Err(e) = self
                    .store
                    .upsert(StoredChannel {
                        account_id: account_id.to_string(),
                        channel_type: "telegram".into(),
                        config,
                        created_at: now,
                        updated_at: now,
                    })
                    .await
                {
                    warn!(error = %e, account_id, "failed to persist channel");
                }
            },
            "wecom" => {
                info!(account_id, "adding wecom channel account");

                let mut wecom = self.wecom.write().await;
                wecom
                    .start_account(account_id, config.clone())
                    .await
                    .map_err(|e| {
                        error!(error = %e, account_id, "failed to start wecom account");
                        e.to_string()
                    })?;

                let now = unix_now();
                if let Err(e) = self
                    .store
                    .upsert(StoredChannel {
                        account_id: account_id.to_string(),
                        channel_type: "wecom".into(),
                        config,
                        created_at: now,
                        updated_at: now,
                    })
                    .await
                {
                    warn!(error = %e, account_id, "failed to persist channel");
                }
            },
            _ => return Err(format!("unsupported channel type: {channel_type}")),
        }

        Ok(serde_json::json!({ "added": account_id }))
    }

    async fn remove(&self, params: Value) -> ServiceResult {
        let account_id = params
            .get("account_id")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'account_id'".to_string())?;

        let channel_type = self.resolve_channel_type(&params, account_id).await;

        match channel_type.as_str() {
            "telegram" => {
                info!(account_id, "removing telegram channel account");

                let mut tg = self.telegram.write().await;
                tg.stop_account(account_id).await.map_err(|e| {
                    error!(error = %e, account_id, "failed to stop telegram account");
                    e.to_string()
                })?;
            },
            "wecom" => {
                info!(account_id, "removing wecom channel account");

                let mut wecom = self.wecom.write().await;
                wecom.stop_account(account_id).await.map_err(|e| {
                    error!(error = %e, account_id, "failed to stop wecom account");
                    e.to_string()
                })?;
            },
            _ => return Err(format!("unsupported channel type: {channel_type}")),
        }

        if let Err(e) = self.store.delete(account_id).await {
            warn!(error = %e, account_id, "failed to delete channel from store");
        }

        Ok(serde_json::json!({ "removed": account_id }))
    }

    async fn logout(&self, params: Value) -> ServiceResult {
        self.remove(params).await
    }

    async fn update(&self, params: Value) -> ServiceResult {
        let account_id = params
            .get("account_id")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'account_id'".to_string())?;

        let config = params
            .get("config")
            .cloned()
            .ok_or_else(|| "missing 'config'".to_string())?;

        let channel_type = self.resolve_channel_type(&params, account_id).await;

        match channel_type.as_str() {
            "telegram" => {
                info!(account_id, "updating telegram channel account");

                let mut tg = self.telegram.write().await;

                // Stop then restart with new config
                tg.stop_account(account_id).await.map_err(|e| {
                    error!(error = %e, account_id, "failed to stop telegram account for update");
                    e.to_string()
                })?;

                tg.start_account(account_id, config.clone())
                    .await
                    .map_err(|e| {
                        error!(error = %e, account_id, "failed to restart telegram account after update");
                        e.to_string()
                    })?;
            },
            "wecom" => {
                info!(account_id, "updating wecom channel account");

                let mut wecom = self.wecom.write().await;
                wecom.stop_account(account_id).await.map_err(|e| {
                    error!(error = %e, account_id, "failed to stop wecom account for update");
                    e.to_string()
                })?;

                wecom
                    .start_account(account_id, config.clone())
                    .await
                    .map_err(|e| {
                        error!(error = %e, account_id, "failed to restart wecom account after update");
                        e.to_string()
                    })?;
            },
            _ => return Err(format!("unsupported channel type: {channel_type}")),
        }

        let now = unix_now();
        if let Err(e) = self
            .store
            .upsert(StoredChannel {
                account_id: account_id.to_string(),
                channel_type: channel_type.clone(),
                config,
                created_at: now,
                updated_at: now,
            })
            .await
        {
            warn!(error = %e, account_id, "failed to persist channel update");
        }

        Ok(serde_json::json!({ "updated": account_id }))
    }

    async fn send(&self, _params: Value) -> ServiceResult {
        Err("direct channel send not yet implemented".into())
    }

    async fn senders_list(&self, params: Value) -> ServiceResult {
        let account_id = params
            .get("account_id")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'account_id'".to_string())?;

        let channel_type = self.resolve_channel_type(&params, account_id).await;

        let senders = self
            .message_log
            .unique_senders(account_id)
            .await
            .map_err(|e| e.to_string())?;

        let (allowlist, otp_challenges) = match channel_type.as_str() {
            "telegram" => {
                let tg = self.telegram.read().await;
                let allowlist: Vec<String> = tg
                    .account_config(account_id)
                    .and_then(|cfg| cfg.get("allowlist").cloned())
                    .and_then(|v| serde_json::from_value(v).ok())
                    .unwrap_or_default();

                let otp_challenges = {
                    let tg_inner = self.telegram.read().await;
                    tg_inner.pending_otp_challenges(account_id)
                };

                (allowlist, otp_challenges)
            },
            "wecom" => {
                let wecom = self.wecom.read().await;
                let allowlist: Vec<String> = wecom
                    .account_config(account_id)
                    .await
                    .and_then(|cfg| cfg.get("allow_from").cloned())
                    .and_then(|v| serde_json::from_value(v).ok())
                    .unwrap_or_default();
                (allowlist, Vec::new())
            },
            _ => return Err(format!("unsupported channel type: {channel_type}")),
        };

        let list: Vec<Value> = senders
            .into_iter()
            .map(|s| {
                let is_allowed = allowlist.iter().any(|a| {
                    let a_lower = a.to_lowercase();
                    a_lower == s.peer_id.to_lowercase()
                        || s.username
                            .as_ref()
                            .is_some_and(|u| a_lower == u.to_lowercase())
                });
                let mut entry = serde_json::json!({
                    "peer_id": s.peer_id,
                    "username": s.username,
                    "sender_name": s.sender_name,
                    "message_count": s.message_count,
                    "last_seen": s.last_seen,
                    "allowed": is_allowed,
                });
                // Attach OTP info if a challenge is pending for this peer.
                if let Some(otp) = otp_challenges.iter().find(|c| c.peer_id == s.peer_id) {
                    entry["otp_pending"] = serde_json::json!({
                        "code": otp.code,
                        "expires_at": otp.expires_at,
                    });
                }
                entry
            })
            .collect();

        Ok(serde_json::json!({ "senders": list }))
    }

    async fn sender_approve(&self, params: Value) -> ServiceResult {
        let account_id = params
            .get("account_id")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'account_id'".to_string())?;

        let identifier = params
            .get("identifier")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'identifier'".to_string())?;

        let channel_type = self.resolve_channel_type(&params, account_id).await;

        // Read current stored config, add identifier to allowlist, persist & restart.
        let stored = self
            .store
            .get(account_id)
            .await
            .map_err(|e| e.to_string())?
            .ok_or_else(|| format!("channel '{account_id}' not found in store"))?;

        let mut config = stored.config.clone();
        let allowlist_key = match channel_type.as_str() {
            "telegram" => "allowlist",
            "wecom" => "allow_from",
            _ => return Err(format!("unsupported channel type: {channel_type}")),
        };
        let allowlist = config
            .as_object_mut()
            .ok_or_else(|| "config is not an object".to_string())?
            .entry(allowlist_key)
            .or_insert_with(|| serde_json::json!([]));

        let arr = allowlist
            .as_array_mut()
            .ok_or_else(|| "allowlist is not an array".to_string())?;

        let id_lower = identifier.to_lowercase();
        if !arr
            .iter()
            .any(|v| v.as_str().is_some_and(|s| s.to_lowercase() == id_lower))
        {
            arr.push(serde_json::json!(identifier));
        }

        if channel_type == "telegram" {
            // Also ensure dm_policy is set to "allowlist" so the list is enforced.
            if let Some(obj) = config.as_object_mut() {
                obj.insert("dm_policy".into(), serde_json::json!("allowlist"));
            }
        }

        // Persist.
        let now = unix_now();
        if let Err(e) = self
            .store
            .upsert(StoredChannel {
                account_id: account_id.to_string(),
                channel_type: channel_type.clone(),
                config: config.clone(),
                created_at: stored.created_at,
                updated_at: now,
            })
            .await
        {
            warn!(error = %e, account_id, "failed to persist sender approval");
        }

        match channel_type.as_str() {
            "telegram" => {
                // Hot-update the in-memory config (no bot restart, preserves polling
                // offset so Telegram doesn't re-deliver the OTP code message).
                let tg = self.telegram.read().await;
                if let Err(e) = tg.update_account_config(account_id, config) {
                    warn!(error = %e, account_id, "failed to hot-update config for sender approval");
                }
            },
            "wecom" => {
                let wecom = self.wecom.read().await;
                if let Err(e) = wecom.update_account_config(account_id, config).await {
                    warn!(error = %e, account_id, "failed to hot-update config for sender approval");
                }
            },
            _ => {},
        }

        info!(account_id, identifier, "sender approved");
        Ok(serde_json::json!({ "approved": identifier }))
    }

    async fn sender_deny(&self, params: Value) -> ServiceResult {
        let account_id = params
            .get("account_id")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'account_id'".to_string())?;

        let identifier = params
            .get("identifier")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "missing 'identifier'".to_string())?;

        let channel_type = self.resolve_channel_type(&params, account_id).await;

        let stored = self
            .store
            .get(account_id)
            .await
            .map_err(|e| e.to_string())?
            .ok_or_else(|| format!("channel '{account_id}' not found in store"))?;

        let mut config = stored.config.clone();
        let allowlist_key = match channel_type.as_str() {
            "telegram" => "allowlist",
            "wecom" => "allow_from",
            _ => return Err(format!("unsupported channel type: {channel_type}")),
        };
        if let Some(arr) = config
            .as_object_mut()
            .and_then(|o| o.get_mut(allowlist_key))
            .and_then(|v| v.as_array_mut())
        {
            let id_lower = identifier.to_lowercase();
            arr.retain(|v| v.as_str().is_none_or(|s| s.to_lowercase() != id_lower));
        }

        // Persist.
        let now = unix_now();
        if let Err(e) = self
            .store
            .upsert(StoredChannel {
                account_id: account_id.to_string(),
                channel_type: channel_type.clone(),
                config: config.clone(),
                created_at: stored.created_at,
                updated_at: now,
            })
            .await
        {
            warn!(error = %e, account_id, "failed to persist sender denial");
        }

        // Hot-update the in-memory config (no bot restart needed for allowlist removal).
        match channel_type.as_str() {
            "telegram" => {
                let tg = self.telegram.read().await;
                if let Err(e) = tg.update_account_config(account_id, config) {
                    warn!(error = %e, account_id, "failed to hot-update config for sender denial");
                }
            },
            "wecom" => {
                let wecom = self.wecom.read().await;
                if let Err(e) = wecom.update_account_config(account_id, config).await {
                    warn!(error = %e, account_id, "failed to hot-update config for sender denial");
                }
            },
            _ => {},
        }

        info!(account_id, identifier, "sender denied");
        Ok(serde_json::json!({ "denied": identifier }))
    }

    async fn webhook(
        &self,
        channel_type: &str,
        account_id: &str,
        query: &str,
        body: Option<&str>,
    ) -> ServiceResult<String> {
        match channel_type {
            "wecom" => {
                let wecom = self.wecom.read().await;
                moltis_wecom::http_handler::handle_wecom_webhook(&wecom, account_id, query, body)
                    .await
                    .map_err(|e| e.to_string())
            },
            "telegram" => Err("telegram does not support webhooks".into()),
            other => Err(format!("unsupported channel type: {other}")),
        }
    }
}
