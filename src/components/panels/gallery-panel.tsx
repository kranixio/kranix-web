'use client'

import { ImagesIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface GalleryItem {
  id: string
  title: string
  description: string
  category: string
  color: string
  aspect: 'landscape' | 'portrait' | 'square'
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', title: 'Ecosystem Stack', description: 'cli/mcp → kranix-api → kranix-core → runtime / operator / packages', category: 'Architecture', color: 'from-emerald-900/80 to-emerald-600/40', aspect: 'landscape' },
  { id: 'g2', title: 'MCP Tool Surface', description: 'Deploy, logs, analyze, heal, and manifest generation exposed to AI agents', category: 'MCP', color: 'from-blue-900/80 to-cyan-600/40', aspect: 'square' },
  { id: 'g3', title: 'KranixApp Manifest', description: 'GitOps-native workload declaration as a Kubernetes CRD', category: 'GitOps', color: 'from-purple-900/80 to-pink-600/40', aspect: 'portrait' },
  { id: 'g4', title: 'TUI Live Dashboard', description: 'Real-time cluster state in the terminal via kranix status', category: 'CLI', color: 'from-amber-900/80 to-orange-600/40', aspect: 'landscape' },
  { id: 'g5', title: 'Reconciliation Loop', description: 'Desired state converging to actual state with drift detection', category: 'Core', color: 'from-red-900/80 to-yellow-600/40', aspect: 'square' },
  { id: 'g6', title: 'Multi-Backend Runtime', description: 'Same deploy command against Docker, Kubernetes, and remote nodes', category: 'Runtime', color: 'from-zinc-900/80 to-zinc-600/40', aspect: 'landscape' },
  { id: 'g7', title: 'Helm Umbrella Chart', description: 'kranix-charts — core, api, operator, MCP in one release', category: 'Charts', color: 'from-indigo-900/80 to-violet-600/40', aspect: 'square' },
  { id: 'g8', title: 'Examples Catalog', description: 'kranix-examples — quickstart, GitOps, AI agents, reference architectures', category: 'Examples', color: 'from-teal-900/80 to-emerald-600/40', aspect: 'landscape' },
]

export function GalleryPanel() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="os-scrollbar h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <ImagesIcon size={14} className="text-os-accent" />
            <h1 className="font-heading text-lg font-bold tracking-tight">workspace://gallery</h1>
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">Architecture diagrams, CLI screenshots, and platform visuals.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.button key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, delay: i * 0.05 }} onClick={() => setSelected(selected === item.id ? null : item.id)} className={cn('group relative overflow-hidden rounded-sm border border-os-border text-left transition-all hover:border-os-accent/40', item.aspect === 'portrait' ? 'row-span-2' : '', selected === item.id && 'ring-1 ring-os-accent')}>
              {/* Colored placeholder */}
              <div className={cn('flex items-end bg-gradient-to-br p-4', item.color, item.aspect === 'portrait' ? 'h-64' : item.aspect === 'square' ? 'h-40' : 'h-32')}>
                <div className="space-y-0.5">
                  <span className="rounded-sm bg-black/30 px-1.5 py-0.5 font-mono text-[9px] text-white/80">{item.category}</span>
                </div>
              </div>
              <div className="bg-os-surface p-3 space-y-0.5">
                <h3 className="text-xs font-medium text-foreground">{item.title}</h3>
                <p className="font-mono text-[10px] text-muted-foreground">{item.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
