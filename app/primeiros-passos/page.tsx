import type { Metadata } from "next";
import { PrimeirosPassosPageContent } from "@/components/features/primeiros-passos/PrimeirosPassosPageContent";

export const metadata: Metadata = {
  title: "Primeiros passos — Quiz gratuito e 30 dias grátis",
  description:
    "Faça o quiz de evolução em 2 minutos, veja seu plano personalizado e crie sua conta grátis por 30 dias sem cartão.",
  openGraph: {
    title: "Primeiros passos | InEvolving",
    description:
      "Landing page focada em conversão: quiz de evolução, experiência premium e cadastro gratuito por 30 dias.",
  },
};

export default function PrimeirosPassosPage() {
  return <PrimeirosPassosPageContent />;
}
