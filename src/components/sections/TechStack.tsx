'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguageStore } from '@/store/language-store'
import { useTheme } from 'next-themes'
import { ScrambleText } from '@/components/ui/ScrambleText'

const innerSkills = ['sales', 'leadership', 'communication', 'negotiation'] as const
const outerSkills = ['capcut', 'canva', 'ai', 'finance', 'computer', 'python', 'softwareDev'] as const

const innerColors = ['var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-purple)', 'var(--neon-cyan)'] as const

export function TechStack() {
  const { t } = useLanguageStore()
  const { theme } = useTheme()
  const is3D = theme === 'theme-3d'
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  if (is3D) {
    return <TechStack3D t={t} inView={inView} ref={ref} />
  }

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
                <div className="px-4 py-2.5 rounded-lg glass border border-[var(--glass-border)] glass-card-advanced card-shine transition-all duration-300 hover:border-[var(--neon-cyan)]/30 hover:shadow-[var(--glow-cyan)] group">
                  <span className="text-xs font-mono-custom text-[var(--text-secondary)] group-hover:text-[var(--neon-cyan)] transition-colors duration-300">
                    {t(`techstack.${skill}`)}
                  </span>
                </div>
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
              const color = innerColors[idx]!
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                >
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
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ===== 3D Tech Stack: Orbital Animation ===== */
function TechStack3D({ t, inView, ref }: { t: (k: string) => string; inView: boolean; ref: React.RefObject<HTMLDivElement | null> }) {
  // Position outer skills in a circle (7 items)
  const outerPositions = outerSkills.map((_, i) => {
    const angle = (i / outerSkills.length) * Math.PI * 2 - Math.PI / 2
    const rx = 220 // radius x
    const ry = 80  // radius y (elliptical for 3D perspective)
    return {
      x: Math.cos(angle) * rx,
      y: Math.sin(angle) * ry,
      z: Math.sin(angle) * 60, // depth
      delay: i * 0.3,
    }
  })

  // Position inner skills in a smaller circle (4 items)
  const innerPositions = innerSkills.map((_, i) => {
    const angle = (i / innerSkills.length) * Math.PI * 2 - Math.PI / 2
    const rx = 130
    const ry = 50
    return {
      x: Math.cos(angle) * rx,
      y: Math.sin(angle) * ry,
      z: Math.sin(angle) * 40,
      delay: i * 0.4,
    }
  })

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

        {/* 3D Orbital Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center"
          style={{ minHeight: '520px', perspective: '900px' }}
        >
          {/* Outer orbit ring visual */}
          <div
            className="absolute tech-3d-ring-line"
            style={{
              width: 480,
              height: 200,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotateX(25deg)',
            }}
          />

          {/* Inner orbit ring visual */}
          <div
            className="absolute tech-3d-ring-line"
            style={{
              width: 300,
              height: 130,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotateX(25deg)',
              borderColor: 'rgba(255, 45, 170, 0.08)',
              boxShadow: '0 0 15px rgba(255, 45, 170, 0.04)',
            }}
          />

          {/* Outer Ring Skills - 3D Orbiting */}
          <div
            className="absolute tech-3d-orbit-outer"
            style={{
              width: 480,
              height: 200,
              top: '50%',
              left: '50%',
              marginTop: -100,
              marginLeft: -240,
              transformStyle: 'preserve-3d',
            }}
          >
            {outerSkills.map((skill, idx) => {
              const pos = outerPositions[idx]!
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + pos.delay }}
                  className="absolute tech-3d-item"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: pos.x,
                    marginTop: pos.y,
                    transform: `translateZ(${pos.z}px)`,
                    animationDelay: `${pos.delay}s`,
                  }}
                >
                  <div className="px-3 py-2 rounded-lg glass border border-[var(--glass-border)] whitespace-nowrap">
                    <span className="text-[11px] font-mono-custom text-[var(--text-secondary)]">
                      {t(`techstack.${skill}`)}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Inner Ring Skills - Counter-rotating */}
          <div
            className="absolute tech-3d-orbit-inner"
            style={{
              width: 300,
              height: 130,
              top: '50%',
              left: '50%',
              marginTop: -65,
              marginLeft: -150,
              transformStyle: 'preserve-3d',
            }}
          >
            {innerSkills.map((skill, idx) => {
              const pos = innerPositions[idx]!
              const color = innerColors[idx]!
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + pos.delay }}
                  className="absolute tech-3d-item"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: pos.x,
                    marginTop: pos.y,
                    transform: `translateZ(${pos.z}px)`,
                    animationDelay: `${pos.delay}s`,
                  }}
                >
                  <div
                    className="px-5 py-2.5 rounded-xl glass border whitespace-nowrap"
                    style={{ borderColor: `${color}33` }}
                  >
                    <span className="text-xs font-display tracking-wider font-medium" style={{ color }}>
                      {t(`techstack.${skill}`)}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Center Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 200 }}
            className="absolute tech-3d-center-core"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translateZ(30px)',
              zIndex: 10,
            }}
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border border-[var(--neon-cyan)]/20" style={{ animation: 'pulse-3d 3s ease-in-out infinite' }} />
              <div className="absolute inset-2 rounded-full border border-[var(--neon-magenta)]/15" style={{ animation: 'pulse-3d 3s ease-in-out infinite 0.5s' }} />
              <div className="absolute inset-4 rounded-full border border-[var(--neon-purple)]/10" style={{ animation: 'pulse-3d 3s ease-in-out infinite 1s' }} />
              {/* Core glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--neon-cyan)]/10 via-transparent to-[var(--neon-magenta)]/10 blur-md" />
              {/* Core text */}
              <div className="relative text-center">
                <span className="block text-[10px] font-mono-custom text-[var(--neon-cyan)] tracking-[0.2em] uppercase">{t('techstack.innerRing')}</span>
                <span className="block text-lg sm:text-xl font-display font-bold text-[var(--text-primary)] mt-0.5" style={{ textShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}>ZM</span>
              </div>
            </div>
          </motion.div>

          {/* Outer Ring Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute text-[10px] font-mono-custom text-[var(--text-secondary)] uppercase tracking-[0.3em]"
            style={{ bottom: 20 }}
          >
            {t('techstack.outerRing')}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}