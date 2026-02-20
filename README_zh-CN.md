<div align="center">

<a href="https://moltis.org"><img src="https://raw.githubusercontent.com/moltis-org/moltis-website/main/favicon-512.svg" alt="Moltis" width="120"></a>

# Moltis

**用 Rust 编写的个人 AI 网关。单个二进制文件，无运行时，无 npm。**

[![CI](https://github.com/moltis-org/moltis/actions/workflows/ci.yml/badge.svg)](https://github.com/moltis-org/moltis/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/moltis-org/moltis/graph/badge.svg)](https://codecov.io/gh/moltis-org/moltis)
[![CodSpeed](https://img.shields.io/endpoint?url=https://codspeed.io/badge.json&style=flat&label=CodSpeed)](https://codspeed.io/moltis-org/moltis)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.91%2B-orange.svg)](https://www.rust-lang.org)

[功能特性](#功能特性) • [安装](#安装) • [构建](#构建) • [云部署](#云部署) • [工作原理](#工作原理) • [钩子](#钩子) • [贡献](CONTRIBUTING.md) • [Discord](https://discord.gg/XnmrepsXp5)

</div>

---

灵感来自 [OpenClaw](https://docs.openclaw.ai) — 构建并运行即可。

## 安装

```bash
# 一键安装脚本（macOS / Linux）
curl -fsSL https://www.moltis.org/install.sh | sh

# macOS / Linux 通过 Homebrew
brew install moltis-org/tap/moltis

# Docker（多架构：amd64/arm64）
docker pull ghcr.io/moltis-org/moltis:latest

# 或从源码构建
cargo install moltis --git https://github.com/moltis-org/moltis
```

## 功能特性

- **多提供商 LLM 支持** — 通过基于 trait 的提供商架构支持 OpenAI Codex、GitHub Copilot 和本地 LLM
- **流式响应** — 实时令牌流式传输，提供响应式用户体验，包括启用工具时（工具调用在参数到达时流式传输增量）
- **通信频道** — Telegram 集成，具有可扩展的频道抽象以添加其他频道
- **Web 网关** — HTTP 和 WebSocket 服务器，内置 Web UI
- **会话持久化** — 基于 SQLite 的对话历史、会话管理和每会话运行序列化，防止历史损坏
- **代理级超时** — 可配置的代理运行挂钟超时（默认 600 秒），防止失控执行
- **子代理委托** — `spawn_agent` 工具让 LLM 将任务委托给子代理循环，具有嵌套深度限制和工具过滤
- **消息队列模式** — `followup`（默认，将每个排队消息作为单独的运行重放）或 `collect`（连接并一次发送），当消息在活动运行期间到达时
- **工具结果清理** — 剥离 base64 数据 URI 和长十六进制块，在反馈给 LLM 之前截断过大的结果（可配置限制，默认 50 KB）
- **记忆和知识库** — 基于嵌入的长期记忆
- **技能** — 可扩展的技能系统，支持现有仓库
- **钩子系统** — 生命周期钩子，具有优先级排序、只读事件的并行调度、断路器、试运行模式、基于 HOOK.md 的发现、资格检查、捆绑钩子（boot-md、session-memory、command-logger）、CLI 管理（`moltis hooks list/info`）和用于在运行时编辑、启用/禁用和重新加载钩子的 Web UI
- **Web 浏览** — Web 搜索（Brave、Perplexity）和 URL 获取，具有可读性提取和 SSRF 保护
- **语音支持** — 文本转语音（TTS）和语音转文本（STT），支持多个云和本地提供商。从设置 UI 配置和管理语音提供商
- **计划任务** — 基于 cron 的任务执行
- **OAuth 流程** — 内置 OAuth2 用于提供商认证
- **TLS 支持** — 自动生成自签名证书
- **可观测性** — OpenTelemetry 跟踪，支持 OTLP 导出
- **MCP（模型上下文协议）支持** — 通过 stdio 或 HTTP/SSE（远程服务器）连接到 MCP 工具服务器，具有健康轮询、崩溃时自动重启（指数退避）和 UI 内服务器配置编辑
- **并行工具执行** — 当 LLM 在一轮中请求多个工具调用时，它们通过 `futures::join_all` 并发运行，减少延迟
- **沙箱执行** — Docker 和 Apple Container 后端，具有预构建镜像、可配置包和每会话隔离
- **认证** — 密码和通行密钥（WebAuthn）认证，具有会话 cookie、API 密钥支持和首次运行设置代码流程
- **端点限流** — 当强制执行认证时，对未经认证的流量进行内置的每 IP 请求限流，对密码登录尝试有严格限制，对 API/WS 流量有合理上限（达到限制时返回 `429` + `Retry-After`）
- **WebSocket 安全** — Origin 验证，防止跨站点 WebSocket 劫持（CSWSH）
- **入门向导** — 引导设置代理身份（名称、表情符号、生物、氛围、灵魂）和用户配置文件
- **配置验证** — `moltis config check` 验证配置文件，检测未知/拼写错误的字段并提供建议，报告安全警告
- **首次运行时的默认配置** — 写入包含所有默认值的完整 `moltis.toml`，因此你可以编辑包和设置而无需重新编译
- **每次安装的随机端口** — 每次全新安装都会选择一个唯一的可用端口，避免多个用户在同一台机器上运行 moltis 时发生冲突
- **零配置启动** — `moltis` 默认运行网关；无需子命令
- **可配置目录** — `--config-dir` / `--data-dir` CLI 标志和 `MOLTIS_CONFIG_DIR` / `MOLTIS_DATA_DIR` 环境变量
- **云部署** — Fly.io、DigitalOcean 和 Render 的一键部署配置，带有 `--no-tls` 标志用于云 TLS 终止
- **Tailscale 集成** — 通过 Tailscale Serve（私有 HTTPS）或 Funnel（公共 HTTPS）在你的 tailnet 上暴露网关，从 Web UI 进行状态监控和模式切换（可选的 `tailscale` 功能标志）

## 构建

```bash
# 克隆并构建
git clone https://github.com/moltis-org/moltis.git
cd moltis
cargo build --release

# 启动网关（gateway 是默认命令）
cargo run --release
```

打开 `https://moltis.localhost:3000`

### 使用 Docker 运行

Moltis 使用 Docker 进行沙箱命令执行 — 当 LLM 运行 shell 命令时，它们在隔离的容器内执行。当在容器中运行 Moltis 本身时，你需要让它访问主机的容器运行时。

```bash
# Docker / OrbStack
docker run -d \
  --name moltis \
  -p 13131:13131 \
  -p 13132:13132 \
  -v moltis-config:/home/moltis/.config/moltis \
  -v moltis-data:/home/moltis/.moltis \
  -v /var/run/docker.sock:/var/run/docker.sock \
  ghcr.io/moltis-org/moltis:latest

# Podman（无根）
podman run -d \
  --name moltis \
  -p 13131:13131 \
  -p 13132:13132 \
  -v moltis-config:/home/moltis/.config/moltis \
  -v moltis-data:/home/moltis/.moltis \
  -v /run/user/$(id -u)/podman/podman.sock:/var/run/docker.sock \
  ghcr.io/moltis-org/moltis:latest

# Podman（有根）
podman run -d \
  --name moltis \
  -p 13131:13131 \
  -p 13132:13132 \
  -v moltis-config:/home/moltis/.config/moltis \
  -v moltis-data:/home/moltis/.moltis \
  -v /run/podman/podman.sock:/var/run/docker.sock \
  ghcr.io/moltis-org/moltis:latest
```

在浏览器中打开 `https://localhost:13131` 并完成设置。

Moltis 在首次运行时生成自签名 TLS 证书。要信任它并消除浏览器警告，从 `http://localhost:13132/certs/ca.pem` 下载 CA 证书并将其添加到系统信任存储（macOS 上的钥匙串，Linux 上的 `update-ca-certificates`）。

**重要说明：**

- **需要挂载套接字** — 如果不挂载容器运行时套接字，Moltis 无法执行沙箱命令。代理仍然可以用于纯聊天交互，但任何运行 shell 命令的工具都会失败。
- **安全考虑** — 挂载 Docker 套接字使容器完全访问 Docker 守护进程。这对于 Moltis 创建沙箱容器是必要的。仅运行来自可信来源的 Moltis 容器。
- **OrbStack** — 与 Docker 工作方式相同；使用相同的套接字路径（`/var/run/docker.sock`）。
- **Podman** — Moltis 使用 Docker API（Podman 的兼容层）与 Podman 套接字通信。根据你的设置使用无根套接字路径（`/run/user/$(id -u)/podman/podman.sock`）或有根路径（`/run/podman/podman.sock`）。你可能需要启用 Podman 套接字服务：`systemctl --user enable --now podman.socket`
- **持久化** — 挂载卷以在容器重启时保留数据：
  - `/home/moltis/.config/moltis` — 配置（moltis.toml、mcp-servers.json）
  - `/home/moltis/.moltis` — 数据（数据库、会话、记忆）

## 云部署

将预构建的 Docker 镜像部署到你喜欢的云提供商：

| 提供商 | 部署 |
|----------|--------|
| DigitalOcean | [![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/moltis-org/moltis/tree/main) |

**Fly.io**（CLI）：

```bash
fly launch --image ghcr.io/moltis-org/moltis:latest
fly secrets set MOLTIS_PASSWORD="your-password"
```

所有云配置都使用 `--no-tls`，因为提供商处理 TLS 终止。有关每个提供商的设置详细信息、持久存储说明和认证，请参阅[云部署文档](https://docs.moltis.org/cloud-deploy.html)。

## 工作原理

Moltis 是一个**本地优先的 AI 网关** — 一个位于你和多个 LLM 提供商之间的单个 Rust 二进制文件。一切都在你的机器上运行；不需要云中继。

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Web UI    │  │  Telegram   │  │  Discord    │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────┬───────┴────────┬───────┘
                │   WebSocket    │
                ▼                ▼
        ┌─────────────────────────────────┐
        │          网关服务器              │
        │   (Axum · HTTP · WS · Auth)     │
        ├─────────────────────────────────┤
        │        聊天服务                  │
        │  ┌───────────┐ ┌─────────────┐  │
        │  │   代理    │ │    工具     │  │
        │  │   运行器  │◄┤   注册表    │  │
        │  └─────┬─────┘ └─────────────┘  │
        │        │                        │
        │  ┌─────▼─────────────────────┐  │
        │  │    提供商注册表            │  │
        │  │  多个提供商                │  │
        │  │  (Codex · Copilot · Local)│  │
        │  └───────────────────────────┘  │
        ├─────────────────────────────────┤
        │  会话     │ 记忆    │  钩子     │
        │  (JSONL)  │ (SQLite)│ (events)  │
        └─────────────────────────────────┘
                       │
               ┌───────▼───────┐
               │    沙箱       │
               │ Docker/Apple  │
               │  Container    │
               └───────────────┘
```

### 网关启动

当 `moltis gateway` 运行时，它加载 `moltis.toml`，初始化凭据存储（密码、通行密钥、API 密钥），注册 LLM 提供商和工具，发现钩子和技能，可选地启动记忆管理器，并在配置时预构建沙箱镜像。然后 Axum HTTP 服务器监听 WebSocket 和 REST 连接。

### 消息流程

1. **连接** — 客户端（Web UI、Telegram 机器人、API 密钥持有者）打开 WebSocket。服务器验证认证和 Origin 头，然后分配连接 ID。
2. **发送** — 客户端调用 `chat.send` RPC 方法，带有消息文本和可选的模型覆盖。网关解析会话，将用户消息持久化到 JSONL 文件，加载对话历史，并构建系统提示（代理身份、项目上下文、发现的技能）。
3. **代理循环** — 如果所选提供商支持工具调用，则运行代理循环（最多 25 次迭代）。每次迭代调用 LLM，检查响应中的工具调用，触发 `BeforeToolCall` / `AfterToolCall` 钩子，在沙箱内执行工具，附加结果，并循环直到 LLM 产生最终文本答案。如果工具不可用，提供商直接流式传输令牌。
4. **广播** — 每个步骤（思考、工具开始/结束、文本增量、最终响应）都作为序列化事件通过 WebSocket 广播。Web UI 实时渲染它们。
5. **频道回复** — 如果消息来自 Telegram 或其他频道，最终响应将通过该频道的出站接口传递回去。

### 会话和记忆

对话存储为 `~/.moltis/agents/<agent>/sessions/` 下的仅追加 JSONL 文件。SQLite 数据库跟踪元数据（消息计数、模型选择、项目绑定、频道绑定）。当令牌使用接近上下文窗口的 95% 时，会话会自动压缩：历史被总结，重要事实被持久化到记忆存储。

可选的记忆管理器监视 `memory/` 目录中的 Markdown 文件，按标题分块，嵌入块，并将向量存储在 SQLite 中以进行混合（向量 + 全文）搜索。记忆上下文会自动注入系统提示。

### 钩子

生命周期钩子让你在关键点观察、修改或阻止操作。修改事件（`BeforeToolCall`、`BeforeCompaction`、`MessageSending`）按顺序运行 — 钩子可以重写参数或阻止执行。只读事件（`AfterToolCall`、`SessionEnd`、`GatewayStart`、…）并行运行。钩子从 `HOOK.md` 文件中发现，并包括在重复失败后自动禁用的断路器。

### 安全模型

Moltis 在多个层面应用纵深防御：

- **认证** — 首次运行时，一次性设置代码打印到终端。用户输入它以设置密码或注册 WebAuthn 通行密钥。后续请求通过会话 cookie 或 API 密钥持有者令牌进行认证。来自环回地址（localhost、127.0.0.1、::1）的连接允许无凭据访问，作为本地使用的安全默认值。
- **WebSocket Origin 验证** — WebSocket 升级处理程序拒绝跨源请求，以防止跨站点 WebSocket 劫持（CSWSH）。恶意网页无法从浏览器连接到你的本地网关。
- **SSRF 保护** — `web_fetch` 工具在发出 HTTP 请求之前解析 DNS，并阻止环回、私有、链路本地或 CGNAT 范围内的任何目标 IP。这防止 LLM 访问内部服务。
- **密钥处理** — 密码、API 密钥和令牌存储为 `secrecy::Secret<String>`，它会编辑 `Debug` 输出，防止意外 `Display`，并在丢弃时清零内存。注入到沙箱会话的环境变量值从命令输出中编辑（包括 base64 和十六进制编码形式）。
- **无不安全代码** — `unsafe_code` 在整个工作区被拒绝。唯一的例外是 `local-embeddings` 功能标志后面的可选 FFI 包装器。
- **钩子门控** — `BeforeToolCall` 钩子可以在任何工具调用执行之前检查、修改或阻止它，为你提供一个可编程的策略层，控制代理被允许做什么。

### 沙箱执行

用户命令永远不会直接在主机上运行。它们在使用 Docker 或 Apple Container 作为后端的隔离容器内执行。

在启动时，网关从配置的基础镜像（默认为 `ubuntu:25.10`）和 `moltis.toml` 中的包列表构建确定性镜像。镜像标签是基础镜像 + 排序包的哈希 — 如果你添加或删除包，标签会更改，并自动触发重建。

每个命令调用都会获得一个每会话容器。为代理配置的环境变量被注入到容器中，但它们的值从 LLM 看到的任何输出中编辑（纯文本、base64 和十六进制形式），以防止通过工具结果泄漏密钥。

## 入门

### 构建

```bash
cargo build              # 调试构建
cargo build --release    # 优化构建
```

### 运行

```bash
cargo run                # 启动网关服务器（默认命令）
```

首次运行时，设置代码打印到终端。打开 Web UI 并输入此代码以设置密码或注册通行密钥。

可选标志：

```bash
cargo run -- --config-dir /path/to/config --data-dir /path/to/data
```

### 测试

```bash
cargo test --all-features
```

## 钩子

Moltis 包含一个钩子调度系统，让你使用原生 Rust 处理程序或外部 shell 脚本对生命周期事件做出反应。钩子可以观察、修改或阻止操作。

### 事件

`BeforeToolCall`、`AfterToolCall`、`BeforeAgentStart`、`AgentEnd`、`MessageReceived`、`MessageSending`、`MessageSent`、`BeforeCompaction`、`AfterCompaction`、`ToolResultPersist`、`SessionStart`、`SessionEnd`、`GatewayStart`、`GatewayStop`、`Command`

### 钩子发现

钩子从这些目录中的 `HOOK.md` 文件中发现（优先级顺序）：

1. `<workspace>/.moltis/hooks/<name>/HOOK.md` — 项目本地
2. `~/.moltis/hooks/<name>/HOOK.md` — 用户全局

每个 `HOOK.md` 使用 TOML 前置内容：

```toml
+++
name = "my-hook"
description = "它做什么"
events = ["BeforeToolCall"]
command = "./handler.sh"
timeout = 5

[requires]
os = ["darwin", "linux"]
bins = ["jq"]
env = ["SLACK_WEBHOOK_URL"]
+++
```

### CLI

```bash
moltis hooks list              # 列出所有发现的钩子
moltis hooks list --eligible   # 仅显示符合条件的钩子
moltis hooks list --json       # JSON 输出
moltis hooks info <name>       # 显示钩子详细信息
```

### 捆绑钩子

- **boot-md** — 在 `GatewayStart` 时从工作区读取 `BOOT.md`
- **session-memory** — 在 `/new` 命令时保存会话上下文
- **command-logger** — 将所有 `Command` 事件记录到 JSONL

### Shell 钩子协议

Shell 钩子通过 stdin 接收事件负载作为 JSON，并通过退出代码和 stdout 传达其操作：

| 退出代码 | Stdout | 操作 |
|-----------|--------|--------|
| 0 | （空） | 继续 |
| 0 | `{"action":"modify","data":{...}}` | 替换负载数据 |
| 1 | — | 阻止（stderr 用作原因） |

### 配置

```toml
[hooks]
[[hooks.hooks]]
name = "audit-tool-calls"
command = "./examples/hooks/log-tool-calls.sh"
events = ["BeforeToolCall"]

[[hooks.hooks]]
name = "block-dangerous"
command = "./examples/hooks/block-dangerous-commands.sh"
events = ["BeforeToolCall"]
timeout = 5

[[hooks.hooks]]
name = "notify-discord"
command = "./examples/hooks/notify-discord.sh"
events = ["SessionEnd"]
env = { DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/..." }
```

有关即用型脚本（日志记录、阻止危险命令、内容过滤、代理指标、消息审计跟踪、Slack/Discord 通知、密钥编辑、会话保存），请参阅 `examples/hooks/`。

### 沙箱镜像管理

```bash
moltis sandbox list          # 列出预构建的沙箱镜像
moltis sandbox build         # 从配置的基础 + 包构建镜像
moltis sandbox clean         # 删除所有预构建的沙箱镜像
moltis sandbox remove <tag>  # 删除特定镜像
```

网关在启动时从基础镜像（`ubuntu:25.10`）加上 `moltis.toml` 中列出的包预构建沙箱镜像。编辑 `[tools.exec.sandbox] packages` 列表并重启 — 具有不同标签的新镜像会自动构建。

## 项目结构

Moltis 组织为 Cargo 工作区，包含以下 crate：

| Crate | 描述 |
|-------|-------------|
| `moltis` | 命令行界面和入口点 |
| `moltis-gateway` | HTTP/WebSocket 服务器和 Web UI |
| `moltis-agents` | LLM 提供商集成 |
| `moltis-channels` | 通信频道抽象 |
| `moltis-telegram` | Telegram 集成 |
| `moltis-config` | 配置管理 |
| `moltis-sessions` | 会话持久化 |
| `moltis-memory` | 基于嵌入的知识库 |
| `moltis-skills` | 技能/插件系统 |
| `moltis-mcp` | MCP 客户端、传输和工具桥接 |
| `moltis-plugins` | 插件格式、钩子处理程序和 shell 钩子运行时 |
| `moltis-tools` | 工具/函数执行 |
| `moltis-routing` | 消息路由 |
| `moltis-projects` | 项目/工作区管理 |
| `moltis-onboarding` | 入门向导和身份管理 |
| `moltis-oauth` | OAuth2 流程 |
| `moltis-protocol` | 可序列化协议定义 |
| `moltis-common` | 共享实用程序 |

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=moltis-org/moltis&type=date&legend=top-left)](https://www.star-history.com/#moltis-org/moltis&type=date&legend=top-left)

## 许可证

MIT
