import type { MetadataRoute } from "next";
import { gateDefinitions } from "../lib/gates";
import { lessons } from "../lib/learning";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://logic-lab-one.vercel.app";
  const now = new Date();
  const routes = ["", "/impara", "/esercizi", "/porte-logiche", "/visualizza", "/privacy"];
  return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: now, changeFrequency: "weekly" as const, priority: route === "" ? 1 : .8 })), ...lessons.map((lesson) => ({ url: `${base}/impara/${lesson.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .8 })), ...gateDefinitions.map((gate) => ({ url: `${base}/porte-logiche/${gate.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .7 }))];
}
