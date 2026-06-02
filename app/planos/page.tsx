import type { Metadata } from "next";
import { PlanosPageContent } from "@/components/features/sobre/PlanosPageContent";

export const metadata: Metadata = {
  title: "Planos InEvolving — Starter, Pro e corporativo",
  description:
    "Compare planos Starter e Pro, mensal e anual. Opções para equipes e empresas. 30 dias grátis sem cartão de crédito.",
  openGraph: {
    title: "Planos InEvolving — Starter, Pro e corporativo",
    description:
      "Valores públicos, trial de 30 dias e onboarding para times. Escolha o plano ideal para sua evolução.",
  },
};

export default function PlanosPage() {
  return <PlanosPageContent />;
}
