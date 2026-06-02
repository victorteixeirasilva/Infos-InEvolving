"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/layout/ScrollReveal";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { PlanosPricingGrid } from "@/components/features/sobre/PlanosPricingGrid";
import { PublicSalesHeader } from "@/components/features/sobre/PublicSalesHeader";
import { TrialBadge } from "@/components/features/sobre/TrialBadge";
import { WaLink } from "@/components/features/sobre/WaLink";
import { getSiteLinks, getWhatsappPreset } from "@/lib/site-config";

export function PlanosPageContent() {
  const links = getSiteLinks();
  const waDemo = getWhatsappPreset("demo");

  return (
    <div className="relative flex min-h-dvh flex-col">
      <PublicSalesHeader activeHref="/planos" />

      <section className="px-4 pb-20 pt-12 sm:px-6 md:px-8 md:pb-28 md:pt-16">
        <FadeInView className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-pink dark:text-brand-cyan">
              Planos
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
              Escolha o plano certo para o seu nível de evolução
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[var(--text-muted)]">
              Planos pessoais com valores públicos abaixo. Para equipes e empresas, fechamos condições e volume pelo WhatsApp.
            </p>
            <motion.div className="mt-4 flex justify-center">
              <TrialBadge />
            </motion.div>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              Ainda não tem certeza?{" "}
              <Link href="/sobre#quiz" className="font-semibold text-brand-cyan hover:underline">
                Faça o quiz gratuito
              </Link>{" "}
              e descubra seu plano personalizado.
            </p>
          </div>

          <PlanosPricingGrid />
        </FadeInView>
      </section>

      <footer className="mt-auto border-t border-[var(--glass-border)] bg-[var(--glass-bg)]/60 px-4 py-10 backdrop-blur-glass sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3 text-[var(--text-primary)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-svg.svg" alt="" width={36} height={36} className="h-8 w-auto opacity-90" />
            <div>
              <p className="font-semibold">InEvolving</p>
              <p className="text-sm text-[var(--text-muted)]">Evolução pessoal e profissional</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <PrimaryLink href={links.cadastro} variant="outline" className="text-xs sm:text-sm">
              Criar conta grátis
            </PrimaryLink>
            <WaLink href={waDemo} className="text-xs sm:text-sm">
              Falar no WhatsApp
            </WaLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
