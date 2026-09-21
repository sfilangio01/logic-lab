import Link from "next/link";
import type { Lesson } from "@/lib/learning";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="lesson-card">
      <div className="lesson-card-meta">
        <span>LEZIONE {String(lesson.order).padStart(2, "0")}</span>
        <span>{lesson.duration}</span>
      </div>
      <h3><Link href={`/impara/${lesson.slug}`}>{lesson.title}</Link></h3>
      <p>{lesson.description}</p>
      <div className="lesson-card-footer">
        <span>{lesson.level}</span>
        <Link href={`/impara/${lesson.slug}`} aria-label={`Apri la lezione: ${lesson.title}`}>
          INIZIA <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
