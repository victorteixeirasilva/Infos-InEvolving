"use client";

import * as React from "react";

export function WaLink({
  href,
  children,
  className,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
}) {
  const base =
    "inline-flex tap-target items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-[380ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-glow hover:shadow-glass-lg hover:scale-[1.02] dark:shadow-glow-pink/40 dark:from-brand-purple dark:to-brand-pink"
      : "border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-glass text-[var(--text-primary)] hover:border-brand-cyan/50 hover:shadow-glow";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
