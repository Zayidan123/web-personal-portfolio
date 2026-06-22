'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stats } from '@/components/sections/Stats'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { LightModeBackground } from '@/components/ui/LightModeBackground'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { FloatingBackToTop } from '@/components/ui/FloatingBackToTop'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Toast } from '@/components/ui/Toast'
import { KeyboardShortcutsHint } from '@/components/ui/KeyboardShortcutsHint'
import { useLanguageStore } from '@/store/language-store'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export function PortfolioPage() {
  const { setLang } = useLanguageStore()

  useKeyboardShortcuts()

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'id' | 'en' | null
    if (savedLang) {
      setLang(savedLang)
    }
  }, [setLang])

  return (
    <div className="relative flex flex-col min-h-screen">
      <LoadingScreen />
      <ScrollProgress />
      <LightModeBackground />
      <Navbar />
      <main className="flex-1 relative z-[1]">
        <Hero />
        <div className="section-divider my-4 sm:my-8" />
        <About />
        <Stats />
        <div className="section-divider my-4 sm:my-8" />
        <Experience />
        <div className="section-divider my-4 sm:my-8" />
        <Contact />
      </main>
      <Footer />
      <FloatingBackToTop />
      <Toast />
      <KeyboardShortcutsHint />
    </div>
  )
}

export default PortfolioPage