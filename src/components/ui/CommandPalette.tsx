'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, User, FolderOpen, Briefcase, Mail,
  Sun, Moon, Globe, Wallet, Download, ArrowUp,
  Search, Command
} from 'lucide-react'
import { useLanguageStore } from '@/store/language-store'
import { useTheme } from 'next-themes'
import { useWalletStore, shortenAddress } from '@/store/wallet-store'
import { useToastStore } from '@/store/toast-store'

interface CommandItem {
  id: string
  labelKey: string
  group: string
  icon: React.ElementType
  shortcut?: string
  action: () => void
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { t, lang, toggleLang } = useLanguageStore()
  const { theme, setTheme } = useTheme()
  const { address, connect, disconnect } = useWalletStore()
  const { addToast } = useToastStore()

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const commands: CommandItem[] = [
    { id: 'hero', labelKey: 'commandPalette.goHero', group: 'commandPalette.navGroup', icon: Home, shortcut: '1', action: () => scrollTo('hero') },
    { id: 'about', labelKey: 'commandPalette.goAbout', group: 'commandPalette.navGroup', icon: User, shortcut: '2', action: () => scrollTo('about') },
    { id: 'projects', labelKey: 'commandPalette.goProjects', group: 'commandPalette.navGroup', icon: FolderOpen, shortcut: '3', action: () => scrollTo('projects') },
    { id: 'experience', labelKey: 'commandPalette.goExperience', group: 'commandPalette.navGroup', icon: Briefcase, shortcut: '4', action: () => scrollTo('experience') },
    { id: 'contact', labelKey: 'commandPalette.goContact', group: 'commandPalette.navGroup', icon: Mail, shortcut: '5', action: () => scrollTo('contact') },
    {
      id: 'theme', labelKey: 'commandPalette.toggleTheme', group: 'commandPalette.actionsGroup', icon: theme === 'dark' ? Sun : Moon, shortcut: 'T',
      action: () => { setTheme(theme === 'dark' ? 'light' : 'dark') }
    },
    {
      id: 'lang', labelKey: 'commandPalette.switchLang', group: 'commandPalette.actionsGroup', icon: Globe, shortcut: 'L',
      action: () => { toggleLang(); addToast(lang === 'id' ? 'Switched to English' : 'Beralih ke Bahasa Indonesia', 'info') }
    },
    {
      id: 'wallet', labelKey: 'commandPalette.connectWallet', group: 'commandPalette.actionsGroup', icon: Wallet,
      action: () => { if (address) { disconnect() } else { connect() } }
    },
    {
      id: 'cv', labelKey: 'commandPalette.downloadCV', group: 'commandPalette.actionsGroup', icon: Download,
      action: () => {
        const a = document.createElement('a')
        a.href = '/CV_ZAYIDAN_MUTTAQIN.pdf'
        a.download = 'CV_ZAYIDAN_MUTTAQIN.pdf'
        a.click()
      }
    },
    {
      id: 'top', labelKey: 'commandPalette.scrollTop', group: 'commandPalette.actionsGroup', icon: ArrowUp,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  ]

  // Keyboard shortcut to open + custom event from navbar button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    const handleCustomOpen = () => setOpen(prev => !prev)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('command-palette:toggle', handleCustomOpen)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('command-palette:toggle', handleCustomOpen)
    }
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setSearch('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Filter commands
  const filtered = commands.filter(cmd => {
    if (!search) return true
    const label = t(cmd.labelKey).toLowerCase()
    return label.includes(search.toLowerCase())
  })

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0)
  }, [search])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[activeIndex]) {
        filtered[activeIndex].action()
        setOpen(false)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }, [filtered, activeIndex])

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('[data-command-item]')
      const activeItem = items[activeIndex] as HTMLElement
      activeItem?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  // Group commands
  const navGroup = t('commandPalette.navGroup')
  const actionsGroup = t('commandPalette.actionsGroup')
  const grouped = [
    { label: navGroup, items: filtered.filter(c => c.group === 'commandPalette.navGroup') },
    { label: actionsGroup, items: filtered.filter(c => c.group === 'commandPalette.actionsGroup') },
  ].filter(g => g.items.length > 0)

  let globalIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="command-palette-backdrop"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="command-palette-dialog glass-strong border border-[var(--glass-border)] flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--glass-border)]">
              <Search className="h-4 w-4 text-[var(--text-secondary)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('commandPalette.search')}
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/40 outline-none font-mono-custom"
              />
              <div className="flex items-center gap-1 shrink-0">
                <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono-custom text-[var(--text-secondary)] bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Command List */}
            <div ref={listRef} className="flex-1 overflow-y-auto py-2 max-h-[320px] custom-scrollbar">
              {grouped.map(group => (
                <div key={group.label}>
                  <div className="px-4 py-1.5 text-[10px] font-mono-custom text-[var(--text-secondary)] uppercase tracking-wider">
                    {group.label}
                  </div>
                  {group.items.map(item => {
                    globalIndex++
                    const idx = globalIndex
                    const Icon = item.icon
                    const isActive = idx === activeIndex
                    return (
                      <div
                        key={item.id}
                        data-command-item
                        className={`command-palette-item ${isActive ? 'command-palette-item-active' : ''}`}
                        onClick={() => { item.action(); setOpen(false) }}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <Icon className="h-4 w-4 text-[var(--text-secondary)] shrink-0" />
                        <span className="flex-1 text-sm text-[var(--text-primary)]">
                          {t(item.labelKey)}
                        </span>
                        {item.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono-custom text-[var(--text-secondary)] bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                            {item.shortcut}
                          </kbd>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-[var(--text-secondary)]">
                  No commands found
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-2.5 border-t border-[var(--glass-border)]">
              <p className="text-[10px] font-mono-custom text-[var(--text-secondary)] text-center">
                {t('commandPalette.hint')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}