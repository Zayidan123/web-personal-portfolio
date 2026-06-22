'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import { NeonButton } from '@/components/ui/NeonButton'
import { useLanguageStore } from '@/store/language-store'

export function Hero() {
  const { t } = useLanguageStore()
  const [glitchDone, setGlitchDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setGlitchDone(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(var(--neon-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* HUD Corner Brackets - Large */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-cyan)] opacity-30 hidden sm:block" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-cyan)] opacity-30 hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[var(--neon-magenta)] opacity-30 hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[var(--neon-magenta)] opacity-30 hidden sm:block" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base font-mono-custom text-[var(--text-secondary)] tracking-widest uppercase mb-4"
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-[var(--text-primary)] ${!glitchDone ? 'glitch-text' : ''}`}
          data-text={t('hero.name')}
        >
          <span className="text-[var(--neon-cyan)] text-glow-cyan">{t('hero.name')}</span>
        </motion.h1>

        {/* Role Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-mono-custom text-[var(--neon-magenta)] tracking-wider border border-[var(--neon-magenta)]/30">
            {t('hero.role')}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <NeonButton variant="primary" onClick={() => scrollTo('projects')}>
            {t('hero.ctaProjects')}
          </NeonButton>
          <NeonButton variant="secondary" onClick={() => scrollTo('contact')}>
            {t('hero.ctaContact')}
          </NeonButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo('about')}
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-mono-custom text-[var(--text-secondary)] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-[var(--neon-cyan)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}