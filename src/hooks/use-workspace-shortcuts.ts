'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useWorkspaceStore } from '@/store/workspace'

export function useWorkspaceShortcuts() {
  const router = useRouter()
  const {
    toggleSidebar,
    toggleBottomPanel,
    toggleCommandPalette,
    setCommandPaletteOpen,
    setShortcutsOpen,
    openTab,
  } = useWorkspaceStore()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      const mod = e.metaKey || e.ctrlKey

      if (mod && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
        return
      }

      if (typing && e.key !== 'Escape')
        return

      if (mod && e.key === 'b') {
        e.preventDefault()
        toggleSidebar()
        return
      }

      if (mod && e.key === '`') {
        e.preventDefault()
        toggleBottomPanel()
        return
      }

      if (mod && e.key === ',') {
        e.preventDefault()
        openTab('settings')
        router.push('/settings')
        return
      }

      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
        setShortcutsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    toggleSidebar,
    toggleBottomPanel,
    toggleCommandPalette,
    setCommandPaletteOpen,
    setShortcutsOpen,
    openTab,
    router,
  ])
}
