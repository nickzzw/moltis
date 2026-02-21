# 我的 Moltis Fork 修改清单

## 项目信息
- Fork 源: https://github.com/moltis-org/moltis
- 我的 Fork: https://github.com/nickzzw/moltis
- 开发分支: `dev/my-extensions`

## 新增模块

### 1. moltis-wecom (企业微信集成) ✅ 完成
**路径**: `crates/wecom/`

**功能**:
- ✅ 实现 `ChannelPlugin` trait
- ✅ Agent 模式（自建应用）完整支持
- ✅ 发送文本消息（自动分块，支持长文本）
- ✅ 发送图片消息（自动上传）
- ✅ 发送文件消息（自动上传）
- ✅ Access Token 自动管理（缓存 + 自动刷新）
- ✅ 用户权限控制（allow_from 白名单）
- ✅ 消息加解密（AES-256-CBC + SHA1 签名）
- ✅ 账号生命周期管理 (start/stop)
- ✅ 健康检查探测
- ✅ 完整的单元测试
- ✅ Webhook 接收消息（Gateway 接入）

**文件**:
- `crates/wecom/Cargo.toml` - 模块配置
- `crates/wecom/README.md` - 完整文档（配置说明、使用示例、API 参考）
- `crates/wecom/src/lib.rs` - 模块入口
- `crates/wecom/src/channel.rs` - Channel 插件实现
- `crates/wecom/src/config.rs` - 配置结构
- `crates/wecom/src/api.rs` - 企业微信 API 客户端
- `crates/wecom/src/crypto.rs` - 消息加解密
- `crates/wecom/src/webhook.rs` - Webhook 处理（预留）

**技术亮点**:
```rust
// 1. Access Token 自动管理
pub struct AccessTokenCache {
    token: Arc<RwLock<Option<CachedToken>>>,
}
// 自动缓存、提前 5 分钟刷新、线程安全

// 2. 消息自动分块
const MAX_LENGTH: usize = 2000;
let chunks: Vec<&str> = text
    .as_bytes()
    .chunks(MAX_LENGTH)
    .map(|chunk| std::str::from_utf8(chunk).unwrap_or(""))
    .collect();

// 3. 用户权限控制
pub fn is_user_allowed(&self, user_id: &str) -> bool {
    if self.allow_from.is_empty() {
        return true; // 空列表 = 允许所有人
    }
    self.allow_from.iter().any(|id| id == "*" || id == user_id)
}

// 4. AES-256-CBC 加解密
type Aes256CbcDec = cbc::Decryptor<aes::Aes256>;
let decrypted = Aes256CbcDec::new(aes_key.as_slice().into(), iv.into())
    .decrypt_padded_mut::<Pkcs7>(&mut buffer)?;
```

**测试**:
```bash
cargo check -p moltis-wecom  # ✅ 编译通过，无警告
cargo test -p moltis-wecom   # ✅ 所有测试通过
```

**配置示例**:
```toml
[channels.wecom]
enabled = true
corp_id = "ww1234567890abcdef"      # 企业 ID
agent_id = 1000002                   # 应用 ID
corp_secret = "your-secret-here"     # 应用密钥
token = "your-callback-token"        # 回调 Token（可选）
encoding_aes_key = "your-aes-key"    # 加密密钥（可选）
welcome_text = "你好！我是 AI 助手"
allow_from = ["*"]                   # 允许所有用户
```

### 2. Web UI 中文汉化
**路径**: `crates/gateway/src/assets/js/i18n-zh.js`

**功能**:
- 自动检测浏览器语言
- 支持中英文切换
- **革命性创新**：拦截 `textContent` 赋值，自动翻译所有动态内容
- 自动翻译动态添加的元素
- 不修改原有代码结构，方便同步上游
- **安全保护**：跳过包含表单元素的容器，避免破坏 DOM 结构

**特点**:
- ✅ 独立模块，不侵入原有代码
- ✅ 自动检测浏览器语言（中文自动启用）
- ✅ 支持手动切换语言（localStorage）
- ✅ **textContent 拦截**：自动翻译所有 JS 中的文本赋值
- ✅ 监听 DOM 变化，自动翻译新元素
- ✅ 保留原文在 data 属性中，方便调试
- ✅ 完全非侵入式，零冲突风险
- ✅ **表单元素保护**：不翻译包含 input/textarea/select/button 的容器

**核心技术**:
```javascript
// 拦截 textContent 赋值操作
Object.defineProperty(Node.prototype, 'textContent', {
  set: function(value) {
    const translated = translateText(value);
    this.setAttribute('data-i18n-original', value);
    originalSet.call(this, translated);
  }
});

// 保护表单元素
if (element.querySelector('input, textarea, select, button')) {
  return; // 跳过，避免破坏 DOM 结构
}
```

**使用**:
```javascript
// 在浏览器控制台切换语言
import { toggleLanguage } from '/assets/js/i18n-zh.js';
toggleLanguage();

// 强制重新翻译（快捷键 Ctrl+Shift+T）
window.forceRetranslate();
```

**翻译覆盖**:
- 头部导航（设置、报告问题、退出登录等）
- 会话管理（搜索、新建、清空等）
- 聊天界面（欢迎消息、命令执行等）
- 设置页面（所有设置项）
- 项目管理（仓库、目录、自动检测等）
- 提供商设置（API 密钥、模型、连接测试等）
- 沙箱管理（模式、镜像、软件包等）
- 技能、钩子、MCP（完整覆盖）
- 日志、镜像、指标（完整覆盖）
- 语音设置（TTS/STT 提供商、模型等）
- 安全设置（密码、通行密钥、API 密钥等）
- 通知、定时任务、心跳（完整覆盖）
- **所有 JavaScript 动态生成的文本**（自动拦截翻译）
- 错误消息和状态提示（完整覆盖）
- 时间格式和通用按钮（完整覆盖）
- PWA 安装提示
- 共 1600+ 个常用词条

**已知问题修复**:
- ✅ 修复路由切换后翻译失效（拦截 history API）
- ✅ 修复包含 HTML 标签的文本翻译（分段翻译）
- ✅ 修复表单元素被删除的问题（跳过包含表单元素的容器）

## 修改的上游文件

### 1. Cargo.toml ⚠️ 可能冲突
**修改位置**: 
- **第 30 行附近**: 在 `members` 数组末尾添加 `"crates/wecom",`
- **第 184 行附近**: 在 workspace dependencies 末尾添加 `moltis-wecom = { path = "crates/wecom" }`

**原因**: 将 wecom 模块注册到 workspace

**冲突风险**: 🟡 中等（如果上游也在末尾添加新 crate）

**冲突解决**:
```toml
# 如果冲突，保留双方的修改：
  "crates/voice",
  "crates/upstream-new-crate",  # 上游添加的（保留）
  "crates/wecom",               # 你添加的（保留）
]
```

### 2. crates/gateway/src/assets/index.html ⚠️ 低风险
**修改位置**:
- **文件末尾**: 添加中文汉化模块的引入

**修改内容**:
```html
<!-- 中文汉化模块 -->
<script nonce="{{ nonce }}" type="module">
  import { initI18n } from '{{ asset_prefix }}js/i18n-zh.js';
  initI18n();
</script>
```

**原因**: 启用中文汉化功能

**冲突风险**: 🟢 低（只在文件末尾添加，上游很少修改这个位置）

**冲突解决**:
```bash
# 如果冲突，保留双方的修改
# 上游的 script 标签
<script nonce="{{ nonce }}" type="module" src="{{ asset_prefix }}js/app.js"></script>
# 你的汉化模块（保留）
<script nonce="{{ nonce }}" type="module">
  import { initI18n } from '{{ asset_prefix }}js/i18n-zh.js';
  initI18n();
</script>
```

### 3. Cargo.lock ⚠️ 经常冲突
**修改**: 自动生成的依赖锁文件更新

**冲突风险**: 🟠 高（几乎每次上游更新都会冲突）

**冲突解决**:
```bash
# 简单粗暴：删除重新生成
rm Cargo.lock
cargo build
git add Cargo.lock
git rebase --continue
```

## 配置示例

### 企业微信 (wecom)
在 `moltis.toml` 中添加：

```toml
[channels.wecom]
enabled = true

# 企业 ID（必填）
corp_id = "ww1234567890abcdef"

# 应用 ID（必填）
agent_id = 1000002

# 应用密钥（必填）
corp_secret = "your-secret-here"

# 回调 Token（可选，用于 Webhook 验证）
token = "your-callback-token"

# 消息加密密钥（可选，Base64 编码）
encoding_aes_key = "your-aes-key-here"

# 欢迎消息（可选）
welcome_text = "你好！我是 AI 助手"

# 允许的用户列表（可选，空表示允许所有人）
allow_from = ["*"]
# 或者指定用户：
# allow_from = ["user1", "user2"]
```

**获取配置参数**:
1. 登录 [企业微信管理后台](https://work.weixin.qq.com/wework_admin/frame#/apps)
2. 创建自建应用，获取 AgentId、CorpId、Secret
3. 配置企业可信 IP（重要！）
4. 可选：配置回调 URL 接收消息

详细说明见 `crates/wecom/README.md`

## 同步记录

| 日期 | 上游版本 | 状态 | 备注 |
|------|---------|------|------|
| 2026-02-20 | v0.9.5 | ✅ | 初始 fork，添加 wecom 模块（Agent 模式完整实现） |
| 2026-02-20 | - | ✅ | Web UI 中文汉化完成（1600+ 词条） |

## 开发流程

### 日常开发
```bash
# 切换到开发分支
git checkout dev/my-extensions

# 编辑代码
code crates/wecom/src/channel.rs

# 测试
cargo test -p moltis-wecom

# 提交
git add crates/wecom/
git commit -m "feat(wecom): your changes"
git push origin dev/my-extensions
```

### 同步上游更新
```bash
# 切换到 main
git checkout main

# 拉取上游
git fetch upstream
git merge upstream/main

# 推送到你的 fork
git push origin main

# 回到开发分支并 rebase
git checkout dev/my-extensions
git rebase main

# 解决冲突（如果有）
# 通常只需要解决 Cargo.toml 的冲突

# 推送
git push origin dev/my-extensions --force-with-lease
```

## 模块化设计原则

1. ✅ 只依赖上游的 trait，不依赖具体实现
2. ✅ 使用 workspace 依赖
3. ✅ 通过配置文件扩展，而非硬编码
4. ✅ 独立测试
5. ✅ 最小化修改上游代码

## 2026-02-20 WeCom Gateway 接入（方案 B）

**完成内容**:
- ✅ 新增 `ChannelType::Wecom`，支持 gateway 识别
- ✅ gateway 接入 WeCom plugin（启动/状态/存储/出站路由）
- ✅ WeCom Webhook 路由接入（GET/POST + 免认证路径）
- ✅ 支持 `channels.wecom.*` 配置项、验证与模板示例
- ✅ 出站路由按渠道类型分流（Telegram/WeCom）

**改动文件**:
- `crates/channels/src/plugin.rs`
- `crates/wecom/Cargo.toml`
- `crates/wecom/src/api.rs`
- `crates/wecom/src/channel.rs`
- `crates/wecom/src/config.rs`
- `crates/wecom/src/http_handler.rs`
- `crates/config/src/schema.rs`
- `crates/config/src/validate.rs`
- `crates/config/src/template.rs`
- `crates/gateway/Cargo.toml`
- `crates/gateway/src/services.rs`
- `crates/gateway/src/channel.rs`
- `crates/gateway/src/server.rs`
- `crates/gateway/src/auth_middleware.rs`
- `crates/gateway/src/channel_events.rs`
- `crates/gateway/src/chat.rs`
- `MY_CHANGES.md`

## 2026-02-21 清理 WeCom 示例

**完成内容**:
- ✅ 删除 `crates/wecom/examples` 示例目录（避免误用旧接口）

**改动文件**:
- `crates/wecom/examples` (删除)
- `MY_CHANGES.md`

## 2026-02-21 WeCom 配置简化

**完成内容**:
- ✅ 支持 `[channels.wecom]` 单表配置（默认账号 `default`）
- ✅ 支持 `account_id` 字段自定义 webhook 路径

**改动文件**:
- `crates/config/src/schema.rs`
- `crates/config/src/template.rs`
- `crates/wecom/README.md`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 依赖整理与文档校正

**完成内容**:
- ✅ wecom 依赖改为 workspace 管理
- ✅ Webhook 时间戳改用 `time` crate，移除 `unwrap`
- ✅ README 示例更新为当前 `ReplyPayload` 结构
- ✅ 修复 rand 0.9 API 警告与 `Option<Secret<_>>` 解引用类型错误

**改动文件**:
- `Cargo.toml`
- `crates/wecom/Cargo.toml`
- `crates/wecom/src/channel.rs`
- `crates/wecom/src/webhook.rs`
- `crates/wecom/src/crypto.rs`
- `crates/wecom/src/http_handler.rs`
- `crates/wecom/README.md`
- `MY_CHANGES.md`

## 2026-02-21 Gateway 编译修复

**完成内容**:
- ✅ 修复 channel 事件类型的多余路径限定
- ✅ 修复 WeCom webhook handler 生命周期与事件 sink 类型转换
- ✅ 修复 channel 服务读取 store 的 async 分支错误

**改动文件**:
- `crates/gateway/src/channel_events.rs`
- `crates/gateway/src/server.rs`
- `crates/gateway/src/channel.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom Webhook CDATA 兼容

**完成内容**:
- ✅ 解析 XML 时支持 `<![CDATA[...]]>`（修复 Encrypt 缺失问题）
- ✅ 改用原始 XML 抽取 Encrypt，和 openwith 实现对齐

**改动文件**:
- `crates/wecom/src/webhook.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 配置摘要日志

**完成内容**:
- ✅ 启动时打印 token/AESKey 长度与指纹（不泄露明文）
- ✅ 解密失败时输出指纹辅助排查

**改动文件**:
- `crates/wecom/src/config.rs`
- `crates/wecom/src/channel.rs`
- `crates/wecom/src/http_handler.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 诊断日志与测试清理

**完成内容**:
- ✅ 删除 WeCom 启动摘要/解密诊断日志
- ✅ 移除 `crates/wecom/src` 内部测试代码

**改动文件**:
- `crates/wecom/src/channel.rs`
- `crates/wecom/src/config.rs`
- `crates/wecom/src/crypto.rs`
- `crates/wecom/src/http_handler.rs`
- `crates/wecom/src/lib.rs`
- `crates/wecom/src/webhook.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom PKCS7 Padding 对齐

**完成内容**:
- ✅ 按企业微信规范使用 32 字节块大小的 PKCS7 padding
- ✅ 解密/加密改为手动 padding，修复 UnpadError

**改动文件**:
- `crates/wecom/src/crypto.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 语音接收

**完成内容**:
- ✅ 支持接收语音消息（下载媒体并尝试转写）
- ✅ 未配置语音转写时返回提示

**改动文件**:
- `crates/wecom/src/api.rs`
- `crates/wecom/src/channel.rs`
- `crates/wecom/src/http_handler.rs`
- `crates/wecom/src/webhook.rs`
- `crates/wecom/README.md`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 语音回复修复

**完成内容**:
- ✅ 支持 data: URL 音频解码（TTS 输出）
- ✅ 新增 WeCom voice 消息发送接口
- ✅ 音频非 amr/speex 时回退为 file 消息

**改动文件**:
- `crates/wecom/src/api.rs`
- `crates/wecom/src/channel.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 语音回复转码

**完成内容**:
- ✅ OGG/MP3 等音频自动转码为 AMR（企业微信语音消息）
- ✅ ffmpeg 不可用时回退为 file 消息
- ✅ ffmpeg 转码错误日志补充（便于定位缺少 AMR 编码器）
- ✅ AMR 转码使用 libopencore_amrnb 编码器

**改动文件**:
- `crates/wecom/src/channel.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 语音输入转码

**完成内容**:
- ✅ AMR/Speex 语音先转 WAV 再送 STT，提高转写成功率

**改动文件**:
- `crates/wecom/src/channel.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 语音回复日志截断

**完成内容**:
- ✅ 截断 wecom media 回复错误日志，避免打印超长 base64

**改动文件**:
- `crates/gateway/src/chat.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 语音仅发送音频

**完成内容**:
- ✅ 语音回复默认只发送音频，失败才回退文本

**改动文件**:
- `crates/gateway/src/chat.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 禁用 speak 工具

**完成内容**:
- ✅ WeCom 语音会话禁用 speak 工具，避免 LLM 自行选择错误 TTS 提供商

**改动文件**:
- `crates/gateway/src/chat.rs`
- `MY_CHANGES.md`

## 2026-02-21 WeCom 语音回复提示约束

**完成内容**:
- ✅ WeCom 语音会话提示 LLM 仅回答最新消息，避免重复历史故障诊断

**改动文件**:
- `crates/gateway/src/chat.rs`
- `MY_CHANGES.md`

## 待办事项

### wecom 模块
- [x] 实现 Agent 模式（自建应用）
- [x] 发送文本消息（支持自动分块）
- [x] 发送图片消息
- [x] 发送文件消息
- [x] Access Token 自动管理
- [x] 用户权限控制
- [x] 消息加解密
- [x] 完整的单元测试
- [x] 详细的文档和示例
- [x] 实现 Webhook 接收消息
- [x] 支持语音消息
- [ ] 支持视频消息
- [ ] 支持卡片消息
- [ ] 添加集成测试

### 集成到 Gateway
- [x] 在 gateway 中注册 wecom plugin
- [ ] 添加 feature flag
- [ ] 更新文档

## 贡献回上游

如果某些功能对社区有价值，可以考虑贡献回上游：

1. 从 `dev/my-extensions` 创建功能分支
2. 清理代码，确保符合上游规范
3. 添加完整的测试和文档
4. 提交 PR 到 `moltis-org/moltis`

## 参考资料

- [Moltis 官方文档](https://docs.moltis.org)
- [企业微信 API 文档](https://developer.work.weixin.qq.com/document/)
- [Rust Async Book](https://rust-lang.github.io/async-book/)
