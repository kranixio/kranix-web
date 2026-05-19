'use client'

import { GitBranchIcon, RocketLaunchIcon, TerminalIcon, WrenchIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface LogEntry {
  timestamp: string
  type: 'commit' | 'deploy' | 'build' | 'system' | 'note'
  message: string
  hash?: string
  branch?: string
}

const ACTIVITY_DATA: LogEntry[] = [
  { timestamp: '2026-05-19 10:00', type: 'commit', message: 'feat(web): rebrand workspace to Kranix IO', hash: 'k7a2b1c', branch: 'main' },
  { timestamp: '2026-05-14 15:30', type: 'commit', message: 'feat(mcp): add dry-run mode for agent actions', hash: 'a3f2c1d', branch: 'alpha-v1' },
  { timestamp: '2026-05-14 14:22', type: 'build', message: 'build #12 completed — kranix-mcp server (8.1s)' },
  { timestamp: '2026-05-14 12:45', type: 'deploy', message: 'helm install kranix — kranix-system namespace', hash: undefined, branch: 'staging' },
  { timestamp: '2026-05-13 23:10', type: 'commit', message: 'feat(operator): KranixApp CRD reconciliation loop', hash: 'b7e4f2a', branch: 'alpha-v1' },
  { timestamp: '2026-05-13 21:30', type: 'system', message: 'runtime driver: Docker backend registered' },
  { timestamp: '2026-05-13 18:15', type: 'note', message: 'MCP tool: kranix_analyze — failure reasoning prototype' },
  { timestamp: '2026-05-12 22:45', type: 'commit', message: 'feat(cli): kranix deploy multi-backend abstraction', hash: 'c9d1e3f', branch: 'alpha-v1' },
  { timestamp: '2026-05-12 20:30', type: 'deploy', message: 'deployed nginx workload to kind cluster via kranix deploy', hash: undefined, branch: 'dev' },
  { timestamp: '2026-05-12 16:20', type: 'commit', message: 'fix(reconciler): drift detection false positive on labels', hash: 'd2a8b4c', branch: 'alpha-v1' },
  { timestamp: '2026-05-11 23:55', type: 'note', message: 'agent permission scopes: read-only vs write vs admin' },
  { timestamp: '2026-05-11 19:30', type: 'build', message: 'build #11 completed — kranix CLI (6.4s)' },
  { timestamp: '2026-05-11 15:00', type: 'commit', message: 'feat(core): event bus and state store backends', hash: 'e5f7a9b', branch: 'alpha-v1' },
  { timestamp: '2026-05-10 22:10', type: 'deploy', message: 'alpha-v1 release candidate tagged' },
  { timestamp: '2026-05-10 20:00', type: 'system', message: 'OpenTelemetry traces wired into reconciler' },
]

const TYPE_CONFIG: Record<LogEntry['type'], { icon: typeof GitBranchIcon, color: string, prefix: string }> = {
  commit: { icon: GitBranchIcon, color: 'text-blue-400', prefix: 'GIT' },
  deploy: { icon: RocketLaunchIcon, color: 'text-emerald-400', prefix: 'DEPLOY' },
  build: { icon: WrenchIcon, color: 'text-amber-400', prefix: 'BUILD' },
  system: { icon: TerminalIcon, color: 'text-purple-400', prefix: 'SYS' },
  note: { icon: TerminalIcon, color: 'text-zinc-400', prefix: 'NOTE' },
}

export function ActivityPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div>
          <h1 className="font-heading text-lg font-bold tracking-tight">workspace://activity</h1>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">Platform development — commits, releases, and reconciler events.</p>
        </div>
        <div className="space-y-0">
          {ACTIVITY_DATA.map((entry, i) => {
            const cfg = TYPE_CONFIG[entry.type]
            const Icon = cfg.icon
            return (
              <motion.div key={`${entry.timestamp}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15, delay: i * 0.03 }} className="group flex items-start gap-3 border-l-2 border-os-border py-3 pl-4 pr-2 transition-colors hover:border-l-os-accent hover:bg-os-accent-muted/30">
                <Icon size={13} className={cn('mt-0.5 shrink-0', cfg.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('font-mono text-[9px] font-semibold', cfg.color)}>
                      [
                      {cfg.prefix}
                      ]
                    </span>
                    <span className="text-xs text-foreground truncate">{entry.message}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <span>{entry.timestamp}</span>
                    {entry.hash && <span className="text-os-accent">{entry.hash}</span>}
                    {entry.branch && (
                      <span>
                        on
                        {' '}
                        {entry.branch}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
