import { z } from "zod";
import rawConfig from "../site.config.json";

const planFeatureSchema = z.object({
  text: z.string(),
  included: z.boolean(),
});

const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  priceSuffix: z.string(),
  annualBillingNote: z.string().nullable(),
  spotlightNote: z.string().optional(),
  originalPrice: z.string().nullable(),
  badge: z.string().nullable(),
  highlighted: z.boolean(),
  nameAccent: z.enum(["cyan", "purple"]).optional(),
  features: z.array(planFeatureSchema),
  description: z.string(),
  spotlightDescription: z.string().optional(),
  ctaLabel: z.string(),
  whatsappMessage: z.string(),
});

const segmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  ctaLabel: z.string(),
  whatsappMessage: z.string(),
  badge: z.string().optional(),
  variant: z.enum(["default", "highlighted", "dark"]).optional(),
});

const siteConfigSchema = z.object({
  site: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  links: z.object({
    appHome: z.string().url(),
    login: z.string().url(),
    cadastro: z.string().url(),
  }),
  whatsapp: z.object({
    baseUrl: z.string().url(),
  }),
  spotlightPlanId: z.string(),
  plans: z.array(planSchema).min(1),
  segments: z.array(segmentSchema),
  whatsappPresets: z.object({
    geral: z.string(),
    demo: z.string(),
    quizResult: z.string(),
  }),
});

export type PlanFeature = z.infer<typeof planFeatureSchema>;
export type Plan = z.infer<typeof planSchema>;
export type Segment = z.infer<typeof segmentSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;

function resolveWhatsappBaseUrl(config: SiteConfig): string {
  const envUrl = process.env.NEXT_PUBLIC_WHATSAPP_HELP_URL?.trim();
  if (envUrl) {
    try {
      const u = new URL(envUrl);
      const host = u.hostname.replace(/^www\./, "");
      if (host === "wa.me" || host === "api.whatsapp.com") {
        const seg = u.pathname.replace(/^\//, "").split("/")[0];
        if (seg && /^\d+$/.test(seg)) {
          return `https://wa.me/${seg}`;
        }
      }
    } catch {
      /* ignore */
    }
  }
  return config.whatsapp.baseUrl.replace(/\/$/, "");
}

function parseSiteConfig(): SiteConfig {
  const parsed = siteConfigSchema.safeParse(rawConfig);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`site.config.json inválido:\n${details}`);
  }
  return parsed.data;
}

export const siteConfig = parseSiteConfig();

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || siteConfig.site.url;
}

export function getSiteLinks() {
  return siteConfig.links;
}

export function getPlanById(id: string): Plan | undefined {
  return siteConfig.plans.find((p) => p.id === id);
}

export function getSpotlightPlan(): Plan {
  const plan = getPlanById(siteConfig.spotlightPlanId);
  if (!plan) {
    throw new Error(`Plano spotlight "${siteConfig.spotlightPlanId}" não encontrado em site.config.json`);
  }
  return plan;
}

export function buildWaUrl(message: string): string {
  const base = resolveWhatsappBaseUrl(siteConfig);
  try {
    const u = new URL(base);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "wa.me" || host === "api.whatsapp.com") {
      const seg = u.pathname.replace(/^\//, "").split("/")[0];
      if (seg && /^\d+$/.test(seg)) {
        return `https://wa.me/${seg}?text=${encodeURIComponent(message)}`;
      }
    }
  } catch {
    /* ignore */
  }
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function getWhatsappPreset(key: keyof SiteConfig["whatsappPresets"]): string {
  return buildWaUrl(siteConfig.whatsappPresets[key]);
}

export function getPlanWaUrl(plan: Plan): string {
  return buildWaUrl(plan.whatsappMessage);
}

export function getSegmentWaUrl(segment: Segment): string {
  return buildWaUrl(segment.whatsappMessage);
}
