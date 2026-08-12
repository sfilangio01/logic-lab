"use client";

import { useMemo, useState } from "react";

type Gate = "AND" | "OR";

const truthRows = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

function resultFor(gate: Gate, a: number, b: number) {
  return gate === "AND" ? Number(a === 1 && b === 1) : Number(a === 1 || b === 1);
}

function Toggle({ label, value, onChange }: { label: string; value: number; onChange: () => void }) {
  return (
    <button
      className={`input-toggle ${value ? "is-on" : ""}`}
      type="button"
      role="switch"
      aria-checked={Boolean(value)}
      aria-label={`Ingresso ${label}: ${value}. Premi per cambiare`}
      onClick={onChange}
    >
      <span className="toggle-label">INPUT {label}</span>
      <span className="switch-track"><span className="switch-knob" /></span>
      <strong>{value}</strong>
    </button>
  );
}

export default function LogicLab() {
  const [gate, setGate] = useState<Gate>("AND");
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);
  const output = useMemo(() => resultFor(gate, inputA, inputB), [gate, inputA, inputB]);
  const expression = gate === "AND" ? "A · B" : "A + B";

  return (
    <main>
      <nav className="topbar" aria-label="Navigazione principale">
        <a className="brand" href="#top" aria-label="LogicLab, torna all'inizio">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>LOGIC<span>LAB</span></span>
        </a>
        <div className="nav-links">
          <a href="#simulatore">Simulatore</a>
          <a href="#impara">Come funziona</a>
        </div>
        <span className="status"><i /> SISTEMA ONLINE</span>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span>●</span> CIRCUITI, SENZA COMPLICAZIONI</div>
        <h1>Accendi la<br /><em>logica.</em></h1>
        <p>Modifica gli input. Guarda il segnale muoversi.<br />Capisci davvero come pensano i circuiti.</p>
        <a className="hero-cta" href="#simulatore">PROVA IL SIMULATORE <span>↓</span></a>
        <div className="hero-decoration" aria-hidden="true">
          <span className="deco-dot d1" /><span className="deco-line" /><span className="deco-dot d2" />
        </div>
      </section>

      <section className="simulator-section" id="simulatore">
        <div className="section-heading">
          <div>
            <span className="section-index">01 / SIMULATORE</span>
            <h2>Costruisci il segnale.</h2>
          </div>
          <p>Scegli una porta, attiva gli ingressi<br />e osserva subito il risultato.</p>
        </div>

        <div className="gate-tabs" role="tablist" aria-label="Scegli una porta logica">
          {(["AND", "OR"] as Gate[]).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={gate === item}
              className={gate === item ? "active" : ""}
              onClick={() => setGate(item)}
            >
              <span className={`mini-gate mini-${item.toLowerCase()}`}>{item}</span>
              <span><strong>PORTA {item}</strong><small>{item === "AND" ? "Tutti gli input devono essere 1" : "Almeno un input deve essere 1"}</small></span>
            </button>
          ))}
        </div>

        <div className={`lab-panel ${output ? "output-on" : ""}`}>
          <div className="panel-label">LIVE CIRCUIT</div>
          <div className="circuit" aria-live="polite" aria-label={`Porta ${gate}. Input A ${inputA}, input B ${inputB}, output ${output}`}>
            <div className="inputs-column">
              <Toggle label="A" value={inputA} onChange={() => setInputA((v) => 1 - v)} />
              <Toggle label="B" value={inputB} onChange={() => setInputB((v) => 1 - v)} />
            </div>

            <div className="wire-zone" aria-hidden="true">
              <div className={`wire wire-a ${inputA ? "hot" : ""}`}><i /></div>
              <div className={`wire wire-b ${inputB ? "hot" : ""}`}><i /></div>
              <div className="gate-body"><span>{gate}</span><small>{gate === "AND" ? "&" : "≥1"}</small></div>
              <div className={`wire wire-out ${output ? "hot" : ""}`}><i /></div>
            </div>

            <div className="output-card">
              <span>OUTPUT</span>
              <strong>{output}</strong>
              <small>{output ? "SEGNALE ATTIVO" : "SEGNALE INATTIVO"}</small>
            </div>
          </div>

          <div className="formula-row">
            <span>ESPRESSIONE</span>
            <code>Y = {expression} = <b>{output}</b></code>
            <span className="explanation">{gate === "AND" ? "L'output è 1 solo quando A e B sono entrambi 1." : "L'output è 1 quando almeno uno tra A e B è 1."}</span>
          </div>
        </div>
      </section>

      <section className="learn-section" id="impara">
        <div className="learn-copy">
          <span className="section-index">02 / IMPARA</span>
          <h2>La verità,<br />in quattro righe.</h2>
          <p>Una tabella di verità mostra ogni possibile combinazione degli input e il risultato prodotto dal circuito.</p>
          <div className="concept-note"><span>→</span><p><strong>Stai usando una porta {gate}.</strong><br />La riga evidenziata corrisponde ai tuoi input attuali.</p></div>
        </div>
        <div className="truth-card">
          <div className="truth-header"><span>TABELLA DI VERITÀ</span><span>{gate} GATE</span></div>
          <table>
            <thead><tr><th>INPUT A</th><th>INPUT B</th><th>OUTPUT Y</th></tr></thead>
            <tbody>
              {truthRows.map(([a, b]) => {
                const value = resultFor(gate, a, b);
                const current = a === inputA && b === inputB;
                return <tr key={`${a}${b}`} className={current ? "current" : ""}><td>{a}</td><td>{b}</td><td><span className={value ? "bit-on" : ""}>{value}</span>{current && <small>LIVE</small>}</td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /></span><span>LOGIC<span>LAB</span></span></a>
        <p>Un piccolo laboratorio per grandi idee.</p>
        <a href="#simulatore">TORNA AL CIRCUITO ↑</a>
      </footer>
    </main>
  );
}
