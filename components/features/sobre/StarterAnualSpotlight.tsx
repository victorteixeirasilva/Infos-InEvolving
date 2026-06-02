"use client";

import { motion } from "framer-motion";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { WaLink } from "@/components/features/sobre/WaLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getPlanWaUrl, getSpotlightPlan } from "@/lib/site-config";

export function StarterAnualSpotlight() {
  const reduce = useReducedMotion();
  const plan = getSpotlightPlan();
  const waUrl = getPlanWaUrl(plan);

  return (
    <div className="mx-auto max-w-lg">
      <motion.div
        className="relative overflow-hidden rounded-2xl border-2 border-brand-cyan/50 bg-[var(--glass-bg)] p-8 shadow-glow backdrop-blur-glass dark:border-brand-pink/40"
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {plan.badge ? (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-4 py-1 text-xs font-semibold text-white dark:from-brand-purple dark:to-brand-pink">
            {plan.badge}
          </span>
        ) : null}

        <motion.div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 blur-3xl"
          aria-hidden
          animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <p className="relative font-mono text-xs font-semibold uppercase tracking-wider text-brand-cyan">{plan.name}</p>
        <p className="relative mt-3 flex items-baseline justify-center gap-1 text-[var(--text-primary)]">
          <span className="text-sm font-medium text-[var(--text-muted)]">R$</span>
          <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
          <span className="text-sm text-[var(--text-muted)]">{plan.priceSuffix}</span>
        </p>
        {plan.spotlightNote || plan.annualBillingNote ? (
          <p className="relative mt-1 text-center text-xs text-[var(--text-muted)]">
            {plan.spotlightNote ?? plan.annualBillingNote}
          </p>
        ) : null}

        <ul className="relative mt-6 space-y-2 text-sm text-[var(--text-muted)]">
          {plan.features.filter((f) => f.included).map((f) => (
            <li key={f.text} className="flex items-center gap-2">
              <span className="text-brand-cyan">✓</span> {f.text}
            </li>
          ))}
        </ul>

        <p className="relative mt-4 text-center text-sm leading-relaxed text-[var(--text-muted)]">
          {plan.spotlightDescription ?? plan.description}
        </p>

        <motion.div
          className="relative mt-6"
          animate={
            reduce
              ? undefined
              : {
                  boxShadow: [
                    "0 0 18px rgba(0,188,212,0.2)",
                    "0 0 36px rgba(0,188,212,0.45)",
                    "0 0 18px rgba(0,188,212,0.2)",
                  ],
                }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <WaLink href={waUrl} className="w-full rounded-2xl py-4 text-base">
            {plan.ctaLabel}
          </WaLink>
        </motion.div>

        <p className="relative mt-4 text-center">
          <AnimatedLink href="/planos" className="text-sm font-semibold">
            Ver todos os planos →
          </AnimatedLink>
        </p>
      </motion.div>
    </div>
  );
}
