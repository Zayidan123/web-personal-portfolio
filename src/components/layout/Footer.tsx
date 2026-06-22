'use client'

import { useLanguageStore } from '@/store/language-store'
import { ArrowUp, Github, Linkedin } from 'lucide-react'

export function Footer() {
  const { t } = useLanguageStore()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto border-t border-[var(--glass-border)] bg-[var(--dark-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-sm font-bold tracking-wider text-[var(--neon-cyan)]">
              ZAYIDAN
            </span>
            <p className="text-xs text-[var(--text-secondary)]">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Center: Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:shadow-[var(--glow-cyan)] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:shadow-[var(--glow-cyan)] transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {/* Right: Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-colors duration-300"
            aria-label={t('footer.backToTop')}
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-[var(--glass-border)] text-center">
          <p className="text-xs text-[var(--text-secondary)]">
            &copy; {year} Zayidan Muttaqin. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}