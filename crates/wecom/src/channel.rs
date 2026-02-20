//! 企业微信 Channel 插件实现

use async_trait::async_trait;
use moltis_channels::{
    ChannelHealthSnapshot, ChannelOutbound, ChannelPlugin, ChannelStatus,
};
use anyhow::Result;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{debug, info, warn};

/// 企业微信 Channel 插件
pub struct WecomChannelPlugin {
    accounts: Arc<RwLock<HashMap<String, WecomAccount>>>,
}

/// 企业微信账号实例
struct WecomAccount {
    corp_id: String,
    agent_id: String,
    secret: String,
    client: reqwest::Client,
}

impl WecomChannelPlugin {
    pub fn new() -> Self {
        info!("Initializing WecomChannelPlugin");
        Self {
            accounts: Arc::new(RwLock::new(HashMap::new())),
        }
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
        
        let corp_id = config["corp_id"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("missing corp_id"))?
            .to_string();
        
        let agent_id = config["agent_id"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("missing agent_id"))?
            .to_string();
        
        let secret = config["secret"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("missing secret"))?
            .to_string();

        let account = WecomAccount {
            corp_id,
            agent_id,
            secret,
            client: reqwest::Client::new(),
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
        Some(self)
    }

    fn status(&self) -> Option<&dyn ChannelStatus> {
        Some(self)
    }
}

impl WecomAccount {
    /// 获取 access_token
    async fn get_access_token(&self) -> Result<String> {
        debug!("Fetching access_token for corp_id: {}", self.corp_id);
        
        let resp = self.client
            .get("https://qyapi.weixin.qq.com/cgi-bin/gettoken")
            .query(&[
                ("corpid", &self.corp_id),
                ("corpsecret", &self.secret),
            ])
            .send()
            .await?
            .json::<serde_json::Value>()
            .await?;

        if let Some(errcode) = resp.get("errcode").and_then(|v| v.as_i64()) {
            if errcode != 0 {
                let errmsg = resp.get("errmsg")
                    .and_then(|v| v.as_str())
                    .unwrap_or("unknown error");
                anyhow::bail!("Failed to get access_token: {} ({})", errmsg, errcode);
            }
        }

        let token = resp["access_token"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("missing access_token in response"))?
            .to_string();

        debug!("Successfully obtained access_token");
        Ok(token)
    }
}

#[async_trait]
impl ChannelOutbound for WecomChannelPlugin {
    async fn send_text(
        &self,
        account_id: &str,
        to: &str,
        text: &str,
        _reply_to: Option<&str>,
    ) -> Result<()> {
        debug!("Sending message to {} via account {}", to, account_id);
        
        let accounts = self.accounts.read().await;
        let account = accounts
            .get(account_id)
            .ok_or_else(|| anyhow::anyhow!("account {} not found", account_id))?;
        
        let access_token = account.get_access_token().await?;
        
        let body = serde_json::json!({
            "touser": to,
            "msgtype": "text",
            "agentid": account.agent_id,
            "text": {
                "content": text
            }
        });

        let resp = account.client
            .post("https://qyapi.weixin.qq.com/cgi-bin/message/send")
            .query(&[("access_token", &access_token)])
            .json(&body)
            .send()
            .await?
            .json::<serde_json::Value>()
            .await?;

        if let Some(errcode) = resp.get("errcode").and_then(|v| v.as_i64()) {
            if errcode != 0 {
                let errmsg = resp.get("errmsg")
                    .and_then(|v| v.as_str())
                    .unwrap_or("unknown error");
                warn!("Failed to send message: {} ({})", errmsg, errcode);
                anyhow::bail!("Failed to send message: {} ({})", errmsg, errcode);
            }
        }

        info!("Message sent successfully to {} via account {}", to, account_id);
        Ok(())
    }

    async fn send_media(
        &self,
        _account_id: &str,
        _to: &str,
        _payload: &moltis_common::types::ReplyPayload,
        _reply_to: Option<&str>,
    ) -> Result<()> {
        // TODO: 实现媒体发送
        warn!("send_media not yet implemented for WecomChannel");
        Ok(())
    }
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_plugin_creation() {
        let plugin = WecomChannelPlugin::new();
        assert_eq!(plugin.id(), "wecom");
        assert_eq!(plugin.name(), "企业微信");
    }

    #[tokio::test]
    async fn test_account_lifecycle() {
        let mut plugin = WecomChannelPlugin::new();
        
        let config = serde_json::json!({
            "corp_id": "test_corp",
            "agent_id": "test_agent",
            "secret": "test_secret"
        });
        
        // Start account
        let result = plugin.start_account("test_account", config).await;
        assert!(result.is_ok());
        
        // Check account exists
        assert!(plugin.accounts.read().await.contains_key("test_account"));
        
        // Stop account
        let result = plugin.stop_account("test_account").await;
        assert!(result.is_ok());
        
        // Check account removed
        assert!(!plugin.accounts.read().await.contains_key("test_account"));
    }
}
