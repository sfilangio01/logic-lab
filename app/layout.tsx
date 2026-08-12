import type { Metadata } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const mono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = `${protocol}://${host}`;

  return {
    title: "LogicLab — Visualizzatore di porte logiche",
    description: "Simulatore interattivo di porte logiche AND e OR.",
    openGraph: {
      title: "Accendi la logica — LogicLab",
      description: "Visualizzatore interattivo di porte AND e OR.",
      images: [{ url: `${base}/og.png`, width: 1200, height: 630, alt: "LogicLab, accendi la logica" }],
      locale: "it_IT",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: "Accendi la logica — LogicLab", images: [`${base}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body className={`${display.variable} ${mono.variable}`}>{children}</body></html>;
}
