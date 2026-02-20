# moltis-wecom

企业微信集成模块，为 moltis 提供企业微信消息收发能力。

## 功能

- [x] 发送文本消息
- [ ] 接收消息（webhook）
- [ ] 发送图片
- [ ] 发送文件
- [ ] 发送卡片消息

## 配置

在 `moltis.toml` 中添加：

```toml
[channels.wecom]
corp_id = "ww1234567890abcdef"
agent_id = "1000002"
secret = "your-secret"
callback_url = "https://your-domain.com/wecom/callback"
```

## 开发

```bash
# 测试
cargo test -p moltis-wecom

# 构建
cargo build -p moltis-wecom
```

## API 文档

参考企业微信官方文档：
- [消息发送](https://developer.work.weixin.qq.com/document/path/90236)
- [接收消息](https://developer.work.weixin.qq.com/document/path/90238)
