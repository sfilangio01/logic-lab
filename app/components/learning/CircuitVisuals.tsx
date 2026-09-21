"use client";

import { useState } from "react";

function BitButton({ label, value, onChange }: { label: string; value: number; onChange: () => void }) {
  return <button type="button" className={`visual-bit ${value ? "on" : ""}`} onClick={onChange} aria-label={`${label}: ${value}. Premi per cambiare`} aria-pressed={Boolean(value)}><span>{label}</span><strong>{value}</strong></button>;
}

function Signal({ label, value }: { label: string; value: number }) {
  return <div className={`visual-signal ${value ? "on" : ""}`}><span>{label}</span><strong>{value}</strong><small>{value ? "SEGNALE ATTIVO" : "SEGNALE INATTIVO"}</small></div>;
}

export default function CircuitVisuals() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [d0, setD0] = useState(0);
  const [d1, setD1] = useState(1);
  const [select, setSelect] = useState(0);
  const sum = Number(a !== b);
  const carry = Number(a === 1 && b === 1);
  const muxOutput = select === 0 ? d0 : d1;

  return <div className="visual-labs">
    <section className="visual-card" aria-labelledby="half-adder-title">
      <div className="visual-card-copy"><span className="section-index">VISUAL 01</span><h2 id="half-adder-title">Mezzo sommatore</h2><p>XOR calcola la somma, AND calcola il riporto. Cambia A e B per vedere entrambi i segnali.</p><code>S = A ⊕ B</code><code>C = A · B</code></div>
      <div className="visual-stage half-adder-stage"><div className="visual-inputs"><BitButton label="A" value={a} onChange={() => setA(1 - a)} /><BitButton label="B" value={b} onChange={() => setB(1 - b)} /></div><div className="adder-branches" aria-hidden="true"><div><i className={sum ? "on" : ""} /><span>XOR</span><i className={sum ? "on" : ""} /></div><div><i className={carry ? "on" : ""} /><span>AND</span><i className={carry ? "on" : ""} /></div></div><div className="visual-outputs"><Signal label="SOMMA S" value={sum} /><Signal label="RIPORTO C" value={carry} /></div><p className="sr-only" role="status" aria-live="polite">Con A uguale {a} e B uguale {b}, la somma è {sum} e il riporto è {carry}.</p></div>
    </section>
    <section className="visual-card" aria-labelledby="mux-title">
      <div className="visual-card-copy"><span className="section-index">VISUAL 02</span><h2 id="mux-title">Multiplexer 2 a 1</h2><p>Il selettore SEL decide quale ingresso raggiunge l’uscita. Non somma D0 e D1: ne inoltra soltanto uno. È un approfondimento sui circuiti combinatori.</p><code>Y = ¬SEL·D0 + SEL·D1</code></div>
      <div className="visual-stage"><div className="visual-inputs"><BitButton label="D0" value={d0} onChange={() => setD0(1 - d0)} /><BitButton label="D1" value={d1} onChange={() => setD1(1 - d1)} /><BitButton label="SEL" value={select} onChange={() => setSelect(1 - select)} /></div><div className="mux-switch" aria-hidden="true"><span>SELEZIONATO</span><strong>{select === 0 ? "D0" : "D1"}</strong><i /></div><div className="visual-outputs"><Signal label="USCITA Y" value={muxOutput} /></div><p className="sr-only" role="status" aria-live="polite">Il selettore vale {select}: passa {select === 0 ? "D0" : "D1"}, quindi Y vale {muxOutput}.</p></div>
    </section>
  </div>;
}
