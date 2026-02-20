/**
 * Moltis 中文汉化模块
 * 
 * 这是一个独立的汉化层，不修改原有代码结构
 * 适合 fork 项目，方便同步上游更新
 */

// 中文翻译字典
export const zhTranslations = {
  // ===== 按钮和操作文本 =====
  'Voice it': '语音播报',
  'Retry voice': '重试语音',
  'Voice generation failed.': '语音生成失败。',
  'Voice audio generated but could not be rendered.': '语音已生成但无法播放。',
  'WebSocket disconnected': 'WebSocket 已断开',
  'Add Provider': '添加提供商',
  'Add Channel': '添加频道',
  'Manage Projects': '管理项目',
  'Path copied': '路径已复制',
  'View source on GitHub': '在 GitHub 上查看源码',
  'Hooks reloaded': '钩子已重新加载',
  'Reload failed': '重新加载失败',
  'PWA installed': 'PWA 已安装',
  'Stop container': '停止容器',
  'Delete container': '删除容器',
  'Stop': '停止',
  'Delete': '删除',
  'Clean All': '全部清理',
  'Cleaning…': '清理中…',
  'Delete image': '删除镜像',
  'Prune all': '清理全部',
  'Pruning…': '清理中…',
  'No results': '无结果',
  'Add to Home Screen': '添加到主屏幕',
  'Install App': '安装应用',
  'Sandbox image': '沙箱镜像',
  'Add LLM': '添加 LLM',
  'Loading...': '加载中...',
  'Local': '本地',
  'API Key': 'API 密钥',
  'OpenAI Compatible': 'OpenAI 兼容',
  'Any Endpoint': '任意端点',
  'Endpoint URL': '端点 URL',
  'Failed to add provider.': '添加提供商失败。',
  'No models discovered. Please specify a model ID.': '未发现模型。请指定模型 ID。',
  'Validation failed.': '验证失败。',
  
  // ===== 表单标签 =====
  'Label': '标签',
  'Project name': '项目名称',
  'Directory': '目录',
  '/path/to/project': '/项目/路径',
  'System prompt (optional)': '系统提示（可选）',
  'Extra instructions for the LLM when working on this project...': '在此项目上工作时给 LLM 的额外指令...',
  'Setup command': '设置命令',
  'e.g. pnpm install': '例如：pnpm install',
  'Teardown command': '清理命令',
  'e.g. docker compose down': '例如：docker compose down',
  'Branch prefix': '分支前缀',
  'default: moltis': '默认：moltis',
  'Sandbox image': '沙箱镜像',
  'Edit project': '编辑项目',
  'Remove project': '移除项目',
  'edit': '编辑',
  'Clear all repositories from Moltis? This only removes them from the list and does not delete files on disk.': '从 Moltis 清除所有仓库？这只会从列表中移除它们，不会删除磁盘上的文件。',
  'Clear all': '全部清空',
  'Clearing…': '清空中…',
  'Clear All': '全部清空',
  'Remove all repository entries from Moltis without deleting files on disk': '从 Moltis 中移除所有仓库条目，但不删除磁盘上的文件',
  
  // ===== 日志和调试 =====
  'Clear': '清空',
  'Loading context…': '加载上下文…',
  'Failed to load context': '加载上下文失败',
  'Building full context…': '构建完整上下文…',
  'Failed to build context': '构建上下文失败',
  'Copy': '复制',
  'Copied!': '已复制！',
  'Download': '下载',
  'LLM output': 'LLM 输出',
  'MCP': 'MCP',
  'MCP off': 'MCP 关闭',
  'MCP tools enabled — click to disable for this session': 'MCP 工具已启用 — 点击以在此会话中禁用',
  'MCP tools disabled — click to enable for this session': 'MCP 工具已禁用 — 点击以在此会话中启用',
  'Queued': '已排队',
  'Cancel all queued': '取消所有排队',
  
  // ===== 终端 =====
  'tmux unavailable': 'tmux 不可用',
  'No tmux windows': '无 tmux 窗口',
  'Host shell unavailable': '主机 shell 不可用',
  'Unable to open host shell.': '无法打开主机 shell。',
  'First connection tip: run the install command once to enable persistent tmux sessions.': '首次连接提示：运行安装命令一次以启用持久化 tmux 会话。',
  'Interactive host shell (ephemeral). Install tmux for persistence': '交互式主机 shell（临时）。安装 tmux 以持久化',
  'Interactive host shell (ephemeral). Install tmux to persist sessions across reconnects.': '交互式主机 shell（临时）。安装 tmux 以在重新连接时保持会话。',
  'Loading… this can take a few seconds.': '加载中… 这可能需要几秒钟。',
  'Checking system requirements…': '检查系统要求…',
  
  // ===== 提示和说明 =====
  'unknown error': '未知错误',
  'Failed': '失败',
  'Saved': '已保存',
  'Failed to save': '保存失败',
  'success': '成功',
  'error': '错误',
  // ===== 通用词汇 =====
  'Loading...': '加载中...',
  'Loading': '加载中',
  'Save': '保存',
  'Cancel': '取消',
  'Delete': '删除',
  'Edit': '编辑',
  'Close': '关闭',
  'Confirm': '确认',
  'Back': '返回',
  'Next': '下一步',
  'Previous': '上一步',
  'Search': '搜索',
  'Filter': '筛选',
  'Clear': '清空',
  'Refresh': '刷新',
  'Copy': '复制',
  'Copied': '已复制',
  'Enable': '启用',
  'Disable': '禁用',
  'Enabled': '已启用',
  'Disabled': '已禁用',
  'free': '空闲',
  'tokens': '令牌',
  'tokens:': '令牌：',
  'Context left before auto-compact:': '自动压缩前剩余上下文：',
  '98%': '98%',
  'Apply': '应用',
  'Reset': '重置',
  'Submit': '提交',
  'Update': '更新',
  'Create': '创建',
  'Add': '添加',
  'Remove': '移除',
  'Import': '导入',
  'Export': '导出',
  'Upload': '上传',
  'Download': '下载',
  'Browse': '浏览',
  'Select': '选择',
  'Deselect': '取消选择',
  'Select all': '全选',
  'Deselect all': '取消全选',
  'Show': '显示',
  'Hide': '隐藏',
  'Expand': '展开',
  'Collapse': '折叠',
  'More': '更多',
  'Less': '更少',
  'Details': '详情',
  'Options': '选项',
  'Advanced': '高级',
  'Basic': '基础',
  'Custom': '自定义',
  'Default': '默认',
  'None': '无',
  'All': '全部',
  'Any': '任意',
  'Yes': '是',
  'No': '否',
  'OK': '确定',
  'Done': '完成',
  'Finish': '完成',
  'Continue': '继续',
  'Skip': '跳过',
  'Retry': '重试',
  'Undo': '撤销',
  'Redo': '重做',
  'Preview': '预览',
  'View': '查看',
  'Open': '打开',
  'New': '新建',
  'Rename': '重命名',
  'Duplicate': '复制',
  'Move': '移动',
  'Sort': '排序',
  'Group': '分组',
  'Ungroup': '取消分组',
  'Status': '状态',
  
  // ===== 头部导航 =====
  'Settings': '设置',
  'Report issue': '报告问题',
  'Report an issue': '报告问题',
  'Sign out': '退出登录',
  'disconnected': '已断开',
  'connected': '已连接',
  'connecting': '连接中',
  'reconnecting': '重新连接中',
  'disconnected — reconnecting...': '已断开 — 重新连接中...',
  'Menu': '菜单',
  'Open menu': '打开菜单',
  'Running on:': '运行分支：',
  'An update is available': '有可用更新',
  'View release': '查看版本',
  'Dismiss': '忽略',
  
  // ===== 会话管理 =====
  'Sessions': '会话',
  'Search sessions…': '搜索会话…',
  'New session': '新建会话',
  'All sessions': '所有会话',
  'Clear all sessions': '清空所有会话',
  'Toggle sessions': '切换会话面板',
  'No sessions found': '未找到会话',
  'Session': '会话',
  'Archive': '归档',
  'Unarchive': '取消归档',
  'Archived': '已归档',
  'Delete session': '删除会话',
  'Rename session': '重命名会话',
  'Back to Chats': '返回聊天',
  'main': '主会话',
  
  // ===== 聊天界面 =====
  'Welcome': '欢迎',
  'How can I help?': '我能帮你什么？',
  "I'm": '我是',
  'Type a message': '输入消息',
  'Type a message...': '输入消息...',
  'Send': '发送',
  'Stop': '停止',
  'Thinking': '思考中',
  'running…': '运行中…',
  'Running': '运行中',
  'Done': '完成',
  'Failed': '失败',
  'Error': '错误',
  'Reasoning': '推理中',
  'disabled': '已禁用',
  'unavailable': '不可用',
  'Context': '上下文',
  'Context left before auto-compact': '自动压缩前剩余上下文',
  'Execute': '执行',
  'host': '主机',
  'Fork': '分支',
  'Share': '分享',
  'Main': '主会话',
  'main': '主会话',
  
  // ===== 欢迎卡片 =====
  'Chat with multiple LLM providers and models': '与多个 LLM 提供商和模型聊天',
  'Run commands in a sandboxed environment': '在沙箱环境中运行命令',
  'Browse the web and fetch content': '浏览网页并获取内容',
  'Remember context across sessions with long-term memory': '通过长期记忆跨会话记住上下文',
  'Extend with MCP tools, skills, and plugins': '使用 MCP 工具、技能和插件扩展',
  'Type a message or use': '输入消息或使用',
  'for commands': '执行命令',
  
  // ===== 无提供商卡片 =====
  'No LLMs Connected': '未连接 LLM',
  'You have not connected any LLM providers yet. Add one to start chatting.': '你还没有连接任何 LLM 提供商。添加一个以开始聊天。',
  'Go to LLMs': '前往 LLM 设置',
  
  // ===== 命令执行 =====
  'Command requires approval:': '命令需要批准：',
  'Allow': '允许',
  'Deny': '拒绝',
  'Approved': '已批准',
  'Denied': '已拒绝',
  'Timeout': '超时',
  
  // ===== 主题切换 =====
  'Light theme': '浅色主题',
  'Dark theme': '深色主题',
  'System theme': '跟随系统',
  
  // ===== 认证 =====
  'Authentication is disabled. Anyone with network access can control moltis and your computer.': '认证已禁用。任何能访问网络的人都可以控制 moltis 和你的计算机。',
  'Set up authentication': '设置认证',
  'Password': '密码',
  'Passkey': '通行密钥',
  'Login': '登录',
  'Logout': '退出',
  
  // ===== 更新提示 =====
  'An update is available': '有可用更新',
  'View release': '查看版本',
  'Dismiss': '忽略',
  
  // ===== 设置页面 =====
  'General': '常规',
  'Identity': '身份',
  'Environment': '环境',
  'Memory': '记忆',
  'Notifications': '通知',
  'Crons': '定时任务',
  'Heartbeat': '心跳',
  'Security': '安全',
  'Tailscale': 'Tailscale',
  'Integrations': '集成',
  'Channels': '频道',
  'Hooks': '钩子',
  'LLMs': 'LLM 提供商',
  'MCP': 'MCP',
  'Skills': '技能',
  'Voice': '语音',
  'Systems': '系统',
  'Terminal': '终端',
  'Sandboxes': '沙箱',
  'Monitoring': '监控',
  'Logs': '日志',
  'Configuration': '配置',
  'Providers': '提供商',
  'Models': '模型',
  'Projects': '项目',
  'Images': '镜像',
  'Metrics': '指标',
  
  // ===== 身份设置 =====
  'Agent': '助手',
  'Agent name': '助手名称',
  'Your name': '你的名称',
  'Name *': '名称 *',
  'Your name *': '你的名称 *',
  'Emoji': '表情符号',
  'Pick emoji': '选择表情',
  'Pick': '选择',
  'Creature': '生物',
  'Vibe': '氛围',
  'Soul': '灵魂',
  'User': '用户',
  'Timezone': '时区',
  'Location': '位置',
  'Save changes': '保存更改',
  'Saving...': '保存中...',
  'Saved': '已保存',
  'Save': '保存',
  'Reset to default': '重置为默认',
  // ===== 身份设置（包含 code 标签的版本） =====
  'Saved to IDENTITY.md in your workspace root.': '保存到工作区根目录的 IDENTITY.md。',
  'Saved to USER.md in your workspace root.': '保存到工作区根目录的 USER.md。',
  'Personality and tone injected into every conversation. Saved to SOUL.md in your workspace root. Leave empty for the default.': '注入到每次对话的个性和语气。保存到工作区根目录的 SOUL.md。留空使用默认值。',
  // 不包含 code 标签的纯文本版本
  'Saved to  in your workspace root.': '保存到工作区根目录的 。',
  'Personality and tone injected into every conversation. Saved to  in your workspace root. Leave empty for the default.': '注入到每次对话的个性和语气。保存到工作区根目录的 。留空使用默认值。',
  'e.g. dog': '例如：狗',
  'e.g. chill': '例如：轻松',
  '例如：狗': '例如：狗',
  '例如：轻松': '例如：轻松',
  
  // ===== 环境变量 =====
  'Environment Variables': '环境变量',
  'Add variable': '添加变量',
  'Variable name': '变量名',
  'Variable value': '变量值',
  'Add': '添加',
  'Remove': '移除',
  'No environment variables configured': '未配置环境变量',
  
  // ===== 记忆设置 =====
  'Memory backend': '记忆后端',
  'Embedding provider': '嵌入提供商',
  'Disable RAG': '禁用 RAG',
  'Enable RAG': '启用 RAG',
  'Base URL': '基础 URL',
  'Model name': '模型名称',
  'API key': 'API 密钥',
  'Citations': '引用',
  'Auto': '自动',
  'On': '开启',
  'Off': '关闭',
  'LLM reranking': 'LLM 重排序',
  'LLM Reranking': 'LLM 重排序',
  'Session export': '会话导出',
  'Configure how the agent stores and retrieves long-term memory. Memory enables the agent to recall past conversations, notes, and context across sessions.': '配置助手如何存储和检索长期记忆。记忆使助手能够跨会话回忆过去的对话、笔记和上下文。',
  'Backend': '后端',
  'Feature': '特性',
  'Built-in': '内置',
  'QMD': 'QMD',
  'Search type': '搜索类型',
  'FTSS + vector': 'FTSS + 向量',
  'FTS5 + vector': 'FTS5 + 向量',
  'BM25 + vector + LLM': 'BM25 + 向量 + LLM',
  'External dependency': '外部依赖',
  'Node.js/Bun': 'Node.js/Bun',
  'Embedding cache': '嵌入缓存',
  'OpenAI batch API': 'OpenAI 批量 API',
  '(50% cheaper)': '（便宜 50%）',
  'Provider fallback': '提供商回退',
  'Best for': '最适合',
  'Most users': '大多数用户',
  'Power users': '高级用户',
  'Built-in (Recommended)': '内置（推荐）',
  'Include source file and line number with search results to help track where information comes from.': '在搜索结果中包含源文件和行号，以帮助追踪信息来源。',
  'Auto (multi-file only)': '自动（仅多文件）',
  'Files:': '文件：',
  'Chunks:': '块：',
  'Model:': '模型：',
  'DB Size:': '数据库大小：',
  'Memory': '记忆',
  'Loading...': '加载中...',
  'Status': '状态',
  
  // ===== 通知设置 =====
  'Push notifications': '推送通知',
  'Enable notifications': '启用通知',
  'Disable notifications': '禁用通知',
  'Test notification': '测试通知',
  'Notification sent': '通知已发送',
  'Notifications enabled': '通知已启用',
  'Notifications disabled': '通知已禁用',
  'Notifications': '通知',
  'Push': '推送',
  'Desktop': '桌面',
  'Mobile': '移动',
  'Email': '邮件',
  'Sound': '声音',
  'Vibration': '振动',
  
  // ===== 定时任务（详细） =====
  'Cron jobs': '定时任务',
  'Cron Jobs': '定时任务',
  'Create cron': '创建定时任务',
  'Cron expression': '定时表达式',
  'Schedule': '计划',
  'Interval': '间隔',
  'Last run': '上次运行',
  'Next run': '下次运行',
  'No cron jobs': '无定时任务',
  'No cron jobs configured.': '未配置定时任务。',
  'Crons': '定时任务',
  'Job': '任务',
  'Expression': '表达式',
  'Action': '操作',
  'Run': '运行',
  'Pause': '暂停',
  'Resume': '恢复',
  'History': '历史',
  '+ Add Job': '+ 添加任务',
  'Add Job': '添加任务',
  'Running': '运行中',
  'Running…': '运行中…',
  'Stopped': '已停止',
  'jobs': '任务',
  'job': '任务',
  'enabled': '已启用',
  '0 jobs': '0 个任务',
  '0 enabled': '0 个已启用',
  'Run Now': '立即运行',
  'Heartbeat is disabled. Enable it to allow manual runs.': '心跳已禁用。启用它以允许手动运行。',
  'Loading…': '加载中…',
  
  // ===== 心跳设置（详细） =====
  'Heartbeat': '心跳',
  'Run Now': '立即运行',
  'Periodic AI check-in that monitors your environment and reports status.': '定期 AI 检查，监控你的环境并报告状态。',
  'Heartbeat inactive': '心跳未激活',
  'Heartbeat is inactive because no prompt is configured. Add a custom prompt or write actionable content in HEARTBEAT.md.': '心跳未激活，因为未配置提示。添加自定义提示或在 HEARTBEAT.md 中编写可操作内容。',
  'Prompt': '提示',
  'Custom Prompt (optional)': '自定义提示（可选）',
  'Leave blank to use default heartbeat prompt': '留空以使用默认心跳提示',
  'Leave this empty to use HEARTBEAT.md in your workspace root. If that file exists but is empty/comments-only, heartbeat LLM runs are skipped to save tokens.': '留空以使用工作区根目录中的 HEARTBEAT.md。如果该文件存在但为空/仅注释，则跳过心跳 LLM 运行以节省令牌。',
  'Effective prompt source': '有效提示来源',
  'Effective prompt source:': '有效提示来源：',
  'none (heartbeat inactive)': '无（心跳未激活）',
  'Max Response Characters': '最大响应字符数',
  'Active Hours': '活动时间',
  'Only run heartbeat during these hours.': '仅在这些时间运行心跳。',
  'Start': '开始',
  'End': '结束',
  'Schedule': '计划',
  'Every': '每',
  'Model': '模型',
  'Sandbox': '沙箱',
  'Image': '镜像',
  
  // ===== 通用分组标签 =====
  'GENERAL': '常规',
  'SECURITY': '安全',
  'INTEGRATIONS': '集成',
  'SYSTEMS': '系统',
  
  // ===== 返回按钮 =====
  'Back to Chats': '返回聊天',
  
  // ===== 身份设置（详细） =====
  'Welcome! Set up your agent\'s identity to get started.': '欢迎！设置你的助手身份以开始使用。',
  'favicon updates requires reload and may be cached for minutes': 'favicon 更新需要重新加载，可能会缓存几分钟',
  'requires reload': '需要重新加载',
  'Reset to default': '重置为默认',
  'Saving…': '保存中…',
  
  // ===== 环境变量（详细） =====
  'Environment Variables': '环境变量',
  'Environment variables are injected into the sandbox and available to all commands.': '环境变量被注入到沙箱中，可供所有命令使用。',
  'Environment variables are injected into sandbox command execution. Values are write-only and never displayed.': '环境变量被注入到沙箱命令执行中。值为只写，永不显示。',
  'Loading…': '加载中…',
  'No environment variables set.': '未设置环境变量。',
  'Add new variable': '添加新变量',
  'Add Variable': '添加变量',
  'Variable name (e.g. API_KEY)': '变量名（例如：API_KEY）',
  'Variable value': '变量值',
  'KEY_NAME': '变量名',
  'Value': '值',
  'Update': '更新',
  'New value': '新值',
  
  // ===== 安全设置（详细） =====
  'Authentication is disabled': '认证已禁用',
  'Anyone with network access can control moltis and your computer. Set a password or passkey to secure access.': '任何能访问网络的人都可以控制 moltis 和你的计算机。设置密码或通行密钥以保护访问。',
  'Note:': '注意：',
  'Localhost bypass is active. Until you add a password or passkey, this browser has full access and Sign out has no effect.': 'Localhost 绕过已激活。在你添加密码或通行密钥之前，此浏览器具有完全访问权限，退出登录无效。',
  'Localhost bypass is active. Until you add a password or passkey, this browser has full access and Sign out has no effect. Add credentials to require login on localhost and before exposing Moltis to your network.': 'Localhost 绕过已激活。在你添加密码或通行密钥之前，此浏览器具有完全访问权限，退出登录无效。添加凭据以要求在 localhost 上登录，并在将 Moltis 暴露到网络之前进行登录。',
  'Password': '密码',
  'Current password (leave blank if none)': '当前密码（如果没有则留空）',
  'New password': '新密码',
  'Confirm new password': '确认新密码',
  'Confirm password': '确认密码',
  'Changing…': '更改中…',
  'Setting…': '设置中…',
  'Change password': '更改密码',
  'Set password': '设置密码',
  'Set Password': '设置密码',
  'Passkeys': '通行密钥',
  'Passkeys will work when visiting': '通行密钥在访问时有效',
  'Passkeys will work when visiting:': '通行密钥在访问时有效：',
  'Register new passkey': '注册新通行密钥',
  'Registering…': '注册中…',
  'Register passkey': '注册通行密钥',
  'No passkeys registered.': '未注册通行密钥。',
  'Rename': '重命名',
  'Remove': '移除',
  'Removing…': '移除中…',
  'API Keys': 'API 密钥',
  'API 密钥': 'API 密钥',
  'API keys authenticate external tools and scripts connecting to moltis over the WebSocket protocol. Pass the key as the api_key field in the auth object of the connect handshake.': 'API 密钥用于验证通过 WebSocket 协议连接到 moltis 的外部工具和脚本。在连接握手的 auth 对象中将密钥作为 api_key 字段传递。',
  'No API keys.': '无 API 密钥。',
  'No API keys created.': '未创建 API 密钥。',
  'Create new API key': '创建新 API 密钥',
  'Key name': '密钥名称',
  'Key label (e.g, CLI tool)': '密钥标签（例如：CLI 工具）',
  'Scopes (comma-separated)': '权限范围（逗号分隔）',
  'Creating…': '创建中…',
  'Create key': '创建密钥',
  'Generate key': '生成密钥',
  'Created': '创建时间',
  'Last used': '最后使用',
  'Never': '从未',
  'Revoke': '撤销',
  'Revoking…': '撤销中…',
  'Copy': '复制',
  'Copied': '已复制',
  'Full access': '完全访问',
  'Full access (all permissions)': '完全访问（所有权限）',
  'Limited access': '受限访问',
  'Scopes': '权限范围',
  'Label': '标签',
  'Security': '安全',
  'Authentication': '认证',
  
  // ===== 安全设置 =====
  'Authentication': '认证',
  'Change password': '更改密码',
  'Current password': '当前密码',
  'New password': '新密码',
  'Confirm password': '确认密码',
  'Password changed': '密码已更改',
  'Passkeys': '通行密钥',
  'Add passkey': '添加通行密钥',
  'Remove passkey': '移除通行密钥',
  'API Keys': 'API 密钥',
  'Create API key': '创建 API 密钥',
  'Key name': '密钥名称',
  'Scopes': '权限范围',
  'Created': '创建时间',
  'Last used': '最后使用',
  'Revoke': '撤销',
  'Copy key': '复制密钥',
  'Key copied': '密钥已复制',
  
  // ===== Tailscale 设置 =====
  'Tailscale mode': 'Tailscale 模式',
  'Serve': 'Serve',
  'Funnel': 'Funnel',
  'Hostname': '主机名',
  'Tailnet': 'Tailnet',
  'Tailnet:': 'Tailnet：',
  'Account': '账户',
  'Account:': '账户：',
  'IP address': 'IP 地址',
  'IP:': 'IP：',
  'Not installed': '未安装',
  'Installed': '已安装',
  'Install Tailscale': '安装 Tailscale',
  'Re-check': '重新检查',
  'Not running': '未运行',
  'Configuring': '配置中',
  'Warning:': '警告：',
  'Expose the gateway via Tailscale Serve (tailnet-only HTTPS) or Funnel (public HTTPS). The gateway stays bound to localhost; Tailscale proxies traffic to it.': '通过 Tailscale Serve（仅 tailnet HTTPS）或 Funnel（公共 HTTPS）暴露网关。网关保持绑定到 localhost；Tailscale 代理流量到它。',
  'Enabling Funnel exposes moltis to the public internet. This code has not been security-audited. Use at your own risk.': '启用 Funnel 会将 moltis 暴露到公共互联网。此代码未经过安全审计。使用风险自负。',
  'serve': '内网模式',
  'funnel': '公网模式',
  'off': '关闭',
  'Mode': '模式',
  'URL': 'URL',
  
  // ===== 频道设置 =====
  'Channel': '频道',
  'Add channel': '添加频道',
  'Channel name': '频道名称',
  'Channel type': '频道类型',
  'Telegram': 'Telegram',
  'Discord': 'Discord',
  'Slack': 'Slack',
  'WeChat Work': '企业微信',
  'Bot token': '机器人令牌',
  'Connect': '连接',
  'Disconnect': '断开',
  'Connected': '已连接',
  'Disconnected': '已断开',
  'No channels configured': '未配置频道',
  'No channels configured.': '未配置频道。',
  'Add Telegram Bot': '添加 Telegram 机器人',
  '+ Add Telegram Bot': '+ 添加 Telegram 机器人',
  'Edit Telegram Bot': '编辑 Telegram 机器人',
  'No Telegram bots connected.': '未连接 Telegram 机器人。',
  'Click "+ Add Telegram Bot" to connect one using a token from @BotFather.': '点击"+ 添加 Telegram 机器人"使用来自 @BotFather 的令牌连接一个。',
  'How to create a Telegram bot': '如何创建 Telegram 机器人',
  '1. Open': '1. 打开',
  'in Telegram': '在 Telegram 中',
  '2. Send /newbot and follow the prompts to choose a name and username': '2. 发送 /newbot 并按照提示选择名称和用户名',
  '3. Copy the token and paste it below': '3. 复制令牌并粘贴到下方',
  'Bot username': '机器人用户名',
  'e.g. my_assistant_bot': '例如：my_assistant_bot',
  'Bot Token (from @BotFather)': '机器人令牌（来自 @BotFather）',
  '123456:ABC-DEF...': '123456:ABC-DEF...',
  'DM Policy': '私信策略',
  'Allowlist only': '仅允许列表',
  'Open (anyone)': '开放（任何人）',
  'Disabled': '已禁用',
  'Group Mention Mode': '群组提及模式',
  'Must @mention bot': '必须 @提及机器人',
  'Always respond': '始终响应',
  "Don't respond in groups": '不在群组中响应',
  'Default Model': '默认模型',
  'Connecting…': '连接中…',
  'Connect Bot': '连接机器人',
  'Failed to connect bot.': '连接机器人失败。',
  'Failed to update bot.': '更新机器人失败。',
  'Allowlist': '允许列表',
  'Type a username and press Enter': '输入用户名并按回车',
  'No active session': '无活动会话',
  'No messages received yet for this account.': '此账户尚未收到消息。',
  'OTP code copied': 'OTP 代码已复制',
  'Allowed': '已允许',
  'Denied': '已拒绝',
  'Approve': '批准',
  'Deny': '拒绝',
  'unknown': '未知',
  'configured': '已配置',
  'oauth': 'OAuth',
  
  // ===== 钩子设置（详细） =====
  'Hook name': '钩子名称',
  'Event type': '事件类型',
  'Command': '命令',
  'Timeout': '超时',
  'Priority': '优先级',
  'Enabled': '已启用',
  'Disabled': '已禁用',
  'Active': '活动',
  'Inactive': '未活动',
  'Ineligible': '不符合条件',
  'No hooks configured': '未配置钩子',
  'Create hook': '创建钩子',
  'Edit hook': '编辑钩子',
  'Delete hook': '删除钩子',
  'Hooks': '钩子',
  'Hook': '钩子',
  'Event': '事件',
  'Action': '操作',
  'Run': '运行',
  'Pause': '暂停',
  'Resume': '恢复',
  'History': '历史',
  'Reload': '重新加载',
  'Hook Script': '钩子脚本',
  'Continue': '继续',
  'Modify': '修改',
  'Block': '阻止',
  'Save': '保存',
  // 钩子页面的描述文本（纯文本版本，用于匹配包含 HTML 标签的文本）
  'Hooks run shell commands in response to lifecycle events (tool calls, messages, sessions, etc.). They live in .moltis/hooks/ directories.': '钩子在响应生命周期事件（工具调用、消息、会话等）时运行 shell 命令。它们位于 .moltis/hooks/ 目录中。',
  'Each hook is a directory containing a HOOK.md file with TOML frontmatter (events, command, requirements) and optional documentation. Edit the content below and click Save to update.': '每个钩子都是一个包含 HOOK.md 文件的目录，该文件包含 TOML 前置内容（事件、命令、要求）和可选文档。编辑下面的内容并点击保存以更新。',
  'example': '示例',
  'Skeleton hook — edit this to build your own': '骨架钩子 — 编辑此内容以构建你自己的',
  'boot-md': 'boot-md',
  'Reads BOOT.md from the workspace on startup and injects its content as the initial user message to the agent.': '在启动时从工作区读取 BOOT.md 并将其内容作为初始用户消息注入到助手。',
  'command-logger': 'command-logger',
  'Logs all slash-command invocations to a JSONL audit file at ~/.moltis/logs/commands.log.': '将所有斜杠命令调用记录到 ~/.moltis/logs/commands.log 的 JSONL 审计文件中。',
  'session-memory': 'session-memory',
  'Saves the conversation history to a markdown file in the memory directory when a session is reset or a new session is created, making it searchable.': '当会话重置或创建新会话时，将对话历史保存到记忆目录中的 markdown 文件，使其可搜索。',
  'Saves the conversation history to a markdown file in the memory directory when a session is reset or a new session is created, making it searchable for future sessions.': '当会话重置或创建新会话时，将对话历史保存到记忆目录中的 markdown 文件，使其可在未来会话中搜索。',
  'Saves the conversation history to a markdown file in the memory directory when a session is reset or a new session is created, making it sear...': '当会话重置或创建新会话时，将对话历史保存到记忆目录中的 markdown 文件，使其可搜索...',
  
  // ===== LLM 提供商（详细） =====
  'Provider name': '提供商名称',
  'Add provider': '添加提供商',
  'Configure provider': '配置提供商',
  'Test connection': '测试连接',
  'Connection successful': '连接成功',
  'Connection failed': '连接失败',
  'Available models': '可用模型',
  'Select model': '选择模型',
  'Default model': '默认模型',
  'No providers configured': '未配置提供商',
  'OpenAI': 'OpenAI',
  'Anthropic': 'Anthropic',
  'Google': 'Google',
  'Ollama': 'Ollama',
  'Local': '本地',
  'GitHub Copilot': 'GitHub Copilot',
  'Kimi Code': 'Kimi Code',
  'Enter API key': '输入 API 密钥',
  'Enter base URL': '输入基础 URL',
  'Optional': '可选',
  'Required': '必填',
  'Validate': '验证',
  'Validating...': '验证中...',
  'Valid': '有效',
  'Invalid': '无效',
  'Provider': '提供商',
  'Providers': '提供商',
  'Model': '模型',
  'Models': '模型',
  'Available': '可用',
  'Unavailable': '不可用',
  'Configure': '配置',
  'Detecting models...': '检测模型中...',
  'Detecting Models...': '检测模型中...',
  'Detection complete': '检测完成',
  'Detection failed': '检测失败',
  'supported': '支持',
  'unsupported': '不支持',
  'errors': '错误',
  'LLM Providers': 'LLM 提供商',
  'LLM 提供商': 'LLM 提供商',
  'Detect All Models': '检测所有模型',
  'Configure LLM providers for chat and agent tasks. You can add multiple providers and switch between models.': '配置用于聊天和助手任务的 LLM 提供商。你可以添加多个提供商并在模型之间切换。',
  'Preferred Models': '首选模型',
  'API 密钥': 'API 密钥',
  'Moonshot': 'Moonshot',
  'Feb 2026': '2026年2月',
  'Jan 2026': '2026年1月',
  'Dec 2025': '2025年12月',
  'Nov 2025': '2025年11月',
  'Oct 2025': '2025年10月',
  
  // ===== MCP 服务器（详细） =====
  'MCP server': 'MCP 服务器',
  'MCP Server': 'MCP 服务器',
  'MCP Servers': 'MCP 服务器',
  'Add server': '添加服务器',
  'Server name': '服务器名称',
  'Server URL': '服务器 URL',
  'Server status': '服务器状态',
  'Running': '运行中',
  'running': '运行中',
  'Stopped': '已停止',
  'stopped': '已停止',
  'dead': '已死亡',
  'connecting': '连接中',
  'Start server': '启动服务器',
  'Stop server': '停止服务器',
  'Restart server': '重启服务器',
  'Server tools': '服务器工具',
  'No servers configured': '未配置服务器',
  'MCP': 'MCP',
  'MCP (Model Context Protocol)': 'MCP（模型上下文协议）',
  'MCP (Model Context Protocol) tools extend the AI agent with external capabilities — file access, web fetch, database queries, code search, and more.': 'MCP（模型上下文协议）工具通过外部功能扩展 AI 助手 — 文件访问、网页获取、数据库查询、代码搜索等。',
  'Popular MCP Servers': '热门 MCP 服务器',
  'Browse all servers on GitHub →': '在 GitHub 上浏览所有服务器 →',
  'Configured MCP Servers': '已配置的 MCP 服务器',
  'No MCP tools configured. Add one from the popular list above or enter a custom stdio command / remote URL.': '未配置 MCP 工具。从上面的热门列表中添加一个，或输入自定义 stdio 命令/远程 URL。',
  'Tools': '工具',
  'tool': '工具',
  'tools': '工具',
  'Resources': '资源',
  'Prompts': '提示',
  'Loading tools…': '加载工具中…',
  'No tools exposed by this server.': '此服务器未暴露任何工具。',
  'Add': '添加',
  'Adding…': '添加中…',
  'Configure': '配置',
  'Confirm': '确认',
  'Environment variables (KEY=VALUE per line)': '环境变量（每行一个 KEY=VALUE）',
  'Remote MCP servers require a URL': '远程 MCP 服务器需要 URL',
  'Added MCP tool': '已添加 MCP 工具',
  'Failed to add': '添加失败',
  'OAuth pending': 'OAuth 待处理',
  'OAuth connected': 'OAuth 已连接',
  'OAuth failed': 'OAuth 失败',
  'OAuth not required': '不需要 OAuth',
  'stdio': 'stdio',
  'sse': 'sse',
  'Secure file operations with configurable access controls': '具有可配置访问控制的安全文件操作',
  'Knowledge graph-based persistent memory system': '基于知识图谱的持久化记忆系统',
  'GitHub API integration — repos, issues, PRs, code search': 'GitHub API 集成 — 仓库、问题、PR、代码搜索',
  'Remote Linear MCP server with browser OAuth': '带浏览器 OAuth 的远程 Linear MCP 服务器',
  'Last arg is the allowed directory path': '最后一个参数是允许的目录路径',
  'filesystem': '文件系统',
  'memory': '记忆',
  'github': 'GitHub',
  'linear': 'Linear',
  'tokens': '令牌',
  
  // ===== 技能管理（详细） =====
  'Skill name': '技能名称',
  'Install skill': '安装技能',
  'Remove skill': '移除技能',
  'Skill source': '技能来源',
  'GitHub repository': 'GitHub 仓库',
  'Local path': '本地路径',
  'No skills installed': '未安装技能',
  'Install from GitHub': '从 GitHub 安装',
  'Repository URL': '仓库 URL',
  'Skills': '技能',
  'Skill': '技能',
  'Install': '安装',
  'Installing…': '安装中…',
  'Installed': '已安装',
  'Refresh': '刷新',
  'Emergency Disable': '紧急禁用',
  'Disable all third-party skills': '禁用所有第三方技能',
  'Disable all third-party skills now?': '立即禁用所有第三方技能？',
  'Disable All': '全部禁用',
  'Disabled': '已禁用',
  'skills': '技能',
  'SKILL.md-based skills discovered from project, personal, and installed paths.': '从项目、个人和已安装路径中发现的基于 SKILL.md 的技能。',
  'How to write a skill?': '如何编写技能？',
  'owner/repo or full URL (e.g. anthropics/skills)': 'owner/repo 或完整 URL（例如：anthropics/skills）',
  'Removing...': '移除中...',
  'orphaned on disk': '磁盘上的孤立文件',
  'protected': '受保护',
  'Dismiss': '忽略',
  
  // ===== 语音设置（详细） =====
  'Text-to-Speech': '文字转语音',
  'Speech-to-Text': '语音转文字',
  'TTS provider': 'TTS 提供商',
  'STT provider': 'STT 提供商',
  'Voice model': '语音模型',
  'Test voice': '测试语音',
  'Recording': '录音中',
  'Processing': '处理中',
  'Transcription': '转录',
  'ElevenLabs': 'ElevenLabs',
  'OpenAI': 'OpenAI',
  'Google': 'Google',
  'Piper': 'Piper',
  'Coqui': 'Coqui',
  'Whisper': 'Whisper',
  'Groq': 'Groq',
  'Deepgram': 'Deepgram',
  'Mistral': 'Mistral',
  'Voice ID': '语音 ID',
  'Language': '语言',
  'Speaking rate': '语速',
  'Pitch': '音调',
  'Hugging Face': 'Hugging Face',
  'sherpa-onnx documentation': 'sherpa-onnx 文档',
  'GitHub releases': 'GitHub 发布',
  'piper-samples': 'piper 语音示例',
  'coqui-ai/TTS': 'coqui-ai/TTS',
  'Voice': '语音',
  'TTS': 'TTS',
  'STT': 'STT',
  'Provider': '提供商',
  'Model': '模型',
  'Test': '测试',
  'Testing': '测试中',
  'Play': '播放',
  'Stop': '停止',
  'Record': '录音',
  'Stop recording': '停止录音',
  
  // ===== 终端设置（详细） =====
  'Terminal theme': '终端主题',
  'Font size': '字体大小',
  'Font family': '字体',
  'Cursor style': '光标样式',
  'Block': '方块',
  'Underline': '下划线',
  'Bar': '竖线',
  'Terminal': '终端',
  'Host shell': '主机 shell',
  'Interactive host shell (ephemeral). Install tmux for persistence': '交互式主机 shell（临时）。安装 tmux 以持久化',
  'Interactive host shell (ephemeral). Install tmux to persist sessions across reconnects.': '交互式主机 shell（临时）。安装 tmux 以在重新连接时保持会话。',
  'tmux unavailable': 'tmux 不可用',
  'No tmux windows': '无 tmux 窗口',
  'Host shell unavailable': '主机 shell 不可用',
  'Unable to open host shell.': '无法打开主机 shell。',
  'First connection tip: run the install command once to enable persistent tmux sessions.': '首次连接提示：运行安装命令一次以启用持久化 tmux 会话。',
  'Loading… this can take a few seconds.': '加载中… 这可能需要几秒钟。',
  'Checking system requirements…': '检查系统要求…',
  'Install tmux': '安装 tmux',
  'Copy command': '复制命令',
  'New tab': '新标签',
  'Clear': '清空',
  'Restart': '重启',
  'Attach': '附加',
  'tmux': 'tmux',
  'ephemeral': '临时',
  'persistent': '持久化',
  
  // ===== 沙箱设置（详细） =====
  'Sandbox mode': '沙箱模式',
  'All sessions': '所有会话',
  'Non-main sessions': '非主会话',
  'Sandbox image': '沙箱镜像',
  'Base image': '基础镜像',
  'Packages': '软件包',
  'Add package': '添加软件包',
  'Package name': '软件包名称',
  'Build image': '构建镜像',
  'Building image': '构建镜像中',
  'Building image…': '构建镜像中…',
  'Image built': '镜像已构建',
  'Build failed': '构建失败',
  'Remove image': '移除镜像',
  'Prune images': '清理镜像',
  'Sandboxes': '沙箱',
  'Sandbox': '沙箱',
  'Images': '镜像',
  'Image': '镜像',
  'Containers': '容器',
  'Container': '容器',
  'Tag': '标签',
  'Size': '大小',
  'Created': '创建时间',
  'Built:': '已构建：',
  'Error:': '错误：',
  'Prune all': '清理全部',
  'Pruning…': '清理中…',
  'Delete image': '删除镜像',
  'Stop container': '停止容器',
  'Delete container': '删除容器',
  'Clean All': '全部清理',
  'Cleaning…': '清理中…',
  'Sandboxes are disabled on cloud deploys without a container runtime. Install on a VM with Docker or Apple Container to enable this feature.': '在没有容器运行时的云部署上禁用沙箱。在带有 Docker 或 Apple Container 的虚拟机上安装以启用此功能。',
  'Default (ubuntu:25.10)': '默认 (ubuntu:25.10)',
  'ubuntu:25.10': 'ubuntu:25.10',
  'Name': '名称',
  'Base': '基础',
  'Build': '构建',
  'Building': '构建中',
  'Prune': '清理',
  'Pruning': '清理中',
  'Delete': '删除',
  'Deleting': '删除中',
  'Stop': '停止',
  'Stopping': '停止中',
  'Restart': '重启',
  'Restarting': '重启中',
  
  // ===== 监控设置 =====
  'CPU usage': 'CPU 使用率',
  'Memory usage': '内存使用',
  'Disk usage': '磁盘使用',
  'Network traffic': '网络流量',
  'Uptime': '运行时间',
  'Request count': '请求数',
  'Error rate': '错误率',
  'Response time': '响应时间',
  'Export metrics': '导出指标',
  
  // ===== 日志设置 =====
  'Log level': '日志级别',
  'Trace': '跟踪',
  'Debug': '调试',
  'Info': '信息',
  'Warning': '警告',
  'Error': '错误',
  'Filter logs': '筛选日志',
  'Clear logs': '清空日志',
  'Download logs': '下载日志',
  'Auto-scroll': '自动滚动',
  'Logs': '日志',
  'Level': '级别',
  'Timestamp': '时间戳',
  'Message': '消息',
  'Source': '来源',
  'TRACE': '跟踪',
  'DEBUG': '调试',
  'INFO': '信息',
  'WARN': '警告',
  'ERROR': '错误',
  
  // ===== 配置设置 =====
  'Configuration file': '配置文件',
  'Edit config': '编辑配置',
  'Reload config': '重新加载配置',
  'Config path': '配置路径',
  'Data directory': '数据目录',
  'Validate config': '验证配置',
  'Config valid': '配置有效',
  'Config invalid': '配置无效',
  'Reset to defaults': '重置为默认值',
  
  // ===== 项目管理 =====
  'Project': '项目',
  'Projects': '项目',
  'Repositories': '仓库',
  'Create project': '创建项目',
  'Edit project': '编辑项目',
  'Delete project': '删除项目',
  'Project name': '项目名称',
  'Project path': '项目路径',
  'Project directory': '项目目录',
  'Directory': '目录',
  'No projects': '无项目',
  'No projects configured. Add a directory above or use auto-detect.': '未配置项目。在上方添加目录或使用自动检测。',
  'Auto-detect': '自动检测',
  'Detecting…': '检测中…',
  'Scan common locations for git repositories and add them as projects': '扫描常见位置的 git 仓库并将其添加为项目',
  'Remove all repository entries from Moltis without deleting files on disk': '从 Moltis 中移除所有仓库条目，但不删除磁盘上的文件',
  'System prompt (optional)': '系统提示（可选）',
  'Extra instructions for the LLM when working on this project...': '在此项目上工作时给 LLM 的额外指令...',
  'Default (ubuntu:25.10)': '默认 (ubuntu:25.10)',
  'auto': '自动',
  'worktree': '工作树',
  'setup': '设置',
  'teardown': '清理',
  'image': '镜像',
  'Projects bind sessions to a codebase directory. When a session is linked to a project, context files (CLAUDE.md, AGENTS.md) are loaded automatically and a custom system prompt can be injected. Enable auto-worktree to give each session its own git branch for isolated work.': '项目将会话绑定到代码库目录。当会话链接到项目时，上下文文件（CLAUDE.md、AGENTS.md）会自动加载，并可以注入自定义系统提示。启用自动工作树可为每个会话提供独立的 git 分支进行隔离工作。',
  
  // ===== 提供商设置 =====
  'Provider': '提供商',
  'API Key': 'API 密钥',
  'Base URL': '基础 URL',
  'Model': '模型',
  'Available': '可用',
  'Unavailable': '不可用',
  'Configure': '配置',
  'Test connection': '测试连接',
  'Connection successful': '连接成功',
  'Connection failed': '连接失败',
  'Provider name': '提供商名称',
  'Add provider': '添加提供商',
  'Configure provider': '配置提供商',
  'Available models': '可用模型',
  'Select model': '选择模型',
  'Default model': '默认模型',
  'No providers configured': '未配置提供商',
  'OpenAI': 'OpenAI',
  'Anthropic': 'Anthropic',
  'Google': 'Google',
  'Ollama': 'Ollama',
  'Local': '本地',
  'GitHub Copilot': 'GitHub Copilot',
  'Kimi Code': 'Kimi Code',
  'Enter API key': '输入 API 密钥',
  'Enter base URL': '输入基础 URL',
  'Optional': '可选',
  'Required': '必填',
  'Validate': '验证',
  'Validating...': '验证中...',
  'Valid': '有效',
  'Invalid': '无效',
  
  // ===== 沙箱 =====
  'Sandbox': '沙箱',
  'Sandbox mode': '沙箱模式',
  'Sandbox image': '沙箱镜像',
  'on': '开启',
  'off': '关闭',
  'Building': '构建中',
  'Build complete': '构建完成',
  'Build failed': '构建失败',
  
  // ===== 技能 =====
  'Skill': '技能',
  'Skills': '技能',
  'Install skill': '安装技能',
  'Remove skill': '移除技能',
  'No skills installed': '未安装技能',
  
  // ===== 钩子 =====
  'Hook': '钩子',
  'Hooks': '钩子',
  'Event': '事件',
  'Command': '命令',
  'Timeout': '超时',
  'Priority': '优先级',
  
  // ===== MCP =====
  'MCP Server': 'MCP 服务器',
  'MCP Servers': 'MCP 服务器',
  'Server name': '服务器名称',
  'Status': '状态',
  'Tools': '工具',
  'Connected': '已连接',
  'Disconnected': '已断开',
  'Reconnect': '重新连接',
  
  // ===== 日志 =====
  'Log level': '日志级别',
  'Timestamp': '时间戳',
  'Message': '消息',
  'Clear logs': '清空日志',
  'Download logs': '下载日志',
  
  // ===== 镜像管理 =====
  'Image': '镜像',
  'Images': '镜像',
  'Tag': '标签',
  'Size': '大小',
  'Created': '创建时间',
  'Remove image': '移除镜像',
  'Prune images': '清理镜像',
  
  // ===== 指标 =====
  'CPU Usage': 'CPU 使用率',
  'Memory Usage': '内存使用',
  'Disk Usage': '磁盘使用',
  'Network': '网络',
  'Uptime': '运行时间',
  
  // ===== Monitoring 页面 =====
  'Loading metrics...': '加载指标中...',
  'Metrics are not enabled. Enable them in moltis.toml with [metrics] enabled = true': '指标未启用。在 moltis.toml 中使用 [metrics] enabled = true 启用它们',
  'Live': '实时',
  'Connecting...': '连接中...',
  'Overview': '概览',
  'Charts': '图表',
  'System': '系统',
  'Connected Clients': '已连接客户端',
  'Active Sessions': '活动会话',
  'HTTP Requests': 'HTTP 请求',
  'LLM Usage': 'LLM 使用',
  'Completions': '完成数',
  'Input Tokens': '输入令牌',
  'Output Tokens': '输出令牌',
  'Cache Tokens': '缓存令牌',
  'Tools & MCP': '工具和 MCP',
  'Tool Executions': '工具执行',
  'Tools Active': '活动工具',
  'MCP Tool Calls': 'MCP 工具调用',
  'MCP Servers': 'MCP 服务器',
  'By Provider': '按提供商',
  'Provider': '提供商',
  'Errors': '错误',
  'Prometheus Endpoint': 'Prometheus 端点',
  'Scrape this endpoint with Prometheus or import into Grafana for advanced visualization.': '使用 Prometheus 抓取此端点或导入 Grafana 进行高级可视化。',
  'Copy': '复制',
  'Copied!': '已复制！',
  'No activity yet': '暂无活动',
  'Metrics will appear here once you start using moltis. Try sending a message or running a tool to see data.': '一旦您开始使用 moltis，指标将显示在这里。尝试发送消息或运行工具以查看数据。',
  'Collecting data...': '收集数据中...',
  'Historical charts will appear here after a few data points are collected. This typically takes about 20-30 seconds.': '收集几个数据点后，历史图表将显示在这里。这通常需要约 20-30 秒。',
  'Token Usage (Total)': '令牌使用（总计）',
  'Input Tokens by Provider': '按提供商的输入令牌',
  'Output Tokens by Provider': '按提供商的输出令牌',
  'Requests': '请求',
  'Connections': '连接',
  'WebSocket Active': 'WebSocket 活动',
  'Tool Activity': '工具活动',
  '5 min': '5 分钟',
  '1 hour': '1 小时',
  '24 hours': '24 小时',
  '7 days': '7 天',
  
  // ===== Logs 页面 =====
  'All levels': '所有级别',
  'TRACE': '跟踪',
  'DEBUG': '调试',
  'INFO': '信息',
  'WARN': '警告',
  'ERROR': '错误',
  'Filter target…': '过滤目标…',
  'Search…': '搜索…',
  'Pause': '暂停',
  'Resume': '恢复',
  'Clear': '清空',
  'Download': '下载',
  'entries': '条',
  
  // ===== Config 页面 =====
  'Edit the full moltis configuration. This includes server, tools, LLM providers, auth, and all other settings. Test your changes before saving. Changes require a restart to take effect.': '编辑完整的 moltis 配置。这包括服务器、工具、LLM 提供商、认证和所有其他设置。保存前测试您的更改。更改需要重启才能生效。',
  'View documentation ↗': '查看文档 ↗',
  'File:': '文件：',
  'Test': '测试',
  'Reload': '重新加载',
  'Reset to defaults': '重置为默认值',
  'Restart': '重启',
  'Testing…': '测试中…',
  'Saving…': '保存中…',
  'Resetting…': '重置中…',
  'Restarting…': '重启中…',
  'Configuration is valid.': '配置有效。',
  'Configuration saved. Restart required for changes to take effect.': '配置已保存。更改需要重启才能生效。',
  'Restarting moltis...': '正在重启 moltis...',
  'Server did not come back up. Check if moltis is running.': '服务器未恢复。请检查 moltis 是否正在运行。',
  'The page will reload automatically when the server is back up.': '服务器恢复后页面将自动重新加载。',
  'Warnings:': '警告：',
  'Replace current config with the default template?': '用默认模板替换当前配置？',
  'This will show all available options with documentation. Your current values will be lost unless you copy them first.': '这将显示所有可用选项及其文档。除非您先复制，否则当前值将丢失。',
  'Loaded default template with all options. Review and save when ready.': '已加载包含所有选项的默认模板。准备好后请查看并保存。',
  'Failed to load template': '加载模板失败',
  'Invalid JSON response': '无效的 JSON 响应',
  'Failed to connect to server. Please check if moltis is running.': '连接服务器失败。请检查 moltis 是否正在运行。',
  'Failed to connect to server': '连接服务器失败',
  'Invalid configuration': '无效的配置',
  'Failed to save': '保存失败',
  'Tip: Click "Load Template" to see all available configuration options with documentation. This replaces the editor content with a fully documented template - copy your current values first if needed.': '提示：点击"加载模板"查看所有可用配置选项及其文档。这会用完整文档的模板替换编辑器内容 - 如需要请先复制当前值。',
  'Time': '时间',
  'LLM Completions': 'LLM 完成',
  'read:': '读取：',
  
  // ===== 沙箱页面 =====
  'Sandboxes': '沙箱',
  'Container images cached by moltis for sandbox execution. You can delete individual images or prune all. Build custom images from a base with apt packages.': 'moltis 为沙箱执行缓存的容器镜像。您可以删除单个镜像或清理全部。使用 apt 包从基础镜像构建自定义镜像。',
  'Apple Container provides VM-isolated execution but does not support building images. Docker (or OrbStack) is required alongside Apple Container to build and cache custom images. Sandboxed commands run via Apple Container; image builds use Docker.': 'Apple Container 提供 VM 隔离执行，但不支持构建镜像。需要 Docker（或 OrbStack）与 Apple Container 一起使用来构建和缓存自定义镜像。沙箱命令通过 Apple Container 运行；镜像构建使用 Docker。',
  'Container backend:': '容器后端：',
  'None (host execution)': '无（主机执行）',
  'No container runtime detected. Install Apple Container (macOS 26+) for VM-isolated sandboxing, or install Docker as an alternative.': '未检测到容器运行时。安装 Apple Container（macOS 26+）以实现 VM 隔离沙箱，或安装 Docker 作为替代方案。',
  'No container runtime detected. Install Docker for sandboxed execution, or ensure systemd is available for cgroup isolation.': '未检测到容器运行时。安装 Docker 以实现沙箱执行，或确保 systemd 可用于 cgroup 隔离。',
  'No container runtime detected. Install Docker for sandboxed execution.': '未检测到容器运行时。安装 Docker 以实现沙箱执行。',
  'Running Containers': '运行中的容器',
  'Refresh': '刷新',
  'No containers found.': '未找到容器。',
  'Default image': '默认镜像',
  'Base image used for new sessions and projects unless overridden. Leave empty to use the built-in default (ubuntu:25.10).': '用于新会话和项目的基础镜像，除非被覆盖。留空以使用内置默认值（ubuntu:25.10）。',
  'No cached images.': '无缓存镜像。',
  'Prune all': '清理全部',
  'Pruning…': '清理中…',
  'Build custom image': '构建自定义镜像',
  'Image name': '镜像名称',
  'my-tools': 'my-tools',
  'Base image': '基础镜像',
  'Packages (space or newline separated)': '包（空格或换行分隔）',
  'Build': '构建',
  'Building…': '构建中…',
  'Image built successfully': '镜像构建成功',
  'Failed to build image': '构建镜像失败',
  'Delete': '删除',
  'Deleting…': '删除中…',
  
  // ===== Memory 页面 =====
  'Memory': '记忆',
  'Configure how the agent stores and retrieves long-term memory. Memory enables the agent to recall past conversations, notes, and context across sessions.': '配置代理如何存储和检索长期记忆。记忆使代理能够跨会话回忆过去的对话、笔记和上下文。',
  'Status': '状态',
  'Files:': '文件：',
  'Chunks:': '块：',
  'Model:': '模型：',
  'DB Size:': '数据库大小：',
  'Backend': '后端',
  'Feature': '功能',
  'Built-in': '内置',
  'QMD': 'QMD',
  'Search type': '搜索类型',
  'FTS5 + vector': 'FTS5 + 向量',
  'BM25 + vector + LLM': 'BM25 + 向量 + LLM',
  'External dependency': '外部依赖',
  'None': '无',
  'Node.js/Bun': 'Node.js/Bun',
  'Embedding cache': '嵌入缓存',
  'OpenAI batch API': 'OpenAI 批处理 API',
  '✓ (50% cheaper)': '✓（便宜 50%）',
  'Provider fallback': '提供商回退',
  'LLM reranking': 'LLM 重排序',
  'Optional': '可选',
  'Built-in': '内置',
  'Best for': '最适合',
  'Most users': '大多数用户',
  'Power users': '高级用户',
  'Built-in (Recommended)': '内置（推荐）',
  'QMD feature is not enabled. Rebuild moltis with --features qmd': 'QMD 功能未启用。使用 --features qmd 重新构建 moltis',
  'QMD Status': 'QMD 状态',
  'QMD is installed': 'QMD 已安装',
  'QMD is not installed or not found in PATH': 'QMD 未安装或在 PATH 中未找到',
  'Installation:': '安装：',
  'Then start the QMD daemon:': '然后启动 QMD 守护进程：',
  'View documentation →': '查看文档 →',
  'Citations': '引用',
  'Include source file and line number with search results to help track where information comes from.': '在搜索结果中包含源文件和行号，以帮助跟踪信息来源。',
  'Auto (multi-file only)': '自动（仅多文件）',
  'Always': '始终',
  'Never': '从不',
  'LLM Reranking': 'LLM 重排序',
  'Use the LLM to rerank search results for better relevance (slower but more accurate).': '使用 LLM 重新排序搜索结果以获得更好的相关性（较慢但更准确）。',
  'Session Export': '会话导出',
  'Export session transcripts to memory for cross-run recall of past conversations.': '将会话记录导出到记忆中，以便跨运行回忆过去的对话。',
  
  // ===== Notifications 页面 =====
  'Notifications': '通知',
  'Push notifications': '推送通知',
  'Receive notifications when the agent completes tasks or needs your attention.': '当代理完成任务或需要您的注意时接收通知。',
  'Push notifications are not supported in this browser.': '此浏览器不支持推送通知。',
  'Enable notifications': '启用通知',
  'Disable notifications': '禁用通知',
  'Notification permission denied. Please enable notifications in your browser settings.': '通知权限被拒绝。请在浏览器设置中启用通知。',
  'Subscribed': '已订阅',
  'Not subscribed': '未订阅',
  'Failed to subscribe': '订阅失败',
  'Failed to unsubscribe': '取消订阅失败',
  'Remove subscription': '移除订阅',
  'Active subscriptions': '活动订阅',
  'No active subscriptions': '无活动订阅',
  
  // ===== Heartbeat 页面 =====
  'Heartbeat': '心跳',
  'Heartbeat is disabled. Enable it to allow manual runs.': '心跳已禁用。启用它以允许手动运行。',
  'Heartbeat is inactive because no prompt is configured. Add a custom prompt or write actionable content in HEARTBEAT.md.': '心跳未激活，因为未配置提示。添加自定义提示或在 HEARTBEAT.md 中编写可操作的内容。',
  'Heartbeat has no active cron job yet. Save the heartbeat settings to recreate it.': '心跳尚无活动的定时任务。保存心跳设置以重新创建它。',
  'Run Now': '立即运行',
  'Running…': '运行中…',
  'No runs yet.': '尚无运行记录。',
  'Effective prompt source:': '有效提示来源：',
  'default': '默认',
  'custom': '自定义',
  'file': '文件',
  'Leave blank to use default heartbeat prompt': '留空以使用默认心跳提示',
  'Leave this empty to use HEARTBEAT.md in your workspace root. If that file exists but is empty/comments-only, heartbeat LLM runs are skipped to save tokens.': '留空以使用工作区根目录中的 HEARTBEAT.md。如果该文件存在但为空/仅注释，则跳过心跳 LLM 运行以节省令牌。',
  'Acknowledgment': '确认',
  'Max characters': '最大字符数',
  'Sandbox execution': '沙箱执行',
  'Enable sandbox': '启用沙箱',
  'Sandbox image': '沙箱镜像',
  'Schedule': '计划',
  'Every': '每',
  'Model': '模型',
  'Prompt': '提示',
  
  // ===== 终端页面 =====
  'Terminal': '终端',
  'Ephemeral host shell, user': '临时主机 shell，用户',
  'Ephemeral host shell, user nick': '临时主机 shell，用户 nick',
  'Persistent tmux session, user': '持久化 tmux 会话，用户',
  'Interactive host shell with persistent tmux session. Click inside terminal and type commands directly.': '带持久化 tmux 会话的交互式主机 shell。点击终端内部并直接输入命令。',
  'Interactive host shell (ephemeral). Enable tmux persistence from terminal settings when available.': '交互式主机 shell（临时）。可用时从终端设置启用 tmux 持久化。',
  'Interactive host shell (ephemeral). Install tmux for persistence:': '交互式主机 shell（临时）。安装 tmux 以持久化：',
  'Interactive host shell (ephemeral). Install tmux for persistence: brew install tmux': '交互式主机 shell（临时）。安装 tmux 以持久化：brew install tmux',
  'Interactive host shell. Click inside terminal and type commands directly.': '交互式主机 shell。点击终端内部并直接输入命令。',
  'Run install command (first time)': '运行安装命令（首次）',
  'Run install command': '运行安装命令',
  'Copy': '复制',
  'tmux is not installed, session persistence is disabled. Install tmux for persistence: brew install tmux': 'tmux 未安装，会话持久化已禁用。安装 tmux 以持久化：brew install tmux',
  'tmux 不可用': 'tmux 不可用',
  'user': '用户',
  'nick': 'nick',
  
  // ===== 语音页面 =====
  'Voice': '语音',
  'Configure text-to-speech (TTS) and speech-to-text (STT) providers. STT lets you use the microphone button in chat to record voice input. TTS lets you hear responses as audio.': '配置文本转语音（TTS）和语音转文本（STT）提供商。STT 允许您使用聊天中的麦克风按钮录制语音输入。TTS 允许您以音频形式听到响应。',
  'Speech-to-Text (Voice Input)': '语音转文本（语音输入）',
  'Text-to-Speech (Audio Responses)': '文本转语音（音频响应）',
  'Speech-to-Text (Cloud)': '语音转文本（云端）',
  'Speech-to-Text (Local)': '语音转文本（本地）',
  'Text-to-Speech': '文本转语音',
  'Test voice output': '测试语音输出',
  'Test voice input': '测试语音输入',
  'Stop': '停止',
  'Testing…': '测试中…',
  'Speak now, then click Stop when finished': '现在说话，完成后点击停止',
  'Transcribed:': '转录：',
  'Audio played successfully': '音频播放成功',
  'Microphone permission denied': '麦克风权限被拒绝',
  'No microphone found': '未找到麦克风',
  'Transcribing...': '转录中...',
  'Playing audio...': '播放音频中...',
  'Fast Voxtral transcription with 13 language support': '快速 Voxtral 转录，支持 13 种语言',
  '90+ languages, word timestamps. Same API key as ElevenLabs TTS': '90+ 种语言，词级时间戳。与 ElevenLabs TTS 使用相同的 API 密钥',
  'Lowest latency (~75ms), natural voices. Same key enables Scribe STT': '最低延迟（~75ms），自然语音。相同密钥启用 Scribe STT',
  'local': '本地',
  '(from env)': '（来自环境变量）',
  '(from LLM provider)': '（来自 LLM 提供商）',
  'Voice:': '语音：',
  'Found at:': '找到于：',
  'Install required': '需要安装',
  'Add Voice Provider': '添加语音提供商',
  'Select a provider to configure': '选择要配置的提供商',
  'API Key': 'API 密钥',
  'Voice ID': '语音 ID',
  'Model': '模型',
  'Language': '语言',
  'Save Voice Settings': '保存语音设置',
  'Voice settings saved': '语音设置已保存',
  'Failed to save voice settings': '保存语音设置失败',
  
  // ===== 技能页面 =====
  'Skills': '技能',
  '⚠️ Skills run code on your machine — treat every skill as untrusted': '⚠️ 技能在您的机器上运行代码 — 将每个技能视为不可信',
  'Skills are community-authored instructions that the AI agent follows': '技能是社区编写的指令，AI 代理会遵循这些指令',
  'with your full system privileges': '使用您的完整系统权限',
  'Popularity or download count does not mean a skill is safe. A malicious skill can instruct the agent to:': '流行度或下载量并不意味着技能是安全的。恶意技能可以指示代理：',
  'Execute arbitrary shell commands on your machine (install malware, cryptominers, backdoors)': '在您的机器上执行任意 shell 命令（安装恶意软件、加密货币挖矿程序、后门）',
  'Read and exfiltrate sensitive data — SSH keys, API tokens, browser cookies, credentials, env variables': '读取和窃取敏感数据 — SSH 密钥、API 令牌、浏览器 cookie、凭据、环境变量',
  'Modify or delete files across your filesystem, including other projects': '修改或删除文件系统中的文件，包括其他项目',
  'Send your data to remote servers via curl/wget without your knowledge': '在您不知情的情况下通过 curl/wget 将数据发送到远程服务器',
  'Triple-check the source code': '三次检查源代码',
  'of every skill before enabling it. Read the full SKILL.md and any scripts it references — these are the exact instructions the agent will execute on your behalf. Do not trust a skill just because it is popular, highly downloaded, or appears on a leaderboard.': '在启用每个技能之前。阅读完整的 SKILL.md 和它引用的任何脚本 — 这些是代理将代表您执行的确切指令。不要仅仅因为技能流行、下载量高或出现在排行榜上就信任它。',
  'With sandbox mode enabled (Docker, Apple Container, or cgroup), command execution is isolated and the damage a malicious skill can do is significantly limited.': '启用沙箱模式（Docker、Apple Container 或 cgroup）后，命令执行是隔离的，恶意技能可能造成的损害会大大减少。',
  'Dismiss': '忽略',
  'Enable all from this repo': '启用此仓库的所有技能',
  'owner/repo or full URL (e.g. anthropics/skills)': 'owner/repo 或完整 URL（例如：anthropics/skills）',
  'Install': '安装',
  'Installing…': '安装中…',
  'Featured Repositories': '精选仓库',
  'FEATURED REPOSITORIES': '精选仓库',
  'Community skills from ClawdHub': '来自 ClawdHub 的社区技能',
  'Official Anthropic agent skills': '官方 Anthropic 代理技能',
  'Vercel agent skills collection': 'Vercel 代理技能集合',
  'Vercel skills toolkit': 'Vercel 技能工具包',
  'Installed Repositories': '已安装的仓库',
  'INSTALLED REPOSITORIES': '已安装的仓库',
  'No repositories installed.': '未安装仓库。',
  'Enabled Skills': '已启用的技能',
  'ENABLED SKILLS': '已启用的技能',
  'No skills enabled.': '未启用技能。',
  'Refresh': '刷新',
  'Uninstall': '卸载',
  'Disable all from this repo': '禁用此仓库的所有技能',
  'skills': '技能',
  'enabled': '已启用',
  'Installing': '安装中',
  'This may take a while (download + scan).': '这可能需要一段时间（下载 + 扫描）。',
  'Not connected to gateway.': '未连接到网关。',
  'Installed': '已安装',
  'skill': '技能',
  'Failed:': '失败：',
  'unknown error': '未知错误',
  'Missing:': '缺失：',
  'Install via': '通过安装',
  'Install dependency for': '为以下安装依赖',
  'Only continue if you trust this skill and its source.': '仅在您信任此技能及其来源时继续。',
  'Skill': '技能',
  'Repository': '仓库',
  'Status': '状态',
  'Actions': '操作',
  'View': '查看',
  'Enable': '启用',
  'Disable': '禁用',
  
  // ===== MCP 页面补充 =====
  '⚠️ Review MCP trust boundaries before enabling': '⚠️ 启用前请检查 MCP 信任边界',
  'Local stdio servers run with': '本地 stdio 服务器运行时使用',
  'your full system privileges': '您的完整系统权限',
  '. A malicious or compromised local server can read files, exfiltrate credentials, or execute commands.': '。恶意或受损的本地服务器可以读取文件、窃取凭据或执行命令。',
  'Remote SSE servers can receive your tool inputs and act in linked external systems. Use trusted hosts and only scopes you intend to grant.': '远程 SSE 服务器可以接收您的工具输入并在链接的外部系统中操作。使用可信主机并仅授予您打算授予的范围。',
  'Each enabled server also adds tool definitions to chat context and consumes tokens, enable only what you actively need.': '每个启用的服务器还会将工具定义添加到聊天上下文并消耗令牌，仅启用您实际需要的内容。',
  'Add Custom MCP Server': '添加自定义 MCP 服务器',
  'Stdio (local)': 'Stdio（本地）',
  'SSE (remote)': 'SSE（远程）',
  'Environment variables (KEY=VALUE per line)': '环境变量（每行一个 KEY=VALUE）',
  'Hide env vars': '隐藏环境变量',
  '+ Environment variables': '+ 环境变量',
  'Moltis supports both': 'Moltis 支持',
  'local stdio MCP processes': '本地 stdio MCP 进程',
  '(spawned via npm/uvx) and': '（通过 npm/uvx 启动）和',
  'remote Streamable HTTP/SSE servers': '远程 Streamable HTTP/SSE 服务器',
  '. Remote servers may prompt browser OAuth when first enabled.': '。远程服务器在首次启用时可能会提示浏览器 OAuth。',
  
  // ===== 技能页面补充（分段翻译） =====
  'Skills are community-authored instructions that the AI agent follows': '技能是社区编写的指令，AI 代理会遵循这些指令',
  '. Popularity or download count does not mean a skill is safe. A malicious skill can instruct the agent to:': '。流行度或下载量并不意味着技能是安全的。恶意技能可以指示代理：',
  'of every skill before enabling it. Read the full SKILL.md and any scripts it references — these are the exact instructions the agent will execute on your behalf.': '在启用每个技能之前。阅读完整的 SKILL.md 和它引用的任何脚本 — 这些是代理将代表您执行的确切指令。',
  'Do not trust a skill just because it is popular, highly downloaded, or appears on a leaderboard.': '不要仅仅因为技能流行、下载量高或出现在排行榜上就信任它。',
  
  // ===== 钩子页面补充 =====
  'Hooks': '钩子',
  'Hooks run shell commands in response to lifecycle events (tool calls, messages, sessions, etc.). They live in': '钩子在响应生命周期事件（工具调用、消息、会话等）时运行 shell 命令。它们位于',
  'directories.': '目录中。',
  'Continue / Modify / Block': '继续 / 修改 / 阻止',
  'Each hook is a directory containing a': '每个钩子都是一个包含',
  'file with TOML frontmatter (events, command, requirements) and optional documentation. Edit the content below and click': '文件的目录，该文件包含 TOML 前置内容（事件、命令、要求）和可选文档。编辑下面的内容并点击',
  'to update.': '以更新。',
  'No hooks discovered. Create a': '未发现钩子。创建一个',
  'file in': '文件在',
  'or': '或',
  'to get started.': '以开始使用。',
  'Hook Script': '钩子脚本',
  'Event': '事件',
  'Command': '命令',
  'Requirements': '要求',
  'Documentation': '文档',
  
  // ===== 频道页面补充 =====
  'Senders': '发送者',
  'Sender': '发送者',
  'Username': '用户名',
  'Messages': '消息数',
  'Last Seen': '最后活跃',
  'Account:': '账户：',
  
  // ===== Tailscale 页面 =====
  'Tailscale': 'Tailscale',
  'Failed to fetch': '获取失败',
  'off': '关闭',
  'serve': '内网模式',
  'funnel': '公网模式',
  'Set up authentication': '设置认证',
  'Funnel exposes your gateway to the public internet. Make sure password authentication is configured.': 'Funnel 将您的网关暴露到公共互联网。请确保已配置密码认证。',
  'Enabling Funnel exposes moltis to the public internet. This code has not been security-audited. Use at your own risk.': '启用 Funnel 会将 moltis 暴露到公共互联网。此代码未经过安全审计。使用风险自负。',
  'Expose the gateway via Tailscale Serve (tailnet-only HTTPS) or Funnel (public HTTPS). The gateway stays bound to localhost; Tailscale proxies traffic to it.': '通过 Tailscale Serve（仅 tailnet HTTPS）或 Funnel（公共 HTTPS）暴露网关。网关保持绑定到 localhost；Tailscale 代理流量到它。',
  
  // ===== 安全页面补充 =====
  'Change Password': '更改密码',
  'Set Password': '设置密码',
  'Change password': '更改密码',
  'Set password': '设置密码',
  'Changing…': '更改中…',
  'Setting…': '设置中…',
  'Passkey name (e.g. MacBook Touch ID)': '通行密钥名称（例如：MacBook Touch ID）',
  'Key label (e.g. CLI tool)': '密钥标签（例如：CLI 工具）',
  'Key label (e.g, CLI tool)': '密钥标签（例如：CLI 工具）',
  
  // ===== 记忆页面补充（分段翻译） =====
  'Use the LLM to rerank search results for better relevance': '使用 LLM 重新排序搜索结果以获得更好的相关性',
  '(slower but more accurate).': '（较慢但更准确）。',
  'slower but more accurate': '较慢但更准确',
  'Export session transcripts to memory for cross-run recall of past conversations.': '将会话记录导出到记忆中，以便跨运行回忆过去的对话。',
  
  // ===== API 密钥描述（分段翻译） =====
  'API keys authenticate external tools and scripts connecting to moltis over the WebSocket protocol. Pass the key as the': 'API 密钥用于验证通过 WebSocket 协议连接到 moltis 的外部工具和脚本。将密钥作为',
  'field in the': '字段传递到',
  'object of the': '对象中的',
  'handshake.': '握手。',
  
  // ===== 钩子页面补充 =====
  'Events:': '事件：',
  'Priority:': '优先级：',
  'Timeout:': '超时：',
  'BeforeToolCall': '工具调用前',
  'AfterToolCall': '工具调用后',
  'OnMessage': '消息时',
  'OnSessionStart': '会话开始时',
  'OnSessionEnd': '会话结束时',
  
  // ===== MCP 页面补充（分段翻译） =====
  'Local stdio servers run with': '本地 stdio 服务器运行时使用',
  '. A malicious or compromised local server can read files, exfiltrate credentials, or execute commands.': '。恶意或受损的本地服务器可以读取文件、窃取凭据或执行命令。',
  
  // ===== 技能页面补充 =====
  'Disable all from this repo': '禁用此仓库的所有技能',
  
  // ===== 其他 =====
  'Mistral (Voxtral)': 'Mistral（Voxtral）',
  'ElevenLabs Scribe': 'ElevenLabs Scribe',
  'ElevenLabs': 'ElevenLabs',
  'OpenAI Whisper': 'OpenAI Whisper',
  'Google Speech-to-Text': 'Google 语音转文本',
  'Piper': 'Piper',
  'Coqui TTS': 'Coqui TTS',
  'Voxtral Local': 'Voxtral 本地',
  'Whisper CLI': 'Whisper CLI',
  'Sherpa ONNX': 'Sherpa ONNX',
  
  // ===== 其他 =====
  'Text-to-Speech': '文字转语音',
  'Speech-to-Text': '语音转文字',
  'TTS': 'TTS',
  'STT': 'STT',
  'Voice': '语音',
  'Recording': '录音中',
  'Processing': '处理中',
  
  // ===== 错误消息 =====
  'An error occurred': '发生错误',
  'Failed to load': '加载失败',
  'Failed to save': '保存失败',
  'Failed to delete': '删除失败',
  'Failed to connect': '连接失败',
  'Failed to update': '更新失败',
  'Failed to create': '创建失败',
  'Invalid input': '输入无效',
  'Required field': '必填字段',
  'Network error': '网络错误',
  'Server error': '服务器错误',
  'Permission denied': '权限被拒绝',
  'Not found': '未找到',
  'Already exists': '已存在',
  'Timeout': '超时',
  'Unknown error': '未知错误',
  'Something went wrong': '出了点问题',
  'Please try again': '请重试',
  'Operation failed': '操作失败',
  'Operation successful': '操作成功',
  'No data available': '无可用数据',
  'No results found': '未找到结果',
  'No items': '无项目',
  'Empty': '空',
  
  // ===== 确认对话框 =====
  'Are you sure?': '确定吗？',
  'This action cannot be undone': '此操作无法撤销',
  'Delete confirmation': '删除确认',
  'Clear confirmation': '清空确认',
  
  // ===== 时间相关 =====
  'just now': '刚刚',
  'ago': '前',
  'seconds': '秒',
  'minutes': '分钟',
  'hours': '小时',
  'days': '天',
  'weeks': '周',
  'months': '月',
  'years': '年',
  
  // ===== PWA 安装 =====
  'Install': '安装',
  'Install app': '安装应用',
  'Not now': '暂不安装',
  'Add to Home Screen': '添加到主屏幕',
  
  // ===== Tailscale =====
  'Tailscale': 'Tailscale',
  'Mode': '模式',
  'Hostname': '主机名',
  'URL': 'URL',
  'Installed': '已安装',
  'Not installed': '未安装',
  'Install Tailscale': '安装 Tailscale',
  'Re-check': '重新检查',
  'Serve': 'Serve',
  'Funnel': 'Funnel',
  'Off': '关闭',
  
  // ===== 语音提供商 =====
  'ElevenLabs': 'ElevenLabs',
  'OpenAI': 'OpenAI',
  'Google': 'Google',
  'Piper': 'Piper',
  'Coqui': 'Coqui',
  'Whisper': 'Whisper',
  'Groq': 'Groq',
  'Deepgram': 'Deepgram',
  'Mistral': 'Mistral',
  
  // ===== 状态标签 =====
  '活动': '活动',
  '用户': '用户',
  '内置': '内置',
  '可选': '可选',
  '内置（推荐）': '内置（推荐）',
  '向量': '向量',
  '回退': '回退',
  '重排序': '重排序',
  '批量': '批量',
  '缓存': '缓存',
  '依赖': '依赖',
  '类型': '类型',
  '后端': '后端',
  '前端': '前端',
  '服务': '服务',
  '客户端': '客户端',
  '服务器': '服务器',
  '本地': '本地',
  '远程': '远程',
  '公开': '公开',
  '私有': '私有',
  '共享': '共享',
  '个人': '个人',
  '团队': '团队',
  '组织': '组织',
  '企业': '企业',
  '免费': '免费',
  '付费': '付费',
  '试用': '试用',
  '订阅': '订阅',
  '永久': '永久',
  '临时': '临时',
  '草稿': '草稿',
  '发布': '发布',
  '归档': '归档',
  '删除': '删除',
  '恢复': '恢复',
  '备份': '备份',
  '同步': '同步',
  '导入': '导入',
  '导出': '导出',
  '上传': '上传',
  '下载': '下载',
  '安装': '安装',
  '卸载': '卸载',
  '更新': '更新',
  '升级': '升级',
  '降级': '降级',
  '回滚': '回滚',
  '迁移': '迁移',
  '部署': '部署',
  '发布': '发布',
  '撤销': '撤销',
  '重试': '重试',
  '跳过': '跳过',
  '忽略': '忽略',
  '警告': '警告',
  '错误': '错误',
  '成功': '成功',
  '失败': '失败',
  '待处理': '待处理',
  '处理中': '处理中',
  '已完成': '已完成',
  '已取消': '已取消',
  '已过期': '已过期',
  '已暂停': '已暂停',
  '已恢复': '已恢复',
  '已锁定': '已锁定',
  '已解锁': '已解锁',
  'Documentation': '文档',
  'Help': '帮助',
  'About': '关于',
  'Version': '版本',
  'License': '许可证',
  'Privacy': '隐私',
  'Terms': '条款',
  'Contact': '联系',
  'Feedback': '反馈',
  'Support': '支持',
  'Learn more': '了解更多',
  'Get started': '开始使用',
  'Quick start': '快速开始',
  'Tutorial': '教程',
  'Guide': '指南',
  'Examples': '示例',
  'FAQ': '常见问题',
  'Community': '社区',
  'Forum': '论坛',
  'Blog': '博客',
  'News': '新闻',
  'Updates': '更新',
  'Changelog': '更新日志',
  'Release notes': '发布说明',
  'What\'s new': '新功能',
  'Coming soon': '即将推出',
  'Beta': '测试版',
  'Experimental': '实验性',
  'Deprecated': '已弃用',
  'Legacy': '旧版',
  'Recommended': '推荐',
  'Popular': '热门',
  'Featured': '精选',
  'New': '新',
  'Updated': '已更新',
  'Latest': '最新',
  'Recent': '最近',
  'Older': '更早',
  'Archive': '归档',
  'Archived': '已归档',
  'Draft': '草稿',
  'Published': '已发布',
  'Private': '私有',
  'Public': '公开',
  'Shared': '已共享',
  'Owner': '所有者',
  'Admin': '管理员',
  'User': '用户',
  'Guest': '访客',
  'Online': '在线',
  'Offline': '离线',
  'Busy': '忙碌',
  'Away': '离开',
  'Available': '可用',
  'Unavailable': '不可用',
  'Active': '活动',
  'Inactive': '未活动',
  'Pending': '待处理',
  'In progress': '进行中',
  'Completed': '已完成',
  'Failed': '失败',
  'Cancelled': '已取消',
  'Paused': '已暂停',
  'Resumed': '已恢复',
  'Scheduled': '已计划',
  'Queued': '已排队',
  'Processing': '处理中',
  'Waiting': '等待中',
  'Ready': '就绪',
  'Starting': '启动中',
  'Stopping': '停止中',
  'Restarting': '重启中',
  'Updating': '更新中',
  'Installing': '安装中',
  'Uninstalling': '卸载中',
  'Downloading': '下载中',
  'Uploading': '上传中',
  'Syncing': '同步中',
  'Backing up': '备份中',
  'Restoring': '恢复中',
  'Migrating': '迁移中',
  'Optimizing': '优化中',
  'Cleaning': '清理中',
  'Validating': '验证中',
  'Testing': '测试中',
  'Building': '构建中',
  'Deploying': '部署中',
  'Success': '成功',
  'Warning': '警告',
  'Info': '信息',
  'Tip': '提示',
  'Note': '注意',
  'Important': '重要',
  'Caution': '小心',
  'Danger': '危险',
};

// 自动翻译函数
export function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  
  // 精确匹配
  if (zhTranslations[text]) {
    return zhTranslations[text];
  }
  
  // 去除首尾空格后匹配
  const trimmed = text.trim();
  if (zhTranslations[trimmed]) {
    return zhTranslations[trimmed];
  }
  
  // 规范化空白字符（将多个空格/换行/制表符替换为单个空格）后匹配
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (zhTranslations[normalized]) {
    return zhTranslations[normalized];
  }
  
  // 处理动态数字的模式匹配
  // 例如: "0 jobs" -> "0 个任务", "5 jobs" -> "5 个任务"
  const jobsMatch = text.match(/^(\d+)\s+jobs?$/);
  if (jobsMatch) {
    return `${jobsMatch[1]} 个任务`;
  }
  
  // 例如: "0 enabled" -> "0 个已启用", "5 enabled" -> "5 个已启用"
  const enabledMatch = text.match(/^(\d+)\s+enabled$/);
  if (enabledMatch) {
    return `${enabledMatch[1]} 个已启用`;
  }
  
  // 例如: "5 tools" -> "5 个工具", "1 tool" -> "1 个工具"
  const toolsMatch = text.match(/^(\d+)\s+tools?$/);
  if (toolsMatch) {
    return `${toolsMatch[1]} 个工具`;
  }
  
  // 处理 "Running • X jobs • Y enabled" 格式
  const statusMatch = text.match(/^(Running|Stopped)\s*•\s*(\d+)\s+jobs?\s*•\s*(\d+)\s+enabled$/);
  if (statusMatch) {
    const status = statusMatch[1] === 'Running' ? '运行中' : '已停止';
    return `${status} • ${statusMatch[2]} 个任务 • ${statusMatch[3]} 个已启用`;
  }
  
  // 处理 "X tool · ~Y tokens" 格式
  const toolTokenMatch = text.match(/^(\d+)\s+tools?\s*·\s*~(\d+)\s+tokens$/);
  if (toolTokenMatch) {
    return `${toolTokenMatch[1]} 个工具 · ~${toolTokenMatch[2]} 令牌`;
  }
  
  // 处理包含文件路径的文本（部分匹配）
  if (text.includes('Saved to') && text.includes('in your workspace root')) {
    for (const [key, value] of Object.entries(zhTranslations)) {
      if (key.includes('Saved to') && key.includes('in your workspace root')) {
        if (text.includes(key.split('.')[0].split(' ')[2])) { // 匹配文件名
          return value;
        }
      }
    }
  }
  
  // 返回原文
  return text;
}

// 翻译 DOM 元素
export function translateElement(element) {
  if (!element) return;
  
  // 跳过已翻译的元素
  if (element.hasAttribute('data-i18n-original')) return;
  
  // 翻译文本内容（只翻译纯文本节点，或包含简单内联元素的节点）
  if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
    const original = element.textContent.trim();
    if (!original) return;
    
    const translated = translateText(original);
    if (translated !== original) {
      element.textContent = translated;
      element.setAttribute('data-i18n-original', original);
    }
  } else if (element.childNodes.length > 1) {
    // 处理包含多个子节点的元素（如包含 <code> 标签的段落）
    // 收集所有文本内容（包括子元素的文本）
    const fullText = element.textContent.trim();
    if (!fullText) return;
    
    const translated = translateText(fullText);
    if (translated !== fullText && !element.hasAttribute('data-i18n-original')) {
      // 检查是否包含表单元素（input, textarea, select, button）
      const hasFormElements = element.querySelector('input, textarea, select, button');
      if (hasFormElements) {
        // 不要翻译包含表单元素的容器，避免破坏 DOM 结构
        return;
      }
      
      // 如果翻译后的文本不同，且不包含 HTML 标签，则替换
      // 注意：这会移除内部的 HTML 结构，所以只对简单情况使用
      const hasComplexStructure = element.querySelector('code, strong, em, b, i, a');
      if (!hasComplexStructure || element.querySelectorAll('*').length <= 2) {
        // 保存原始 HTML
        element.setAttribute('data-i18n-original', element.innerHTML);
        element.textContent = translated;
      }
    }
  }
  
  // 翻译 placeholder
  if (element.placeholder) {
    const original = element.placeholder;
    const translated = translateText(original);
    if (translated !== original) {
      element.placeholder = translated;
      element.setAttribute('data-i18n-placeholder-original', original);
    }
  }
  
  // 翻译 title
  if (element.title) {
    const original = element.title;
    const translated = translateText(original);
    if (translated !== original) {
      element.title = translated;
      element.setAttribute('data-i18n-title-original', original);
    }
  }
  
  // 翻译 aria-label
  if (element.getAttribute('aria-label')) {
    const original = element.getAttribute('aria-label');
    const translated = translateText(original);
    if (translated !== original) {
      element.setAttribute('aria-label', translated);
      element.setAttribute('data-i18n-aria-original', original);
    }
  }
}

// 翻译整个页面
export function translatePage() {
  // 设置语言属性
  document.documentElement.lang = 'zh-CN';
  
  // 翻译所有文本节点
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // 跳过 script 和 style 标签
        const parent = node.parentElement;
        if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
          return NodeFilter.FILTER_REJECT;
        }
        // 跳过空文本
        const text = node.textContent.trim();
        if (!text) {
          return NodeFilter.FILTER_REJECT;
        }
        // 跳过纯中文（已翻译）
        if (!/[a-zA-Z]/.test(text)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  const textNodes = [];
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node);
  }
  
  // 翻译所有文本节点
  textNodes.forEach(textNode => {
    const original = textNode.textContent.trim();
    if (!original) return;
    
    const translated = translateText(original);
    if (translated !== original) {
      textNode.textContent = translated;
      textNode.parentElement?.setAttribute('data-i18n-original', original);
    }
  });
  
  // 翻译属性（移除已翻译检查，允许重新翻译）
  document.querySelectorAll('[placeholder], [title], [aria-label]').forEach(el => {
    // 翻译 placeholder
    if (el.placeholder && !el.hasAttribute('data-i18n-placeholder-original')) {
      const original = el.placeholder;
      const translated = translateText(original);
      if (translated !== original) {
        el.setAttribute('data-i18n-placeholder-original', original);
        el.placeholder = translated;
      }
    }
    
    // 翻译 title
    if (el.title && !el.hasAttribute('data-i18n-title-original')) {
      const original = el.title;
      const translated = translateText(original);
      if (translated !== original) {
        el.setAttribute('data-i18n-title-original', original);
        el.title = translated;
      }
    }
    
    // 翻译 aria-label
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel && !el.hasAttribute('data-i18n-aria-original')) {
      const translated = translateText(ariaLabel);
      if (translated !== ariaLabel) {
        el.setAttribute('data-i18n-aria-original', ariaLabel);
        el.setAttribute('aria-label', translated);
      }
    }
  });
}

// 监听 DOM 变化，自动翻译新添加的元素
export function watchDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    let shouldTranslate = false;
    
    mutations.forEach((mutation) => {
      // 检查是否有新增节点
      if (mutation.addedNodes.length > 0) {
        shouldTranslate = true;
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 立即翻译新节点
            translateElement(node);
            
            // 翻译子元素
            const selectors = [
              'button:not([data-i18n-original])',
              'a:not([data-i18n-original])',
              'label:not([data-i18n-original])',
              'span:not(.icon):not([data-i18n-original])',
              'h1:not([data-i18n-original])',
              'h2:not([data-i18n-original])',
              'h3:not([data-i18n-original])',
              'p:not([data-i18n-original])',
              'div:not([data-i18n-original])',
              '[placeholder]:not([data-i18n-placeholder-original])',
              '[title]:not([data-i18n-title-original])',
            ];
            
            selectors.forEach(selector => {
              try {
                node.querySelectorAll?.(selector).forEach(translateElement);
              } catch (e) {
                // 忽略选择器错误
              }
            });
          }
        });
      }
    });
    
    // 如果有变化，延迟再翻译一次（确保 Preact 渲染完成）
    if (shouldTranslate) {
      setTimeout(() => {
        translatePage();
      }, 50);
      
      setTimeout(() => {
        translatePage();
      }, 200);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  
  return observer;
}

// 检查是否启用中文
export function isChineseEnabled() {
  // 从 localStorage 读取设置
  const setting = localStorage.getItem('moltis-language');
  if (setting) {
    return setting === 'zh' || setting === 'zh-CN';
  }
  
  // 检测浏览器语言
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith('zh');
}

// 初始化汉化
export function initI18n() {
  if (!isChineseEnabled()) {
    return;
  }
  
  console.log('🇨🇳 启用中文汉化');
  
  // 拦截 textContent 赋值，自动翻译
  interceptTextContent();
  
  // 拦截 innerHTML 赋值（用于 Preact/HTM）
  interceptInnerHTML();
  
  // 监听路由变化（SPA 页面切换）
  watchRouteChanges();
  
  // 页面加载完成后翻译
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      translatePage();
      watchDOMChanges();
      // 延迟翻译，确保 Preact 渲染完成
      setTimeout(translatePage, 100);
      setTimeout(translatePage, 500);
      setTimeout(translatePage, 1000);
    });
  } else {
    translatePage();
    watchDOMChanges();
    // 延迟翻译，确保 Preact 渲染完成
    setTimeout(translatePage, 100);
    setTimeout(translatePage, 500);
    setTimeout(translatePage, 1000);
  }
}

// 监听路由变化
function watchRouteChanges() {
  // 拦截 history.pushState（SPA 路由切换）
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    console.log('🔄 路由切换（pushState），重新翻译');
    // 延迟翻译，等待 Preact 渲染完成
    setTimeout(() => translatePage(), 50);
    setTimeout(() => translatePage(), 200);
    setTimeout(() => translatePage(), 500);
    setTimeout(() => translatePage(), 1000);
  };
  
  // 拦截 history.replaceState
  const originalReplaceState = history.replaceState;
  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    console.log('🔄 路由替换（replaceState），重新翻译');
    setTimeout(() => translatePage(), 50);
    setTimeout(() => translatePage(), 200);
    setTimeout(() => translatePage(), 500);
  };
  
  // 监听 popstate（浏览器前进后退）
  window.addEventListener('popstate', () => {
    console.log('🔄 浏览器导航（popstate），重新翻译');
    setTimeout(() => translatePage(), 50);
    setTimeout(() => translatePage(), 200);
    setTimeout(() => translatePage(), 500);
  });
  
  // 监听 hash 变化（以防万一）
  window.addEventListener('hashchange', () => {
    console.log('🔄 Hash 变化，重新翻译');
    setTimeout(() => translatePage(), 50);
    setTimeout(() => translatePage(), 200);
  });
}

// 拦截 textContent 赋值操作
function interceptTextContent() {
  const originalDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  
  Object.defineProperty(Node.prototype, 'textContent', {
    get: originalDescriptor.get,
    set: function(value) {
      // 如果是字符串且需要翻译
      if (typeof value === 'string' && value.trim()) {
        const translated = translateText(value);
        if (translated !== value) {
          // 保存原文
          this.setAttribute?.('data-i18n-original', value);
          originalDescriptor.set.call(this, translated);
          return;
        }
      }
      // 否则使用原始值
      originalDescriptor.set.call(this, value);
    },
    configurable: true,
  });
}

// 拦截 innerHTML 赋值操作（用于 Preact/HTM）
function interceptInnerHTML() {
  const originalDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  
  Object.defineProperty(Element.prototype, 'innerHTML', {
    get: originalDescriptor.get,
    set: function(value) {
      // 先设置原始值
      originalDescriptor.set.call(this, value);
      // 然后翻译子元素
      setTimeout(() => {
        translateElement(this);
        this.querySelectorAll('*').forEach(translateElement);
      }, 0);
    },
    configurable: true,
  });
}

// 切换语言
export function toggleLanguage() {
  const current = localStorage.getItem('moltis-language') || 'en';
  const next = current === 'zh' ? 'en' : 'zh';
  localStorage.setItem('moltis-language', next);
  window.location.reload();
}

// 强制重新翻译（用于调试）
export function forceRetranslate() {
  // 清除所有翻译标记
  document.querySelectorAll('[data-i18n-original]').forEach(el => {
    el.removeAttribute('data-i18n-original');
  });
  document.querySelectorAll('[data-i18n-placeholder-original]').forEach(el => {
    el.removeAttribute('data-i18n-placeholder-original');
  });
  document.querySelectorAll('[data-i18n-title-original]').forEach(el => {
    el.removeAttribute('data-i18n-title-original');
  });
  document.querySelectorAll('[data-i18n-aria-original]').forEach(el => {
    el.removeAttribute('data-i18n-aria-original');
  });
  
  // 重新翻译
  translatePage();
  
  console.log('🔄 强制重新翻译完成');
}

// 添加全局快捷键 Ctrl+Shift+T 强制翻译
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
      e.preventDefault();
      forceRetranslate();
    }
  });
  
  // 暴露到全局，方便控制台调用
  window.forceRetranslate = forceRetranslate;
}
