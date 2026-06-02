import type { Metadata } from "next";
import { SobrePageContent } from "@/components/features/sobre/SobrePageContent";

export const metadata: Metadata = {
  title: "InEvolving — Quiz gratuito e 30 dias grátis",
  description:
    "Descubra seu plano personalizado em 2 minutos, crie conta grátis e comece 30 dias sem cartão. Dashboard, kanban, finanças e motivação.",
  openGraph: {
    title: "InEvolving — Evolução pessoal e profissional",
    description:
      "Quiz de evolução gratuito, cadastro sem cartão e trial de 30 dias. Plataforma completa, PWA instalável.",
  },
};

export default function SobrePage() {
  return <SobrePageContent />;
}
