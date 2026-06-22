'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguageStore } from '@/store/language-store'
import { Star } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'
import { ScrambleText } from '@/components/ui/ScrambleText'

const testimonials = [
  { key: 't1', color: 'cyan' as const, initials: 'AF' },
  { key: 't2', color: 'magenta' as const, initials: 'SR' },
  { key: 't3', color: 'purple' as const, initials: 'BS' },
]

const colorMap = {
  cyan: {
    border: 'border-[var(--neon-cyan)]/20',
    avatar: 'bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/30',
    quote: 'text-[var(--neon-cyan)]/10',
    glow: 'hover:shadow-[var(--glow-cyan)]',
  },
  magenta: {
    border: 'border-[var(--neon-magenta)]/20',
    avatar: 'bg-[var(--neon-magenta)]/15 text-[var(--neon-magenta)] border-[var(--neon-magenta)]/30',
    quote: 'text-[var(--neon-magenta)]/10',
    glow: 'hover:shadow-[var(--glow-magenta)]',
  },
  purple: {
    border: 'border-[var(--neon-purple)]/20',
    avatar: 'bg-[var(--neon-purple)]/15 text-[var(--neon-purple)] border-[var(--neon-purple)]/30',
    quote: 'text-[var(--neon-purple)]/10',
    glow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${star <= rating ? 'star-filled fill-current' : 'star-empty'}`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const { t } = useLanguageStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            <ScrambleText text={t('testimonials.title')} />
          </h2>
          <div className="section-title-line" />
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => {
            const colors = colorMap[item.color]
            const rating = t(`testimonials.${item.key}.rating`)
            const ratingNum = parseInt(rating, 10) || 5

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              >
                <TiltCard className="transition-[box-shadow_0.3s]" maxTilt={5}>
                  <div className={`h-full flex flex-col p-6 rounded-xl glass border ${colors.border} glass-card-advanced card-shine transition-[box-shadow_0.3s] ${colors.glow}`}>
                    {/* Quote Decoration */}
                    <div className="relative">
                      <span className="quote-decoration">&ldquo;</span>

                      {/* Testimonial Text */}
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 relative z-10 pt-6">
                        &ldquo;{t(`testimonials.${item.key}.text`)}&rdquo;
                      </p>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Rating */}
                    <div className="mb-4">
                      <StarRating rating={ratingNum} />
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[var(--glass-border)]">
                      {/* Avatar with initials */}
                      <div className={`w-10 h-10 rounded-full ${colors.avatar} flex items-center justify-center text-sm font-display font-bold shrink-0`}>
                        {item.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {t(`testimonials.${item.key}.name`)}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] font-mono-custom truncate">
                          {t(`testimonials.${item.key}.role`)}, {t(`testimonials.${item.key}.company`)}
                        </p>
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