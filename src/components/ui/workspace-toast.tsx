'use client'

import { CheckCircleIcon, InfoIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useWorkspaceStore } from '@/store/workspace'

export function WorkspaceToast() {
  const { toast, clearToast } = useWorkspaceStore()

  useEffect(() => {
    if (!toast)
      return
    const id = setTimeout(clearToast, toast.duration ?? 2800)
    return () => clearTimeout(id)
  }, [toast, clearToast])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none fixed bottom-10 right-4 z-[55] flex max-w-sm items-start gap-2 rounded-sm border border-os-border bg-os-panel px-3 py-2.5 shadow-lg"
        >
          {toast.type === 'success'
            ? <CheckCircleIcon size={16} className="shrink-0 text-emerald-400" weight="fill" />
            : <InfoIcon size={16} className="shrink-0 text-os-accent" weight="fill" />}
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground">
              {toast.title}
            </div>
            {toast.message && (
              <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{toast.message}</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
