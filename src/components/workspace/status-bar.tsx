/* eslint-disable node/prefer-global/process */
'use client'

import { CheckCircleIcon, CodeIcon, GitBranchIcon, KeyboardIcon } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/lib/use-mobile'
import { PANEL_CONFIG, useWorkspaceStore } from '@/store/workspace'

export function StatusBar() {
  const pathname = usePathname()
  const { setShortcutsOpen } = useWorkspaceStore()
  const activePanel = pathname.split('/')[1] || 'overview'
  const config = PANEL_CONFIG[activePanel as keyof typeof PANEL_CONFIG] || PANEL_CONFIG.overview
  const isMobile = useIsMobile()
  const version = process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0'

  if (isMobile) {
    return (
      <footer
        id="status-bar"
        className="flex h-6 shrink-0 items-center justify-between border-t border-os-border bg-os-toolbar px-3 font-mono text-[10px] text-muted-foreground"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <span className="flex items-center gap-1">
          <div className="size-1.5 rounded-full bg-os-indicator animate-pulse" />
          {config.label}
        </span>
        <span>
          kranix-io v
          {version}
        </span>
      </footer>
    )
  }

  return (
    <footer
      id="status-bar"
      className="flex h-6 shrink-0 items-center justify-between border-t border-os-border bg-os-toolbar px-3 font-mono text-[10px] text-muted-foreground"
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranchIcon size={11} />
          alpha-v1
        </span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          reconciler online
        </span>
        <span className="flex items-center gap-1">
          <CheckCircleIcon size={11} className="text-emerald-400" />
          0 issues
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShortcutsOpen(true)}
          className="flex items-center gap-1 transition-colors hover:text-foreground"
          title="Keyboard shortcuts"
        >
          <KeyboardIcon size={11} />
          ?
        </button>
        <span className="flex items-center gap-1">
          <CodeIcon size={11} />
          {config.label}
        </span>
        <span>UTF-8</span>
        <span>
          kranix-io v
          {version}
        </span>
      </div>
    </footer>
  )
}
