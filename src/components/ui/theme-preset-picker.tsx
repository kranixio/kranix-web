'use client'

import { CheckIcon } from '@phosphor-icons/react'
import { THEME_PRESETS, type ThemePreset, type ThemePresetId, type ThemePreviewColors } from '@/lib/themes'
import { cn } from '@/lib/utils'

function ThemeWorkspacePreview({ colors }: { colors: ThemePreviewColors }) {
  return (
    <div
      className="overflow-hidden rounded-[2px] border"
      style={{ borderColor: colors.border, backgroundColor: colors.base }}
    >
      <div
        className="flex h-3 items-center gap-0.5 border-b px-1"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <div className="size-1 rounded-full" style={{ backgroundColor: colors.accent }} />
        <div className="h-0.5 flex-1 rounded-full opacity-30" style={{ backgroundColor: colors.fgMuted }} />
      </div>
      <div className="flex h-9">
        <div
          className="w-3 shrink-0 border-r"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        />
        <div className="flex flex-1 flex-col justify-center gap-0.5 p-1">
          <div
            className="h-0.5 w-[70%] rounded-[1px]"
            style={{ backgroundColor: colors.fg, opacity: 0.25 }}
          />
          <div
            className="h-0.5 w-[45%] rounded-[1px]"
            style={{ backgroundColor: colors.accent, opacity: 0.65 }}
          />
          <div
            className="h-0.5 w-[55%] rounded-[1px]"
            style={{ backgroundColor: colors.subtle }}
          />
        </div>
      </div>
    </div>
  )
}

interface ThemePresetOptionProps {
  preset: ThemePreset
  active: boolean
  compact?: boolean
  onSelect: (id: ThemePresetId) => void
}

function ThemePresetOption({ preset, active, compact, onSelect }: ThemePresetOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(preset.id)}
      className={cn(
        'group relative w-full rounded-sm border text-left transition-all',
        compact ? 'p-2' : 'p-3',
        active
          ? 'border-os-accent bg-os-accent-muted/40 ring-1 ring-os-accent/25'
          : 'border-os-border bg-os-surface hover:border-os-accent/35 hover:bg-os-accent-muted/20',
      )}
    >
      {active && (
        <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-sm bg-os-accent" />
      )}
      <div className={cn('space-y-2', compact ? '' : 'pl-1')}>
        <ThemeWorkspacePreview colors={preset.preview} />
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground">
              {preset.label}
            </div>
            {!compact && (
              <div className="font-mono text-[9px] text-muted-foreground">{preset.tag}</div>
            )}
          </div>
          {active && (
            <CheckIcon size={12} weight="bold" className="shrink-0 text-os-accent" />
          )}
        </div>
      </div>
    </button>
  )
}

interface ThemePresetPickerProps {
  value: ThemePresetId
  onChange: (id: ThemePresetId) => void
  compact?: boolean
  className?: string
}

export function ThemePresetPicker({ value, onChange, compact, className }: ThemePresetPickerProps) {
  const light = THEME_PRESETS.filter(p => p.group === 'light')
  const dark = THEME_PRESETS.filter(p => p.group === 'dark')

  if (compact) {
    return (
      <div className={cn('grid grid-cols-2 gap-2', className)}>
        {THEME_PRESETS.map(preset => (
          <ThemePresetOption
            key={preset.id}
            preset={preset}
            active={value === preset.id}
            compact
            onSelect={onChange}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('space-y-5', className)}>
      <div className="space-y-2">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Light
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {light.map(preset => (
            <ThemePresetOption
              key={preset.id}
              preset={preset}
              active={value === preset.id}
              onSelect={onChange}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Dark
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {dark.map(preset => (
            <ThemePresetOption
              key={preset.id}
              preset={preset}
              active={value === preset.id}
              onSelect={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function getThemePresetLabel(id: ThemePresetId): string {
  return THEME_PRESETS.find(p => p.id === id)?.label ?? id
}
