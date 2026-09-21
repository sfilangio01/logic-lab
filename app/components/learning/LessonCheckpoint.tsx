import type { LearningCheckpoint } from "@/lib/learning";

export function LessonCheckpoint({ checkpoint, index }: { checkpoint: LearningCheckpoint; index: number }) {
  return (
    <article className="lesson-checkpoint">
      <span className="checkpoint-number">CHECKPOINT {String(index + 1).padStart(2, "0")}</span>
      <h3>{checkpoint.question}</h3>
      <details>
        <summary>Mostra la risposta</summary>
        <div className="checkpoint-answer">
          <strong>{checkpoint.answer}</strong>
          <p>{checkpoint.explanation}</p>
        </div>
      </details>
    </article>
  );
}
