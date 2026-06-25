'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguageStore } from '@/store/language-store'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { TiltCard } from '@/components/ui/TiltCard'

const innerSkills = ['sales', 'leadership', 'communication', 'negotiation'] as const
const outerSkills = ['capcut', 'canva', 'ai', 'finance', 'computer', 'python', 'softwareDev'] as const

export function TechStack() {
  const { t } = useLanguageStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="techstack" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            <ScrambleText text={t('techstack.title')} />
          </h2>
          <div className="section-title-line mx-auto" />
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
            {t('techstack.subtitle')}
          </p>
        </motion.div>

        {/* Orbital Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex flex-col items-center gap-12"
        >
          {/* Outer Ring Label */}
          <div className="text-[10px] font-mono-custom text-[var(--text-secondary)] uppercase tracking-[0.3em]">
            {t('techstack.outerRing')}
          </div>

          {/* Outer Ring Skills */}
          <div className="flex flex-wrap justify-center gap-3">
            {outerSkills.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.07 }}
              >
                <TiltCard maxTilt={6}>
                  <div className="px-4 py-2.5 rounded-lg glass border border-[var(--glass-border)] glass-card-advanced card-shine transition-all duration-300 hover:border-[var(--neon-cyan)]/30 hover:shadow-[var(--glow-cyan)] group">
                    <span className="text-xs font-mono-custom text-[var(--text-secondary)] group-hover:text-[var(--neon-cyan)] transition-colors duration-300">
                      {t(`techstack.${skill}`)}
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Center Divider */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/30 to-transparent" />

          {/* Inner Ring Label */}
          <div className="text-[10px] font-mono-custom text-[var(--neon-magenta)] uppercase tracking-[0.3em]">
            {t('techstack.innerRing')}
          </div>

          {/* Inner Ring Skills */}
          <div className="flex flex-wrap justify-center gap-4">
            {innerSkills.map((skill, idx) => {
              const colors = ['var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-purple)', 'var(--neon-cyan)'] as const
              const color = colors[idx]!
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                >
                  <TiltCard maxTilt={8}>
                    <div
                      className="px-6 py-3 rounded-xl glass border transition-all duration-300 group"
                      style={{
                        borderColor: `${color}33`,
                        boxShadow: `0 0 15px ${color}11`,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = `${color}66`
                        el.style.boxShadow = `0 0 25px ${color}33`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = `${color}33`
                        el.style.boxShadow = `0 0 15px ${color}11`
                      }}
                    >
                      <span className="text-sm font-display tracking-wider font-medium" style={{ color }}>
                        {t(`techstack.${skill}`)}
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}