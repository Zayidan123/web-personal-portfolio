import { create } from 'zustand'

const id = {
  nav: { about: "Tentang", projects: "Proyek", experience: "Pengalaman", contact: "Kontak" },
  hero: {
    greeting: "Halo, saya",
    name: "Zayidan Muttaqin",
    role: "Penjualan \u00b7 Kepemimpinan \u00b7 Komunikasi",
    tagline: "Disiplin, teliti, bertanggung jawab, dan adaptif — siap berkontribusi secara profesional.",
    location: "Banyuwangi, Indonesia",
    ctaContact: "Hubungi Saya",
    downloadCV: "Download CV",
    available: "Tersedia untuk Bekerja",
  },
  about: {
    title: "Tentang Saya",
    bio: "Saya Zayidan Muttaqin, karakter utama: disiplin / teliti / bertanggung jawab / adaptif, dengan pengalaman di bidang Penjualan dan kepemimpinan. Memiliki kemampuan dalam menjual produk, komunikasi, dan managemen waktu.",
    bio2: "Terbiasa bekerja secara individu maupun tim dengan orientasi pada hasil, target, kualitas, dan efisiensi. Siap berkontribusi secara profesional di posisi yang terbuka pada perusahaan.",
    sales: { title: "Sales & Retail", desc: "Penjualan, Target, Negosiasi" },
    leadership: { title: "Leader", desc: "Kepemimpinan, Manajemen, Tim" },
    communication: { title: "Communicator", desc: "Komunikasi, Presentasi, Relasi" },
    education: { title: "Pendidikan", school: "SMK Manbaul Ulum", major: "Teknik Kendaraan Ringan", period: "2017 – 2020", score: "Nilai Ijazah: 82.21" },
    certifications: {
      title: "Sertifikasi",
      subtitle: "Kompetensi Inti",
      sales: "Penjualan",
      retail: "Retail",
      leadership: "Kepemimpinan",
      communication: "Komunikasi",
    },
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
  stats: {
    experience: { value: "3+", label: "Tahun Pengalaman" },
    hardSkills: { value: "5", label: "Hard Skills" },
    softSkills: { value: "11", label: "Soft Skills" },
    clients: { value: "100+", label: "Pelanggan Dilayani" },
  },
  projects: {
    title: "Proyek",
    subtitle: "Beberapa proyek yang telah saya kerjakan.",
    viewProject: "Lihat Proyek",
    sourceCode: "Kode Sumber",
    salesDash: { title: "Sales Dashboard", desc: "Platform analitik untuk pelacakan penjualan ritel. Menyediakan visualisasi data real-time, laporan performa, dan insight penjualan untuk membantu pengambilan keputusan bisnis." },
    teamMgmt: { title: "Team Management System", desc: "Sistem manajemen karyawan untuk penjadwalan dan pemantauan performa tim. Membantu koordinasi tugas, tracking kehadiran, dan evaluasi kinerja." },
    customerCRM: { title: "Customer CRM", desc: "Sistem manajemen hubungan pelanggan untuk ritel. Mencatat interaksi, preferensi pelanggan, dan riwayat pembelian untuk meningkatkan layanan." },
  },
  testimonials: {
    title: "Testimoni",
    subtitle: "Apa kata mereka tentang bekerja bersama saya.",
    t1: { name: "Ahmad Fauzi", role: "Pemilik Toko", company: "Toko Berkah", text: "Zayidan membantu meningkatkan penjualan bulanan kami hingga 40%. Kemampuan negosiasi dan pemahaman pelanggan luar biasa.", rating: 5 },
    t2: { name: "Siti Rahmawati", role: "Regional Manager", company: "CV Maju Jaya", text: "Kepemimpinan yang luar biasa. Zayidan mampu memotivasi tim dan mencapai target melebihi ekspektasi. Rekomendasi tinggi!", rating: 5 },
    t3: { name: "Budi Santoso", role: "Mitra Bisnis", company: "Freelance", text: "Komunikasi dan negosiasi yang sangat baik. Zayidan selalu profesional dan tepat waktu dalam setiap proyek kolaborasi.", rating: 4 },
  },
  experience: { title: "Pengalaman Kerja", present: "Sekarang" },
  contact: {
    title: "Hubungi Saya",
    subtitle: "Tertarik untuk bekerja sama? Kirim pesan dan mari wujudkan ide bersama.",
    name: "Nama",
    email: "Email",
    subject: "Subjek",
    message: "Pesan",
    namePlaceholder: "Nama Anda",
    emailPlaceholder: "email@contoh.com",
    subjectPlaceholder: "Subjek pesan",
    messagePlaceholder: "Ceritakan tentang kebutuhan Anda...",
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
    copied: "Berhasil disalin!",
    share: "Bagikan Profil",
  },
  shortcuts: {
    title: "Pintasan Keyboard",
    theme: "Ganti Tema",
    language: "Ganti Bahasa",
    sections: "Navigasi Bagian",
    palette: "Palet Perintah",
  },
  commandPalette: {
    title: "Perintah",
    search: "Cari perintah...",
    navGroup: "Navigasi",
    actionsGroup: "Tindakan",
    goHero: "Ke Beranda",
    goAbout: "Ke Tentang Saya",
    goProjects: "Ke Proyek",
    goExperience: "Ke Pengalaman",
    goContact: "Ke Kontak",
    toggleTheme: "Ganti Tema",
    switchLang: "Ganti Bahasa",
    connectWallet: "Hubungkan Wallet",
    downloadCV: "Unduh CV",
    scrollTop: "Ke Atas",
    hint: "↑↓ Navigasi · ↵ Pilih · Esc Tutup",
  },
  wallet: { connect: "Connect Wallet", connecting: "Menghubungkan...", disconnect: "Disconnect" },
  footer: {
    tagline: "Penjualan · Kepemimpinan · Komunikasi",
    rights: "Hak cipta dilindungi.",
    backToTop: "Kembali ke atas",
  },
}

const en = {
  nav: { about: "About", projects: "Projects", experience: "Experience", contact: "Contact" },
  hero: {
    greeting: "Hello, I'm",
    name: "Zayidan Muttaqin",
    role: "Sales \u00b7 Leadership \u00b7 Communication",
    tagline: "Disciplined, detail-oriented, responsible, and adaptive — ready to contribute professionally.",
    location: "Banyuwangi, Indonesia",
    ctaContact: "Contact Me",
    downloadCV: "Download CV",
    available: "Available for Work",
  },
  about: {
    title: "About Me",
    bio: "I'm Zayidan Muttaqin — disciplined, detail-oriented, responsible, and adaptive — with experience in Sales and Leadership. Skilled in product selling, communication, and time management.",
    bio2: "Experienced working both individually and in teams, with a results-oriented mindset focused on targets, quality, and efficiency. Ready to contribute professionally in any open position.",
    sales: { title: "Sales & Retail", desc: "Selling, Targets, Negotiation" },
    leadership: { title: "Leader", desc: "Leadership, Management, Team" },
    communication: { title: "Communicator", desc: "Communication, Presentation, Relations" },
    education: { title: "Education", school: "SMK Manbaul Ulum", major: "Light Vehicle Engineering", period: "2017 – 2020", score: "Diploma Score: 82.21" },
    certifications: {
      title: "Certifications",
      subtitle: "Core Competencies",
      sales: "Sales",
      retail: "Retail",
      leadership: "Leadership",
      communication: "Communication",
    },
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
  stats: {
    experience: { value: "3+", label: "Years Experience" },
    hardSkills: { value: "5", label: "Hard Skills" },
    softSkills: { value: "11", label: "Soft Skills" },
    clients: { value: "100+", label: "Clients Served" },
  },
  projects: {
    title: "Projects",
    subtitle: "Some projects I've been working on.",
    viewProject: "View Project",
    sourceCode: "Source Code",
    salesDash: { title: "Sales Dashboard", desc: "Analytics platform for retail sales tracking. Provides real-time data visualization, performance reports, and sales insights for business decision-making." },
    teamMgmt: { title: "Team Management System", desc: "Employee management system for scheduling and team performance monitoring. Helps coordinate tasks, track attendance, and evaluate performance." },
    customerCRM: { title: "Customer CRM", desc: "Customer relationship management system for retail. Records interactions, customer preferences, and purchase history to improve service." },
  },
  testimonials: {
    title: "Testimonials",
    subtitle: "What people say about working with me.",
    t1: { name: "Ahmad Fauzi", role: "Store Owner", company: "Toko Berkah", text: "Zayidan helped increase our monthly sales by 40%. Exceptional negotiation skills and customer understanding.", rating: 5 },
    t2: { name: "Siti Rahmawati", role: "Regional Manager", company: "CV Maju Jaya", text: "Outstanding leadership. Zayidan motivated the team and exceeded targets beyond expectations. Highly recommended!", rating: 5 },
    t3: { name: "Budi Santoso", role: "Business Partner", company: "Freelance", text: "Excellent communication and negotiation. Zayidan is always professional and on-time in every collaborative project.", rating: 4 },
  },
  experience: { title: "Work Experience", present: "Present" },
  contact: {
    title: "Get In Touch",
    subtitle: "Interested in working together? Send me a message and let's bring ideas to life.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "Your Name",
    emailPlaceholder: "name@example.com",
    subjectPlaceholder: "Subject of your message",
    messagePlaceholder: "Tell me about your needs...",
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
    copied: "Copied to clipboard!",
    share: "Share Profile",
  },
  shortcuts: {
    title: "Keyboard Shortcuts",
    theme: "Toggle Theme",
    language: "Toggle Language",
    sections: "Navigate Sections",
    palette: "Command Palette",
  },
  commandPalette: {
    title: "Commands",
    search: "Search commands...",
    navGroup: "Navigation",
    actionsGroup: "Actions",
    goHero: "Go to Hero",
    goAbout: "Go to About",
    goProjects: "Go to Projects",
    goExperience: "Go to Experience",
    goContact: "Go to Contact",
    toggleTheme: "Toggle Theme",
    switchLang: "Switch Language",
    connectWallet: "Connect Wallet",
    downloadCV: "Download CV",
    scrollTop: "Scroll to Top",
    hint: "↑↓ Navigate · ↵ Select · Esc Close",
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