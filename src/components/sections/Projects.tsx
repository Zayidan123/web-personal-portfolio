'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguageStore } from '@/store/language-store'
import { ExternalLink, Github, BarChart3, Users, MessageSquare } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'
import { ScrambleText } from '@/components/ui/ScrambleText'

const projectData = [
  {
    key: 'salesDash',
    icon: BarChart3,
    tags: ['React', 'TypeScript', 'Chart.js'],
    color: 'cyan' as const,
    gradient: 'from-[var(--neon-cyan)]/20 via-[var(--neon-cyan)]/5 to-transparent',
  },
  {
    key: 'teamMgmt',
    icon: Users,
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    color: 'magenta' as const,
    gradient: 'from-[var(--neon-magenta)]/20 via-[var(--neon-magenta)]/5 to-transparent',
  },
  {
    key: 'customerCRM',
    icon: MessageSquare,
    tags: ['React', 'Firebase', 'TailwindCSS'],
    color: 'purple' as const,
    gradient: 'from-[var(--neon-purple)]/20 via-[var(--neon-purple)]/5 to-transparent',
  },
]

const colorMap = {
  cyan: {
    border: 'border-[var(--neon-cyan)]/20',
    icon: 'text-[var(--neon-cyan)]',
    iconBg: 'bg-[var(--neon-cyan)]/10',
    btnBorder: 'border-[var(--neon-cyan)]',
    btnText: 'text-[var(--neon-cyan)]',
    btnHover: 'hover:bg-[var(--neon-cyan)] hover:text-[var(--dark-base)]',
    glow: 'hover:shadow-[var(--glow-cyan)]',
    tagBorder: 'border-[var(--neon-cyan)]/20',
    tagText: 'text-[var(--neon-cyan)]',
  },
  magenta: {
    border: 'border-[var(--neon-magenta)]/20',
    icon: 'text-[var(--neon-magenta)]',
    iconBg: 'bg-[var(--neon-magenta)]/10',
    btnBorder: 'border-[var(--neon-magenta)]',
    btnText: 'text-[var(--neon-magenta)]',
    btnHover: 'hover:bg-[var(--neon-magenta)] hover:text-[var(--dark-base)]',
    glow: 'hover:shadow-[var(--glow-magenta)]',
    tagBorder: 'border-[var(--neon-magenta)]/20',
    tagText: 'text-[var(--neon-magenta)]',
  },
  purple: {
    border: 'border-[var(--neon-purple)]/20',
    icon: 'text-[var(--neon-purple)]',
    iconBg: 'bg-[var(--neon-purple)]/10',
    btnBorder: 'border-[var(--neon-purple)]',
    btnText: 'text-[var(--neon-purple)]',
    btnHover: 'hover:bg-[var(--neon-purple)] hover:text-[var(--dark-base)]',
    glow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
    tagBorder: 'border-[var(--neon-purple)]/20',
    tagText: 'text-[var(--neon-purple)]',
  },
}

export function Projects() {
  const { t } = useLanguageStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            <ScrambleText text={t('projects.title')} />
          </h2>
          <div className="section-title-line" />
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectData.map((project, idx) => {
            const Icon = project.icon
            const colors = colorMap[project.color]
            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              >
                <TiltCard className="transition-[box-shadow_0.3s]" maxTilt={5}>
                  <div className="h-full flex flex-col rounded-xl glass border border-[var(--glass-border)] glass-card-advanced card-shine project-card-border transition-[box-shadow_0.3s]">
                    {/* Project Preview Area */}
                    <div className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                      {/* HUD corner decorations */}
                      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[var(--glass-border)] opacity-50" />
                      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[var(--glass-border)] opacity-50" />
                      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[var(--glass-border)] opacity-50" />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[var(--glass-border)] opacity-50" />

                      {/* Grid overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage: `linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px',
                        }}
                      />

                      <div className={`w-16 h-16 rounded-2xl ${colors.iconBg} border ${colors.border} flex items-center justify-center relative z-10`}>
                        <Icon className={`h-8 w-8 ${colors.icon}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <h3 className="font-display text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {t(`projects.${project.key}.title`)}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
                        {t(`projects.${project.key}.desc`)}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className={`px-2.5 py-0.5 rounded text-[10px] font-mono-custom ${colors.tagText} ${colors.tagBorder} bg-[var(--glass-bg)] border float-tag`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-display tracking-wider uppercase border ${colors.btnBorder} ${colors.btnText} transition-all duration-300 ${colors.glow} ${colors.btnHover}`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {t('projects.viewProject')}
                        </button>
                        <button
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-display tracking-wider uppercase border border-[var(--glass-border)] text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--neon-cyan)]/30 hover:text-[var(--neon-cyan)] hover:shadow-[var(--glow-cyan)]"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}