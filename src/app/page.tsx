'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { LightModeBackground } from '@/components/ui/LightModeBackground'
import { useLanguageStore } from '@/store/language-store'

export function PortfolioPage() {
  const { setLang } = useLanguageStore()

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'id' | 'en' | null
    if (savedLang) {
      setLang(savedLang)
    }
  }, [setLang])

  return (
    <div className="relative flex flex-col min-h-screen">
      <LightModeBackground />
      <Navbar />
      <main className="flex-1 relative z-[1]">
        <Hero />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default PortfolioPage