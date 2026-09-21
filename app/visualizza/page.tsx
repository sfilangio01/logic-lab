import type { Metadata } from "next";
import Link from "next/link";
import EduShell from "../components/EduShell";
import CircuitVisuals from "../components/learning/CircuitVisuals";

export const metadata: Metadata = { title: "Circuiti logici interattivi: sommatore e multiplexer | LogicLab", description: "Visualizza passo dopo passo come funzionano un mezzo sommatore e un multiplexer 2 a 1.", alternates: { canonical: "/visualizza" } };

export default function VisualsPage() {
  return <EduShell><main className="edu-main"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span aria-current="page">Visualizzazioni</span></nav><header className="edu-hero"><span className="section-index">CIRCUITI IN MOVIMENTO</span><h1>Segui ogni<br />segnale.</h1><p>Due visualizzazioni interattive mostrano come più porte collaborano per sommare e selezionare dati.</p></header><CircuitVisuals /><aside className="next-callout"><div><span>METTITI ALLA PROVA</span><h2>Ora prevedi tu le uscite.</h2></div><Link href="/esercizi">APRI GLI ESERCIZI →</Link></aside></main></EduShell>;
}
