# 我的 Moltis Fork 修改清单

## 项目信息
- Fork 源: https://github.com/moltis-org/moltis
- 我的 Fork: https://github.com/nickzzw/moltis
- 开发分支: `dev/my-extensions`

## 新增模块

### 1. moltis-wecom (企业微信集成)
**路径**: `crates/wecom/`

**功能**:
- 实现 `ChannelPlugin` trait
- 支持企业微信文本消息发送
- 账号生命周期管理 (start/stop)
- 健康检查探测
- 完整的单元测试

**文件**:
- `crates/wecom/Cargo.toml` - 模块配置
- `crates/wecom/README.md` - 模块文档
- `crates/wecom/src/lib.rs` - 模块入口
- `crates/wecom/src/channel.rs` - Channel 插件实现
- `crates/wecom/src/config.rs` - 配置结构

**测试**:
```bash
cargo test -p moltis-wecom
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

在 `moltis.toml` 中添加：

```toml
[channels.wecom]
corp_id = "ww1234567890abcdef"
agent_id = "1000002"
secret = "your-secret"
callback_url = "https://your-domain.com/wecom/callback"
```

## 同步记录

| 日期 | 上游版本 | 状态 | 备注 |
|------|---------|------|------|
| 2026-02-20 | v0.9.5 | ✅ | 初始 fork，添加 wecom 模块 |

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

## 待办事项

### wecom 模块
- [ ] 实现消息接收 (webhook)
- [ ] 支持发送图片
- [ ] 支持发送文件
- [ ] 支持发送卡片消息
- [ ] 添加更多测试用例
- [ ] 添加集成测试

### 集成到 Gateway
- [ ] 在 gateway 中注册 wecom plugin
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
