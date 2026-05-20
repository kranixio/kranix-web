# Kranix Web

<div align="center">

<img src="public/sitebanner.png" alt="Kranix IO — AI-native Control Plane" width="100%" />

</div>

Official website and developer workspace UI for [Kranix IO](https://kranix.prodevopsguytech.com) — an open-source, AI-native control plane for Docker and Kubernetes.

Built as an IDE-inspired workspace: panel navigation, explorer sidebar, integrated terminal, command palette, and MDX-powered docs.

**Live site:** [https://kranix.prodevopsguytech.com](https://kranix.prodevopsguytech.com)

---

## About Kranix IO

Kranix gives you a single interface to deploy, manage, debug, and heal container infrastructure — whether you are running a local Docker container, a `kind` cluster, or production Kubernetes.

- **MCP-compatible** — AI agents operate infrastructure through the same API as the CLI
- **GitOps-native** — `KranixApp` manifests reconciled from Git
- **Multi-backend** — Docker, Kubernetes, Podman, and remote nodes

Learn more: [github.com/kranix-io](https://github.com/kranix-io) · [Documentation](https://kranix.prodevopsguytech.com/writing) · [Discussions](https://github.com/kranix-io/.github/discussions)

---

## Kranix ecosystem

Kranix is split into focused repositories. Each layer has a single responsibility; nothing touches infrastructure except through the stack below.

```
kranix-cli  ──┐
kranix-mcp  ──┼──►  kranix-api  ──►  kranix-core  ──►  kranix-runtime
             │              │              │
             │              │              ├──►  kranix-operator
             │              │              └──►  kranix-packages (shared types)
             │              │
kranix-web  ─┘         (this repo — docs & portal UI)
```

| Repository | Role |
|------------|------|
| [kranix-core](https://github.com/kranix-io/kranix-core) | Orchestration engine — reconciliation, scheduling, state, events |
| [kranix-api](https://github.com/kranix-io/kranix-api) | REST / gRPC front door — auth, validation, streaming |
| [kranix-runtime](https://github.com/kranix-io/kranix-runtime) | Docker / Kubernetes / remote node drivers |
| [kranix-operator](https://github.com/kranix-io/kranix-operator) | GitOps operator — `KranixApp`, `KranixPolicy`, `KranixSecret` CRDs |
| [kranix-cli](https://github.com/kranix-io/kranix-cli) | Human-facing CLI — deploy, logs, analyze, diff, rollback |
| [kranix-mcp](https://github.com/kranix-io/kranix-mcp) | MCP server for AI agents |
| [kranix-packages](https://github.com/kranix-io/kranix-packages) | Shared types, SDKs (Go/TS/Python/Rust), mock API |
| [kranix-charts](https://github.com/kranix-io/kranix-charts) | Helm charts — install full platform on Kubernetes |
| [kranix-examples](https://github.com/kranix-io/kranix-examples) | Quickstarts, AI agent samples, GitOps, reference architectures |
| **kranix-web** | This repo — docs portal and workspace UI |

Full docs for each layer live on the site under **Writing** (`/writing/kranix-*`) or in each repo’s README.

---

## kranix-core

> The orchestration engine — state, scheduling, and reconciliation for the Kranix platform.

`kranix-core` is the brain of the ecosystem. It owns all business logic: reconciliation loops, workload scheduling, state management, event routing, and policy enforcement. Every other repo either sends work *into* core or gets driven *by* core.

### Responsibilities

- Maintains **desired vs actual state** for all managed workloads
- Runs continuous **reconciliation** (Git intent → runtime state)
- Schedules deployments across backends via **kranix-runtime**
- Routes events between API and runtime drivers on a typed **event bus**
- Enforces policies: resource limits, namespace isolation, rollout rules, workload priority, cron gates, aggregate quotas
- Supports **drift detection**, **event sourcing**, **health gates**, **circuit breakers**, and **warm standby**

### Reconciliation loop

```
Observe current state  →  Compare to desired  →  Compute diff  →  Apply  →  repeat
```

Desired state is merged from three sources:

| Source | Examples |
|--------|----------|
| Git manifests | `KranixApp` CRDs in a repo |
| API intent | `POST /deploy` from CLI or MCP |
| AI intent | Agent actions via kranix-mcp |

### Workload model (high level)

Every managed unit is a `Workload` with `spec`, `status`, and immutable `history`. Notable spec areas:

- **Cron** — five-field schedule, timezone, concurrency policy (`allow` / `forbid` / `replace`)
- **Scheduling** — `workload_priority` (`critical` \| `high` \| `normal` \| `low`), spot/preemption hints
- **Quotas** — hard aggregate CPU/memory/workload limits per namespace or team (`kranix.io/team`)
- **Cross-namespace traffic** — peer namespace allow lists for NetworkPolicy
- **Rollback history** — versioned spec snapshots for instant revert
- **Circuit breaker & warm standby** — open circuit can auto-promote a linked standby workload
- **Secret rotation** — dependents marked `pending_restart` when secrets rotate

### Event flow (example)

```
API receives request
  → WorkloadDeployRequested
    → WorkloadScheduled
      → Runtime executes
        → WorkloadRunning / WorkloadFailed
```

### Run locally

```bash
git clone https://github.com/kranix-io/kranix-core
cd kranix-core
go mod download
go run ./cmd/core --config ./config/local.yaml
```

---

## kranix-api

> REST / gRPC interface — the unified entry point for all Kranix clients.

`kranix-api` is intentionally **thin**: no scheduling or policy logic lives here. It authenticates clients, validates requests, and delegates to **kranix-core**.

```
kranix-cli  ──┐
kranix-mcp  ──┼──►  kranix-api  ──►  kranix-core
```

### Responsibilities

- Versioned **REST** (`/api/v1/...`) and **gRPC**
- **Authentication** — API keys (`krane_...`), JWT, OIDC
- Request validation — cron, GPU, cross-namespace traffic, workload priority
- **SSE / gRPC streams** for logs and live events
- **Audit logs** for every mutating action
- **Rate limiting** and namespace quotas
- **Dry-run** — `?dryRun=true` previews changes without applying
- **Cursor pagination**, bulk ops, workload diff, changelog breaking-change notifications

### Base URL (local)

```
http://localhost:8080/api/v1
```

### Key endpoints

| Area | Examples |
|------|----------|
| Workloads | `POST /workloads`, `GET /workloads`, `PATCH /workloads/:id`, `POST /workloads/:id/restart` |
| Pods | `GET /workloads/:id/pods`, `GET /pods/:id/logs` (SSE) |
| Analysis | `GET /workloads/:id/analyze`, `POST /manifests/generate` |
| Quotas | `GET/PUT /api/v1/quotas/{namespace}`, usage endpoints |
| Streaming | `GET /api/sse` — live workload events |
| Audit | `GET /api/v1/audit`, resource history merged with core event sourcing |
| Bulk | `POST /api/v1/workloads/bulk` — deploy / restart / delete in one call |

### Authentication

```http
Authorization: Bearer <token>
```

| Type | Use case |
|------|----------|
| API key (`krane_...`) | CI/CD, service accounts |
| JWT | Human users via kranix-cli |
| OIDC | SSO / enterprise IdP |

Optional **IP allowlist** on API keys (`allowedIps` at creation time).

### Run locally

```bash
git clone https://github.com/kranix-io/kranix-api
cd kranix-api
go mod download
go run ./cmd/api --config ./config/local.yaml
```

### Mock API (no core required)

For **kranix-web**, CLI, or MCP client development:

```bash
cd ../kranix-packages
go run ./cmd/kranix-mock-api -addr :18080 -skip-auth=true
```

Point clients at `http://localhost:18080`.

---

## kranix-runtime

> Infrastructure drivers — Docker, Kubernetes, Podman, Compose, remote nodes.

Driven only by **kranix-core**. Implements `RuntimeDriver` from kranix-packages. Maps cron → CronJob, priority → PriorityClass, spot tolerations, and cross-namespace NetworkPolicy on Kubernetes.

| Backend | Status |
|---------|--------|
| Docker | Stable |
| Kubernetes | Stable |
| Podman / Compose | Stable |
| Remote SSH | Beta |

[github.com/kranix-io/kranix-runtime](https://github.com/kranix-io/kranix-runtime)

---

## kranix-operator

> GitOps bridge — `KranixApp`, `KranixPolicy`, `KranixPipeline`, `KranixSecret`, `KranixDriftAlert` CRDs.

Watches CRDs in-cluster, forwards to core, writes status back to `.status`. Supports canary/blue-green, federation, secret sync (Vault/AWS/Azure), drift alerts, and admission webhooks.

```yaml
apiVersion: kranix.io/v1alpha1
kind: KranixApp
metadata:
  name: api-server
spec:
  image: myorg/api:v1.4.2
  replicas: 3
```

[github.com/kranix-io/kranix-operator](https://github.com/kranix-io/kranix-operator)

---

## kranix-cli

> Human terminal UX — pure API client.

```bash
kranix login --server http://localhost:8080 --api-key krane_...
kranix deploy --name my-app --image nginx:latest
kranix logs my-app --follow
kranix analyze my-app
kranix context profile switch staging
```

Install: `brew install kranix-io/tap/kranix` or `curl -fsSL https://get.kranix.io | sh`

[github.com/kranix-io/kranix-cli](https://github.com/kranix-io/kranix-cli)

---

## kranix-mcp

> MCP server for AI agents (Claude, GPT, custom).

Exposes `deploy_workload`, `stream_logs`, `analyze_workload`, `natural_language_deploy`, dry-run, healing, runbooks, multi-agent tasks, and per-agent audit. Agents cannot modify namespaces, RBAC, or read secrets directly.

```bash
KRANIX_API_URL=http://localhost:8080 KRANIX_API_KEY=... kranix-mcp start
```

[github.com/kranix-io/kranix-mcp](https://github.com/kranix-io/kranix-mcp)

---

## kranix-packages

> Shared SDK — types, `RuntimeDriver` interface, auth, errors, multi-language clients.

No business logic. Includes `kranix-mock-api` for local testing. All repos depend on packages; packages depend on nothing else in the ecosystem.

[github.com/kranix-io/kranix-packages](https://github.com/kranix-io/kranix-packages)

---

## kranix-charts

> Helm — one-command platform install on Kubernetes.

```bash
helm repo add kranix https://charts.kranix.io
helm install kranix kranix/kranix -n kranix-system --create-namespace
```

Umbrella chart: core + api + operator + optional MCP + CRDs + RBAC. Standalone sub-charts available.

[github.com/kranix-io/kranix-charts](https://github.com/kranix-io/kranix-charts)

---

## kranix-examples

> Runnable examples — quickstart → production blueprints.

| Path | Use case |
|------|----------|
| `quickstart/docker-hello-world` | First deploy without Kubernetes |
| `ai-agents/claude-deploy-app` | MCP + Claude |
| `gitops/single-app-gitops` | KranixApp GitOps loop |
| `reference-architectures/microservices-platform` | Full platform pattern |

```bash
git clone https://github.com/kranix-io/kranix-examples
```

[github.com/kranix-io/kranix-examples](https://github.com/kranix-io/kranix-examples)

---

## This repository (kranix-web)

`kranix-web` is **not** part of the runtime control plane. It is the public face of the project:

- Workspace UI (overview, projects, experiments, writing, notes, gallery, activity, contact)
- MDX documentation served under `/writing` and `/notes`
- SEO metadata, sitemap, and PWA manifest for [kranix.prodevopsguytech.com](https://kranix.prodevopsguytech.com)

### Tech stack (this repo)

| Layer | Tools |
|--------|--------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19, [Tailwind CSS](https://tailwindcss.com/) 4 |
| Content | [Fumadocs MDX](https://fumadocs.dev/) |
| State | [Zustand](https://zustand.docs.pmnd.rs/) |
| Motion | [Motion](https://motion.dev/) |
| Icons | [Phosphor Icons](https://phosphoricons.com/) |

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+

### Getting started

```bash
git clone https://github.com/kranix-io/kranix-web.git
cd kranix-web
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build      # Production build
pnpm start      # Serve production build
pnpm lint       # Run ESLint
pnpm lint:fix   # Auto-fix lint issues
```

### Project structure

```
kranix-web/
├── content/
│   ├── writing/          # Guides (Fumadocs MDX)
│   └── notes/            # Architecture notes
├── public/               # sitebanner.png, fonts, favicons
├── src/
│   ├── app/              # Next.js routes & metadata
│   ├── components/panels/
│   └── components/workspace/
└── source.config.ts
```

### Workspace panels

| Route | Purpose |
|-------|---------|
| `/overview` | Platform dashboard |
| `/projects` | All 10 ecosystem repos (core, api, runtime, operator, cli, mcp, packages, charts, examples, web) |
| `/experiments` | Roadmap & research |
| `/writing` | MDX docs |
| `/notes` | Internal architecture |
| `/gallery` | Diagrams & visuals |
| `/activity` | Dev activity feed |
| `/contact` | Links & install |

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Command palette |
| Terminal `help` | Built-in shell commands |

### Adding documentation

Add MDX under `content/writing/`:

```mdx
---
title: My Guide
description: Short summary
date: 2026-05-19
tags: ["api", "core"]
category: "Platform"
---
```

### Deployment

```bash
pnpm build
pnpm start
```

Production URLs are configured in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts` (`https://kranix.prodevopsguytech.com`).

### Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_VERSION` | From `package.json` via `next.config.ts` |

---

## Design principles (platform-wide)

1. Every **CLI** action is available via the **API**
2. Every **API** action can be exposed as an **MCP** tool
3. **Git** is the source of truth for declared state (with API/AI overlay)
4. **Composable** — use only the layers you need (MCP standalone, drivers without K8s, etc.)

---

## License

[MIT](./LICENSE) — Copyright (c) 2026 KranixIO
