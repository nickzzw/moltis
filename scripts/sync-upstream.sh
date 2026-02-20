#!/bin/bash
# 同步上游 moltis 更新的脚本

set -e  # 遇到错误立即退出

echo "🔄 开始同步上游 moltis..."
echo ""

# 保存当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支: $CURRENT_BRANCH"
echo ""

# 检查是否有未提交的修改
if ! git diff-index --quiet HEAD --; then
    echo "❌ 错误: 有未提交的修改"
    echo "请先提交或暂存你的修改:"
    echo "  git add ."
    echo "  git commit -m 'your message'"
    echo "或者暂存修改:"
    echo "  git stash"
    exit 1
fi

# 切换到 main 分支
echo "📥 切换到 main 分支..."
git checkout main

# 拉取上游更新
echo "🌐 拉取上游更新..."
git fetch upstream

# 显示上游的新提交
echo ""
echo "📊 上游新提交:"
git log --oneline main..upstream/main | head -10
echo ""

# 询问是否继续
read -p "是否合并这些更新? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 取消同步"
    git checkout "$CURRENT_BRANCH"
    exit 0
fi

# 合并上游的 main
echo "🔀 合并上游更新..."
if git merge upstream/main --no-edit; then
    echo "✅ 合并成功"
else
    echo "❌ 合并失败，请手动解决冲突"
    echo "解决冲突后运行:"
    echo "  git add ."
    echo "  git commit"
    echo "  git checkout $CURRENT_BRANCH"
    echo "  git rebase main"
    exit 1
fi

# 推送到你的 fork
echo "📤 推送到你的 fork..."
git push origin main

echo "✅ main 分支同步完成"
echo ""

# 回到原来的分支
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔙 回到 $CURRENT_BRANCH 分支..."
    git checkout "$CURRENT_BRANCH"
    
    echo ""
    read -p "是否将 $CURRENT_BRANCH 分支 rebase 到最新的 main? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 Rebase $CURRENT_BRANCH 到 main..."
        if git rebase main; then
            echo "✅ Rebase 成功"
            echo ""
            echo "⚠️  需要强制推送到远程分支:"
            echo "  git push origin $CURRENT_BRANCH --force-with-lease"
            echo ""
            read -p "是否立即推送? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                git push origin "$CURRENT_BRANCH" --force-with-lease
                echo "✅ 推送成功"
            fi
        else
            echo "❌ Rebase 失败，有冲突需要解决"
            echo ""
            echo "解决冲突的步骤:"
            echo "1. 查看冲突文件: git status"
            echo "2. 编辑冲突文件，解决冲突标记"
            echo "3. 标记为已解决: git add <file>"
            echo "4. 继续 rebase: git rebase --continue"
            echo "5. 推送: git push origin $CURRENT_BRANCH --force-with-lease"
            echo ""
            echo "如果想放弃 rebase:"
            echo "  git rebase --abort"
            exit 1
        fi
    fi
fi

echo ""
echo "🎉 同步完成!"
echo ""
echo "📝 建议更新 MY_CHANGES.md 中的同步记录"
