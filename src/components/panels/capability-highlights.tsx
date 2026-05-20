'use client'

import {
  ArrowsLeftRightIcon,
  GitBranchIcon,
  RobotIcon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useWorkspaceStore } from '@/store/workspace'

const CAPABILITIES = [
  {
    icon: RobotIcon,
    title: 'MCP-native',
    description: 'Deploy, analyze, and heal via Claude, GPT, or custom agents — audited and scoped.',
    href: '/writing/kranix-mcp',
    tab: 'writing',
    tag: 'AI',
  },
  {
    icon: GitBranchIcon,
    title: 'GitOps-native',
    description: 'KranixApp CRDs reconciled from Git. No manual kubectl chains.',
    href: '/writing/kranix-operator',
    tab: 'writing',
    tag: 'GitOps',
  },
  {
    icon: ArrowsLeftRightIcon,
    title: 'Multi-backend',
    description: 'One interface for Docker, Kubernetes, Podman, and remote nodes.',
    href: '/writing/kranix-runtime',
    tab: 'writing',
    tag: 'Runtime',
  },
]

export function CapabilityHighlights() {
  const { openTab } = useWorkspaceStore()

  return (
    <div className="space-y-2">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Core capabilities
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {CAPABILITIES.map((cap, i) => {
          const Icon = cap.icon
          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.25 }}
            >
              <Link
                href={cap.href}
                onClick={() => openTab(cap.tab)}
                className="group flex h-full flex-col gap-2 rounded-sm border border-os-border bg-os-surface p-4 transition-all hover:border-os-accent/40 hover:bg-os-accent-muted/25"
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} className="text-os-accent transition-transform group-hover:scale-110" />
                  <span className="rounded-sm border border-os-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-foreground group-hover:text-os-accent transition-colors">
                  {cap.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-muted-foreground">{cap.description}</p>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
