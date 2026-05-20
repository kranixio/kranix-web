'use client'

import {
  GearIcon,
  MonitorIcon,
  PaletteIcon,
  UserCircleIcon,
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { OsCard } from '@/components/ui/os-card'
import { PanelBadge } from '@/components/ui/panel-badge'
import { PanelHeader } from '@/components/ui/panel-header'
import { ThemePresetPicker, getThemePresetLabel } from '@/components/ui/theme-preset-picker'
import { cn } from '@/lib/utils'

import { useWorkspaceStore } from '@/store/workspace'

export function SettingsPanel() {
  const {
    sidebarPosition,
    setSidebarPosition,
    themePreset,
    setThemePreset,
  } = useWorkspaceStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="os-scrollbar h-full overflow-y-auto p-6"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <PanelHeader
          path="system://settings"
          description="Configure workspace layout, theme, and preferences."
          icon={<GearIcon size={14} />}
        />

        {/* Appearance Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-os-border pb-2">
            <PaletteIcon size={14} className="text-os-accent" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">Appearance</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <OsCard className="space-y-4 p-5">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">Sidebar position</h3>
                <p className="font-mono text-[11px] text-muted-foreground">Explorer panel placement in the workspace shell.</p>
              </div>

              <div className="flex gap-2">
                {[
                  { id: 'left', label: 'Left' },
                  { id: 'right', label: 'Right' },
                ].map(pos => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => setSidebarPosition(pos.id as 'left' | 'right')}
                    className={cn(
                      'flex-1 rounded-sm border py-2 font-mono text-[10px] font-medium uppercase tracking-wider transition-all',
                      sidebarPosition === pos.id
                        ? 'border-os-accent bg-os-accent-muted text-os-accent'
                        : 'border-os-border bg-os-surface text-muted-foreground hover:border-os-accent/30',
                    )}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </OsCard>

            <OsCard className="space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-foreground">Workspace theme</h3>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Each preset updates toolbar, sidebar, panels, and terminal colors. Also available from the toolbar palette button.
                  </p>
                </div>
                <div className="rounded-sm border border-os-border bg-os-surface px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground">
                  Active:
                  {' '}
                  <span className="text-os-accent">{getThemePresetLabel(themePreset)}</span>
                </div>
              </div>

              <ThemePresetPicker value={themePreset} onChange={setThemePreset} />
            </OsCard>
          </div>
        </section>

        {/* System Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-os-border pb-2">
            <MonitorIcon size={14} className="text-os-accent" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">System engine</h2>
          </div>

          <OsCard className="divide-y divide-os-border p-0">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">Motion graphics</h3>
                <p className="font-mono text-[11px] text-muted-foreground">Interface transitions and micro-animations.</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-os-accent p-1">
                <div className="ml-auto size-3 rounded-full bg-background" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">High precision rendering</h3>
                <p className="font-mono text-[11px] text-muted-foreground">2x oversampling for sharp typographic textures.</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-os-accent p-1">
                <div className="ml-auto size-3 rounded-full bg-background" />
              </div>
            </div>
          </OsCard>
        </section>

        {/* User Info Section */}
        <section className="space-y-4 pb-12">
          <div className="flex items-center gap-2 border-b border-os-border pb-2">
            <UserCircleIcon size={14} className="text-os-accent" />
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground">Operator profile</h2>
          </div>

          <OsCard className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-sm border border-os-accent/20 bg-os-accent-muted">
              <UserCircleIcon size={24} className="text-os-accent" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">Kranix operator</h3>
              <div className="flex flex-wrap gap-2">
                <PanelBadge>alpha-v1</PanelBadge>
                <PanelBadge>MCP</PanelBadge>
              </div>
            </div>
          </OsCard>
        </section>
      </div>
    </motion.div>
  )
}
