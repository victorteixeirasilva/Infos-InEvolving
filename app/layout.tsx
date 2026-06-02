import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { LiquidBackdrop } from "@/components/layout/LiquidBackdrop";
import { ParticleField } from "@/components/layout/ParticleField";
import { getSiteUrl, siteConfig } from "@/lib/site-config";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.site.name} — Evolução pessoal e profissional`,
    template: `%s | ${siteConfig.site.name}`,
  },
  description:
    "Gestão de objetivos, tarefas, finanças, livros e motivação com experiência mobile-first.",
  applicationName: siteConfig.site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.site.name,
    title: siteConfig.site.name,
    description: "Plataforma de gestão de evolução pessoal e profissional.",
  },
  icons: {
    icon: [{ url: "/logo/logo-svg.svg", type: "image/svg+xml" }],
    shortcut: "/logo/logo-svg.svg",
    apple: "/logo/logo-svg.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1976D2" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1419" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-blue focus:px-4 focus:py-3 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Providers>
          <div className="relative min-h-dvh w-full min-w-0 max-w-[100vw] overflow-x-hidden">
            <LiquidBackdrop />
            <ParticleField />
            <main id="main-content" className="min-w-0 overflow-x-hidden">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
