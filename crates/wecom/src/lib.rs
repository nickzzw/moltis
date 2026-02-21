//! 企业微信集成模块
//! 
//! 为 moltis 提供企业微信 Agent 模式（自建应用）消息收发能力

mod channel;
mod config;
mod api;
mod crypto;
mod webhook;
pub mod http_handler;

pub use channel::WecomChannelPlugin;
pub use config::WecomConfig;
pub use webhook::{handle_message_callback, handle_url_verification, WebhookParams};
