import type { Metadata } from "next";
import Link from "next/link";
import ExerciseRunner from "@/app/components/exercises/ExerciseRunner";
import EduShell from "@/app/components/EduShell";

export const metadata: Metadata = {
  title: "Esercizi di logica digitale — LogicLab",
  description: "Allenati con porte logiche, numeri binari, tabelle di verità e circuiti combinati attraverso esercizi interattivi con spiegazioni.",
  alternates: { canonical: "/esercizi" },
  openGraph: {
    title: "Esercizi interattivi di logica digitale — LogicLab",
    description: "Venti esercizi graduati su porte logiche, binario, tabelle di verità e circuiti.",
    url: "/esercizi",
    type: "website",
  },
};

export default function ExercisesPage() {
  return (
    <EduShell><main className="exercises-page">
      <nav className="exercises-breadcrumb" aria-label="Percorso">
        <Link href="/">LogicLab</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Esercizi</span>
      </nav>

      <header className="exercises-hero">
        <p className="exercises-eyebrow">ALLENAMENTO INTERATTIVO</p>
        <h1>Metti alla prova la logica.</h1>
        <p>Venti quesiti graduati su porte logiche, numeri binari, tabelle di verità e circuiti. Ogni risposta include una spiegazione, e i progressi restano salvati su questo dispositivo.</p>
      </header>

      <ExerciseRunner />
      <section className="learning-method" aria-labelledby="exercise-guide-title">
        <span className="learning-section-label">RIPASSA PRIMA DI RISPONDERE</span>
        <h2 id="exercise-guide-title">Tre modi per prepararti.</h2>
        <div className="learning-method-grid">
          <article><strong>01 / LE REGOLE</strong><h3>Porte logiche</h3><p>Confronta AND, OR, NOT, NAND, NOR, XOR e XNOR con simboli e tabelle di verità.</p><Link href="/porte-logiche">ESPLORA LE PORTE ↗</Link></article>
          <article><strong>02 / I NUMERI</strong><h3>Bit e binario</h3><p>Ripassa il valore posizionale dei bit prima di affrontare conversioni e operazioni.</p><Link href="/impara/bit-e-sistema-binario">LEGGI LA LEZIONE ↗</Link></article>
          <article><strong>03 / I CIRCUITI</strong><h3>Segui il segnale</h3><p>Prova il mezzo sommatore e il multiplexer, poi torna a prevedere le uscite da solo.</p><Link href="/visualizza">APRI I VISUAL ↗</Link></article>
        </div>
      </section>
    </main></EduShell>
  );
}
