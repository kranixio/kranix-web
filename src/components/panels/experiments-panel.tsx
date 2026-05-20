'use client'

import { CalendarIcon, FlaskIcon, LightningIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Experiment {
  id: string
  title: string
  description: string
  status: 'running' | 'completed' | 'paused' | 'planned'
  date: string
  category: string
  findings?: string
}

const EXPERIMENTS: Experiment[] = [
  { id: 'exp-001', title: 'MCP Agent Permission Scopes', description: 'Defining read-only, write, and admin scopes per AI agent with enforced boundaries at the API layer.', status: 'running', date: '2026-05-14', category: 'MCP', findings: 'Scope enforcement blocks 100% of out-of-policy agent actions in integration tests.' },
  { id: 'exp-002', title: 'GitOps Reconciliation Loop', description: 'KranixApp CRD picked up from Git with continuous drift detection and automatic convergence to declared spec.', status: 'running', date: '2026-05-14', category: 'GitOps', findings: 'Reconcile latency under 5s for single-namespace workloads in kind clusters.' },
  { id: 'exp-003', title: 'AI-Powered Workload Analysis', description: 'kranix analyze reasons over full runtime state — crash reason, resource bottleneck, failing dependency — and generates applicable patches.', status: 'running', date: '2026-05-10', category: 'AI', findings: 'Patch generation succeeds for OOM and image-pull failures in 78% of test cases.' },
  { id: 'exp-004', title: 'Multi-Backend Deploy Abstraction', description: 'Single deploy command targeting Docker locally, Kubernetes clusters, and remote bare-metal nodes via runtime driver layer.', status: 'completed', date: '2026-04-22', category: 'Runtime', findings: 'Backend switching adds under 200ms overhead per deploy invocation.' },
  { id: 'exp-005', title: 'Dry-Run Mode for AI Agents', description: 'Preview what an MCP-connected agent would do before it acts — full diff of intended state changes.', status: 'running', date: '2026-05-14', category: 'MCP' },
  { id: 'exp-006', title: 'Progressive Delivery via CRD Flags', description: 'Canary and blue-green rollout strategies declared in KranixApp manifests without extra tooling.', status: 'planned', date: '2026-06-01', category: 'GitOps' },
  { id: 'exp-007', title: 'Helm Production Profile', description: 'kranix-charts HA overlays — PDBs, anti-affinity, OpenTelemetry, pre-upgrade hooks.', status: 'running', date: '2026-05-19', category: 'Charts' },
  { id: 'exp-008', title: 'Examples CI Matrix', description: 'kranix-examples tested against mock API and latest alpha-v1 release tags.', status: 'running', date: '2026-05-19', category: 'DX', findings: 'Quickstart paths complete in under 5 minutes on Docker backend.' },
]

const STATUS_MAP: Record<Experiment['status'], { color: string, label: string, pulse: boolean }> = {
  running: { color: 'bg-emerald-400', label: 'RUNNING', pulse: true },
  completed: { color: 'bg-blue-400', label: 'COMPLETED', pulse: false },
  paused: { color: 'bg-amber-400', label: 'PAUSED', pulse: false },
  planned: { color: 'bg-zinc-400', label: 'PLANNED', pulse: false },
}

export function ExperimentsPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskIcon size={14} className="text-os-accent" />
            <h1 className="font-heading text-lg font-bold tracking-tight">workspace://experiments</h1>
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">Roadmap research — MCP tooling, GitOps reconciliation, and runtime experiments.</p>
        </div>
        <div className="space-y-3">
          {EXPERIMENTS.map((exp, i) => {
            const st = STATUS_MAP[exp.status]
            return (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.05 }} className="rounded-sm border border-os-border bg-os-surface">
                <div className="flex items-start gap-3 p-4">
                  <div className="mt-0.5 shrink-0"><div className={cn('size-2 rounded-full', st.color, st.pulse && 'animate-pulse')} /></div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-foreground">{exp.id}</span>
                      <span className="rounded-sm bg-os-accent-muted px-1.5 py-0.5 font-mono text-[9px] text-os-accent">{st.label}</span>
                      <span className="rounded-sm border border-os-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{exp.category}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground">{exp.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <CalendarIcon size={10} />
                    {exp.date}
                  </span>
                </div>
                {exp.findings && (
                  <div className="border-t border-os-border bg-background/50 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <LightningIcon size={12} className="mt-0.5 shrink-0 text-os-accent" weight="fill" />
                      <div>
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">FINDINGS</span>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-foreground">{exp.findings}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
