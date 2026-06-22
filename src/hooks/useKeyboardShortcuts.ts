'use client'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useLanguageStore } from '@/store/language-store'

export function useKeyboardShortcuts() {
  const { theme, setTheme } = useTheme()
  const { toggleLang } = useLanguageStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      switch (e.key.toLowerCase()) {
        case 't':
          setTheme(theme === 'dark' ? 'light' : 'dark')
          break
        case 'l':
          toggleLang()
          break
        case '1':
          document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
          break
        case '2':
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          break
        case '3':
          document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
          break
        case '4':
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [theme, setTheme, toggleLang])
}