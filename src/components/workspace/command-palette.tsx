'use client'

import {
  ActivityIcon,
  ArticleIcon,
  EnvelopeIcon,
  FlaskIcon,
  FolderIcon,
  GearIcon,
  HouseIcon,
  ImagesIcon,
  KeyboardIcon,
  MagnifyingGlassIcon,
  NotepadIcon,
  PaletteIcon,
  TerminalIcon,
  XIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useIsMobile } from '@/lib/use-mobile'
import { cn } from '@/lib/utils'
import { PANEL_CONFIG, useWorkspaceStore } from '@/store/workspace'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number, weight?: 'regular' | 'fill' | 'bold' | 'duotone' }>> = {
  house: HouseIcon,
  folder: FolderIcon,
  flask: FlaskIcon,
  article: ArticleIcon,
  images: ImagesIcon,
  notepad: NotepadIcon,
  activity: ActivityIcon,
  envelope: EnvelopeIcon,
  gear: GearIcon,
  terminal: TerminalIcon,
  palette: PaletteIcon,
  keyboard: KeyboardIcon,
}

const DOC_LINKS = [
  { id: 'doc-start', label: 'Getting Started', path: '/writing/hello-world', keywords: ['install', 'deploy'] },
  { id: 'doc-core', label: 'kranix-core', path: '/writing/kranix-core', keywords: ['reconciler'] },
  { id: 'doc-api', label: 'kranix-api', path: '/writing/kranix-api', keywords: ['rest', 'grpc'] },
  { id: 'doc-mcp', label: 'kranix-mcp', path: '/writing/kranix-mcp', keywords: ['ai', 'claude'] },
  { id: 'doc-cli', label: 'kranix-cli', path: '/writing/kranix-cli', keywords: ['terminal'] },
]

interface CommandItem {
  id: string
  label: string
  section: string
  icon: string
  keywords: string[]
  action: () => void
}

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    openTab,
    toggleBottomPanel,
    setShortcutsOpen,
  } = useWorkspaceStore()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useIsMobile()

  const allItems = useMemo((): CommandItem[] => {
    const navigate = Object.entries(PANEL_CONFIG).map(([id, config]) => ({
      id: `nav-${id}`,
      label: config.label,
      section: 'Navigate',
      icon: config.icon,
      keywords: [id, config.label],
      action: () => {
        openTab(id)
        router.push(`/${id}`)
        setCommandPaletteOpen(false)
      },
    }))

    const actions: CommandItem[] = [
      {
        id: 'act-terminal',
        label: 'Toggle terminal',
        section: 'Actions',
        icon: 'terminal',
        keywords: ['shell', 'kranix-sh'],
        action: () => {
          toggleBottomPanel()
          setCommandPaletteOpen(false)
        },
      },
      {
        id: 'act-settings',
        label: 'Open settings',
        section: 'Actions',
        icon: 'gear',
        keywords: ['theme', 'preferences'],
        action: () => {
          openTab('settings')
          router.push('/settings')
          setCommandPaletteOpen(false)
        },
      },
      {
        id: 'act-shortcuts',
        label: 'Keyboard shortcuts',
        section: 'Actions',
        icon: 'keyboard',
        keywords: ['help', 'keys'],
        action: () => {
          setShortcutsOpen(true)
          setCommandPaletteOpen(false)
        },
      },
      {
        id: 'act-theme',
        label: 'Workspace theme picker',
        section: 'Actions',
        icon: 'palette',
        keywords: ['appearance', 'linen', 'graphite'],
        action: () => {
          openTab('settings')
          router.push('/settings')
          setCommandPaletteOpen(false)
        },
      },
    ]

    const docs = DOC_LINKS.map(doc => ({
      id: doc.id,
      label: doc.label,
      section: 'Documentation',
      icon: 'article',
      keywords: [doc.label, ...doc.keywords, doc.path],
      action: () => {
        openTab('writing')
        router.push(doc.path)
        setCommandPaletteOpen(false)
      },
    }))

    return [...navigate, ...actions, ...docs]
  }, [openTab, router, setCommandPaletteOpen, toggleBottomPanel, setShortcutsOpen])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q)
      return allItems
    return allItems.filter(item =>
      item.label.toLowerCase().includes(q)
      || item.keywords.some(k => k.toLowerCase().includes(q)),
    )
  }, [query, allItems])

  const sections = useMemo(() => {
    const order = ['Navigate', 'Actions', 'Documentation']
    return order
      .map(name => ({
        name,
        items: filteredItems.filter(i => i.section === name),
      }))
      .filter(s => s.items.length > 0)
  }, [filteredItems])

  const flatItems = useMemo(() => sections.flatMap(s => s.items), [sections])

  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems])

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [commandPaletteOpen])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, flatItems.length - 1))
      }
      else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
      }
      else if (e.key === 'Enter') {
        e.preventDefault()
        flatItems[selectedIndex]?.action()
      }
      else if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    },
    [flatItems, selectedIndex, setCommandPaletteOpen],
  )

  let flatIndex = -1

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />

          <motion.div
            id="command-palette"
            initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, y: -20, scale: 0.98 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'fixed z-50 overflow-hidden bg-os-panel shadow-2xl',
              isMobile
                ? 'inset-0 flex flex-col'
                : 'left-1/2 top-[15%] w-full max-w-lg -translate-x-1/2 rounded-sm border border-os-border',
            )}
          >
            <div className={cn(
              'flex items-center gap-2 border-b border-os-border',
              isMobile ? 'px-4 py-4' : 'px-4 py-3',
            )}
            >
              <MagnifyingGlassIcon size={isMobile ? 20 : 16} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search panels, docs, actions..."
                className={cn(
                  'flex-1 bg-transparent font-mono text-foreground outline-none placeholder:text-muted-foreground/60',
                  isMobile ? 'text-sm' : 'text-xs',
                )}
              />
              {isMobile
                ? (
                    <button type="button" onClick={() => setCommandPaletteOpen(false)} className="flex size-8 items-center justify-center rounded-sm text-muted-foreground active:bg-os-accent-muted">
                      <XIcon size={18} weight="bold" />
                    </button>
                  )
                : (
                    <kbd className="rounded border border-os-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      ESC
                    </kbd>
                  )}
            </div>

            <div className={cn('os-scrollbar overflow-y-auto', isMobile ? 'flex-1 p-3' : 'max-h-80 p-2')}>
              {flatItems.length === 0 && (
                <div className="px-2 py-4 text-center font-mono text-xs text-muted-foreground">
                  No results found
                </div>
              )}
              {sections.map(section => (
                <div key={section.name} className="mb-2">
                  <div className={cn(
                    'mb-1 px-2 font-mono font-semibold uppercase tracking-widest text-muted-foreground',
                    isMobile ? 'text-[11px]' : 'text-[10px]',
                  )}
                  >
                    {section.name}
                  </div>
                  {section.items.map((item) => {
                    flatIndex += 1
                    const idx = flatIndex
                    const Icon = ICON_MAP[item.icon]
                    const isSelected = idx === selectedIndex
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-sm text-left text-xs transition-colors',
                          isMobile ? 'px-3 py-3' : 'px-2 py-2',
                          isSelected
                            ? 'bg-os-accent-muted text-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {Icon && <Icon size={isMobile ? 18 : 16} weight={isSelected ? 'fill' : 'regular'} />}
                        <span>{item.label}</span>
                        {isSelected && !isMobile && (
                          <span className="ml-auto font-mono text-[10px] text-os-accent">↵</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {!isMobile && (
              <div className="flex items-center justify-between border-t border-os-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
                <span>↑↓ navigate · ↵ select · ? shortcuts</span>
                <span>⌘K</span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
