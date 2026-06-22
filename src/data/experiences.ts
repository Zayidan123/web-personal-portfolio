export const experiences = [
  {
    id: 1,
    period: { start: "2025-01", end: "2026-02" },
    role: "Kepala Toko",
    company: "Toko Sinta (SH GROSIR)",
    description: [
      "Mengelola operasional harian toko retail dengan fokus pada efisiensi dan kualitas pelayanan",
      "Menangani keluhan pelanggan serta memastikan kepuasan dan loyalitas pelanggan terjaga",
      "Menerapkan disiplin kerja dan memastikan seluruh karyawan mematuhi SOP perusahaan",
      "Memimpin, memotivasi, dan mengevaluasi kinerja staf toko (kasir, pramuniaga)",
    ],
    tags: ["Retail Management", "Leadership", "Customer Service", "SOP"],
  },
  {
    id: 2,
    period: { start: "2024-01", end: "2024-12" },
    role: "Pramuniaga",
    company: "PT. Hantar Prada Harmoni",
    description: [
      "Menyambut pelanggan dengan sopan dan memberikan pelayanan terbaik",
      "Memberikan informasi produk yang akurat dan membantu pemilihan produk sesuai kebutuhan",
      "Menangani keluhan pelanggan dengan cepat dan profesional",
    ],
    tags: ["Customer Service", "Product Knowledge", "Communication", "Retail"],
  },
  {
    id: 3,
    period: { start: "2023-03", end: "2023-04" },
    role: "Sales Promotion Boy (Event Ramadan)",
    company: "Mitra Swalayan Jajag",
    description: [
      "Pelayanan dan konsultasi pelanggan secara langsung di area penjualan",
      "Operasional dan penjualan produk selama event Ramadan",
      "Penataan produk (Visual Merchandising) untuk meningkatkan daya tarik display",
      "Menguasai product knowledge secara mendalam untuk memberikan rekomendasi tepat",
      "Membuat laporan penjualan harian untuk monitoring pencapaian target",
    ],
    tags: ["Sales Promotion", "Visual Merchandising", "Product Knowledge", "Reporting"],
  },
]

export function formatDate(dateStr: string | null, tPresent: string): string {
  if (!dateStr) return tPresent
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}