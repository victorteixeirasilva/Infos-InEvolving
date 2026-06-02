"use client";

import { EvolutionQuiz } from "@/components/features/sobre/EvolutionQuiz";

export function HomePageContent() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-8 sm:px-6">
      <EvolutionQuiz autoStart />
    </div>
  );
}
