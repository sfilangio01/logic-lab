import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EduShell from "../components/EduShell";
import { gateDefinitions } from "../../lib/gates";

export const metadata: Metadata = {
  title: "Le 7 porte logiche: simboli e tabelle di verità | LogicLab",
  description: "Confronta AND, OR, NOT, NAND, NOR, XOR e XNOR: simboli corretti, formule, regole ed esempi pratici.",
  alternates: { canonical: "/porte-logiche" },
};

export default function GatesIndexPage() {
  return <EduShell><main className="edu-main"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span aria-current="page">Porte logiche</span></nav><header className="edu-hero"><span className="section-index">ATLANTE INTERATTIVO</span><h1>Sette porte.<br />Sette decisioni.</h1><p>Confronta simboli, formule e tabelle di verità. Apri una porta per studiarla con esempi ed errori comuni.</p></header><section className="gate-directory" aria-label="Elenco delle porte logiche">{gateDefinitions.map((gate, index) => <article key={gate.name}><div className="gate-directory-top"><small>0{index + 1}</small><Image src={`/gates/${gate.slug}.svg`} width={200} height={120} alt={`Simbolo della porta ${gate.name}`} /></div><h2>{gate.name}</h2><strong>{gate.tagline}</strong><code>{gate.formula}</code><p>{gate.description}</p><Link href={`/porte-logiche/${gate.slug}`}>STUDIA {gate.name} <span>↗</span></Link></article>)}</section><aside className="next-callout"><div><span>NON SAI DA DOVE INIZIARE?</span><h2>Parti dalle tre porte fondamentali.</h2></div><Link href="/impara/porte-fondamentali">APRI LA LEZIONE →</Link></aside></main></EduShell>;
}
