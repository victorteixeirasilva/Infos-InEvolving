"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/layout/ScrollReveal";
import { PublicSalesHeader } from "@/components/features/sobre/PublicSalesHeader";
import { EvolutionQuiz } from "@/components/features/sobre/EvolutionQuiz";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { WaLink } from "@/components/features/sobre/WaLink";
import { TrialBadge } from "@/components/features/sobre/TrialBadge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getSiteLinks, getWhatsappPreset } from "@/lib/site-config";

const NAV_ITEMS = [
  { href: "#inicio", label: "Início" },
  { href: "#quiz", label: "Quiz" },
  { href: "#depoimento", label: "Resultados" },
  { href: "#faq", label: "FAQ" },
];

function CubeAura() {
  const reduce = useReducedMotion();

  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-4 top-12 hidden h-16 w-16 rounded-xl border border-brand-cyan/35 bg-gradient-to-br from-brand-blue/25 to-brand-cyan/20 shadow-glow md:block"
        style={{ transform: "translateZ(26px) rotateX(16deg) rotateY(-22deg)" }}
        animate={reduce ? undefined : { y: [0, -10, 0], rotateY: [-22, -8, -22] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-3 bottom-12 hidden h-10 w-10 rounded-lg border border-brand-pink/35 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 shadow-glow-pink/40 md:block"
        style={{ transform: "translateZ(20px) rotateX(-12deg) rotateY(25deg)" }}
        animate={reduce ? undefined : { y: [0, 7, 0], rotateY: [25, 10, 25] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
      />
    </>
  );
}

export function PrimeirosPassosPageContent() {
  const reduce = useReducedMotion();
  const links = getSiteLinks();
  const waDemo = getWhatsappPreset("demo");
  const waGeral = getWhatsappPreset("geral");

  return (
    <div className="relative flex min-h-dvh flex-col pb-20 sm:pb-0">
      <PublicSalesHeader navItems={NAV_ITEMS} activeHref="#inicio" />

      <section id="inicio" className="relative overflow-hidden px-4 pb-12 pt-12 sm:px-6 md:px-8 md:pb-16 md:pt-16">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 h-[min(540px,72vw)] w-[min(540px,92vw)] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/20 via-brand-cyan/20 to-brand-purple/20 blur-3xl dark:from-brand-purple/25 dark:via-brand-pink/18 dark:to-brand-cyan/20"
          animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.82, 1, 0.82] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <FadeInView className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan dark:text-brand-pink">
              Primeiros passos para evolução real
            </p>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
              Sua nova rotina começa em{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple bg-clip-text text-transparent dark:from-brand-purple dark:via-brand-pink dark:to-brand-cyan">
                2 minutos
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
              Faça o quiz gratuito, receba um plano personalizado e crie sua conta com{" "}
              <strong className="text-[var(--text-primary)]">30 dias grátis</strong> — sem cartão e sem burocracia.
            </p>
            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <PrimaryLink href={links.cadastro} className="w-full min-w-[220px] sm:w-auto">
                Começar 30 dias grátis
              </PrimaryLink>
              <a
                href="#quiz"
                className="inline-flex w-full min-w-[220px] items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-brand-cyan/45 hover:text-brand-cyan dark:hover:border-brand-pink/45 dark:hover:text-brand-pink sm:w-auto"
              >
                Ver meu quiz agora
              </a>
            </motion.div>
            <div className="mt-4 flex justify-center">
              <TrialBadge />
            </div>
          </FadeInView>
        </div>
      </section>

      <section id="quiz" className="scroll-mt-24 px-4 py-12 sm:px-6 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <FadeInView className="mb-6 text-center">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-cyan dark:text-brand-pink">
              Seu plano de evolução
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xl font-bold text-[var(--text-primary)] md:text-2xl">
              O quiz que transforma intenção em execução com um plano de 7, 30 e 60 dias
            </p>
          </FadeInView>

          <div className="relative [perspective:1800px]">
            <CubeAura />
            <motion.div
              className="relative rounded-2xl bg-gradient-to-br from-brand-cyan/50 via-brand-purple/35 to-brand-pink/40 p-[1px] shadow-glow [transform-style:preserve-3d]"
              initial={reduce ? false : { opacity: 0, y: 20, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="pointer-events-none absolute inset-x-4 -bottom-3 h-6 rounded-full bg-brand-cyan/20 blur-xl dark:bg-brand-pink/20"
                style={{ transform: "translateZ(-26px)" }}
              />
              <div
                className="pointer-events-none absolute left-3 right-3 top-3 h-full rounded-2xl border border-white/5"
                style={{ transform: "translateZ(-16px)" }}
              />
              <div className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--glass-bg)_96%,transparent)] p-5 backdrop-blur-glass sm:p-8 md:p-10">
                <EvolutionQuiz autoStart />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="depoimento" className="px-4 py-16 sm:px-6 md:px-8">
        <FadeInView className="mx-auto max-w-3xl text-center">
          <blockquote className="text-pretty text-lg font-medium leading-relaxed text-[var(--text-primary)] md:text-xl">
            &ldquo;A pessoa faz o quiz, enxerga um caminho claro e já entra com vontade de executar. A evolução acontece
            por que, o próximo passo faz sentido.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-[var(--text-muted)]">— Time de crescimento InEvolving</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryLink href={links.cadastro}>Quero meus 30 dias grátis</PrimaryLink>
            <WaLink href={waDemo} variant="outline">
              Tirar dúvida no WhatsApp
            </WaLink>
          </div>
        </FadeInView>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[var(--glass-border)] px-4 py-16 sm:px-6 md:px-8">
        <FadeInView className="mx-auto max-w-3xl">
          <h2 className="text-center font-mono text-xs font-semibold uppercase tracking-widest text-brand-blue dark:text-brand-cyan">
            FAQ
          </h2>
          <p className="mt-2 text-center text-2xl font-bold text-[var(--text-primary)]">Perguntas frequentes</p>
          <div className="mt-8 space-y-3">
            {[
              {
                q: "Precisa de cartão para começar?",
                a: "Não. O cadastro é gratuito e você testa por 30 dias sem cartão.",
              },
              {
                q: "Em quanto tempo faço o quiz?",
                a: "Em cerca de 2 minutos. São 7 perguntas objetivas.",
              },
              {
                q: "Depois do quiz eu já posso usar a plataforma?",
                a: "Sim. O objetivo é transformar seu resultado do quiz em execução no mesmo dia.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 backdrop-blur-glass transition-colors hover:border-brand-cyan/35"
              >
                <summary className="cursor-pointer list-none font-medium text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {item.q}
                    <span className="text-brand-cyan transition-transform duration-200 group-open:rotate-45">+</span>
                  </span>
                </summary>
                <div className="mt-3 text-sm text-[var(--text-muted)]">{item.a}</div>
              </details>
            ))}
          </div>
        </FadeInView>
      </section>

      <footer className="mt-auto border-t border-[var(--glass-border)] bg-[var(--glass-bg)]/60 px-4 py-10 backdrop-blur-glass sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-semibold text-[var(--text-primary)]">InEvolving</p>
            <p className="text-sm text-[var(--text-muted)]">Primeiros passos para uma evolução consistente.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <PrimaryLink href={links.cadastro}>Criar conta grátis</PrimaryLink>
            <WaLink href={waGeral} variant="outline">
              WhatsApp
            </WaLink>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Já é cliente? <AnimatedLink href={links.login}>Entrar</AnimatedLink>
        </p>
      </footer>
    </div>
  );
}
