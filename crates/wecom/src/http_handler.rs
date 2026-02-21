//! HTTP Webhook 处理器示例
//! 
//! 这个模块展示如何在 gateway 中集成 wecom webhook

use {
    anyhow::Result,
    secrecy::ExposeSecret,
    tracing::{debug, info, warn},
};

use crate::channel::WecomChannelPlugin;
use crate::webhook::{handle_message_callback, handle_url_verification, WebhookParams};

/// Webhook 请求处理
/// 
/// 在 gateway 中，你需要注册一个路由来处理企业微信的回调：
/// 
/// ```rust,ignore
/// // 在 gateway/src/server.rs 中
/// let wecom_plugin = Arc::new(WecomChannelPlugin::new());
/// 
/// app.route("/api/channels/wecom/{account_id}/webhook",
///     post(handle_wecom_webhook)
/// )
/// ```
pub async fn handle_wecom_webhook(
    plugin: &WecomChannelPlugin,
    account_id: &str,
    query: &str,
    body: Option<&str>,
) -> Result<String> {
    // 解析查询参数
    let params = WebhookParams::from_query(query)?;

    // 获取账号配置
    let config = plugin
        .get_account_config(account_id)
        .await
        .ok_or_else(|| anyhow::anyhow!("Account {} not found", account_id))?;

    let token = config
        .token
        .as_ref()
        .map(ExposeSecret::expose_secret)
        .map_or("", |value| value.as_str());
    let encoding_aes_key = config
        .encoding_aes_key
        .as_ref()
        .map(ExposeSecret::expose_secret)
        .map_or("", |value| value.as_str());

    // 如果是 URL 验证请求（GET 请求，有 echostr 参数）
    if params.echostr.is_some() {
        info!("Handling URL verification for account {}", account_id);
        return handle_url_verification(&params, token, encoding_aes_key);
    }

    // 处理消息回调（POST 请求）
    let body = body.ok_or_else(|| anyhow::anyhow!("Missing request body"))?;
    
    debug!("Handling message callback for account {}", account_id);
    let message = handle_message_callback(&params, body, token, encoding_aes_key)?;

    match message.msg_type.as_str() {
        "text" => {
            if let Some(ref content) = message.content {
                info!(
                    "Received text message from {}: {}",
                    message.from_user_name, content
                );

                plugin
                    .handle_inbound_message(account_id, &message.from_user_name, content)
                    .await?;
            }
        },
        "voice" => {
            let Some(ref media_id) = message.media_id else {
                warn!("Voice message missing media_id");
                return Ok(String::new());
            };

            info!(
                "Received voice message from {}: {}",
                message.from_user_name, media_id
            );

            plugin
                .handle_inbound_voice(
                    account_id,
                    &message.from_user_name,
                    media_id,
                    message.format.as_deref(),
                    message.msg_id.as_deref(),
                    message.create_time,
                )
                .await?;
        },
        other => {
            warn!("Unsupported message type: {}", other);
        },
    }

    // 返回成功响应（空字符串表示不需要回复）
    Ok(String::new())
}
