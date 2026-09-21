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
    </main></EduShell>
  );
}
