"use client";

import { useState } from "react";
import styles from "./CircuitVisuals.module.css";

function BitButton({ label, value, onChange }: { label: string; value: number; onChange: () => void }) {
  return <button type="button" className={`${styles.bitButton} ${value ? styles.bitOn : ""}`} onClick={onChange} aria-label={`${label}: ${value}. Premi per cambiare`} aria-pressed={Boolean(value)}><span>{label}</span><strong>{value}</strong></button>;
}

function Output({ label, value }: { label: string; value: number }) {
  return <div className={`${styles.output} ${value ? styles.outputOn : ""}`}><span>{label}</span><strong>{value}</strong></div>;
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
  const selectedInput = select === 0 ? "D0" : "D1";

  return <div className="visual-labs">
    <section className="visual-card" aria-labelledby="half-adder-title">
      <div className="visual-card-copy"><span className="section-index">VISUAL 01</span><h2 id="half-adder-title">Mezzo sommatore</h2><p>Gli stessi ingressi A e B alimentano <strong>entrambe</strong> le porte: XOR calcola la somma, AND il riporto.</p><code>S = A ⊕ B</code><code>C = A · B</code></div>
      <div className={styles.stage}>
        <svg className={styles.diagram} viewBox="0 0 720 280" role="img" aria-label={`Schema del mezzo sommatore: A ${a} e B ${b} entrano sia nella porta XOR sia nella porta AND. Somma ${sum}, riporto ${carry}.`}>
          <path className={styles.guide} d="M90 70 H320 M90 210 H225 V112 H320 M170 70 V188 H320 M225 210 H320" />
          <circle className={styles.node} cx="170" cy="70" r="5" /><circle className={styles.node} cx="225" cy="210" r="5" />
          <rect className={styles.gate} x="320" y="50" width="120" height="88" rx="12" /><rect className={styles.gate} x="320" y="155" width="120" height="88" rx="12" />
          <text className={styles.gateText} x="380" y="100" textAnchor="middle">XOR</text><text className={styles.gateText} x="380" y="205" textAnchor="middle">AND</text>
          <path className={sum ? styles.highWire : styles.guide} d="M440 94 H630" /><path className={carry ? styles.highWire : styles.guide} d="M440 199 H630" />
          <text className={styles.pinLabel} x="70" y="76" textAnchor="end">A = {a}</text><text className={styles.pinLabel} x="70" y="216" textAnchor="end">B = {b}</text>
          <text className={styles.pinLabel} x="650" y="100">S = {sum}</text><text className={styles.pinLabel} x="650" y="205">C = {carry}</text>
        </svg>
        <div className={styles.controlRow} role="group" aria-label="Ingressi e uscite del mezzo sommatore"><BitButton label="A" value={a} onChange={() => setA(1 - a)} /><BitButton label="B" value={b} onChange={() => setB(1 - b)} /><span className={styles.controlArrow} aria-hidden="true">→</span><Output label="SOMMA S" value={sum} /><Output label="RIPORTO C" value={carry} /></div>
        <p className={styles.caption} role="status" aria-live="polite">A={a} e B={b} entrano in XOR e AND → S={sum}, C={carry}</p>
      </div>
    </section>
    <section className="visual-card" aria-labelledby="mux-title">
      <div className="visual-card-copy"><span className="section-index">VISUAL 02</span><h2 id="mux-title">Multiplexer 2 a 1</h2><p>SEL sceglie quale ingresso dati raggiunge l’uscita: <strong>0 sceglie D0, 1 sceglie D1</strong>. Il percorso scelto resta evidenziato anche quando trasporta 0.</p><code>Y = ¬SEL·D0 + SEL·D1</code></div>
      <div className={styles.stage}>
        <svg className={`${styles.diagram} ${styles.muxDesktop}`} viewBox="0 0 720 280" role="img" aria-label={`Schema multiplexer 2 a 1: D0 ${d0}, D1 ${d1}, SEL ${select}. Percorso selezionato ${selectedInput}, uscita Y ${muxOutput}.`}>
          <path className={select === 0 ? styles.selectedWire : styles.guide} d="M88 75 H270" /><path className={select === 1 ? styles.selectedWire : styles.guide} d="M88 195 H270" />
          <path className={styles.selectWire} d="M350 272 V203" /><polygon className={styles.muxBody} points="270,48 430,82 430,186 270,220" />
          <path className={select === 0 ? styles.selectedRoute : styles.dormantRoute} d="M270 75 H311 L397 134 H430" /><path className={select === 1 ? styles.selectedRoute : styles.dormantRoute} d="M270 195 H311 L397 134 H430" />
          <path className={styles.selectedWire} d="M430 134 H630" /><circle className={styles.routeNode} cx="397" cy="134" r="5" />
          <text className={styles.muxTitle} x="345" y="129" textAnchor="middle">MUX</text><text className={styles.muxSubtitle} x="345" y="147" textAnchor="middle">2 : 1</text>
          <text className={styles.pinLabel} x="70" y="81" textAnchor="end">D0 = {d0}</text><text className={styles.pinLabel} x="70" y="201" textAnchor="end">D1 = {d1}</text><text className={styles.pinLabel} x="350" y="269" textAnchor="end" dx="-13">SEL = {select}</text><text className={styles.pinLabel} x="650" y="140">Y = {muxOutput}</text>
        </svg>
        <svg className={styles.muxMobile} viewBox="0 0 320 340" role="img" aria-label={`Schema multiplexer 2 a 1: D0 ${d0}, D1 ${d1}, SEL ${select}. Percorso selezionato ${selectedInput}, uscita Y ${muxOutput}.`}>
          <path className={select === 0 ? styles.selectedWire : styles.guide} d="M38 75 H110" /><path className={select === 1 ? styles.selectedWire : styles.guide} d="M38 205 H110" />
          <polygon className={styles.muxBody} points="110,40 225,75 225,205 110,240" />
          <path className={select === 0 ? styles.selectedRoute : styles.dormantRoute} d="M110 75 H138 L205 140 H225" /><path className={select === 1 ? styles.selectedRoute : styles.dormantRoute} d="M110 205 H138 L205 140 H225" />
          <path className={styles.selectedWire} d="M225 140 H281" /><path className={styles.selectWire} d="M165 310 V223" /><circle className={styles.routeNode} cx="205" cy="140" r="5" />
          <text className={styles.muxTitle} x="165" y="155" textAnchor="middle">MUX</text><text className={styles.muxSubtitle} x="165" y="174" textAnchor="middle">2 : 1</text>
          <text className={styles.mobilePinLabel} x="7" y="66">D0</text><text className={styles.mobilePinLabel} x="7" y="196">D1</text><text className={styles.mobilePinLabel} x="250" y="132">Y={muxOutput}</text><text className={styles.mobilePinLabel} x="175" y="319">SEL={select}</text>
        </svg>
        <div className={styles.controlRow} role="group" aria-label="Ingressi e uscita del multiplexer"><BitButton label="D0" value={d0} onChange={() => setD0(1 - d0)} /><BitButton label="D1" value={d1} onChange={() => setD1(1 - d1)} /><BitButton label="SEL" value={select} onChange={() => setSelect(1 - select)} /><span className={styles.controlArrow} aria-hidden="true">→</span><Output label="USCITA Y" value={muxOutput} /></div>
        <p className={styles.caption} role="status" aria-live="polite">SEL={select} → {selectedInput} → Y={muxOutput}</p>
      </div>
    </section>
  </div>;
}
