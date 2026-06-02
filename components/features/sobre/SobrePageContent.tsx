"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryLink } from "@/components/ui/PrimaryLink";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { FadeInView, ParallaxSection } from "@/components/layout/ScrollReveal";
import { StaggerList } from "@/features/animations/StaggerList";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PRODUCT_SHOTS } from "@/components/features/sobre/product-shots";
import { EvolutionQuiz } from "@/components/features/sobre/EvolutionQuiz";
import { PublicSalesHeader } from "@/components/features/sobre/PublicSalesHeader";
import { SobreFloatingCta } from "@/components/features/sobre/SobreFloatingCta";
import { StarterAnualSpotlight } from "@/components/features/sobre/StarterAnualSpotlight";
import { TrialBadge } from "@/components/features/sobre/TrialBadge";
import { getSiteLinks, getWhatsappPreset } from "@/lib/site-config";
import { WaLink } from "@/components/features/sobre/WaLink";

const SOBRE_NAV = [
  { href: "#quiz", label: "Meu Plano" },
  { href: "/planos", label: "Planos" },
  { href: "#interface", label: "Telas" },
  { href: "#produto", label: "Produto" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#faq", label: "FAQ" },
];

const MARQUEE_ITEMS = [
  "Dashboard",
  "Categorias",
  "Tarefas",
  "Kanban",
  "Finanças",
  "Livros",
  "Motivação",
  "PWA",
  "Colaboração",
  "Na tela inicial",
];

function GridMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.2]"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(25, 118, 210, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(25, 118, 210, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent)",
      }}
    />
  );
}

function TiltFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 380, damping: 32 });
  const rotateY = useSpring(ry, { stiffness: 380, damping: 32 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(py * -11);
    ry.set(px * 12);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
            }
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

function ProductShowcase() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const shot = PRODUCT_SHOTS[index] ?? PRODUCT_SHOTS[0];
  const cubeDepth = 260;
  const goNext = React.useCallback(() => setIndex((i) => (i + 1) % PRODUCT_SHOTS.length), []);
  const goPrev = React.useCallback(
    () => setIndex((i) => (i - 1 + PRODUCT_SHOTS.length) % PRODUCT_SHOTS.length),
    [],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  return (
    <div className="mx-auto max-w-6xl">
      <FadeInView className="mb-8 max-w-2xl">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-purple dark:text-brand-pink">
          Interface real
        </h2>
        <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-3xl">
          O software por dentro — limpo, rápido e consistente
        </p>
        <p className="mt-3 text-[var(--text-muted)]">
          Navegue pelos módulos principais.
        </p>
      </FadeInView>

      <div className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/55 p-4 shadow-glass-lg backdrop-blur-glass sm:p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-cyan/12 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brand-purple/12 to-transparent dark:from-brand-pink/12" />

        <TiltFrame className="relative mx-auto max-w-4xl">
          <div className="relative aspect-[16/10] w-full [perspective:1700px]">
            <motion.div
              className="absolute inset-0 [transform-style:preserve-3d]"
              animate={
                reduce
                  ? undefined
                  : {
                      rotateY: -(index * 90),
                    }
              }
              style={reduce ? { transform: `rotateY(${-index * 90}deg)` } : undefined}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {PRODUCT_SHOTS.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute inset-0 rounded-2xl border border-[var(--glass-border)] bg-[#0a0e14] p-1 shadow-glass-lg"
                  style={{
                    transform: `rotateY(${i * 90}deg) translateZ(${cubeDepth}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className={`h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-br ${s.accent}`}>
                    <div className="h-full w-full overflow-hidden rounded-[14px] bg-[#0a0e14]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- capturas locais com melhor previsibilidade de render */}
                      <img
                        src={s.src}
                        alt={s.title}
                        width={960}
                        height={600}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        draggable={false}
                        className="pointer-events-none block h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </TiltFrame>

        <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            type="button"
            onClick={goPrev}
            className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-brand-cyan/45 hover:text-brand-cyan dark:hover:border-brand-pink/45 dark:hover:text-brand-pink"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            ← Anterior
          </motion.button>
          <motion.button
            type="button"
            onClick={goNext}
            className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-brand-cyan/45 hover:text-brand-cyan dark:hover:border-brand-pink/45 dark:hover:text-brand-pink"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            Próximo →
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={shot.id}
            className="relative z-10 mt-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)]/80 p-4 text-center backdrop-blur-glass"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-base font-bold text-[var(--text-primary)]">{shot.title}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{shot.caption}</p>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
          {PRODUCT_SHOTS.map((s, i) => (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-9 bg-gradient-to-r from-brand-blue to-brand-cyan dark:from-brand-purple dark:to-brand-pink"
                  : "w-2.5 bg-[var(--glass-border)] hover:bg-brand-cyan/40 dark:hover:bg-brand-pink/40"
              }`}
              aria-label={`Mostrar tela ${s.title}`}
              whileHover={reduce ? undefined : { scale: 1.15 }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
            />
          ))}
        </div>

        <p className="relative z-10 mt-4 text-center text-xs text-[var(--text-muted)]">
          Dica: use as setas ← → do teclado para girar o cubo.
        </p>
      </div>
    </div>
  );
}

function FloatingBadges() {
  const reduce = useReducedMotion();
  const items = [
    { label: "PWA instalável", delay: 0.05 },
    { label: "Sincronização segura", delay: 0.12 },
    { label: "Modo claro e escuro", delay: 0.2 },
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {items.map((item, i) => (
        <motion.span
          key={item.label}
          className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)]/90 px-3 py-1.5 text-[10px] font-medium text-[var(--text-muted)] shadow-glass backdrop-blur-glass sm:text-xs"
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
          animate={
            reduce
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ delay: 0.35 + item.delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block"
            animate={reduce ? {} : { y: [0, -5, 0] }}
            transition={
              reduce
                ? {}
                : {
                    duration: 3.2 + i * 0.35,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: 0.6 + i * 0.2,
                  }
            }
          >
            {item.label}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}

function MarqueeStrip() {
  const reduce = useReducedMotion();
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-[var(--glass-border)] bg-[var(--glass-bg)]/40 py-3 backdrop-blur-sm">
      <motion.div
        className="flex w-max gap-10 px-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : { duration: 28, repeat: Infinity, ease: "linear" }
        }
      >
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="text-brand-cyan">{label}</span>
            <span className="opacity-30">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function StatsRow() {
  const reduce = useReducedMotion();
  const stats = [
    { value: "6+", label: "módulos integrados" },
    { value: "24/7", label: "acesso na nuvem" },
    { value: "100%", label: "foco mobile-first" },
  ];

  return (
    <motion.div
      className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4 border-t border-[var(--glass-border)] pt-10"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">{s.value}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">{s.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

export function SobrePageContent() {
  const reduce = useReducedMotion();
  const links = getSiteLinks();
  const waDemo = getWhatsappPreset("demo");
  const waGeral = getWhatsappPreset("geral");

  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="relative flex min-h-dvh flex-col pb-20 sm:pb-0">
      <PublicSalesHeader navItems={SOBRE_NAV} />

      <section className="relative overflow-hidden px-4 pb-12 pt-12 sm:px-6 md:px-8 md:pb-16 md:pt-16">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 h-[min(520px,70vw)] w-[min(520px,90vw)] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/25 via-brand-cyan/20 to-brand-purple/25 blur-3xl dark:from-brand-purple/30 dark:via-brand-pink/15 dark:to-brand-blue/20"
          aria-hidden
          animate={
            reduce
              ? undefined
              : {
                  scale: [1, 1.06, 1],
                  opacity: [0.85, 1, 0.85],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <GridMesh />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-blue dark:text-brand-cyan"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Disponível para novos usuários · PWA · Nuvem
          </motion.p>
          <motion.h1
            className="text-balance text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl md:leading-[1.1]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            A plataforma onde{" "}
            <span
              className="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift dark:from-brand-purple dark:via-brand-pink dark:to-brand-cyan"
              style={{ WebkitBackgroundClip: "text" }}
            >
              estratégia encontra execução
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-pretty text-base text-[var(--text-muted)] sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Responda 7 perguntas, veja seu plano em 7, 30 e 60 dias — e comece{" "}
            <strong className="text-[var(--text-primary)]">30 dias grátis</strong>, sem cartão. Dashboard, kanban,
            finanças e motivação num só lugar.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              onClick={scrollToQuiz}
              className="w-full min-w-[220px] rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-[380ms] hover:scale-[1.02] hover:shadow-glass-lg dark:from-brand-purple dark:to-brand-pink sm:w-auto"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              Descobrir meu plano em 2 min
            </motion.button>
            <PrimaryLink href={links.cadastro} className="w-full min-w-[220px] sm:w-auto">
              Criar conta grátis
            </PrimaryLink>
            <WaLink href={waDemo} variant="outline" className="w-full min-w-[220px] sm:w-auto">
              WhatsApp
            </WaLink>
          </motion.div>
          <motion.div
            className="mt-5 flex justify-center"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <TrialBadge />
          </motion.div>
          <motion.p
            className="mt-4 text-sm text-[var(--text-muted)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            Já é cliente?{" "}
            <AnimatedLink href={links.login}>Entrar</AnimatedLink>
            {" · "}
            <AnimatedLink href={links.appHome}>Site</AnimatedLink>
          </motion.p>
          <FloatingBadges />
          <StatsRow />
        </div>
      </section>

      <section
        id="quiz"
        className="scroll-mt-24 px-4 py-12 sm:px-6 md:px-8 md:py-16"
      >
        <motion.div className="mx-auto max-w-5xl">
          <FadeInView className="mb-6 text-center">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-cyan dark:text-brand-pink">
              Quiz de evolução
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xl font-bold text-[var(--text-primary)] md:text-2xl">
              Sua primeira pergunta já está abaixo — escolha e comece agora
            </p>
          </FadeInView>
          <div className="relative [perspective:1800px]">
            <motion.div
              className="pointer-events-none absolute -left-5 top-8 hidden h-14 w-14 rounded-xl border border-brand-cyan/30 bg-gradient-to-br from-brand-blue/20 to-brand-cyan/15 shadow-glow md:block"
              style={{ transform: "translateZ(28px) rotateX(18deg) rotateY(-28deg)" }}
              animate={reduce ? undefined : { y: [0, -8, 0], rotateY: [-28, -12, -28] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -right-4 bottom-10 hidden h-10 w-10 rounded-lg border border-brand-pink/35 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 shadow-glow-pink/40 md:block"
              style={{ transform: "translateZ(20px) rotateX(-16deg) rotateY(26deg)" }}
              animate={reduce ? undefined : { y: [0, 6, 0], rotateY: [26, 10, 26] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            <TiltFrame className="origin-center">
              <motion.div
                className="relative rounded-2xl bg-gradient-to-br from-brand-cyan/50 via-brand-purple/35 to-brand-pink/40 p-[1px] shadow-glow [transform-style:preserve-3d]"
                initial={reduce ? false : { opacity: 0, y: 20, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="pointer-events-none absolute inset-x-3 -bottom-3 h-6 rounded-full bg-brand-cyan/20 blur-xl dark:bg-brand-pink/20"
                  style={{ transform: "translateZ(-30px)" }}
                />
                <div
                  className="pointer-events-none absolute left-3 right-3 top-3 h-full rounded-2xl border border-white/5"
                  style={{ transform: "translateZ(-18px)" }}
                />
                <motion.div className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--glass-bg)_96%,transparent)] p-5 backdrop-blur-glass sm:p-8 md:p-10">
                  <GridMesh />
                  <div className="relative">
                    <EvolutionQuiz autoStart />
                  </div>
                </motion.div>
              </motion.div>
            </TiltFrame>
          </div>
        </motion.div>
      </section>

      <MarqueeStrip />

      <section id="interface" className="scroll-mt-24 px-4 py-16 sm:px-6 md:px-8 md:py-20">
        <ParallaxSection>
          <ProductShowcase />
        </ParallaxSection>
      </section>

      <section id="produto" className="scroll-mt-24 px-4 py-16 sm:px-6 md:px-8">
        <FadeInView className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-purple dark:text-brand-pink">
              Produto
            </h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-3xl">
              Um cockpit completo para vida e trabalho
            </p>
            <p className="mt-3 text-[var(--text-muted)]">
              Cada módulo conversa com os outros: mesma identidade visual, mesma navegação e a mesma promessa —
              menos atrito, mais clareza.
            </p>
          </div>

          <StaggerList className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <GlassCard className="lg:col-span-2 lg:row-span-1">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Dashboard inteligente</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Visão consolidada de categorias, progresso e atalhos — seu ponto de partida todos os dias.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Tarefas &amp; Kanban</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Lista e quadro visual integrados, com status e prazos que acompanham o ritmo do time.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Categorias colaborativas</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Compartilhe objetivos com equipe ou família, com permissões e visibilidade sob controle.
              </p>
            </GlassCard>
            <GlassCard className="md:col-span-2">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Finanças</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Entradas, saídas e leitura do período em painéis objetivos — decisão financeira com contexto.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Livros &amp; aprendizado</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Organize leituras e extraia valor do que você estuda, sem perder o fio da meada.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Motivação &amp; sonhos</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Metas visuais e sonhos sempre à vista — para lembrar por que a disciplina vale a pena.
              </p>
            </GlassCard>
            <GlassCard className="lg:col-span-3">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">PWA instalável</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Instale no celular, use como app nativo e transições suaves entre
                telas.
              </p>
            </GlassCard>
          </StaggerList>
        </FadeInView>
      </section>

      <section
        id="diferenciais"
        className="scroll-mt-24 border-y border-[var(--glass-border)] bg-black/[0.02] px-4 py-16 dark:bg-white/[0.02] sm:px-6 md:px-8"
      >
        <FadeInView className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-cyan">
              Por que InEvolving
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              Produto maduro, experiência premium
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {[
              {
                step: "01",
                title: "Design system próprio",
                body: "Gradientes de marca, superfícies em vidro e motion com easing liquid — consistência em cada interação.",
              },
              {
                step: "02",
                title: "API e segurança",
                body: "Arquitetura preparada para integrações, autenticação e evolução contínua sem quebrar sua operação.",
              },
              {
                step: "03",
                title: "Execução em foco",
                body: "Um só lugar para planejar, fazer e medir — menos troca de ferramentas, mais resultado.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="relative rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 backdrop-blur-glass"
                whileHover={reduce ? undefined : { y: -6, boxShadow: "0 0 32px rgba(0, 188, 212, 0.2)" }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <span className="font-mono text-sm font-bold text-brand-blue dark:text-brand-pink">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{item.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <WaLink href={waGeral}>Falar com especialista no WhatsApp</WaLink>
          </div>
        </FadeInView>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-8">
        <FadeInView className="mx-auto max-w-3xl text-center">
          <blockquote className="text-pretty text-lg font-medium leading-relaxed text-[var(--text-primary)] md:text-xl">
            &ldquo;Reduzimos ferramentas espalhadas e ganhamos adesão do time — a interface{' '}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent dark:from-brand-cyan dark:to-brand-pink">
              convida a usar todo dia
            </span>
            .&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            — Coordenação de operações, empresa de serviços (time híbrido)
          </p>
        </FadeInView>
      </section>

      <section id="planos" className="scroll-mt-24 px-4 pb-20 sm:px-6 md:px-8">
        <FadeInView className="mx-auto max-w-6xl">
          <motion.div className="mb-10 text-center">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-pink dark:text-brand-cyan">
              Plano para começar
            </h2>
            <p className="mt-2 text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              Um único plano claro — sem paralisia de escolha
            </p>
            <p className="mx-auto mt-3 max-w-xl text-[var(--text-muted)]">
              Recomendamos o Starter Anual para novos usuários. Quer comparar Pro, mensal ou opções para equipes?{" "}
              <AnimatedLink href="/planos">Veja todos os planos</AnimatedLink>.
            </p>
            <motion.div className="mt-4 flex justify-center">
              <TrialBadge />
            </motion.div>
          </motion.div>
          <StarterAnualSpotlight />
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
                q: "O InEvolving já está disponível?",
                a: "Sim. Novos usuários e empresas podem contratar e começar a usar; fale no WhatsApp para ativação, planos e onboarding.",
              },
              {
                q: "Posso integrar com outros sistemas?",
                a: "Sim. Oferecemos integrações e API para conectar finanças, identidade e fluxos já usados na sua operação.",
              },
              {
                q: "Funciona bem no celular?",
                a: "O produto é mobile-first e PWA instalável, com layout responsivo; requer conexão para carregar o conteúdo.",
              },
              {
                q: "Como fecho plano e pagamento?",
                a: (
                  <>
                    Compare todos os planos na{" "}
                    <AnimatedLink href="/planos">página de planos</AnimatedLink> ou fale no WhatsApp: diagnóstico
                    rápido, proposta e próximos passos sem burocracia desnecessária.
                  </>
                ),
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
          <p className="mt-10 text-center text-sm text-[var(--text-muted)]">
            Outras dúvidas?{" "}
            <a
              href={waGeral}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline decoration-brand-cyan/50 underline-offset-2 hover:text-brand-cyan dark:text-brand-cyan"
            >
              Chame no WhatsApp
            </a>
            .
          </p>
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
      <SobreFloatingCta />
    </div>
  );
}
