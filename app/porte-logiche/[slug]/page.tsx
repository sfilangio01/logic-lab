import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EduShell from "../../components/EduShell";
import { gateDefinitions, truthRows } from "../../../lib/gates";

export function generateStaticParams() { return gateDefinitions.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gate = gateDefinitions.find((item) => item.slug === slug);
  if (!gate) return {};
  return { title: `Porta ${gate.name}: simbolo e tabella di verità | LogicLab`, description: `${gate.description} Scopri formula, tabella completa, esempio pratico ed errori comuni della porta ${gate.name}.`, alternates: { canonical: `/porte-logiche/${gate.slug}` } };
}

export default async function GateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gate = gateDefinitions.find((item) => item.slug === slug);
  if (!gate) notFound();
  const rows = truthRows(gate);
  const currentIndex = gateDefinitions.findIndex((item) => item.slug === slug);
  const nextGate = gateDefinitions[(currentIndex + 1) % gateDefinitions.length];
  const schema = { "@context": "https://schema.org", "@type": "LearningResource", name: `Porta logica ${gate.name}`, description: gate.description, educationalLevel: "Beginner", inLanguage: "it" };
  return <EduShell><main className="edu-main"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/porte-logiche">Porte logiche</Link><span>›</span><span aria-current="page">{gate.name}</span></nav><header className="gate-detail-hero"><div><span className="section-index">PORTA LOGICA / {gate.name}</span><h1>{gate.name}<br /><em>{gate.tagline}.</em></h1><p>{gate.description}</p><code>{gate.formula}</code></div><div className="gate-detail-symbol"><Image src={`/gates/${gate.slug}.svg`} width={400} height={240} alt={`Simbolo ANSI della porta ${gate.name}`} priority /></div></header><section className="gate-detail-grid"><article><span className="section-index">COME FUNZIONA</span><h2>La regola, senza ambiguità.</h2><p>{gate.description}</p><h3>Esempio reale</h3><p>{gate.example}</p><h3>Errore comune</h3><p>{gate.confusion}</p></article><article><span className="section-index">TABELLA DI VERITÀ</span><table><caption>Risultati della porta {gate.name}</caption><thead><tr><th scope="col">A</th>{!gate.unary && <th scope="col">B</th>}<th scope="col">Y</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.a}-${row.b}`}><td>{row.a}</td>{!gate.unary && <td>{row.b}</td>}<td><strong>{row.output}</strong></td></tr>)}</tbody></table></article></section><aside className="next-callout"><div><span>PORTA SUCCESSIVA</span><h2>{nextGate.name} — {nextGate.tagline}</h2></div><Link href={`/porte-logiche/${nextGate.slug}`}>CONTINUA →</Link></aside></main></EduShell>;
}
