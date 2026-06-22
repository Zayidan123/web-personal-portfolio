import { create } from 'zustand'

const id = {
  nav: { about: "Tentang", experience: "Pengalaman", projects: "Proyek", contact: "Kontak" },
  hero: {
    greeting: "Halo, saya",
    name: "Alex",
    role: "Designer \u00b7 Analis \u00b7 Customer Service",
    tagline: "Menggabungkan kreativitas desain, ketelitian analisis, dan empati layanan pelanggan.",
    ctaProjects: "Lihat Proyek Saya",
    ctaContact: "Hubungi Saya",
  },
  about: {
    title: "Tentang Saya",
    bio: "Saya adalah seorang profesional multidisiplin dengan pengalaman di bidang desain UI/UX, analisis data, dan layanan pelanggan. Saya percaya bahwa perpaduan kreativitas dan analitik adalah kunci untuk menciptakan pengalaman digital yang luar biasa.",
    bio2: "Dengan latar belakang yang mencakup riset pengguna, visual design, dan problem-solving, saya selalu berusaha menghadirkan solusi yang tidak hanya indah secara visual, tetapi juga fungsional dan berdampak.",
    designer: { title: "Designer", desc: "Visual, UX, Kreativitas" },
    cs: { title: "CS Expert", desc: "Komunikasi, Empati, Problem-solving" },
    analyst: { title: "Analyst", desc: "Data, Insight, Strategi" },
  },
  experience: { title: "Pengalaman", present: "Sekarang" },
  projects: {
    title: "Proyek",
    all: "Semua",
    design: "Design",
    analytics: "Analitik",
    cs: "Customer Service",
    liveDemo: "Live Demo",
    detail: "Detail",
  },
  contact: {
    title: "Hubungi Saya",
    subtitle: "Tertarik untuk bekerja sama? Kirim pesan dan mari wujudkan ide bersama.",
    name: "Nama",
    email: "Email",
    subject: "Subjek",
    message: "Pesan",
    send: "Kirim Pesan",
    sending: "Mengirim...",
    success: "Pesan berhasil dikirim! Saya akan segera merespons.",
    error: "Gagal mengirim pesan. Silakan coba lagi.",
    emailLabel: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    wallet: "Wallet",
  },
  wallet: { connect: "Connect Wallet", connecting: "Menghubungkan...", disconnect: "Disconnect" },
  footer: { rights: "Hak cipta dilindungi.", backToTop: "Kembali ke atas" },
}

const en = {
  nav: { about: "About", experience: "Experience", projects: "Projects", contact: "Contact" },
  hero: {
    greeting: "Hello, I'm",
    name: "Alex",
    role: "Designer \u00b7 Analyst \u00b7 Customer Service",
    tagline: "Blending design creativity, analytical precision, and customer empathy into digital excellence.",
    ctaProjects: "View My Projects",
    ctaContact: "Contact Me",
  },
  about: {
    title: "About Me",
    bio: "I'm a multidisciplinary professional with experience in UI/UX design, data analysis, and customer service. I believe that combining creativity with analytics is the key to creating exceptional digital experiences.",
    bio2: "With a background spanning user research, visual design, and problem-solving, I always strive to deliver solutions that are not only visually stunning but also functional and impactful.",
    designer: { title: "Designer", desc: "Visual, UX, Creativity" },
    cs: { title: "CS Expert", desc: "Communication, Empathy, Problem-solving" },
    analyst: { title: "Analyst", desc: "Data, Insight, Strategy" },
  },
  experience: { title: "Experience", present: "Present" },
  projects: {
    title: "Projects",
    all: "All",
    design: "Design",
    analytics: "Analytics",
    cs: "Customer Service",
    liveDemo: "Live Demo",
    detail: "Detail",
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Interested in working together? Send me a message and let's bring ideas to life.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully! I'll get back to you soon.",
    error: "Failed to send message. Please try again.",
    emailLabel: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    wallet: "Wallet",
  },
  wallet: { connect: "Connect Wallet", connecting: "Connecting...", disconnect: "Disconnect" },
  footer: { rights: "All rights reserved.", backToTop: "Back to top" },
}

type Translations = typeof id

const translations: Record<string, Translations> = { id, en }

function getNestedValue(obj: unknown, path: string): string {
  if (!obj || typeof obj === 'string') return typeof obj === 'string' ? obj : path
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return path
    }
  }
  return typeof current === 'string' ? current : path
}

interface LanguageState {
  lang: 'id' | 'en'
  setLang: (lang: 'id' | 'en') => void
  toggleLang: () => void
  t: (key: string) => string
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: 'id',
  setLang: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang)
    }
    set({ lang })
  },
  toggleLang: () => {
    const newLang = get().lang === 'id' ? 'en' : 'id'
    get().setLang(newLang)
  },
  t: (key: string) => {
    const { lang } = get()
    const data = translations[lang]
    if (!data) return key
    return getNestedValue(data, key)
  },
}))