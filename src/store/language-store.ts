import { create } from 'zustand'

const id = {
  nav: { about: "Tentang", experience: "Pengalaman", contact: "Kontak" },
  hero: {
    greeting: "Halo, saya",
    name: "Zayidan Muttaqin",
    role: "Penjualan \u00b7 Kepemimpinan \u00b7 Komunikasi",
    tagline: "Disiplin, teliti, bertanggung jawab, dan adaptif — siap berkontribusi secara profesional.",
    location: "Banyuwangi, Indonesia",
    ctaContact: "Hubungi Saya",
    downloadCV: "Download CV",
  },
  about: {
    title: "Tentang Saya",
    bio: "Saya Zayidan Muttaqin, karakter utama: disiplin / teliti / bertanggung jawab / adaptif, dengan pengalaman di bidang Penjualan dan kepemimpinan. Memiliki kemampuan dalam menjual produk, komunikasi, dan managemen waktu.",
    bio2: "Terbiasa bekerja secara individu maupun tim dengan orientasi pada hasil, target, kualitas, dan efisiensi. Siap berkontribusi secara profesional di posisi yang terbuka pada perusahaan.",
    sales: { title: "Sales & Retail", desc: "Penjualan, Target, Negosiasi" },
    leadership: { title: "Leader", desc: "Kepemimpinan, Manajemen, Tim" },
    communication: { title: "Communicator", desc: "Komunikasi, Presentasi, Relasi" },
    education: { title: "Pendidikan", school: "SMK Manbaul Ulum", major: "Teknik Kendaraan Ringan", period: "2017 – 2020", score: "Nilai Ijazah: 82.21" },
    skills: {
      hardTitle: "Hard Skills",
      softTitle: "Soft Skills",
      computer: "Operasi Komputer/Laptop/Gadget",
      video: "Editing Video (CapCut)",
      design: "Desain Grafis (Canva)",
      ai: "AI Prompting",
      financial: "Financial Market (Saham, Forex, Komoditas, Crypto)",
      team: "Kerja Tim",
      leadership: "Leadership",
      communication: "Komunikasi",
      problem: "Problem Solving",
      timeManagement: "Manajemen Waktu",
      adaptif: "Adaptif",
      disiplin: "Disiplin",
      teliti: "Teliti & Bertanggung Jawab",
      customerFocus: "Orientasi Pelanggan",
      negotiation: "Negosiasi",
      motivasi: "Motivasi Diri & Tim",
    },
  },
  experience: { title: "Pengalaman Kerja", present: "Sekarang" },
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
    phoneLabel: "Telepon",
    linkedin: "LinkedIn",
    github: "GitHub",
    wallet: "Wallet",
    cvLabel: "Download CV",
  },
  wallet: { connect: "Connect Wallet", connecting: "Menghubungkan...", disconnect: "Disconnect" },
  footer: {
    tagline: "Penjualan · Kepemimpinan · Komunikasi",
    rights: "Hak cipta dilindungi.",
    backToTop: "Kembali ke atas",
  },
}

const en = {
  nav: { about: "About", experience: "Experience", contact: "Contact" },
  hero: {
    greeting: "Hello, I'm",
    name: "Zayidan Muttaqin",
    role: "Sales \u00b7 Leadership \u00b7 Communication",
    tagline: "Disciplined, detail-oriented, responsible, and adaptive — ready to contribute professionally.",
    location: "Banyuwangi, Indonesia",
    ctaContact: "Contact Me",
    downloadCV: "Download CV",
  },
  about: {
    title: "About Me",
    bio: "I'm Zayidan Muttaqin — disciplined, detail-oriented, responsible, and adaptive — with experience in Sales and Leadership. Skilled in product selling, communication, and time management.",
    bio2: "Experienced working both individually and in teams, with a results-oriented mindset focused on targets, quality, and efficiency. Ready to contribute professionally in any open position.",
    sales: { title: "Sales & Retail", desc: "Selling, Targets, Negotiation" },
    leadership: { title: "Leader", desc: "Leadership, Management, Team" },
    communication: { title: "Communicator", desc: "Communication, Presentation, Relations" },
    education: { title: "Education", school: "SMK Manbaul Ulum", major: "Light Vehicle Engineering", period: "2017 – 2020", score: "Diploma Score: 82.21" },
    skills: {
      hardTitle: "Hard Skills",
      softTitle: "Soft Skills",
      computer: "Computer/Laptop/Gadget Operation",
      video: "Video Editing (CapCut)",
      design: "Graphic Design (Canva)",
      ai: "AI Prompting",
      financial: "Financial Market (Stock, Forex, Commodity, Crypto)",
      team: "Teamwork",
      leadership: "Leadership",
      communication: "Communication",
      problem: "Problem Solving",
      timeManagement: "Time Management",
      adaptif: "Adaptability",
      disiplin: "Discipline",
      teliti: "Detail-Oriented & Responsible",
      customerFocus: "Customer Focus",
      negotiation: "Negotiation",
      motivasi: "Self & Team Motivation",
    },
  },
  experience: { title: "Work Experience", present: "Present" },
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
    phoneLabel: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    wallet: "Wallet",
    cvLabel: "Download CV",
  },
  wallet: { connect: "Connect Wallet", connecting: "Connecting...", disconnect: "Disconnect" },
  footer: {
    tagline: "Sales · Leadership · Communication",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
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