import type { Metadata } from "next";
import { HomePageContent } from "@/components/features/home/HomePageContent";

export const metadata: Metadata = {
  title: "Quiz de evolução",
  description: "Descubra seu plano personalizado em poucos minutos.",
};

export default function HomePage() {
  return <HomePageContent />;
}
