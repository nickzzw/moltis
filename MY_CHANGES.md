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

## 修改的上游文件

### 1. Cargo.toml
**修改位置**: 
- L28: 添加 `"crates/wecom"` 到 workspace members
- L183: 添加 `moltis-wecom = { path = "crates/wecom" }` 到 workspace dependencies

**原因**: 将 wecom 模块注册到 workspace

### 2. Cargo.lock
**修改**: 自动生成的依赖锁文件更新

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
