# Discord.js TypeScript Bot Template

[🇫🇷 Lire la documentation en français](README.fr.md)

> A clean, security-minded and performance-oriented Discord.js + TypeScript template built to start small and grow into a large, maintainable Discord bot.

A production-oriented foundation for developers who want **strong architecture, strict TypeScript, modular slash commands, automated command discovery, testing, CI, security checks and a clean runtime** without spending days building the foundation first.

## ✨ Why this template?

This project is designed around one idea:

**Keep the developer experience simple while keeping the architecture ready for growth.**

- ⚡ **Minimal Discord intents** for a lightweight gateway footprint
- 🧩 **Automatic command discovery** — add a command without editing a central registry
- 🗂️ **Domain-based command folders** ready for large projects
- 🧠 **Strict TypeScript** with strong compiler checks
- 🛡️ **Centralized permissions, cooldowns and error handling**
- 🧪 **Vitest tests** with coverage support
- 🔍 **ESLint + Prettier** for consistent code quality
- 🔄 **GitHub Actions CI** for linting, type checking, tests and builds
- 🔐 **Security-focused defaults**, Dependabot and CodeQL
- 🩺 **`/health` and `/ready` endpoints** for hosting and orchestration
- 🧹 **Clean structured logs** without noisy debug output
- 📴 **Graceful shutdown** for safer deployments
- 🚀 **Command deployment separated from bot startup**
- 📦 **Clear extension points** for services, databases, caching, queues and sharding later

The template intentionally avoids unnecessary complexity. You can clone it, add a command and start building immediately — while keeping a solid path toward a much larger architecture.

---

## 🏗️ Architecture

```text
src/
├── commands/
│   ├── administration/
│   ├── automation/
│   ├── configuration/
│   ├── economy/
│   ├── fun/
│   ├── information/
│   ├── moderation/
│   ├── owner/
│   ├── tickets/
│   └── utility/
│
├── config/             # Environment configuration and validation
├── events/             # Discord event registration
├── handlers/           # Command loading, registration and execution
├── types/              # Shared TypeScript contracts
├── utils/              # Logger, cooldowns and application errors
├── deploy.ts           # Slash command deployment
├── healthServer.ts     # Health/readiness HTTP server
└── index.ts            # Application entry point

test/                   # Automated tests
docs/                   # Extended documentation
.github/                # CI, security and contribution workflows
```

### Designed to evolve

The current structure is intentionally lightweight, but it leaves room for a larger architecture:

```text
Discord
   │
   ▼
Interaction Handler
   │
   ├── Guards / Permissions
   ├── Cooldowns
   └── Error Handling
          │
          ▼
       Commands
          │
          ▼
       Services
       ┌──┼─────────┐
       ▼  ▼         ▼
      DB Cache   External APIs
```

For very large deployments, the same foundation can evolve toward **PostgreSQL, Redis, background jobs, distributed coordination and Discord sharding** without forcing those components on every project from day one.

---

## ⚡ Performance-minded by design

This template does not claim that application code can eliminate Discord network latency. Discord gateway/API latency and the user's network are outside the bot's direct control.

Instead, the project focuses on the parts we can control:

- minimal gateway intents;
- no command REST synchronization on every bot restart;
- commands loaded once during startup;
- lightweight in-memory cooldowns;
- no unnecessary background polling;
- centralized handlers instead of duplicated interaction logic;
- clean startup and shutdown paths;
- optional health endpoints suitable for modern hosting platforms.

The goal is a **low-overhead foundation**, not artificial benchmark numbers.

---

## 🔒 Security

Security is treated as part of the architecture rather than an afterthought.

Included:

- secrets kept in environment variables;
- strict environment validation;
- minimal Discord intents;
- permission checks in code;
- cooldown support;
- user-safe error messages;
- internal error logging without exposing implementation details;
- Dependabot configuration;
- CodeQL workflow;
- restricted GitHub Actions permissions;
- `.gitignore` protection for local secrets and generated files.

See [`SECURITY.md`](SECURITY.md) for the security policy.

---

## 🚀 Getting started

### Requirements

- **Node.js 20.19+**
- A Discord application and bot token
- A Discord application client ID

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your environment file

Git Bash / macOS / Linux:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Then configure:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
```

For fast command deployment during development, you can also set:

```env
GUILD_ID=your_test_server_id
```

### 4. Validate the project

```bash
npm run typecheck
npm run build
```

### 5. Deploy slash commands

```bash
npm run deploy
```

Command deployment is intentionally separate from runtime startup. This avoids sending REST registration requests every time the bot restarts.

### 6. Start the bot

```bash
npm start
```

---

## 🛠️ Development

Run the bot directly from TypeScript:

```bash
npm run dev
```

Watch for source changes:

```bash
npm run dev:watch
```

Format the project:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run the full verification pipeline:

```bash
npm run verify
```

---

## 🤖 Included commands

| Command | Category | Purpose |
|---|---|---|
| `/ping` | Utility | Displays processing time and Discord gateway latency |
| `/clear` | Moderation | Deletes up to 100 recent messages with permission checks |

These commands are intentionally small examples. Their main purpose is to demonstrate how to build commands on top of the architecture.

---

## ➕ Adding a command

Choose a domain:

```text
src/commands/
├── administration/
├── automation/
├── configuration/
├── economy/
├── fun/
├── information/
├── moderation/
├── owner/
├── tickets/
└── utility/
```

Create a new TypeScript file inside the appropriate category.

For example:

```text
src/commands/moderation/warn.ts
```

Export a command as the default export.

The command loader discovers commands automatically, so you do **not** need to maintain a central command registry.

This keeps the project easy to extend as the number of commands grows.

---

## 🩺 Health checks

The built-in HTTP server exposes:

```text
GET /health
```

Returns `200` while the process is alive.

```text
GET /ready
```

Returns:

- `200` when the Discord client is ready;
- `503` before the bot is ready.

These endpoints are useful for Docker, Kubernetes, VPS monitoring and hosting platforms.

---

## 🧪 Quality gates

The project is designed around a simple verification pipeline:

```text
ESLint
   ↓
TypeScript
   ↓
Tests
   ↓
Build
```

Run everything with:

```bash
npm run verify
```

GitHub Actions runs the same core quality checks automatically.

---

## 📈 Built for growth

This repository is intentionally a **foundation**, not a finished all-in-one bot.

It can progressively grow toward:

- service-layer architecture;
- database repositories;
- PostgreSQL;
- Redis caching;
- distributed cooldowns and locks;
- background workers and queues;
- metrics and observability;
- localization;
- reusable UI components;
- automated event discovery;
- Discord sharding;
- Docker-based deployments;
- larger multi-service architectures.

The important part is that you do not need any of those systems to start.

**Start simple. Scale when the project actually needs it.**

---

## 📁 Project philosophy

The template follows a few principles:

**Simple by default**  
No unnecessary infrastructure is required to start.

**Strict where it matters**  
TypeScript, linting, validation and automated tests catch problems early.

**Modular by responsibility**  
Commands, events, handlers, configuration and utilities have clear boundaries.

**Secure by default**  
Secrets, permissions and error exposure are treated carefully.

**Ready to evolve**  
The architecture leaves clear extension points for larger bots.

**Readable first**  
A good template should help developers understand the project, not overwhelm them.

---

## 🤝 Contributing

Contributions, bug reports and architecture discussions are welcome.

Before opening a Pull Request:

```bash
npm install
npm run verify
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 📚 Documentation

Additional documentation is available in [`docs/`](docs/):

- [Architecture](docs/ARCHITECTURE.md)
- [Command categories](docs/COMMAND-CATEGORIES.md)
- [Commands](docs/COMMANDS.md)
- [Production](docs/PRODUCTION.md)

---

## 👤 Author

Created and maintained by **[Pt74bsx (Romain-Augusto)](https://github.com/Pt74bsx)**.

If this template helps you build your Discord bot, consider giving the repository a ⭐ — it helps the project reach more developers.

## 📄 License

MIT — see [`LICENSE`](LICENSE).

---

## ⭐ If this template helps you

If you use this template as the foundation of a Discord bot, consider giving the repository a **star**.

It helps the project get discovered by other Discord.js and TypeScript developers and makes future improvements easier to justify.

**Build your bot on a foundation that can grow with it.**
