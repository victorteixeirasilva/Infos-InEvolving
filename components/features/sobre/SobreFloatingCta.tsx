"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

export function SobreFloatingCta() {
  const reduce = useReducedMotion();
  const visible = useScrolledPast(400);

  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--glass-bg)_94%,transparent)] px-4 py-3 backdrop-blur-glass sm:hidden"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={scrollToQuiz}
            className="flex w-full tap-target items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-3.5 text-sm font-semibold text-white shadow-glow dark:from-brand-purple dark:to-brand-pink"
          >
            <span aria-hidden>✦</span>
            Fazer quiz — descobrir meu plano
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
