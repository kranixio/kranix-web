'use client'

import { PaletteIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ThemePresetPicker, getThemePresetLabel } from '@/components/ui/theme-preset-picker'
import type { ThemePresetId } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { useWorkspaceStore } from '@/store/workspace'

export function ThemeToggle() {
  const { themePreset, setThemePreset } = useWorkspaceStore()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open)
      return
    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape')
        setOpen(false)
    }
    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex size-7 items-center justify-center gap-1 rounded-sm font-mono text-[10px] transition-colors',
          open
            ? 'bg-os-accent-muted text-os-accent'
            : 'text-muted-foreground hover:bg-os-accent-muted hover:text-foreground',
        )}
        title={`Theme: ${getThemePresetLabel(themePreset)}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <PaletteIcon size={15} weight={open ? 'fill' : 'regular'} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="absolute right-0 top-full z-50 mt-1.5 w-[min(100vw-24px,280px)] overflow-hidden rounded-sm border border-os-border bg-os-panel shadow-lg"
            role="listbox"
          >
            <div className="border-b border-os-border bg-os-toolbar px-3 py-2">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Workspace theme
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-foreground">
                {getThemePresetLabel(themePreset)}
              </div>
            </div>
            <div className="os-scrollbar max-h-[min(60vh,360px)] overflow-y-auto p-2">
              <ThemePresetPicker
                compact
                value={themePreset}
                onChange={(id: ThemePresetId) => {
                  setThemePreset(id)
                  setOpen(false)
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
