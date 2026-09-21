import type { MetadataRoute } from "next";
import { gateDefinitions } from "../lib/gates";
import { lessons } from "../lib/learning";
import { siteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/impara", "/esercizi", "/porte-logiche", "/visualizza", "/metodo", "/contatti", "/privacy"];
  return [...routes.map((route) => ({ url: `${siteUrl}${route}`, changeFrequency: "weekly" as const, priority: route === "" ? 1 : .8 })), ...lessons.map((lesson) => ({ url: `${siteUrl}/impara/${lesson.slug}`, changeFrequency: "monthly" as const, priority: .8 })), ...gateDefinitions.map((gate) => ({ url: `${siteUrl}/porte-logiche/${gate.slug}`, changeFrequency: "monthly" as const, priority: .7 }))];
}
