//! 企业微信配置

use {
    secrecy::{ExposeSecret, Secret},
    serde::{Deserialize, Serialize},
};

/// 企业微信 Agent 配置
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WecomConfig {
    /// 企业 ID
    pub corp_id: String,
    
    /// 应用 ID
    pub agent_id: i64,
    
    /// 应用密钥
    #[serde(serialize_with = "serialize_secret")]
    pub corp_secret: Secret<String>,
    
    /// 回调 Token（用于验证签名）
    #[serde(
        default,
        serialize_with = "serialize_option_secret",
        skip_serializing_if = "Option::is_none"
    )]
    pub token: Option<Secret<String>>,
    
    /// 消息加密密钥（AES Key，Base64 编码）
    #[serde(
        default,
        serialize_with = "serialize_option_secret",
        skip_serializing_if = "Option::is_none"
    )]
    pub encoding_aes_key: Option<Secret<String>>,
    
    /// 欢迎消息
    #[serde(default)]
    pub welcome_text: Option<String>,
    
    /// 允许的用户列表（空表示允许所有人）
    #[serde(default)]
    pub allow_from: Vec<String>,
}

impl WecomConfig {
    /// 检查用户是否被允许
    pub fn is_user_allowed(&self, user_id: &str) -> bool {
        if self.allow_from.is_empty() {
            return true;
        }
        self.allow_from.iter().any(|id| id == "*" || id == user_id)
    }
}

fn serialize_secret<S: serde::Serializer>(
    secret: &Secret<String>,
    serializer: S,
) -> Result<S::Ok, S::Error> {
    serializer.serialize_str(secret.expose_secret())
}

fn serialize_option_secret<S: serde::Serializer>(
    secret: &Option<Secret<String>>,
    serializer: S,
) -> Result<S::Ok, S::Error> {
    match secret {
        Some(value) => serializer.serialize_some(value.expose_secret()),
        None => serializer.serialize_none(),
    }
}
