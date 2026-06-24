'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Palette, X } from 'lucide-react'

interface Preset {
  name: string
  cyan: string
  magenta: string
  purple: string
}

const PRESETS: Preset[] = [
  { name: 'Cyberpunk', cyan: '#00F5FF', magenta: '#FF00AA', purple: '#8B5CF6' },
  { name: 'Bloomberg', cyan: '#00C853', magenta: '#FFB300', purple: '#FF6D00' },
  { name: 'Midnight', cyan: '#00BCD4', magenta: '#2979FF', purple: '#3D5AFE' },
]

function loadSavedFromStorage(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem('theme-custom-colors')
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return {}
}

function applyColor(key: string, value: string) {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty(key, value)
}

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const [activeColors, setActiveColors] = useState<Record<string, string>>({})
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = useCallback(() => {
    if (!open) {
      const saved = loadSavedFromStorage()
      if (Object.keys(saved).length > 0) {
        setActiveColors(saved)
      }
    }
    setOpen((prev) => !prev)
  }, [open])

  const applyPreset = useCallback((preset: Preset) => {
    applyColor('--neon-cyan', preset.cyan)
    applyColor('--neon-magenta', preset.magenta)
    applyColor('--neon-purple', preset.purple)
    const colors = { cyan: preset.cyan, magenta: preset.magenta, purple: preset.purple }
    setActiveColors(colors)
    try { localStorage.setItem('theme-custom-colors', JSON.stringify(colors)) } catch { /* ignore */ }
  }, [])

  const handleColorChange = useCallback((key: string, cssVar: string, value: string) => {
    applyColor(cssVar, value)
    setActiveColors((prev) => {
      const next = { ...prev, [key]: value }
      try { localStorage.setItem('theme-custom-colors', JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="fixed bottom-6 right-20 z-40 w-9 h-9 rounded-lg glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--neon-magenta)]/40 hover:text-[var(--neon-magenta)] hover:shadow-[var(--glow-magenta)] cursor-pointer"
        aria-label="Theme Customizer"
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-16 right-20 z-40 w-64 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Theme</span>
            <button
              onClick={() => setOpen(false)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-secondary)] mb-2">Presets</p>
              <div className="flex gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="flex-1 rounded-lg border border-[var(--glass-border)] p-2 text-center text-xs font-medium text-[var(--text-primary)] hover:border-[var(--neon-cyan)]/40 transition-colors cursor-pointer bg-[var(--glass-bg)]"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-[var(--text-secondary)] mb-2">Custom</p>
              <div className="space-y-2">
                {[
                  { key: 'cyan', cssVar: '--neon-cyan', label: 'Cyan' },
                  { key: 'magenta', cssVar: '--neon-magenta', label: 'Magenta' },
                  { key: 'purple', cssVar: '--neon-purple', label: 'Purple' },
                ].map(({ key, cssVar, label }) => (
                  <div key={key} className="flex items-center gap-2">
                    <label className="text-xs text-[var(--text-secondary)] w-16">{label}</label>
                    <input
                      type="color"
                      value={activeColors[key] || (key === 'cyan' ? '#00F5FF' : key === 'magenta' ? '#FF00AA' : '#8B5CF6')}
                      onChange={(e) => handleColorChange(key, cssVar, e.target.value)}
                      className="w-8 h-6 rounded border border-[var(--glass-border)] cursor-pointer bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}