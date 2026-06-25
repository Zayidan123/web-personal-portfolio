'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stats } from '@/components/sections/Stats'
import { TechStack } from '@/components/sections/TechStack'
import { Achievements } from '@/components/sections/Achievements'
import { Experience } from '@/components/sections/Experience'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { LightModeBackground } from '@/components/ui/LightModeBackground'
import { DarkModeBackground } from '@/components/ui/DarkModeBackground'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { FloatingBackToTop } from '@/components/ui/FloatingBackToTop'
import { WhatsAppFloatingButton } from '@/components/ui/WhatsAppFloatingButton'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Toast } from '@/components/ui/Toast'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { KeyboardShortcutsHint } from '@/components/ui/KeyboardShortcutsHint'
import { KonamiEasterEgg } from '@/components/ui/KonamiEasterEgg'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { AmbientSound } from '@/components/ui/AmbientSound'
import { ThemeCustomizer } from '@/components/ui/ThemeCustomizer'
import { ScrollSpy } from '@/components/ui/ScrollSpy'
import { AdminPanel } from '@/components/ui/AdminPanel'
import { AnalyticsTracker } from '@/components/ui/AnalyticsTracker'
import { CopyrightProtection } from '@/components/ui/CopyrightProtection'
import { useLanguageStore } from '@/store/language-store'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export function PortfolioPage() {
  const { setLang } = useLanguageStore()
  useKeyboardShortcuts()

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'id' | 'en' | null
    if (saved) setLang(saved)
  }, [setLang])

  return (
    <div className="relative flex flex-col min-h-screen">
      <LoadingScreen />
      <ScrollProgress />
      <LightModeBackground />
      <DarkModeBackground />
      <Navbar />
      <main className="flex-1 relative z-[1]">
        <Hero />
        <div className="section-divider my-4 sm:my-8" />
        <About />
        <Stats />
        <div className="section-divider my-4 sm:my-8" />
        <TechStack />
        <div className="section-divider my-4 sm:my-8" />
        <Achievements />
        <div className="section-divider my-4 sm:my-8" />
        <Experience />
        <div className="section-divider my-4 sm:my-8" />
        <FAQ />
        <div className="section-divider my-4 sm:my-8" />
        <Contact />
      </main>
      <Footer />
      <FloatingBackToTop />
      <WhatsAppFloatingButton />
      <ScrollSpy />
      <AmbientSound />
      <ThemeCustomizer />
      <Toast />
      <CommandPalette />
      <KeyboardShortcutsHint />
      <KonamiEasterEgg />
      <CursorGlow />
      <AnalyticsTracker />
      <CopyrightProtection enabled={true} />
      <AdminPanel />
    </div>
  )
}

export default PortfolioPage