# 上游同步指南

## 🎯 快速开始

### 方法 1：使用自动化脚本（推荐）

```bash
./scripts/sync-upstream.sh
```

脚本会自动：
1. 检查未提交的修改
2. 切换到 main 分支
3. 拉取上游更新
4. 显示新提交并询问是否合并
5. 合并并推送到你的 fork
6. 询问是否 rebase 开发分支

### 方法 2：手动操作

```bash
# 1. 切换到 main 分支
git checkout main

# 2. 拉取上游更新
git fetch upstream

# 3. 查看上游的新提交
git log --oneline main..upstream/main

# 4. 合并上游更新
git merge upstream/main

# 5. 推送到你的 fork
git push origin main

# 6. 回到开发分支
git checkout dev/my-extensions

# 7. Rebase 到最新的 main
git rebase main

# 8. 推送（需要强制推送）
git push origin dev/my-extensions --force-with-lease
```

---

## 📋 详细步骤说明

### 步骤 1：准备工作

```bash
# 确保没有未提交的修改
git status

# 如果有修改，先提交
git add .
git commit -m "feat: your changes"

# 或者暂存修改
git stash
```

### 步骤 2：同步 main 分支

```bash
# 切换到 main 分支
git checkout main

# 拉取上游更新
git fetch upstream

# 查看上游有哪些新提交
git log --oneline --graph main..upstream/main

# 查看具体改动
git diff main..upstream/main

# 合并上游更新
git merge upstream/main

# 推送到你的 fork
git push origin main
```

### 步骤 3：更新开发分支

```bash
# 切换回开发分支
git checkout dev/my-extensions

# Rebase 到最新的 main
git rebase main
```

### 步骤 4：解决冲突（如果有）

如果 rebase 时出现冲突：

```bash
# 1. 查看冲突文件
git status

# 2. 编辑冲突文件
# 找到类似这样的标记：
# <<<<<<< HEAD
# 你的修改
# =======
# 上游的修改
# >>>>>>> upstream/main

# 3. 解决冲突后，标记为已解决
git add <冲突文件>

# 4. 继续 rebase
git rebase --continue

# 如果想放弃 rebase
git rebase --abort
```

### 步骤 5：推送更新

```bash
# 推送到你的 fork（需要强制推送，因为 rebase 改写了历史）
git push origin dev/my-extensions --force-with-lease
```

---

## 🔍 常见冲突场景

### 场景 1：Cargo.toml 冲突

**冲突内容**：
```toml
<<<<<<< HEAD
  "crates/voice",
  "crates/wecom",         # 你的修改
=======
  "crates/voice",
  "crates/new-feature",   # 上游新增
>>>>>>> upstream/main
]
```

**解决方法**：
```toml
  "crates/voice",
  "crates/new-feature",   # 保留上游的
  "crates/wecom",         # 保留你的
]
```

### 场景 2：Cargo.lock 冲突

**解决方法**：
```bash
# 删除 Cargo.lock
rm Cargo.lock

# 重新生成
cargo build

# 添加并继续
git add Cargo.lock
git rebase --continue
```

### 场景 3：版本号冲突

**冲突内容**：
```toml
<<<<<<< HEAD
version = "0.9.5"
=======
version = "0.10.0"
>>>>>>> upstream/main
```

**解决方法**：
```toml
version = "0.10.0"  # 使用上游的版本号
```

---

## 🛠️ 实用命令

### 查看上游更新

```bash
# 查看上游有多少新提交
git rev-list --count main..upstream/main

# 查看上游的新提交（简洁）
git log --oneline main..upstream/main

# 查看上游的新提交（详细）
git log --stat main..upstream/main

# 查看具体改动
git diff main..upstream/main

# 查看某个文件的改动
git diff main..upstream/main -- Cargo.toml
```

### 检查冲突

```bash
# 查看哪些文件会冲突（不实际合并）
git merge --no-commit --no-ff upstream/main
git merge --abort

# 查看你修改了哪些上游文件
git diff upstream/main --name-only
```

### 撤销操作

```bash
# 撤销 merge（还没推送）
git reset --hard HEAD~1

# 撤销 rebase
git rebase --abort

# 恢复到某个提交
git reset --hard <commit-hash>

# 恢复暂存的修改
git stash pop
```

---

## 📅 同步频率建议

### 推荐频率

| 场景 | 频率 | 原因 |
|------|------|------|
| 开发活跃期 | 每周 | 及时获得 bug 修复 |
| 稳定期 | 每月 | 减少冲突风险 |
| 新版本发布 | 立即 | 获得新特性 |
| 重大更新 | 立即 | 避免技术债务 |

### 同步前检查

```bash
# 查看上游最新 release
git ls-remote --tags upstream | tail -5

# 查看上游的 CHANGELOG
curl https://raw.githubusercontent.com/moltis-org/moltis/main/CHANGELOG.md | head -50
```

---

## 🎯 最佳实践

### 1. 同步前备份

```bash
# 创建备份分支
git branch backup-$(date +%Y%m%d) dev/my-extensions
```

### 2. 小步快跑

```bash
# 不要积累太多提交才同步
# 建议每 10-20 个上游提交就同步一次
```

### 3. 测试后再推送

```bash
# 同步后先测试
cargo test --all-features
cargo build --release

# 确认没问题再推送
git push origin dev/my-extensions --force-with-lease
```

### 4. 记录同步

每次同步后更新 `MY_CHANGES.md`：

```markdown
## 同步记录

| 日期 | 上游版本 | 状态 | 备注 |
|------|---------|------|------|
| 2026-02-20 | v0.9.5 | ✅ | 初始 fork |
| 2026-03-01 | v0.10.0 | ✅ | 无冲突 |
| 2026-03-15 | v0.10.5 | ⚠️ | Cargo.toml 冲突已解决 |
```

---

## 🚨 紧急情况处理

### 情况 1：Rebase 搞乱了

```bash
# 查看 reflog
git reflog

# 找到 rebase 前的提交
# 假设是 abc1234

# 恢复到那个状态
git reset --hard abc1234
```

### 情况 2：推送被拒绝

```bash
# 错误信息: ! [rejected] ... (non-fast-forward)

# 原因：远程分支有你本地没有的提交

# 解决方法 1：先拉取再推送
git pull origin dev/my-extensions --rebase
git push origin dev/my-extensions

# 解决方法 2：强制推送（确认没问题后）
git push origin dev/my-extensions --force-with-lease
```

### 情况 3：冲突太多，想重新开始

```bash
# 1. 备份当前工作
git branch backup-messy dev/my-extensions

# 2. 重置到 main
git checkout dev/my-extensions
git reset --hard main

# 3. 手动应用你的修改
# 从 backup-messy 分支复制 crates/wecom/ 目录
# 手动编辑 Cargo.toml

# 4. 提交
git add .
git commit -m "feat: re-apply wecom module after sync"

# 5. 强制推送
git push origin dev/my-extensions --force
```

---

## 📞 获取帮助

如果遇到问题：

1. 查看 Git 状态：`git status`
2. 查看 Git 日志：`git log --oneline --graph -10`
3. 查看 reflog：`git reflog`
4. 搜索错误信息
5. 在 moltis Discord 社区求助

---

## ✅ 同步检查清单

- [ ] 提交或暂存所有本地修改
- [ ] 切换到 main 分支
- [ ] 拉取上游更新
- [ ] 查看上游的新提交和改动
- [ ] 合并上游更新到 main
- [ ] 推送 main 到你的 fork
- [ ] 切换回开发分支
- [ ] Rebase 开发分支到 main
- [ ] 解决冲突（如果有）
- [ ] 运行测试确认没问题
- [ ] 推送开发分支（force-with-lease）
- [ ] 更新 MY_CHANGES.md 的同步记录
