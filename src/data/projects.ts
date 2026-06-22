// TODO: ganti dengan data nyata
export type ProjectCategory = 'sales' | 'leadership' | 'communication'

export interface Project {
  id: number
  title: string
  category: ProjectCategory
  description: string
  tags: string[]
  liveUrl: string
  image: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Sales Dashboard KPI",
    category: "sales",
    description: "Dashboard real-time untuk monitoring KPI tim penjualan dengan tracking target, pipeline, dan performa individu berbasis data.",
    tags: ["Salesforce", "Analytics", "KPI", "Dashboard"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/sales-dashboard/600/400",
  },
  {
    id: 2,
    title: "CRM Optimization Project",
    category: "sales",
    description: "Optimasi sistem CRM perusahaan untuk meningkatkan conversion rate dan mempercepat proses follow-up pelanggan potensial.",
    tags: ["CRM", "Process Improvement", "Automation", "B2B"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/crm-project/600/400",
  },
  {
    id: 3,
    title: "Team Leadership Program",
    category: "leadership",
    description: "Program pengembangan kepemimpinan untuk 30+ karyawan baru dengan sistem mentoring, evaluasi, dan pelatihan berkelanjutan.",
    tags: ["Leadership", "Training", "Mentoring", "Development"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/leadership-prog/600/400",
  },
  {
    id: 4,
    title: "Market Expansion Strategy",
    category: "leadership",
    description: "Strategi ekspansi pasar ke 3 kota baru dengan analisis kompetitor, segmentasi pelanggan, dan rencana eksekusi tim.",
    tags: ["Strategy", "Market Research", "Expansion", "Planning"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/market-expand/600/400",
  },
  {
    id: 5,
    title: "Client Communication Framework",
    category: "communication",
    description: "Kerangka komunikasi terstruktur untuk penanganan klien korporat termasuk template, SOP, dan escalation path.",
    tags: ["Communication", "SOP", "Client Relations", "Framework"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/comm-framework/600/400",
  },
  {
    id: 6,
    title: "Pitch Deck & Sales Kit",
    category: "communication",
    description: "Pengembangan pitch deck profesional dan sales kit komprehensif untuk presentasi produk ke klien enterprise.",
    tags: ["Presentation", "Sales Kit", "Design", "Negotiation"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/pitch-deck/600/400",
  },
]