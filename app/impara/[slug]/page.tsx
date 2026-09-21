import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningBreadcrumbs } from "@/app/components/learning/LearningBreadcrumbs";
import { LessonCheckpoint } from "@/app/components/learning/LessonCheckpoint";
import { LessonNavigation } from "@/app/components/learning/LessonNavigation";
import EduShell from "@/app/components/EduShell";
import { getLesson, getLessonNavigation, lessons } from "@/lib/learning";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};

  return {
    title: `${lesson.title} — Lezione ${lesson.order} | LogicLab`,
    description: lesson.description,
    alternates: { canonical: `/impara/${lesson.slug}` },
    openGraph: {
      title: `${lesson.title} | LogicLab`,
      description: lesson.description,
      url: `/impara/${lesson.slug}`,
      type: "article",
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const { previous, next } = getLessonNavigation(lesson.slug);
  const learningResourceData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.description,
    inLanguage: "it",
    educationalLevel: lesson.level,
    timeRequired: `PT${Number.parseInt(lesson.duration, 10)}M`,
    isPartOf: { "@type": "Course", name: "Fondamenti di logica digitale — LogicLab" },
  };

  return (
    <EduShell><main className="lesson-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceData) }} />
      <div className="lesson-shell">
        <LearningBreadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Impara", href: "/impara" },
          { label: lesson.shortTitle },
        ]} />

        <header className="lesson-hero">
          <div className="lesson-hero-main">
            <span className="learning-kicker">LEZIONE {String(lesson.order).padStart(2, "0")} DI {String(lessons.length).padStart(2, "0")} · {lesson.level.toUpperCase()}</span>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
          </div>
          <dl className="lesson-facts">
            <div><dt>Durata</dt><dd>{lesson.duration}</dd></div>
            <div><dt>Prerequisiti</dt><dd>{lesson.prerequisites.join(" · ")}</dd></div>
          </dl>
        </header>

        <div className="lesson-layout">
          <aside className="lesson-objectives" aria-labelledby="objectives-title">
            <span className="learning-section-label">OBIETTIVI</span>
            <h2 id="objectives-title">Al termine saprai:</h2>
            <ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
          </aside>

          <article className="lesson-content">
            <p className="lesson-introduction">{lesson.introduction}</p>

            {lesson.sections.map((section, index) => (
              <section className="lesson-section" key={section.title} aria-labelledby={`section-${index + 1}`}>
                <span className="lesson-section-number">{String(index + 1).padStart(2, "0")}</span>
                <h2 id={`section-${index + 1}`}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

                {section.keyPoints && (
                  <ul className="lesson-key-points" aria-label="Punti chiave">
                    {section.keyPoints.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}

                {section.example && (
                  <aside className="worked-example" aria-label={`Esempio svolto: ${section.example.title}`}>
                    <span>ESEMPIO SVOLTO</span>
                    <h3>{section.example.title}</h3>
                    <p>{section.example.scenario}</p>
                    <ol>{section.example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                    <strong>{section.example.result}</strong>
                  </aside>
                )}
              </section>
            ))}

            <section className="common-mistakes" aria-labelledby="mistakes-title">
              <span className="learning-section-label">ATTENZIONE</span>
              <h2 id="mistakes-title">Errori comuni</h2>
              <div className="common-mistakes-grid">
                {lesson.commonMistakes.map((mistake) => (
                  <article key={mistake.title}>
                    <h3>{mistake.title}</h3>
                    <p>{mistake.explanation}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="lesson-checkpoints" aria-labelledby="checkpoints-title">
              <span className="learning-section-label">METTITI ALLA PROVA</span>
              <h2 id="checkpoints-title">Tre checkpoint veloci</h2>
              <p>Prova a rispondere prima di aprire la soluzione. Se sbagli, rileggi la spiegazione e riprova a voce.</p>
              <div className="lesson-checkpoint-list">
                {lesson.checkpoints.map((checkpoint, index) => <LessonCheckpoint key={checkpoint.question} checkpoint={checkpoint} index={index} />)}
              </div>
            </section>

            <section className="lesson-recap" aria-labelledby="recap-title">
              <span className="learning-section-label">IN SINTESI</span>
              <h2 id="recap-title">Porta con te queste idee.</h2>
              <ul>{lesson.recap.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link href="/#simulatore">APPLICA NEL SIMULATORE <span aria-hidden="true">↗</span></Link>
            </section>
          </article>
        </div>

        <LessonNavigation previous={previous} next={next} />
      </div>

    </main></EduShell>
  );
}
