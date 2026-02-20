//! 企业微信配置

use serde::{Deserialize, Serialize};

/// 企业微信配置
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WecomConfig {
    /// 企业 ID
    pub corp_id: String,
    
    /// 应用 ID
    pub agent_id: String,
    
    /// 应用密钥
    pub secret: String,
    
    /// 回调 URL（可选）
    #[serde(default)]
    pub callback_url: Option<String>,
    
    /// 消息加密密钥（可选）
    #[serde(default)]
    pub encoding_aes_key: Option<String>,
}
