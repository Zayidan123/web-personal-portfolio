'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GlassCard } from '@/components/ui/GlassCard'
import { useLanguageStore } from '@/store/language-store'
import { Palette, Headphones, BarChart3 } from 'lucide-react'

const skills = [
  {
    icon: Palette,
    titleKey: 'about.designer.title',
    descKey: 'about.designer.desc',
    color: 'cyan' as const,
  },
  {
    icon: Headphones,
    titleKey: 'about.cs.title',
    descKey: 'about.cs.desc',
    color: 'magenta' as const,
  },
  {
    icon: BarChart3,
    titleKey: 'about.analyst.title',
    descKey: 'about.analyst.desc',
    color: 'purple' as const,
  },
]

const iconColorMap = {
  cyan: 'text-[var(--neon-cyan)]',
  magenta: 'text-[var(--neon-magenta)]',
  purple: 'text-[var(--neon-purple)]',
}

const glowMap = {
  cyan: 'shadow-[var(--glow-cyan)]',
  magenta: 'shadow-[var(--glow-magenta)]',
  purple: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]',
}

const borderMap = {
  cyan: 'border-[var(--neon-cyan)]/30',
  magenta: 'border-[var(--neon-magenta)]/30',
  purple: 'border-[var(--neon-purple)]/30',
}

export function About() {
  const { t } = useLanguageStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            {t('about.title')}
          </h2>
          <div className="h-0.5 w-16 bg-[var(--neon-cyan)] shadow-[var(--glow-cyan)] rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* HUD Brackets on image */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--neon-cyan)]" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--neon-cyan)]" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--neon-magenta)]" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--neon-magenta)]" />

              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-[var(--glass-border)] shadow-[var(--glow-cyan)]">
                <img
                  src="https://picsum.photos/seed/avatar-alex/400/400"
                  alt="Alex - Designer, Analyst, Customer Service"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Animated glow border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[var(--neon-cyan)]/20 pointer-events-none animate-pulse" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {t('about.bio')}
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {t('about.bio2')}
            </p>

            {/* Skill Identity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {skills.map((skill, idx) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.15 }}
                  >
                    <div className={`p-4 rounded-xl glass border ${borderMap[skill.color]} transition-all duration-300 hover:scale-105 hover:${glowMap[skill.color]}`}>
                      <Icon className={`h-6 w-6 ${iconColorMap[skill.color]} mb-2`} />
                      <h3 className="font-display text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-1">
                        {t(skill.titleKey)}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-[var(--text-secondary)]">
                        {t(skill.descKey)}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}