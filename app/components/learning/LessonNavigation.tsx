import Link from "next/link";
import type { Lesson } from "@/lib/learning";

export function LessonNavigation({ previous, next }: { previous?: Lesson; next?: Lesson }) {
  return (
    <nav className="lesson-navigation" aria-label="Navigazione tra le lezioni">
      {previous ? (
        <Link className="lesson-navigation-link previous" href={`/impara/${previous.slug}`}>
          <span aria-hidden="true">←</span>
          <span><small>LEZIONE PRECEDENTE</small><strong>{previous.shortTitle}</strong></span>
        </Link>
      ) : <span />}
      {next ? (
        <Link className="lesson-navigation-link next" href={`/impara/${next.slug}`}>
          <span><small>LEZIONE SUCCESSIVA</small><strong>{next.shortTitle}</strong></span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <Link className="lesson-navigation-link next" href="/impara">
          <span><small>PERCORSO COMPLETATO</small><strong>Rivedi tutte le lezioni</strong></span>
          <span aria-hidden="true">↗</span>
        </Link>
      )}
    </nav>
  );
}
