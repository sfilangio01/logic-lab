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
    metadataBase: new URL(base),
    title: "LogicLab — Porte logiche e numeri binari interattivi",
    description: "Simula le sette porte logiche, esplora le tabelle di verità, converti numeri e prova operazioni binarie passo dopo passo.",
    applicationName: "LogicLab",
    alternates: { canonical: "/" },
    keywords: ["porte logiche", "numeri binari", "simulatore logica", "tabella di verità", "conversione binaria"],
    robots: { index: true, follow: true },
    openGraph: {
      title: "LogicLab — Porte logiche e numeri binari",
      description: "Un laboratorio interattivo per simulare porte logiche, conversioni e operazioni binarie.",
      url: base,
      siteName: "LogicLab",
      images: [{ url: `${base}/og.png`, width: 1200, height: 630, alt: "LogicLab, laboratorio interattivo di logica digitale" }],
      locale: "it_IT",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: "LogicLab — Porte logiche e numeri binari", description: "Simula, converti e calcola in binario.", images: [`${base}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(function(){try{var t=localStorage.getItem('logiclab-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;
  const structuredData = { "@context": "https://schema.org", "@type": "EducationalApplication", name: "LogicLab", applicationCategory: "EducationalApplication", operatingSystem: "Web", inLanguage: "it", description: "Laboratorio interattivo di porte logiche e numeri binari." };
  return <html lang="it" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className={`${display.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
