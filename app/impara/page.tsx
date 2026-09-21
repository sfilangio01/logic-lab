import type { Metadata } from "next";
import { LearningBreadcrumbs } from "@/app/components/learning/LearningBreadcrumbs";
import { LessonCard } from "@/app/components/learning/LessonCard";
import EduShell from "@/app/components/EduShell";
import { lessons, totalLearningMinutes } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Impara la logica digitale — Percorso guidato | LogicLab",
  description: "Sei lezioni gratuite e progressive per imparare sistema binario, logica booleana, porte, tabelle di verità e circuiti combinatori.",
  alternates: { canonical: "/impara" },
  openGraph: {
    title: "Impara la logica digitale con LogicLab",
    description: "Un percorso guidato in sei lezioni, dai bit ai circuiti combinatori.",
    url: "/impara",
    type: "website",
  },
};

export default function LearnPage() {
  return (
    <EduShell><main className="learning-page">
      <div className="learning-shell">
        <LearningBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Impara" }]} />

        <section className="learning-hero">
          <div className="learning-hero-copy">
            <span className="learning-kicker">PERCORSO GUIDATO · 6 LEZIONI</span>
            <h1>Dallo zero al circuito,<br />un passaggio alla volta.</h1>
            <p>Un percorso gratuito per comprendere davvero la logica digitale. Ogni lezione aggiunge un solo livello di difficoltà, con esempi svolti e checkpoint per controllare ciò che hai imparato.</p>
            <a className="learning-primary-action" href="#lezioni">INIZIA DALLE BASI <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="learning-overview" aria-label="Riepilogo del percorso">
            <span>IL PERCORSO</span>
            <dl>
              <div><dt>Lezioni</dt><dd>{lessons.length}</dd></div>
              <div><dt>Durata</dt><dd>circa {totalLearningMinutes} min</dd></div>
              <div><dt>Livello</dt><dd>da zero</dd></div>
              <div><dt>Costo</dt><dd>gratuito</dd></div>
            </dl>
          </aside>
        </section>

        <section className="learning-outcomes" aria-labelledby="outcomes-title">
          <div>
            <span className="learning-section-label">COSA IMPARERAI</span>
            <h2 id="outcomes-title">Non solo definizioni:<br />imparerai a ragionare.</h2>
          </div>
          <ul>
            <li><strong>01</strong><span>Leggere e convertire numeri binari.</span></li>
            <li><strong>02</strong><span>Prevedere l’uscita di tutte le porte logiche.</span></li>
            <li><strong>03</strong><span>Costruire e verificare tabelle di verità.</span></li>
            <li><strong>04</strong><span>Seguire un segnale dentro un circuito combinatorio.</span></li>
          </ul>
        </section>

        <section className="lesson-catalog" id="lezioni" aria-labelledby="lessons-title">
          <div className="lesson-catalog-heading">
            <span className="learning-section-label">PROGRAMMA COMPLETO</span>
            <h2 id="lessons-title">Sei lezioni, in ordine.</h2>
            <p>Segui il percorso proposto oppure apri direttamente l’argomento che vuoi ripassare.</p>
          </div>
          <div className="lesson-card-grid">
            {lessons.map((lesson) => <LessonCard key={lesson.slug} lesson={lesson} />)}
          </div>
        </section>

        <section className="learning-method" aria-labelledby="method-title">
          <span className="learning-section-label">METODO LOGICLAB</span>
          <h2 id="method-title">Capisci. Controlla. Applica.</h2>
          <div className="learning-method-grid">
            <article><strong>01</strong><h3>Una regola alla volta</h3><p>Spiegazioni brevi e precise introducono soltanto le idee necessarie al passo corrente.</p></article>
            <article><strong>02</strong><h3>Esempi svolti</h3><p>Ogni concetto viene applicato a numeri, formule o situazioni concrete.</p></article>
            <article><strong>03</strong><h3>Checkpoint immediati</h3><p>Domande con risposta spiegata ti permettono di correggere subito un dubbio.</p></article>
          </div>
        </section>
      </div>

    </main></EduShell>
  );
}
