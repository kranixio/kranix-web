'use client'

import { XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useWorkspaceStore } from '@/store/workspace'

const SHORTCUTS = [
  { keys: ['⌘', 'K'], label: 'Command palette' },
  { keys: ['?'], label: 'Keyboard shortcuts' },
  { keys: ['⌘', 'B'], label: 'Toggle explorer' },
  { keys: ['⌘', '`'], label: 'Toggle terminal' },
  { keys: ['⌘', ','], label: 'Open settings' },
  { keys: ['Esc'], label: 'Close overlays' },
]

export function KeyboardShortcutsModal() {
  const { shortcutsOpen, setShortcutsOpen } = useWorkspaceStore()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
          return
        e.preventDefault()
        setShortcutsOpen(!shortcutsOpen)
      }
      if (e.key === 'Escape' && shortcutsOpen)
        setShortcutsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shortcutsOpen, setShortcutsOpen])

  return (
    <AnimatePresence>
      {shortcutsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={() => setShortcutsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[18%] z-[61] w-full max-w-md -translate-x-1/2 overflow-hidden rounded-sm border border-os-border bg-os-panel shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-os-border bg-os-toolbar px-4 py-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground">
                Keyboard shortcuts
              </span>
              <button
                type="button"
                onClick={() => setShortcutsOpen(false)}
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-os-accent-muted hover:text-foreground"
              >
                <XIcon size={14} />
              </button>
            </div>
            <div className="divide-y divide-os-border p-2">
              {SHORTCUTS.map(shortcut => (
                <div key={shortcut.label} className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-xs text-foreground">{shortcut.label}</span>
                  <div className="flex gap-1">
                    {shortcut.keys.map(key => (
                      <kbd
                        key={key}
                        className="rounded border border-os-border bg-os-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-os-border bg-os-surface/50 px-4 py-2 font-mono text-[9px] text-muted-foreground">
              Windows: use Ctrl instead of ⌘
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
