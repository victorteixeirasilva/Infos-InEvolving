"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { WaLink } from "@/components/features/sobre/WaLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getPlanWaUrl,
  getSegmentWaUrl,
  siteConfig,
  type Plan,
  type Segment,
} from "@/lib/site-config";

function PlanCard({ plan, reduce }: { plan: Plan; reduce: boolean }) {
  const nameClass =
    plan.nameAccent === "purple"
      ? "text-brand-purple dark:text-brand-pink"
      : "text-brand-cyan";
  const borderClass = plan.highlighted
    ? "relative rounded-2xl border-2 border-brand-cyan/50 bg-[var(--glass-bg)] p-6 shadow-glow backdrop-blur-glass dark:border-brand-pink/40"
    : "rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 shadow-glass backdrop-blur-glass";

  return (
    <motion.div
      className={borderClass}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {plan.badge ? (
        <span className="absolute -top-3 left-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-3 py-0.5 text-xs font-semibold text-white dark:from-brand-purple dark:to-brand-pink">
          {plan.badge}
        </span>
      ) : null}
      <p className={`font-mono text-xs font-semibold uppercase tracking-wider ${nameClass}`}>{plan.name}</p>
      {plan.originalPrice ? (
        <motion.div className="mt-2 flex items-baseline gap-2 text-[var(--text-primary)]">
          <span className="text-lg font-medium text-[var(--text-muted)] line-through">R$ {plan.originalPrice}</span>
          <span className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-[var(--text-muted)]">R$</span>
            <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
            <span className="text-sm text-[var(--text-muted)]">{plan.priceSuffix}</span>
          </span>
        </motion.div>
      ) : (
        <p className="mt-2 flex items-baseline gap-1 text-[var(--text-primary)]">
          <span className="text-sm font-medium text-[var(--text-muted)]">R$</span>
          <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
          <span className="text-sm text-[var(--text-muted)]">{plan.priceSuffix}</span>
        </p>
      )}
      {plan.annualBillingNote ? (
        <p className="mt-1 text-xs text-[var(--text-muted)]">{plan.annualBillingNote}</p>
      ) : null}
      <ul className="mt-3 space-y-1 text-sm text-[var(--text-muted)]">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-center gap-2">
            {f.included ? (
              <>
                <span className="text-brand-cyan">✓</span> {f.text}
              </>
            ) : (
              <>
                <span className="text-[var(--text-muted)] opacity-50">✗</span>{" "}
                <span className="opacity-60">{f.text}</span>
              </>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{plan.description}</p>
      <WaLink href={getPlanWaUrl(plan)} className="mt-5 w-full">
        {plan.ctaLabel}
      </WaLink>
    </motion.div>
  );
}

function SegmentCard({ segment, reduce }: { segment: Segment; reduce: boolean }) {
  const waUrl = getSegmentWaUrl(segment);
  const variant = segment.variant ?? "default";

  if (variant === "highlighted") {
    return (
      <GlassCard hoverLift className="relative flex flex-col border-2 border-brand-cyan/50 shadow-glow dark:border-brand-pink/40">
        {segment.badge ? (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-3 py-0.5 text-xs font-semibold text-white dark:from-brand-purple dark:to-brand-pink">
            {segment.badge}
          </span>
        ) : null}
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{segment.title}</h3>
        <p className="mt-2 flex-1 text-sm text-[var(--text-muted)]">{segment.description}</p>
        <WaLink href={waUrl} className="mt-6 w-full">
          {segment.ctaLabel}
        </WaLink>
      </GlassCard>
    );
  }

  if (variant === "dark") {
    return (
      <GlassCard hoverLift className="flex flex-col border border-[var(--glass-border)] bg-[#0d1117]/40 dark:bg-[#0d1117]/60">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{segment.title}</h3>
        <p className="mt-2 flex-1 text-sm text-[var(--text-muted)]">{segment.description}</p>
        <WaLink href={waUrl} variant="outline" className="mt-6 w-full border-white/20">
          {segment.ctaLabel}
        </WaLink>
      </GlassCard>
    );
  }

  return (
    <GlassCard hoverLift className="flex flex-col border border-[var(--glass-border)]">
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{segment.title}</h3>
      <p className="mt-2 flex-1 text-sm text-[var(--text-muted)]">{segment.description}</p>
      <WaLink href={waUrl} className="mt-6 w-full">
        {segment.ctaLabel}
      </WaLink>
    </GlassCard>
  );
}

export function PlanosPricingGrid() {
  const reduce = useReducedMotion();
  const starterPlans = siteConfig.plans.filter((p) => p.id.startsWith("starter"));
  const proPlans = siteConfig.plans.filter((p) => p.id.startsWith("pro"));

  return (
    <>
      <motion.div
        className="mb-4 grid gap-4 md:grid-cols-2"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        {starterPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} reduce={reduce} />
        ))}
      </motion.div>

      <motion.div
        className="mb-10 grid gap-4 md:grid-cols-2"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        {proPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} reduce={reduce} />
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {siteConfig.segments.map((segment) => (
          <SegmentCard key={segment.id} segment={segment} reduce={reduce} />
        ))}
      </div>
    </>
  );
}
