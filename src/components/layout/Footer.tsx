'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguageStore } from '@/store/language-store'
import { ArrowUp, Github, Linkedin, Heart } from 'lucide-react'

export function Footer() {
  const { t } = useLanguageStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const year = new Date().getFullYear()

  return (
    <footer ref={ref} className="relative mt-auto border-t border-[var(--glass-border)]" style={{ background: 'linear-gradient(to bottom, var(--dark-base), var(--dark-surface))' }}>
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Left: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="font-display text-sm font-bold tracking-wider text-[var(--neon-cyan)] text-glow-cyan">
              ZAYIDAN
            </span>
            <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
              {t('footer.tagline')}
              <span className="relative flex items-center gap-1 ml-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-green-400 text-[10px]">Online</span>
              </span>
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]/30 hover:shadow-[var(--glow-cyan)] transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--neon-magenta)] hover:border-[var(--neon-magenta)]/30 hover:shadow-[var(--glow-magenta)] transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {/* Right: Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-[var(--glass-border)] text-xs font-mono-custom text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]/30 hover:shadow-[var(--glow-cyan)] transition-all duration-300"
            aria-label={t('footer.backToTop')}
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 pt-4 border-t border-[var(--glass-border)] text-center"
        >
          <p className="text-xs text-[var(--text-secondary)] flex items-center justify-center gap-1">
            &copy; {year} Zayidan Muttaqin.
            <span className="mx-1">·</span>
            {t('footer.rights')}
            <span className="mx-1">·</span>
            <span className="inline-flex items-center gap-0.5 text-[var(--neon-magenta)]">
              Built with <Heart className="h-3 w-3 fill-current" />
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}