'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { useLanguageStore } from '@/store/language-store'

export function PortfolioPage() {
  const { setLang } = useLanguageStore()

  // Initialize language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'id' | 'en' | null
    if (savedLang) {
      setLang(savedLang)
    }
  }, [setLang])

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default PortfolioPage