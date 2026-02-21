//! 企业微信 Webhook 处理

use anyhow::{Context, Result};
use quick_xml::events::Event;
use quick_xml::Reader;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use time::OffsetDateTime;

use crate::crypto::{compute_signature, decrypt_message, encrypt_message, verify_signature};

/// 解析企业微信 XML 消息
pub fn parse_xml_message(xml: &str) -> Result<HashMap<String, String>> {
    let mut reader = Reader::from_str(xml);
    reader.config_mut().trim_text(true);
    
    let mut map = HashMap::new();
    let mut buf = Vec::new();
    let mut current_tag = String::new();
    
    loop {
        match reader.read_event_into(&mut buf) {
            Ok(Event::Start(e)) => {
                current_tag = String::from_utf8_lossy(e.name().as_ref()).to_string();
            }
            Ok(Event::Text(e)) => {
                if !current_tag.is_empty() {
                    let text = e.unescape()?.to_string();
                    map.insert(current_tag.clone(), text);
                }
            }
            Ok(Event::CData(e)) => {
                if !current_tag.is_empty() {
                    let text = String::from_utf8_lossy(&e).to_string();
                    map.insert(current_tag.clone(), text);
                }
            }
            Ok(Event::Eof) => break,
            Err(e) => anyhow::bail!("XML parse error: {:?}", e),
            _ => {}
        }
        buf.clear();
    }
    
    Ok(map)
}

fn extract_encrypt(xml: &str) -> Option<String> {
    const CDATA_PREFIX: &str = "<Encrypt><![CDATA[";
    const CDATA_SUFFIX: &str = "]]></Encrypt>";
    if let Some(start) = xml.find(CDATA_PREFIX) {
        let rest = &xml[start + CDATA_PREFIX.len()..];
        if let Some(end) = rest.find(CDATA_SUFFIX) {
            return Some(rest[..end].trim().to_string());
        }
    }

    const RAW_PREFIX: &str = "<Encrypt>";
    const RAW_SUFFIX: &str = "</Encrypt>";
    if let Some(start) = xml.find(RAW_PREFIX) {
        let rest = &xml[start + RAW_PREFIX.len()..];
        if let Some(end) = rest.find(RAW_SUFFIX) {
            return Some(rest[..end].trim().to_string());
        }
    }

    None
}

/// 企业微信消息类型
#[allow(dead_code)]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum MessageType {
    Text,
    Image,
    Voice,
    Video,
    File,
    Location,
    Link,
    Event,
}

/// 企业微信入站消息
#[allow(dead_code)]
#[derive(Debug, Clone)]
pub struct InboundMessage {
    pub msg_type: String,
    pub from_user_name: String,
    pub to_user_name: String,
    pub create_time: i64,
    pub msg_id: Option<String>,
    pub agent_id: Option<String>,
    pub content: Option<String>,
    pub media_id: Option<String>,
    pub pic_url: Option<String>,
    pub format: Option<String>,
    pub event: Option<String>,
    pub event_key: Option<String>,
}

impl InboundMessage {
    pub fn from_xml_map(map: HashMap<String, String>) -> Result<Self> {
        Ok(Self {
            msg_type: map.get("MsgType").cloned().unwrap_or_default(),
            from_user_name: map
                .get("FromUserName")
                .cloned()
                .context("Missing FromUserName")?,
            to_user_name: map
                .get("ToUserName")
                .cloned()
                .context("Missing ToUserName")?,
            create_time: map
                .get("CreateTime")
                .and_then(|s| s.parse().ok())
                .unwrap_or(0),
            msg_id: map.get("MsgId").cloned(),
            agent_id: map.get("AgentID").cloned(),
            content: map.get("Content").cloned(),
            media_id: map.get("MediaId").cloned(),
            pic_url: map.get("PicUrl").cloned(),
            format: map.get("Format").cloned(),
            event: map.get("Event").cloned(),
            event_key: map.get("EventKey").cloned(),
        })
    }
}

/// 构造 XML 响应
#[allow(dead_code)]
pub fn build_xml_response(to_user: &str, from_user: &str, content: &str) -> String {
    let create_time = OffsetDateTime::now_utc().unix_timestamp();
    
    format!(
        r#"<xml>
<ToUserName><![CDATA[{}]]></ToUserName>
<FromUserName><![CDATA[{}]]></FromUserName>
<CreateTime>{}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[{}]]></Content>
</xml>"#,
        to_user, from_user, create_time, content
    )
}

/// Webhook 请求参数
#[derive(Debug, Clone)]
pub struct WebhookParams {
    pub msg_signature: String,
    pub timestamp: String,
    pub nonce: String,
    pub echostr: Option<String>, // 验证 URL 时使用
}

impl WebhookParams {
    pub fn from_query(query: &str) -> Result<Self> {
        let params: HashMap<String, String> = url::form_urlencoded::parse(query.as_bytes())
            .into_owned()
            .collect();

        Ok(Self {
            msg_signature: params
                .get("msg_signature")
                .cloned()
                .context("Missing msg_signature")?,
            timestamp: params
                .get("timestamp")
                .cloned()
                .context("Missing timestamp")?,
            nonce: params.get("nonce").cloned().context("Missing nonce")?,
            echostr: params.get("echostr").cloned(),
        })
    }
}

/// 处理 URL 验证请求
pub fn handle_url_verification(
    params: &WebhookParams,
    token: &str,
    encoding_aes_key: &str,
) -> Result<String> {
    let echostr = params
        .echostr
        .as_ref()
        .context("Missing echostr for URL verification")?;

    // 验证签名
    if !verify_signature(
        token,
        &params.timestamp,
        &params.nonce,
        echostr,
        &params.msg_signature,
    ) {
        anyhow::bail!("Invalid signature for URL verification");
    }

    // 解密 echostr
    decrypt_message(encoding_aes_key, echostr)
}

/// 处理消息回调
pub fn handle_message_callback(
    params: &WebhookParams,
    body: &str,
    token: &str,
    encoding_aes_key: &str,
) -> Result<InboundMessage> {
    let encrypt = extract_encrypt(body)
        .or_else(|| parse_xml_message(body).ok().and_then(|map| map.get("Encrypt").cloned()))
        .context("Missing Encrypt in message")?;

    // 验证签名
    if !verify_signature(
        token,
        &params.timestamp,
        &params.nonce,
        &encrypt,
        &params.msg_signature,
    ) {
        anyhow::bail!("Invalid signature for message callback");
    }

    // 解密消息
    let decrypted_xml = decrypt_message(encoding_aes_key, &encrypt)?;

    // 解析解密后的消息
    let msg_map = parse_xml_message(&decrypted_xml)?;
    InboundMessage::from_xml_map(msg_map)
}

/// 构造加密响应
#[allow(dead_code)]
pub fn build_encrypted_response(
    content: &str,
    to_user: &str,
    from_user: &str,
    corp_id: &str,
    token: &str,
    encoding_aes_key: &str,
) -> Result<String> {
    // 构造 XML
    let xml = build_xml_response(to_user, from_user, content);

    // 加密
    let encrypted = encrypt_message(encoding_aes_key, &xml, corp_id)?;

    // 生成时间戳和随机数
    let timestamp = OffsetDateTime::now_utc().unix_timestamp().to_string();
    let nonce = format!("{}", rand::random::<u64>());

    // 计算签名
    let signature = compute_signature(token, &timestamp, &nonce, &encrypted);

    // 构造响应 XML
    Ok(format!(
        r#"<xml>
<Encrypt><![CDATA[{}]]></Encrypt>
<MsgSignature><![CDATA[{}]]></MsgSignature>
<TimeStamp>{}</TimeStamp>
<Nonce><![CDATA[{}]]></Nonce>
</xml>"#,
        encrypted, signature, timestamp, nonce
    ))
}
