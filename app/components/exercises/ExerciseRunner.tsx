"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  exerciseCategoryLabels,
  exercises,
  type Exercise,
  type ExerciseVisual,
} from "@/lib/exercises";

const STORAGE_KEY = "logiclab-exercise-progress-v1";

type SavedAnswer = {
  answer: string;
  correct: boolean;
  attempts: number;
};

type ExerciseProgressV1 = {
  version: 1;
  currentIndex: number;
  answers: Record<string, SavedAnswer>;
};

const emptyProgress: ExerciseProgressV1 = { version: 1, currentIndex: 0, answers: {} };

function isProgress(value: unknown): value is ExerciseProgressV1 {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ExerciseProgressV1>;
  return candidate.version === 1 && typeof candidate.currentIndex === "number" && Boolean(candidate.answers) && typeof candidate.answers === "object";
}

function ExerciseVisualisation({ visual }: { visual: ExerciseVisual }) {
  if (visual.kind === "gate") {
    return (
      <div className="exercise-gate-visual" role="img" aria-label={`Porta ${visual.gate} con ${visual.inputs.map((input) => `ingresso ${input.label} uguale a ${input.value}`).join(", ")}`}>
        <div className="exercise-input-list">
          {visual.inputs.map((input) => <span className="exercise-signal" key={input.label}><span>{input.label}</span><strong>{input.value}</strong></span>)}
        </div>
        <span className="exercise-flow-arrow" aria-hidden="true">→</span>
        <span className="exercise-gate-symbol"><Image src={`/gates/${visual.gate.toLowerCase()}.svg`} alt="" width={200} height={120} /><strong>{visual.gate}</strong></span>
        <span className="exercise-flow-arrow" aria-hidden="true">→</span>
        <strong className="exercise-output-unknown">?</strong>
      </div>
    );
  }

  if (visual.kind === "binary") {
    return (
      <div className="exercise-binary-visual">
        <code>{visual.expression}</code>
        {visual.note && <p>{visual.note}</p>}
      </div>
    );
  }

  if (visual.kind === "truth-table") {
    return (
      <div className="exercise-table-wrap">
        <table className="exercise-truth-table">
          <caption>Tabella di verità della porta {visual.gate}</caption>
          <thead><tr>{visual.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
          <tbody>{visual.rows.map((row, rowIndex) => <tr key={`${visual.gate}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className={cell === "?" ? "exercise-missing-cell" : undefined}>{cell}<span className="sr-only">{cell === "?" ? "valore da completare" : ""}</span></td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="exercise-circuit-visual" role="img" aria-label={`Circuito ${visual.expression}. ${visual.inputs.map((input) => `${input.label} uguale a ${input.value}`).join(", ")}. Passaggi: ${visual.stages.join(", ")}.`}>
      <code>{visual.expression}</code>
      <div className="exercise-input-list">
        {visual.inputs.map((input) => <span className="exercise-signal" key={input.label}><span>{input.label}</span><strong>{input.value}</strong></span>)}
      </div>
      <ol className="exercise-stage-list">
        {visual.stages.map((stage) => <li key={stage}>{stage}</li>)}
      </ol>
    </div>
  );
}

function readProgress(): ExerciseProgressV1 {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyProgress;
    const parsed: unknown = JSON.parse(stored);
    if (!isProgress(parsed)) return emptyProgress;
    const answers = Object.fromEntries(Object.entries(parsed.answers).flatMap(([id, value]) => {
      const exercise = exercises.find((item) => item.id === id);
      if (!exercise || !value || typeof value !== "object") return [];
      const saved = value as Partial<SavedAnswer>;
      if (typeof saved.answer !== "string") return [];
      return [[id, {
        answer: saved.answer,
        correct: saved.answer === exercise.correctChoiceId,
        attempts: typeof saved.attempts === "number" && Number.isFinite(saved.attempts) ? saved.attempts : 1,
      }]];
    }));
    return {
      ...parsed,
      answers,
      currentIndex: Math.min(Math.max(0, parsed.currentIndex), exercises.length - 1),
    };
  } catch {
    return emptyProgress;
  }
}

export default function ExerciseRunner() {
  const [progress, setProgress] = useState<ExerciseProgressV1>(emptyProgress);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | "missing" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const exercise = exercises[currentIndex];

  const attemptedCount = useMemo(() => Object.keys(progress.answers).length, [progress.answers]);
  const correctCount = useMemo(() => Object.values(progress.answers).filter((answer) => answer.correct).length, [progress.answers]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = readProgress();
      const savedExercise = exercises[saved.currentIndex];
      const savedAnswer = savedExercise ? saved.answers[savedExercise.id] : undefined;
      setProgress(saved);
      setCurrentIndex(saved.currentIndex);
      setSelectedChoice(savedAnswer?.answer ?? "");
      setFeedback(savedAnswer ? (savedAnswer.correct ? "correct" : "incorrect") : null);
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [loaded, progress]);

  useEffect(() => {
    if (feedback) feedbackRef.current?.focus();
  }, [feedback]);

  const goToExercise = (nextIndex: number, nextProgress = progress) => {
    const boundedIndex = Math.min(Math.max(0, nextIndex), exercises.length - 1);
    const nextExercise = exercises[boundedIndex];
    const savedAnswer = nextProgress.answers[nextExercise.id];
    setCurrentIndex(boundedIndex);
    setSelectedChoice(savedAnswer?.answer ?? "");
    setFeedback(savedAnswer ? (savedAnswer.correct ? "correct" : "incorrect") : null);
    setShowHint(false);
    setProgress({ ...nextProgress, currentIndex: boundedIndex });
    document.getElementById("exercise-title")?.focus();
  };

  const checkAnswer = () => {
    if (!selectedChoice) {
      setFeedback("missing");
      return;
    }

    const correct = selectedChoice === exercise.correctChoiceId;
    const previous = progress.answers[exercise.id];
    const nextProgress: ExerciseProgressV1 = {
      ...progress,
      currentIndex,
      answers: {
        ...progress.answers,
        [exercise.id]: {
          answer: selectedChoice,
          correct,
          attempts: (previous?.attempts ?? 0) + 1,
        },
      },
    };
    setProgress(nextProgress);
    setFeedback(correct ? "correct" : "incorrect");
  };

  const resetProgress = () => {
    if (!window.confirm("Vuoi cancellare tutte le risposte e ricominciare dal primo esercizio?")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setProgress(emptyProgress);
    setCurrentIndex(0);
    setSelectedChoice("");
    setFeedback(null);
    setShowHint(false);
    document.getElementById("exercise-title")?.focus();
  };

  const renderFeedback = (currentExercise: Exercise) => {
    if (feedback === "missing") return <p>Seleziona una risposta prima di controllare.</p>;
    if (feedback === "correct") return <><h3>Risposta corretta</h3><p>{currentExercise.explanation}</p></>;
    if (feedback === "incorrect") return <><h3>Non ancora</h3><p>{currentExercise.explanation}</p><p>Puoi cambiare risposta e riprovare.</p></>;
    return null;
  };

  if (!loaded) return <p className="exercise-loading" role="status">Caricamento degli esercizi…</p>;

  return (
    <section className="exercise-runner" aria-labelledby="exercise-title">
      <header className="exercise-runner-header">
        <div>
          <p className="exercise-category">{exerciseCategoryLabels[exercise.category]} · Livello {exercise.difficulty}</p>
          <p className="exercise-position">Esercizio {currentIndex + 1} di {exercises.length}</p>
        </div>
        <button className="exercise-reset-button" type="button" onClick={resetProgress}>Azzera progressi</button>
      </header>

      <div className="exercise-progress-summary">
        <label htmlFor="exercise-progress">Progresso: {attemptedCount} {attemptedCount === 1 ? "tentato" : "tentati"}, {correctCount} {correctCount === 1 ? "corretto" : "corretti"}</label>
        <progress id="exercise-progress" max={exercises.length} value={attemptedCount}>{attemptedCount} di {exercises.length}</progress>
      </div>

      <article className="exercise-card">
        <h2 id="exercise-title" tabIndex={-1}>{exercise.title}</h2>
        <p className="exercise-prompt">{exercise.prompt}</p>

        <ExerciseVisualisation visual={exercise.visual} />

        <fieldset className="exercise-answer-group">
          <legend>Scegli una risposta</legend>
          {exercise.choices.map((choice) => (
            <label className="exercise-answer-option" key={choice.id}>
              <input
                type="radio"
                name={`answer-${exercise.id}`}
                value={choice.id}
                checked={selectedChoice === choice.id}
                onChange={() => {
                  setSelectedChoice(choice.id);
                  setFeedback(null);
                }}
              />
              <span>{choice.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="exercise-actions">
          <button className="exercise-check-button" type="button" onClick={checkAnswer}>Controlla risposta</button>
          <button className="exercise-hint-button" type="button" aria-expanded={showHint} aria-controls="exercise-hint" onClick={() => setShowHint((visible) => !visible)}>
            {showHint ? "Nascondi suggerimento" : "Mostra suggerimento"}
          </button>
        </div>

        {showHint && <aside className="exercise-hint" id="exercise-hint"><h3>Suggerimento</h3><p>{exercise.hint}</p></aside>}

        {feedback && (
          <div className={`exercise-feedback exercise-feedback-${feedback}`} ref={feedbackRef} tabIndex={-1} role={feedback === "missing" ? "alert" : "status"} aria-live={feedback === "missing" ? "assertive" : "polite"}>
            {renderFeedback(exercise)}
          </div>
        )}
      </article>

      <p className="exercise-scroll-cue" id="exercise-scroll-cue">Scorri i numeri per vedere tutti gli esercizi <span aria-hidden="true">↔</span></p>
      <nav className="exercise-navigation" aria-label="Navigazione tra gli esercizi">
        <button type="button" disabled={currentIndex === 0} onClick={() => goToExercise(currentIndex - 1)}>← Precedente</button>
        <ol className="exercise-step-list" aria-label="Elenco esercizi, scorribile orizzontalmente" aria-describedby="exercise-scroll-cue">
          {exercises.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                aria-label={`Vai all’esercizio ${index + 1}: ${item.title}${progress.answers[item.id] ? progress.answers[item.id].correct ? ", corretto" : ", da riprovare" : ", non completato"}`}
                aria-current={index === currentIndex ? "step" : undefined}
                className={progress.answers[item.id]?.correct ? "is-correct" : progress.answers[item.id] ? "is-attempted" : undefined}
                onClick={() => goToExercise(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" disabled={currentIndex === exercises.length - 1} onClick={() => goToExercise(currentIndex + 1)}>Successivo →</button>
      </nav>
    </section>
  );
}
