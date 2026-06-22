'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}
const getServerSnapshot = () => false

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    getServerSnapshot
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg glass flex items-center justify-center transition-all duration-300 hover:shadow-[var(--glow-cyan)] group"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className="h-4 w-4 absolute transition-all duration-300 text-[var(--neon-cyan)] group-hover:rotate-90 group-hover:scale-110" style={{ opacity: theme === 'dark' ? 0 : 1 }} />
      <Moon className="h-4 w-4 absolute transition-all duration-300 text-[var(--neon-cyan)] group-hover:-rotate-12 group-hover:scale-110" style={{ opacity: theme === 'dark' ? 1 : 0 }} />
    </button>
  )
}