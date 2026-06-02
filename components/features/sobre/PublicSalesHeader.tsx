"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { WaLink } from "@/components/features/sobre/WaLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getSiteLinks, getWhatsappPreset } from "@/lib/site-config";

export type PublicSalesNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const DEFAULT_NAV: PublicSalesNavItem[] = [
  { href: "/sobre#quiz", label: "Meu Plano" },
  { href: "/planos", label: "Planos" },
  { href: "/sobre#interface", label: "Telas" },
  { href: "/sobre#produto", label: "Produto" },
  { href: "/sobre#faq", label: "FAQ" },
];

function useScrolledPast(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function PublicSalesHeader({
  navItems = DEFAULT_NAV,
  activeHref,
}: {
  navItems?: PublicSalesNavItem[];
  activeHref?: string;
}) {
  const reduce = useReducedMotion();
  const scrolled = useScrolledPast(24);
  const links = getSiteLinks();
  const waGeral = getWhatsappPreset("geral");

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[var(--glass-border)] backdrop-blur-glass"
      initial={false}
      animate={{
        boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.12)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--glass-bg) 92%, transparent)"
          : "color-mix(in srgb, var(--glass-bg) 72%, transparent)",
      }}
    >
      <motion.div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-8">
        <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
          <Link href={links.appHome} className="flex items-center gap-2 text-[var(--text-primary)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-svg.svg" alt="" width={40} height={40} className="h-9 w-auto" />
            <span className="font-semibold tracking-tight">InEvolving</span>
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-[var(--text-muted)] lg:flex">
          {navItems.map(({ href, label }) => (
            <motion.a
              key={href}
              href={href}
              className={`relative transition-colors hover:text-brand-cyan ${activeHref === href ? "text-brand-cyan" : ""}`}
              whileHover={reduce ? undefined : { y: -1 }}
            >
              {label}
            </motion.a>
          ))}
        </nav>

        <motion.div className="flex shrink-0 items-center gap-2">
          <PrimaryLink href={links.cadastro} variant="outline" className="hidden px-3 py-2 text-xs sm:inline-flex sm:text-sm">
            Criar conta
          </PrimaryLink>
          <WaLink href={waGeral} className="shrink-0 px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm">
            WhatsApp
          </WaLink>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
