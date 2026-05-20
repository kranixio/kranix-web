export const THEME_PRESET_IDS = [
  'linen',
  'graphite',
  'vesper',
  'nord',
  'catppuccin',
  'tokyo-night',
  'dracula',
  'github-dark',
] as const

export type ThemePresetId = (typeof THEME_PRESET_IDS)[number]

export interface ThemePreviewColors {
  base: string
  surface: string
  subtle: string
  accent: string
  fg: string
  fgMuted: string
  border: string
}

export interface ThemePreset {
  id: ThemePresetId
  label: string
  tag: string
  group: 'light' | 'dark'
  preview: ThemePreviewColors
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'linen',
    label: 'Linen',
    tag: 'default',
    group: 'light',
    preview: {
      base: '#f8f6f1',
      surface: '#f0ece4',
      subtle: '#e8e4dc',
      accent: '#b87333',
      fg: '#2c2c2c',
      fgMuted: '#7a756e',
      border: 'rgba(0,0,0,0.08)',
    },
  },
  {
    id: 'graphite',
    label: 'Graphite',
    tag: 'cyan',
    group: 'dark',
    preview: {
      base: '#141414',
      surface: '#1c1c1c',
      subtle: '#242424',
      accent: '#63e2b7',
      fg: '#e8e4df',
      fgMuted: '#8a8580',
      border: 'rgba(255,255,255,0.08)',
    },
  },
  {
    id: 'vesper',
    label: 'Vesper',
    tag: 'amber',
    group: 'dark',
    preview: {
      base: '#101010',
      surface: '#181818',
      subtle: '#202020',
      accent: '#ffc799',
      fg: '#e0d8c8',
      fgMuted: '#6b6561',
      border: 'rgba(255,255,255,0.08)',
    },
  },
  {
    id: 'nord',
    label: 'Nord',
    tag: 'frost',
    group: 'dark',
    preview: {
      base: '#2e3440',
      surface: '#3b4252',
      subtle: '#434c5e',
      accent: '#88c0d0',
      fg: '#eceff4',
      fgMuted: '#d8dee9',
      border: 'rgba(255,255,255,0.1)',
    },
  },
  {
    id: 'catppuccin',
    label: 'Catppuccin',
    tag: 'mocha',
    group: 'dark',
    preview: {
      base: '#1e1e2e',
      surface: '#181825',
      subtle: '#313244',
      accent: '#f5c2e7',
      fg: '#cdd6f4',
      fgMuted: '#a6adc8',
      border: 'rgba(255,255,255,0.08)',
    },
  },
  {
    id: 'tokyo-night',
    label: 'Tokyo Night',
    tag: 'neon',
    group: 'dark',
    preview: {
      base: '#1a1b26',
      surface: '#16161e',
      subtle: '#24283b',
      accent: '#7aa2f7',
      fg: '#c0caf5',
      fgMuted: '#9aa5ce',
      border: 'rgba(255,255,255,0.08)',
    },
  },
  {
    id: 'dracula',
    label: 'Dracula',
    tag: 'purple',
    group: 'dark',
    preview: {
      base: '#282a36',
      surface: '#21222c',
      subtle: '#343746',
      accent: '#bd93f9',
      fg: '#f8f8f2',
      fgMuted: '#6272a4',
      border: 'rgba(255,255,255,0.1)',
    },
  },
  {
    id: 'github-dark',
    label: 'GitHub Dark',
    tag: 'official',
    group: 'dark',
    preview: {
      base: '#0d1117',
      surface: '#161b22',
      subtle: '#21262d',
      accent: '#58a6ff',
      fg: '#e6edf3',
      fgMuted: '#8b949e',
      border: 'rgba(255,255,255,0.1)',
    },
  },
]

export function isThemePresetId(value: string): value is ThemePresetId {
  return (THEME_PRESET_IDS as readonly string[]).includes(value)
}
