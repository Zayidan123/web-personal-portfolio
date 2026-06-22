'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguageStore } from '@/store/language-store'
import { useWalletStore, shortenAddress } from '@/store/wallet-store'
import { Mail, Linkedin, Github, Wallet, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const { t } = useLanguageStore()
  const { address } = useWalletStore()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')

    // Simulate form submission (Formspree integration)
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (formspreeId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          setFormStatus('success')
          setFormData({ name: '', email: '', subject: '', message: '' })
        } else {
          setFormStatus('error')
        }
      } catch {
        setFormStatus('error')
      }
    } else {
      // Simulate success for demo
      await new Promise(resolve => setTimeout(resolve, 1500))
      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  }

  const contactInfo = [
    { icon: Mail, label: t('contact.emailLabel'), value: 'alex@example.com', href: 'mailto:alex@example.com', color: 'var(--neon-cyan)' },
    { icon: Linkedin, label: t('contact.linkedin'), value: 'linkedin.com/in/alex', href: 'https://linkedin.com', color: 'var(--neon-cyan)' },
    { icon: Github, label: t('contact.github'), value: 'github.com/alex', href: 'https://github.com', color: 'var(--neon-cyan)' },
  ]

  if (address) {
    contactInfo.push({
      icon: Wallet,
      label: t('contact.wallet'),
      value: shortenAddress(address),
      href: '#',
      color: 'var(--neon-magenta)',
    })
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            {t('contact.title')}
          </h2>
          <div className="h-0.5 w-16 bg-[var(--neon-cyan)] shadow-[var(--glow-cyan)] rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-4 rounded-xl glass border border-[var(--glass-border)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
                  style={{ '--hover-glow': item.color } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${item.color}33`
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{ color: item.color, borderColor: `${item.color}33`, backgroundColor: `${item.color}0D` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] mb-0.5">{item.label}</p>
                    <p className="text-sm font-mono-custom font-medium" style={{ color: item.color }}>
                      {item.value}
                    </p>
                  </div>
                </a>
              )
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative p-6 sm:p-8 rounded-xl glass border border-[var(--glass-border)]">
              {/* HUD Brackets */}
              <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[var(--neon-cyan)]" />
              <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[var(--neon-magenta)]" />
              <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[var(--neon-magenta)]" />
              <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[var(--neon-cyan)]" />

              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-500/10 border border-green-500/30 shadow-[0_0_20px_rgba(0,255,136,0.2)]">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <p className="text-sm text-green-400 text-center font-medium">
                    {t('contact.success')}
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-xs text-[var(--neon-cyan)] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono-custom text-[var(--text-secondary)] mb-1.5 tracking-wider uppercase">
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-[var(--glass-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/40 transition-all duration-300 focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[var(--glow-cyan)]"
                        placeholder="John Doe"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono-custom text-[var(--text-secondary)] mb-1.5 tracking-wider uppercase">
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-[var(--glass-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/40 transition-all duration-300 focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[var(--glow-cyan)]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono-custom text-[var(--text-secondary)] mb-1.5 tracking-wider uppercase">
                      {t('contact.subject')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-[var(--glass-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/40 transition-all duration-300 focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[var(--glow-cyan)]"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono-custom text-[var(--text-secondary)] mb-1.5 tracking-wider uppercase">
                      {t('contact.message')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg bg-transparent border border-[var(--glass-border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/40 transition-all duration-300 focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[var(--glow-cyan)] resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Error message */}
                  {formStatus === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>{t('contact.error')}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-display text-sm tracking-wider uppercase border border-[var(--neon-cyan)] text-[var(--neon-cyan)] transition-all duration-300 hover:shadow-[var(--glow-cyan)] hover:bg-[var(--neon-cyan)] hover:text-[var(--dark-base)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t('contact.send')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}