'use client'

import {
  ArrowSquareOutIcon,
  CalendarIcon,
  CaretRightIcon,
  GitBranchIcon,
  StarIcon,
  TagIcon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { OsCard } from '@/components/ui/os-card'
import { PanelBadge } from '@/components/ui/panel-badge'
import { PanelHeader } from '@/components/ui/panel-header'
import { cn } from '@/lib/utils'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'active' | 'shipped' | 'archived' | 'in-progress'
  stars?: number
  lastUpdated: string
  tech: string[]
  commits?: number
  url?: string
}

const PROJECTS: Project[] = [
  {
    id: 'kranix-core',
    title: 'kranix-core',
    description: 'The orchestration engine — reconciliation loops, workload scheduling, state management, event routing, and policy enforcement. Merges Git, API, and AI intent into runtime actions. Never exposes HTTP; drives runtime and operator.',
    tags: ['reconciler', 'state', 'events'],
    status: 'active',
    stars: 0,
    lastUpdated: '2026-05-19',
    tech: ['Go', 'Reconciler', 'Event bus', 'Postgres/etcd'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-core',
  },
  {
    id: 'kranix-api',
    title: 'kranix-api',
    description: 'REST and gRPC front door for CLI, MCP, and integrations. Authentication (API keys, JWT, OIDC), validation, SSE log streaming, audit logs, dry-run, bulk ops, cursor pagination, and rate limiting. Delegates all business logic to core.',
    tags: ['REST', 'gRPC', 'auth'],
    status: 'active',
    stars: 0,
    lastUpdated: '2026-05-19',
    tech: ['Go', 'OpenAPI', 'SSE', 'gRPC'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-api',
  },
  {
    id: 'kranix-mcp',
    title: 'kranix-mcp',
    description: 'MCP server for Claude, GPT, and custom agents. Tools for deploy, logs, analyze, natural-language deploy, dry-run, autonomous healing, runbooks, multi-agent tasks, and per-agent audit. Safety boundaries block namespace/RBAC/secret abuse.',
    tags: ['MCP', 'AI agents', 'automation'],
    status: 'active',
    lastUpdated: '2026-05-19',
    tech: ['MCP', 'Go', 'SSE'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-mcp',
  },
  {
    id: 'kranix-cli',
    title: 'kranix-cli',
    description: 'Primary human interface — deploy, logs, analyze, restart, namespaces, manifest generation, context profiles (dev/staging/prod), doctor, port-forward. Pure API client; config in ~/.kranix/config.',
    tags: ['CLI', 'terminal'],
    status: 'active',
    lastUpdated: '2026-05-19',
    tech: ['Go', 'Cobra', 'JSON/YAML'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-cli',
  },
  {
    id: 'kranix-operator',
    title: 'kranix-operator',
    description: 'In-cluster GitOps bridge — watches KranixApp, KranixPolicy, KranixPipeline, KranixSecret, KranixDriftAlert CRDs. Canary/blue-green, federation, secret sync (Vault/AWS/Azure), drift alerts, admission webhooks.',
    tags: ['GitOps', 'CRD', 'controller'],
    status: 'active',
    lastUpdated: '2026-05-19',
    tech: ['controller-runtime', 'Helm', 'CRDs'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-operator',
  },
  {
    id: 'runtime-drivers',
    title: 'kranix-runtime',
    description: 'Runtime drivers invoked by core — Docker, Kubernetes, Podman, and remote bare-metal. Maps workload priority, spot tolerations, and cross-namespace NetworkPolicy to each backend.',
    tags: ['Docker', 'Kubernetes', 'drivers'],
    status: 'active',
    lastUpdated: '2026-05-19',
    tech: ['Go', 'Docker API', 'client-go'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-runtime',
  },
  {
    id: 'kranix-packages',
    title: 'kranix-packages',
    description: 'Shared domain types, RuntimeDriver interface, errors, auth, config. Public SDKs for Go, TypeScript, Python, and Rust. kranix-mock-api for tests without core.',
    tags: ['shared', 'types', 'sdk'],
    status: 'shipped',
    lastUpdated: '2026-05-19',
    tech: ['Go', 'TS', 'Python', 'Mock API'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-packages',
  },
  {
    id: 'kranix-charts',
    title: 'kranix-charts',
    description: 'Official Helm charts — umbrella install for core, api, operator, optional MCP. CRDs, RBAC, NetworkPolicies, HA profile, OpenTelemetry, ArgoCD app-of-apps template.',
    tags: ['Helm', 'Kubernetes', 'install'],
    status: 'shipped',
    lastUpdated: '2026-05-19',
    tech: ['Helm 3', 'K8s 1.27+'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-charts',
  },
  {
    id: 'kranix-examples',
    title: 'kranix-examples',
    description: 'Runnable quickstarts and reference architectures — Docker hello-world, Claude MCP agents, GitOps loops, IDP patterns, observability, ML inference, multi-cloud failover.',
    tags: ['examples', 'quickstart', 'reference'],
    status: 'shipped',
    lastUpdated: '2026-05-19',
    tech: ['Samples', 'GitOps', 'MCP'],
    commits: 0,
    url: 'https://github.com/kranix-io/kranix-examples',
  },
  {
    id: 'kranix-web',
    title: 'Kranix Web',
    description: 'This site — the Kranix IO control plane workspace. Documentation hub, platform overview, and developer portal built with the workspace UI template.',
    tags: ['web', 'docs', 'portal'],
    status: 'in-progress',
    lastUpdated: '2026-05-19',
    tech: ['Next.js', 'React', 'Tailwind'],
    commits: 0,
    url: 'https://kranix.prodevopsguytech.com',
  },
]

const STATUS_STYLES: Record<Project['status'], { bg: string, text: string, label: string }> = {
  'active': { bg: 'bg-emerald-500/15', text: 'text-emerald-500', label: 'ACTIVE' },
  'shipped': { bg: 'bg-blue-500/15', text: 'text-blue-500', label: 'SHIPPED' },
  'in-progress': { bg: 'bg-amber-500/15', text: 'text-amber-500', label: 'IN PROGRESS' },
  'archived': { bg: 'bg-zinc-500/15', text: 'text-zinc-500', label: 'ARCHIVED' },
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const [expanded, setExpanded] = useState(false)
  const status = STATUS_STYLES[project.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <OsCard className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-2">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-sm font-semibold text-foreground">{project.title}</h3>
              <span className={cn('rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-medium', status.bg, status.text)}>
                {status.label}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground pr-4">{project.description}</p>
          </div>
          {project.url && (
            <button className="shrink-0 p-1 text-muted-foreground opacity-0 transition-opacity hover:text-os-accent group-hover:opacity-100">
              <ArrowSquareOutIcon size={14} />
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 px-4 pb-2">
          {project.tags.map(tag => (
            <PanelBadge key={tag} icon={<TagIcon size={8} />}>
              {tag}
            </PanelBadge>
          ))}
        </div>

        {/* Expandable Details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-1 border-t border-os-border px-4 py-2 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <CaretRightIcon size={10} weight="bold" className={cn('transition-transform', expanded && 'rotate-90')} />
          Technical Details
        </button>

        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="border-t border-os-border bg-background/50 px-4 py-3 space-y-2"
          >
            <div className="grid grid-cols-2 gap-2">
              {project.tech.map(t => (
                <div key={t} className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-os-accent" />
                  {t}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-1 text-[10px] font-mono text-muted-foreground">
              {project.commits !== undefined && project.commits > 0 && (
                <span className="flex items-center gap-1">
                  <GitBranchIcon size={10} />
                  {project.commits}
                  {' '}
                  commits
                </span>
              )}
              {project.stars !== undefined && project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <StarIcon size={10} weight="fill" className="text-amber-400" />
                  {project.stars}
                </span>
              )}
              <span className="flex items-center gap-1">
                <CalendarIcon size={10} />
                {project.lastUpdated}
              </span>
            </div>
          </motion.div>
        )}
      </OsCard>
    </motion.div>
  )
}

export function ProjectsPanel() {
  const [filter, setFilter] = useState<Project['status'] | 'all'>('all')
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.status === filter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="os-scrollbar h-full overflow-y-auto p-6"
    >
      <div className="mx-auto max-w-4xl space-y-4">
        <PanelHeader
          path="workspace://projects"
          description={`${PROJECTS.length} platform modules registered`}
        />

        {/* Filters */}
        <div className="flex items-center gap-1">
          {(['all', 'active', 'in-progress', 'shipped', 'archived'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors',
                filter === f
                  ? 'bg-os-accent-muted text-os-accent font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-os-surface',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
