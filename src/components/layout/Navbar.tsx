'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { WalletConnectButton } from '@/components/ui/WalletConnectButton'
import { useLanguageStore } from '@/store/language-store'
import { cn } from '@/lib/utils'

const navItems = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { t, lang } = useLanguageStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map(item => item.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass-strong shadow-lg'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
            className="font-display text-lg font-bold tracking-wider text-[var(--neon-cyan)] text-glow-cyan hover:opacity-80 transition-opacity"
          >
            ZAYIDAN
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                className={cn(
                  'relative text-sm font-medium tracking-wide transition-colors duration-300 py-1',
                  activeSection === item.key
                    ? 'text-[var(--neon-cyan)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--neon-cyan)]'
                )}
              >
                {t(`nav.${item.key}`)}
                {activeSection === item.key && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[var(--neon-cyan)] shadow-[var(--glow-cyan)] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <div className="hidden sm:block">
              <WalletConnectButton />
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--text-primary)] transition-colors hover:text-[var(--neon-cyan)]"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 glass-strong md:hidden flex flex-col p-6 pt-20"
            >
              <div className="flex flex-col gap-4">
                {navItems.map(item => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                    className={cn(
                      'text-lg font-display tracking-wider py-2 transition-colors duration-300 border-b border-[var(--glass-border)]',
                      activeSection === item.key
                        ? 'text-[var(--neon-cyan)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--neon-cyan)]'
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <LanguageToggle />
                <WalletConnectButton />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}