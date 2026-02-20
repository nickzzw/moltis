# 🆘 冲突解决助手

当你运行 `./scripts/sync-upstream.sh` 遇到冲突时，使用这个文档。

---

## 🎯 快速诊断

### 第 1 步：查看冲突文件

```bash
git status
```

你会看到类似这样的输出：
```
Unmerged paths:
  both modified:   Cargo.toml
  both modified:   Cargo.lock
```

### 第 2 步：根据文件类型选择解决方案

| 冲突文件 | 跳转到 |
|---------|--------|
| `Cargo.toml` | [👉 Cargo.toml 冲突](#cargotml-冲突) |
| `Cargo.lock` | [👉 Cargo.lock 冲突](#cargolock-冲突) |
| 其他文件 | [👉 意外冲突](#意外冲突) |

---

## 📦 Cargo.toml 冲突

### 识别冲突

打开 `Cargo.toml`，找到类似这样的标记：

```toml
<<<<<<< HEAD
  "crates/voice",
  "crates/wecom",         # 你的修改
=======
  "crates/voice",
  "crates/new-feature",   # 上游的修改
>>>>>>> upstream/main
]
```

### 解决步骤

#### 方法 1：使用 VS Code（推荐）

1. 在 VS Code 中打开 `Cargo.toml`
2. 找到冲突区域（会高亮显示）
3. 点击 **"Accept Both Changes"**
4. 手动调整顺序：
   ```toml
   "crates/voice",
   "crates/new-feature",  # 上游的放前面
   "crates/wecom",        # 你的放后面
   ]
   ```
5. 保存文件

#### 方法 2：手动编辑

1. 打开 `Cargo.toml`
2. 找到冲突标记（`<<<<<<<`, `=======`, `>>>>>>>`）
3. 编辑成：
   ```toml
   "crates/voice",
   "crates/new-feature",  # 保留上游的
   "crates/wecom",        # 保留你的
   ]
   ```
4. **删除所有冲突标记**
5. 保存文件

### 标记为已解决

```bash
git add Cargo.toml
```

---

## 🔒 Cargo.lock 冲突

### 最简单的解决方法

```bash
# 1. 删除冲突的 Cargo.lock
rm Cargo.lock

# 2. 重新生成
cargo build

# 3. 标记为已解决
git add Cargo.lock
```

**原理**: Cargo.lock 是自动生成的，删除重新生成最安全。

---

## ⚠️ 意外冲突

如果冲突的文件不是 `Cargo.toml` 或 `Cargo.lock`，说明：
- 你可能不小心修改了其他上游文件
- 或者上游修改了你的模块（不太可能）

### 检查步骤

```bash
# 查看你修改了哪些文件
git diff main --name-only

# 应该只看到：
# Cargo.toml
# Cargo.lock
# MY_CHANGES.md
# SYNC_GUIDE.md
# CONFLICT_HELPER.md
# scripts/sync-upstream.sh
# crates/wecom/...
```

### 如果有意外文件

```bash
# 查看具体改动
git diff main -- <意外文件>

# 如果是误修改，恢复它
git checkout main -- <意外文件>
```

---

## 🔄 继续 Rebase

解决所有冲突后：

```bash
# 1. 确认所有冲突都已解决
git status
# 应该看到: All conflicts fixed

# 2. 继续 rebase
git rebase --continue

# 3. 如果还有冲突，重复上述步骤
# 如果没有冲突，rebase 完成
```

---

## 📤 推送更新

```bash
# 推送到你的 fork（需要强制推送）
git push origin dev/my-extensions --force-with-lease
```

**为什么需要 `--force-with-lease`?**
- Rebase 改写了提交历史
- 但 `--force-with-lease` 比 `--force` 更安全
- 它会检查远程分支是否有其他人的提交

---

## 🚨 紧急情况：放弃 Rebase

如果冲突太复杂，想重新开始：

```bash
# 放弃当前 rebase
git rebase --abort

# 回到 rebase 前的状态
```

然后你可以：
1. 重新运行 `./scripts/sync-upstream.sh`
2. 或者寻求帮助

---

## 🎯 完整示例：解决 Cargo.toml 冲突

```bash
# 1. 同步时遇到冲突
./scripts/sync-upstream.sh
# 输出: ❌ Rebase 失败，有冲突需要解决

# 2. 查看冲突文件
git status
# 输出: both modified: Cargo.toml

# 3. 打开 Cargo.toml，看到：
<<<<<<< HEAD
  "crates/wecom",
=======
  "crates/new-feature",
>>>>>>> upstream/main

# 4. 编辑成：
  "crates/new-feature",  # 上游的
  "crates/wecom",        # 你的

# 5. 保存并标记为已解决
git add Cargo.toml

# 6. 如果有 Cargo.lock 冲突
rm Cargo.lock
cargo build
git add Cargo.lock

# 7. 继续 rebase
git rebase --continue

# 8. 推送
git push origin dev/my-extensions --force-with-lease

# 9. 完成！🎉
```

---

## 📞 需要帮助？

### 自助检查清单

- [ ] 我运行了 `git status` 查看冲突文件
- [ ] 我打开了冲突文件，看到了 `<<<<<<<` 标记
- [ ] 我尝试了上面的解决方法
- [ ] 我删除了所有冲突标记
- [ ] 我运行了 `git add <file>` 标记为已解决
- [ ] 我运行了 `git rebase --continue`

### 如果还是解决不了

1. **保存当前状态**
   ```bash
   git rebase --abort
   git branch backup-conflict-$(date +%Y%m%d)
   ```

2. **收集信息**
   ```bash
   git status > conflict-status.txt
   git diff > conflict-diff.txt
   ```

3. **寻求帮助**
   - 在 moltis Discord 社区发帖
   - 或者联系我（AI 助手）

---

## 💡 预防冲突的技巧

### 1. 频繁同步
```bash
# 每周运行一次
./scripts/sync-upstream.sh
```

### 2. 保持修改最小化
- ✅ 只修改必要的文件
- ✅ 在数组末尾添加
- ❌ 不要修改上游文件的中间部分

### 3. 同步前备份
```bash
git branch backup-$(date +%Y%m%d)
```

---

## ✅ 冲突解决成功的标志

运行这些命令检查：

```bash
# 1. 没有冲突
git status
# 应该看到: On branch dev/my-extensions, nothing to commit

# 2. 测试通过
cargo test -p moltis-wecom
# 应该看到: test result: ok

# 3. 构建成功
cargo build --all-features
# 应该看到: Finished

# 4. 推送成功
git push origin dev/my-extensions --force-with-lease
# 应该看到: To https://github.com/...
```

如果以上都通过，恭喜你！冲突解决成功！🎉
