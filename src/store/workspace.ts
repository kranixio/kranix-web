import type { ThemePresetId } from '@/lib/themes'
import { isThemePresetId } from '@/lib/themes'
import { create } from 'zustand'

export type PanelId = 'overview' | 'projects' | 'experiments' | 'writing' | 'gallery' | 'notes' | 'activity' | 'contact' | 'settings'

export interface Tab {
  id: PanelId
  label: string
  icon: string
}

export const PANEL_CONFIG: Record<PanelId, { label: string, icon: string }> = {
  overview: { label: 'Overview', icon: 'house' },
  projects: { label: 'Projects', icon: 'folder' },
  experiments: { label: 'Experiments', icon: 'flask' },
  writing: { label: 'Writing', icon: 'article' },
  gallery: { label: 'Gallery', icon: 'images' },
  notes: { label: 'Notes', icon: 'notepad' },
  activity: { label: 'Activity', icon: 'activity' },
  contact: { label: 'Contact', icon: 'envelope' },
  settings: { label: 'Settings', icon: 'gear' },
}

export interface WorkspaceToast {
  title: string
  message?: string
  type?: 'info' | 'success'
  duration?: number
}

interface WorkspaceState {
  openTabs: string[]
  sidebarOpen: boolean
  bottomPanelOpen: boolean
  bottomPanelHeight: number
  commandPaletteOpen: boolean
  shortcutsOpen: boolean
  sidebarWidth: number
  sidebarPosition: 'left' | 'right'
  themePreset: ThemePresetId
  toast: WorkspaceToast | null

  openTab: (id: string) => void
  closeTab: (id: string) => void
  toggleSidebar: () => void
  toggleSidebarPosition: () => void
  setSidebarPosition: (pos: 'left' | 'right') => void
  toggleBottomPanel: () => void
  setBottomPanelOpen: (open: boolean) => void
  setBottomPanelHeight: (h: number) => void
  toggleCommandPalette: () => void
  setCommandPaletteOpen: (open: boolean) => void
  setSidebarWidth: (w: number) => void
  setThemePreset: (preset: ThemePresetId) => void
  showToast: (toast: WorkspaceToast) => void
  clearToast: () => void
  setShortcutsOpen: (open: boolean) => void
  toggleShortcuts: () => void
  setOpenTabs: (tabs: string[]) => void
  closeAllTabs: () => void
  closeOtherTabs: (id: string) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  openTabs: ['overview'],
  sidebarOpen: true,
  bottomPanelOpen: typeof window !== 'undefined'
    ? localStorage.getItem('kranix-io-terminal-open') === 'true'
    : false,
  bottomPanelHeight: 200,
  commandPaletteOpen: false,
  shortcutsOpen: false,
  toast: null,
  sidebarWidth: 220,
  sidebarPosition: 'left',
  themePreset: (() => {
    if (typeof window === 'undefined')
      return 'linen' as ThemePresetId
    const stored = localStorage.getItem('kranix-io-theme')
    return stored && isThemePresetId(stored) ? stored : 'linen'
  })(),

  openTab: (id) => {
    const { openTabs } = get()
    if (!openTabs.includes(id)) {
      set({ openTabs: [...openTabs, id] })
    }
  },

  closeTab: (id) => {
    const { openTabs } = get()
    const filtered = openTabs.filter(t => t !== id)
    if (filtered.length === 0)
      filtered.push('overview')
    set({ openTabs: filtered })
  },

  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  toggleSidebarPosition: () => set(s => ({ sidebarPosition: s.sidebarPosition === 'left' ? 'right' : 'left' })),
  setSidebarPosition: pos => set({ sidebarPosition: pos }),
  toggleBottomPanel: () => set((s) => {
    const next = !s.bottomPanelOpen
    if (typeof window !== 'undefined')
      localStorage.setItem('kranix-io-terminal-open', String(next))
    return { bottomPanelOpen: next }
  }),
  setBottomPanelOpen: (open) => {
    if (typeof window !== 'undefined')
      localStorage.setItem('kranix-io-terminal-open', String(open))
    set({ bottomPanelOpen: open })
  },
  setBottomPanelHeight: h => set({ bottomPanelHeight: h }),
  toggleCommandPalette: () => set(s => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setCommandPaletteOpen: open => set({ commandPaletteOpen: open }),
  setSidebarWidth: w => set({ sidebarWidth: w }),
  setThemePreset: (preset) => {
    set({ themePreset: preset })

    if (typeof window !== 'undefined') {
      localStorage.setItem('kranix-io-theme', preset)
    }

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', preset)
    }
  },
  showToast: toast => set({ toast }),
  clearToast: () => set({ toast: null }),
  setShortcutsOpen: open => set({ shortcutsOpen: open }),
  toggleShortcuts: () => set(s => ({ shortcutsOpen: !s.shortcutsOpen })),
  setOpenTabs: tabs => set({ openTabs: tabs }),
  closeAllTabs: () => {
    set({ openTabs: ['overview'] })
  },
  closeOtherTabs: (id) => {
    set({ openTabs: [id] })
  },
}))
