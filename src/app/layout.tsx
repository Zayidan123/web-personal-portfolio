import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PortfolioPage } from "./page";

export const metadata: Metadata = {
  title: "Zayidan Muttaqin — Sales · Kepemimpinan · Komunikasi",
  description: "Portfolio profesional Zayidan Muttaqin — Sales, Leadership, dan Communication Expert. Disiplin, teliti, bertanggung jawab, dan adaptif.",
  keywords: ["portfolio", "sales", "leadership", "communication", "web3", "Zayidan Muttaqin"],
  openGraph: {
    title: "Zayidan Muttaqin — Sales · Kepemimpinan · Komunikasi",
    description: "Portfolio profesional Zayidan Muttaqin — Disiplin, teliti, bertanggung jawab, dan adaptif.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <ThemeProvider>
          <PortfolioPage />
        </ThemeProvider>
        {/* Scanline overlay for dark mode */}
        <div className="scanline-overlay" />
      </body>
    </html>
  );
}