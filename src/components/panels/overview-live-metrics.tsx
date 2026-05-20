'use client'

import { ActivityIcon, ArrowsClockwiseIcon, CubeIcon, SparkleIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { getInitialMetrics, tickMetrics, type PlatformMetrics } from '@/lib/platform-metrics'

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  delay,
}: {
  icon: React.ComponentType<{ size?: number, className?: string }>
  label: string
  value: number
  suffix?: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      className="rounded-sm border border-os-border bg-os-surface p-3"
    >
      <div className="flex items-center justify-between gap-2">
        <Icon size={14} className="text-os-accent" />
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-40" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
        </span>
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-mono text-lg font-semibold tabular-nums text-foreground">
        {value}
        {suffix && <span className="ml-0.5 text-xs font-normal text-muted-foreground">{suffix}</span>}
      </div>
    </motion.div>
  )
}

export function OverviewLiveMetrics() {
  const [metrics, setMetrics] = useState<PlatformMetrics>(getInitialMetrics)

  useEffect(() => {
    const id = setInterval(() => setMetrics(m => tickMetrics(m)), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Live control plane
        </div>
        <span className="font-mono text-[9px] text-os-accent/80">streaming · simulated</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MetricCard icon={CubeIcon} label="workloads" value={metrics.workloads} delay={0} />
        <MetricCard icon={ArrowsClockwiseIcon} label="reconciles/min" value={metrics.reconcilesPerMin} delay={0.05} />
        <MetricCard icon={SparkleIcon} label="mcp agents" value={metrics.mcpAgents} delay={0.1} />
        <MetricCard icon={ActivityIcon} label="events/s" value={metrics.eventRate} delay={0.15} />
      </div>
    </div>
  )
}
