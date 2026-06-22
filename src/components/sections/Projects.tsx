'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguageStore } from '@/store/language-store'
import { projects, type ProjectCategory } from '@/data/projects'
import { ExternalLink, FileText } from 'lucide-react'

const categories: (ProjectCategory | 'all')[] = ['all', 'design', 'analitik', 'cs']

const categoryKeyMap: Record<string, string> = {
  all: 'projects.all',
  design: 'projects.design',
  analitik: 'projects.analytics',
  cs: 'projects.cs',
}

export function Projects() {
  const { t } = useLanguageStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

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
            {t('projects.title')}
          </h2>
          <div className="h-0.5 w-16 bg-[var(--neon-cyan)] shadow-[var(--glow-cyan)] rounded-full" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-display tracking-wider uppercase transition-all duration-300 border ${
                activeFilter === cat
                  ? 'bg-[var(--neon-cyan)] text-[var(--dark-base)] border-[var(--neon-cyan)] shadow-[var(--glow-cyan)] font-bold'
                  : 'glass text-[var(--text-secondary)] border-[var(--glass-border)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]/30'
              }`}
            >
              {t(categoryKeyMap[cat])}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              layout
              className="group relative rounded-xl glass border border-[var(--glass-border)] overflow-hidden transition-all duration-300 hover:shadow-[var(--glow-cyan)] hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* HUD Brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--neon-cyan)] z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--neon-magenta)] z-10 opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-base)] via-transparent to-transparent opacity-60" />

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-custom bg-[var(--dark-base)]/80 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30 backdrop-blur-sm">
                    {t(categoryKeyMap[project.category])}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-custom text-[var(--text-secondary)] bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--neon-cyan)] hover:text-[var(--neon-magenta)] transition-colors font-medium"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t('projects.liveDemo')}
                  </a>
                  <button className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--neon-cyan)] transition-colors font-medium">
                    <FileText className="h-3.5 w-3.5" />
                    {t('projects.detail')}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}