// TODO: ganti dengan data nyata
export const experiences = [
  {
    id: 1,
    period: { start: "2023-01", end: null }, // null = present
    role: "Senior UX Designer",
    company: "PT. Contoh Indonesia",
    description: [
      "Merancang sistem desain komprehensif untuk platform digital perusahaan",
      "Melakukan riset pengguna dan usability testing untuk 15+ produk",
      "Memimpin tim desain dalam migrasi ke design system terpadu",
    ],
    tags: ["Figma", "User Research", "Prototyping", "Design System"],
  },
  {
    id: 2,
    period: { start: "2021-06", end: "2022-12" },
    role: "Data Analyst",
    company: "DataViz Solutions",
    description: [
      "Menganalisis data pelanggan untuk mengidentifikasi pola churn dan retensi",
      "Membangun dashboard real-time untuk monitoring KPI bisnis",
      "Menyajikan insight strategis kepada stakeholder melalui visualisasi data",
    ],
    tags: ["Python", "Tableau", "SQL", "Data Viz"],
  },
  {
    id: 3,
    period: { start: "2019-03", end: "2021-05" },
    role: "Customer Service Lead",
    company: "TechSupport Global",
    description: [
      "Memimpin tim CS 20+ anggota dengan tingkat kepuasan 95%",
      "Mengembangkan SOP penanganan keluhan dan eskalasi",
      "Mengurangi waktu respons rata-rata sebesar 40% melalui optimasi workflow",
    ],
    tags: ["Zendesk", "CRM", "Team Lead", "SOP"],
  },
  {
    id: 4,
    period: { start: "2017-08", end: "2019-02" },
    role: "Junior Designer",
    company: "CreativeHub Agency",
    description: [
      "Mendesain materi pemasaran digital untuk klien dari berbagai industri",
      "Membuat mockup dan prototype untuk aplikasi mobile dan web",
      "Berkolaborasi dengan tim development dalam proses agile sprint",
    ],
    tags: ["Adobe XD", "Photoshop", "Illustrator", "Agile"],
  },
]

export function formatDate(dateStr: string | null, tPresent: string): string {
  if (!dateStr) return tPresent
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}