//! 企业微信消息加解密

use anyhow::{Context, Result};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use sha1::{Digest, Sha1};

const PKCS7_BLOCK_SIZE: usize = 32;

/// 验证企业微信签名
pub fn verify_signature(token: &str, timestamp: &str, nonce: &str, msg_encrypt: &str, signature: &str) -> bool {
    let computed = compute_signature(token, timestamp, nonce, msg_encrypt);
    computed == signature
}

/// 计算企业微信签名
pub fn compute_signature(token: &str, timestamp: &str, nonce: &str, msg_encrypt: &str) -> String {
    let mut items = vec![token, timestamp, nonce, msg_encrypt];
    items.sort();
    let joined = items.join("");
    
    let mut hasher = Sha1::new();
    hasher.update(joined.as_bytes());
    let result = hasher.finalize();
    
    hex::encode(result)
}

/// 解密企业微信消息
pub fn decrypt_message(encoding_aes_key: &str, msg_encrypt: &str) -> Result<String> {
    use aes::cipher::{block_padding::NoPadding, BlockDecryptMut, KeyIvInit};
    
    // 解码 AES Key (Base64)
    let aes_key = BASE64
        .decode(format!("{}=", encoding_aes_key))
        .context("Failed to decode AES key")?;
    
    if aes_key.len() != 32 {
        anyhow::bail!("Invalid AES key length: expected 32, got {}", aes_key.len());
    }
    
    // 解码加密消息
    let encrypted = BASE64
        .decode(msg_encrypt)
        .context("Failed to decode encrypted message")?;
    
    // AES-256-CBC 解密，IV 是 AES Key 的前 16 字节
    let iv = &aes_key[0..16];
    
    type Aes256CbcDec = cbc::Decryptor<aes::Aes256>;
    
    let mut buffer = encrypted.clone();
    let decrypted = Aes256CbcDec::new(aes_key.as_slice().into(), iv.into())
        .decrypt_padded_mut::<NoPadding>(&mut buffer)
        .map_err(|e| anyhow::anyhow!("AES decryption failed: {:?}", e))?;
    let decrypted = pkcs7_unpad(decrypted, PKCS7_BLOCK_SIZE)?;
    
    // 解析消息格式：
    // random(16B) + msg_len(4B) + msg + corp_id
    if decrypted.len() < 20 {
        anyhow::bail!("Decrypted message too short");
    }
    
    // 跳过随机数（前 16 字节）
    let content = &decrypted[16..];
    
    // 读取消息长度（网络字节序，大端）
    let msg_len = u32::from_be_bytes([content[0], content[1], content[2], content[3]]) as usize;
    
    // 提取消息内容
    if content.len() < 4 + msg_len {
        anyhow::bail!("Invalid message length");
    }
    
    let msg = &content[4..4 + msg_len];
    let msg_str = String::from_utf8(msg.to_vec())
        .context("Failed to decode message as UTF-8")?;
    
    Ok(msg_str)
}

/// 加密企业微信消息（用于回复）
#[allow(dead_code)]
pub fn encrypt_message(encoding_aes_key: &str, msg: &str, corp_id: &str) -> Result<String> {
    use aes::cipher::{block_padding::NoPadding, BlockEncryptMut, KeyIvInit};
    use rand::Rng;
    
    // 解码 AES Key
    let aes_key = BASE64
        .decode(format!("{}=", encoding_aes_key))
        .context("Failed to decode AES key")?;
    
    if aes_key.len() != 32 {
        anyhow::bail!("Invalid AES key length");
    }
    
    // 生成 16 字节随机数
    let mut rng = rand::rng();
    let random: [u8; 16] = rng.random();
    
    // 构造消息：random(16B) + msg_len(4B) + msg + corp_id
    let msg_bytes = msg.as_bytes();
    let msg_len = (msg_bytes.len() as u32).to_be_bytes();
    let corp_id_bytes = corp_id.as_bytes();
    
    let mut plaintext = Vec::new();
    plaintext.extend_from_slice(&random);
    plaintext.extend_from_slice(&msg_len);
    plaintext.extend_from_slice(msg_bytes);
    plaintext.extend_from_slice(corp_id_bytes);
    let padded = pkcs7_pad(&plaintext, PKCS7_BLOCK_SIZE);
    
    // AES-256-CBC 加密
    let iv = &aes_key[0..16];
    
    type Aes256CbcEnc = cbc::Encryptor<aes::Aes256>;
    
    // 计算需要的缓冲区大小（包含填充）
    let mut buffer = padded;
    let buffer_len = buffer.len();
    let encrypted_len = Aes256CbcEnc::new(aes_key.as_slice().into(), iv.into())
        .encrypt_padded_mut::<NoPadding>(&mut buffer, buffer_len)
        .map_err(|e| anyhow::anyhow!("AES encryption failed: {:?}", e))?
        .len();
    
    // Base64 编码
    Ok(BASE64.encode(&buffer[..encrypted_len]))
}

fn pkcs7_pad(data: &[u8], block_size: usize) -> Vec<u8> {
    let pad = block_size - (data.len() % block_size);
    let mut out = Vec::with_capacity(data.len() + pad);
    out.extend_from_slice(data);
    out.extend(std::iter::repeat(pad as u8).take(pad));
    out
}

fn pkcs7_unpad(data: &[u8], block_size: usize) -> Result<&[u8]> {
    if data.is_empty() {
        anyhow::bail!("PKCS7 unpad failed: empty buffer");
    }
    let pad = *data.last().unwrap() as usize;
    if pad == 0 || pad > block_size || pad > data.len() {
        anyhow::bail!("PKCS7 unpad failed: invalid pad");
    }
    if !data[data.len() - pad..].iter().all(|b| *b as usize == pad) {
        anyhow::bail!("PKCS7 unpad failed: invalid pad bytes");
    }
    Ok(&data[..data.len() - pad])
}
