// TODO: ganti dengan data nyata
export type ProjectCategory = 'design' | 'analitik' | 'cs'

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
    title: "Dashboard Analytics",
    category: "analitik",
    description: "Dashboard real-time untuk monitoring KPI bisnis dengan visualisasi data interaktif dan alert system otomatis.",
    tags: ["Tableau", "Python", "Data Viz", "API"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/analytics1/600/400",
  },
  {
    id: 2,
    title: "E-Commerce Redesign",
    category: "design",
    description: "Redesain menyeluruh platform e-commerce dengan fokus pada konversi dan pengalaman pengguna yang seamless.",
    tags: ["Figma", "UX Research", "Prototyping", "A/B Testing"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/ecommerce2/600/400",
  },
  {
    id: 3,
    title: "CS Ticketing System",
    category: "cs",
    description: "Sistem tiket otomatis untuk meningkatkan efisiensi penanganan keluhan pelanggan dengan AI-powered routing.",
    tags: ["Zendesk", "Automation", "NLP", "Workflow"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/ticketing3/600/400",
  },
  {
    id: 4,
    title: "Mobile Banking App",
    category: "design",
    description: "Desain UI/UX untuk aplikasi perbankan digital dengan fitur keamanan biometrik dan dashboard personal finance.",
    tags: ["Figma", "Mobile Design", "Security UX", "Accessibility"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/banking4/600/400",
  },
  {
    id: 5,
    title: "Customer Churn Predictor",
    category: "analitik",
    description: "Model prediktif untuk mengidentifikasi pelanggan berisiko churn dan rekomendasi strategi retensi personal.",
    tags: ["Python", "Machine Learning", "SQL", "Dashboard"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/churn5/600/400",
  },
  {
    id: 6,
    title: "Knowledge Base Portal",
    category: "cs",
    description: "Portal self-service untuk FAQ dan panduan pengguna dengan search engine cerdas dan analytics usage tracking.",
    tags: ["React", "Search", "Analytics", "CMS"],
    liveUrl: "#",
    image: "https://picsum.photos/seed/knowledge6/600/400",
  },
]