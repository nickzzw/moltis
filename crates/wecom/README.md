# moltis-wecom

企业微信集成模块，为 moltis 提供企业微信 Agent 模式（自建应用）双向消息通信能力。

## 快速开始

**5 分钟完成集成**：查看 [快速开始指南](./QUICKSTART.md)

## 功能特性

- [x] Agent 模式（自建应用）
- [x] 发送文本消息（自动分块，支持长文本）
- [x] 发送图片消息
- [x] 发送文件消息
- [x] Access Token 自动管理（缓存 + 自动刷新）
- [x] 用户权限控制（allow_from 白名单）
- [x] 消息加解密（支持回调验证）
- [x] 接收消息 Webhook
- [x] 接收语音消息（自动转写，需配置语音）
- [ ] 发送语音消息支持
- [ ] 视频消息支持
- [ ] 卡片消息支持

## 配置示例

在 `moltis.toml` 中添加：

```toml
[channels.wecom]
account_id = "default"          # 账号标识（可选，影响 webhook 路径）

# 企业 ID（必填）
corp_id = "ww1234567890abcdef"

# 应用 ID（必填）
agent_id = 1000002

# 应用密钥（必填）
corp_secret = "your-secret-here"

# 回调 Token（可选，用于 Webhook 验证）
token = "your-callback-token"

# 消息加密密钥（可选，Base64 编码，用于消息加解密）
encoding_aes_key = "your-aes-key-here"

# 欢迎消息（可选）
welcome_text = "你好！我是 AI 助手"

# 允许的用户列表（可选，空表示允许所有人）
# 支持通配符 "*" 表示允许所有人
allow_from = ["user1", "user2"]
# 或者允许所有人：
# allow_from = ["*"]
```

## 获取配置参数

### 1. 创建自建应用

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/wework_admin/frame#/apps)
2. 进入「应用管理」→「自建」→ 创建应用
3. 记录以下信息：
   - **AgentId**（应用 ID）
   - **CorpId**（企业 ID，在「我的企业」页面）
   - **Secret**（应用密钥）

### 2. 配置可信 IP

**重要**：必须将服务器 IP 添加到「企业可信 IP」列表，否则 API 调用会失败。

1. 进入应用详情页
2. 找到「企业可信 IP」→「配置」
3. 添加你的服务器公网 IP

如果使用动态 IP 或内网穿透，建议配置固定 IP 的代理服务器。

### 3. 配置回调（可选）

如果需要接收用户消息：

1. 在应用详情中找到「接收消息」→「设置 API 接收」
2. 填写回调 URL：`https://your-domain.com/api/channels/wecom/<account_id>/webhook`
   - 如果设置了 `account_id`，替换为该值
   - 未设置时默认使用 `default`：`/api/channels/wecom/default/webhook`
3. 记录 Token 和 EncodingAESKey

## 使用示例

### 发送文本消息

```rust
use moltis_wecom::WecomChannelPlugin;
use moltis_channels::ChannelOutbound;

let plugin = WecomChannelPlugin::new();
let outbound = plugin.shared_outbound();

// 启动账号
let config = serde_json::json!({
    "corp_id": "ww1234567890abcdef",
    "agent_id": 1000002,
    "corp_secret": "your-secret",
    "allow_from": ["*"]
});
plugin.start_account("default", config).await?;

// 发送消息
outbound
    .send_text("default", "user_id", "Hello from moltis!", None)
    .await?;
```

### 发送图片

```rust
use moltis_common::types::{MediaAttachment, ReplyPayload};

let payload = ReplyPayload {
    text: String::new(),
    media: Some(MediaAttachment {
        url: "https://example.com/image.jpg".to_string(),
        mime_type: "image/jpeg".to_string(),
    }),
    reply_to_id: None,
    silent: false,
};

outbound.send_media("default", "user_id", &payload, None).await?;
```

### 发送文件

```rust
use moltis_common::types::{MediaAttachment, ReplyPayload};

let payload = ReplyPayload {
    text: "请查收文件".to_string(),
    media: Some(MediaAttachment {
        url: "https://example.com/document.pdf".to_string(),
        mime_type: "application/pdf".to_string(),
    }),
    reply_to_id: None,
    silent: false,
};

outbound.send_media("default", "user_id", &payload, None).await?;
```

## 开发

```bash
# 运行测试
cargo test -p moltis-wecom

# 构建
cargo build -p moltis-wecom
```

## 技术细节

### Access Token 管理

- 自动缓存 access_token，避免频繁请求
- 提前 5 分钟刷新，避免过期
- 线程安全的 RwLock 保护

### 消息分块

- 文本消息自动分块（每块 2000 字符）
- 避免超过企业微信 API 限制
- 自动添加发送间隔，防止限流

### 加密算法

- AES-256-CBC 加密
- PKCS7 填充
- SHA1 签名验证

## 限制

- 文本消息：最大 2048 字符（自动分块）
- 图片：最大 2MB
- 文件：最大 20MB
- 语音：最大 2MB
- 视频：最大 10MB

## 参考文档

- [企业微信 API 文档](https://developer.work.weixin.qq.com/document/)
- [消息发送](https://developer.work.weixin.qq.com/document/path/90236)
- [接收消息](https://developer.work.weixin.qq.com/document/path/90238)
- [素材上传](https://developer.work.weixin.qq.com/document/path/90253)

## 许可证

与 moltis 主项目相同。
