"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Gate = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR";
type BinaryOperation = "+" | "−" | "×" | "÷" | "AND" | "OR" | "XOR";

type GateInfo = {
  name: Gate;
  formula: string;
  symbol: string;
  tagline: string;
  rule: string;
  example: string;
  unary?: boolean;
};

const gates: GateInfo[] = [
  { name: "AND", formula: "A · B", symbol: "&", tagline: "Tutti veri", rule: "L’output vale 1 soltanto quando entrambi gli input valgono 1.", example: "Un macchinario parte se protezione e pulsante sono attivi." },
  { name: "OR", formula: "A + B", symbol: "≥1", tagline: "Almeno uno", rule: "L’output vale 1 quando almeno uno dei due input vale 1.", example: "Un allarme suona se si apre una porta oppure una finestra." },
  { name: "NOT", formula: "¬A", symbol: "1", tagline: "Il contrario", rule: "Inverte l’unico input: 0 diventa 1 e 1 diventa 0.", example: "Una luce si accende quando il sensore non rileva luminosità." , unary: true },
  { name: "NAND", formula: "¬(A · B)", symbol: "&", tagline: "Non entrambi", rule: "È una AND seguita da NOT: vale 0 solo quando entrambi gli input sono 1.", example: "È una porta universale: da sola può costruire ogni circuito logico." },
  { name: "NOR", formula: "¬(A + B)", symbol: "≥1", tagline: "Nessuno vero", rule: "È una OR seguita da NOT: vale 1 soltanto quando entrambi gli input sono 0.", example: "Segnala che nessuno dei due sistemi è attivo." },
  { name: "XOR", formula: "A ⊕ B", symbol: "=1", tagline: "Diversi", rule: "L’output vale 1 quando gli input sono diversi tra loro.", example: "Riconosce la parità ed è il cuore dei circuiti sommatori." },
  { name: "XNOR", formula: "¬(A ⊕ B)", symbol: "=", tagline: "Uguali", rule: "L’output vale 1 quando i due input hanno lo stesso valore.", example: "Confronta due bit e segnala quando coincidono." },
];

const binaryRows = [[0, 0], [0, 1], [1, 0], [1, 1]];
const bitWeights = [128, 64, 32, 16, 8, 4, 2, 1];

function binaryOperation(a: number, b: number, operation: BinaryOperation) {
  switch (operation) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? null : Math.floor(a / b);
    case "AND": return a & b;
    case "OR": return a | b;
    case "XOR": return a ^ b;
  }
}

function formatBinary(value: number, minWidth = 8) {
  const sign = value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toString(2).padStart(minWidth, "0")}`;
}

function resultFor(gate: Gate, a: number, b: number) {
  switch (gate) {
    case "AND": return Number(a === 1 && b === 1);
    case "OR": return Number(a === 1 || b === 1);
    case "NOT": return Number(a === 0);
    case "NAND": return Number(!(a === 1 && b === 1));
    case "NOR": return Number(!(a === 1 || b === 1));
    case "XOR": return Number(a !== b);
    case "XNOR": return Number(a === b);
  }
}

function Toggle({ label, value, onChange }: { label: string; value: number; onChange: () => void }) {
  return (
    <button className={`input-toggle ${value ? "is-on" : ""}`} type="button" role="switch" aria-checked={Boolean(value)} aria-label={`Ingresso ${label}: ${value}. Premi per cambiare`} onClick={onChange}>
      <span className="toggle-label">INPUT {label}</span>
      <span className="switch-track"><span className="switch-knob" /></span>
      <strong>{value}</strong>
    </button>
  );
}

function GateShape({ info, compact = false }: { info: GateInfo; compact?: boolean }) {
  return (
    <span className={`gate-shape gate-${info.name.toLowerCase()} ${compact ? "compact" : ""}`} aria-hidden="true">
      <Image className="gate-symbol-img" src={`/gates/${info.name.toLowerCase()}.svg`} alt="" width={200} height={120} priority={info.name === "XOR"} />
    </span>
  );
}

export default function LogicLab() {
  const [gate, setGate] = useState<Gate>("AND");
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);
  const [decimalValue, setDecimalValue] = useState(42);
  const [binaryA, setBinaryA] = useState("00101101");
  const [binaryB, setBinaryB] = useState("00000111");
  const [binaryOp, setBinaryOp] = useState<BinaryOperation>("+");
  const info = gates.find((item) => item.name === gate) ?? gates[0];
  const output = useMemo(() => resultFor(gate, inputA, inputB), [gate, inputA, inputB]);
  const rows = info.unary ? [[0, 0], [1, 0]] : binaryRows;
  const eightBits = decimalValue.toString(2).padStart(8, "0");
  const decimalA = Number.parseInt(binaryA || "0", 2);
  const decimalB = Number.parseInt(binaryB || "0", 2);
  const calculation = binaryOperation(decimalA, decimalB, binaryOp);
  const calculationBits = calculation === null ? "NON DEFINITO" : formatBinary(calculation);
  const conversionSteps = useMemo(() => {
    if (decimalValue === 0) return [{ value: 0, quotient: 0, remainder: 0 }];
    const steps = [];
    let value = decimalValue;
    while (value > 0) {
      steps.push({ value, quotient: Math.floor(value / 2), remainder: value % 2 });
      value = Math.floor(value / 2);
    }
    return steps;
  }, [decimalValue]);

  const updateBinary = (value: string, setter: (next: string) => void) => {
    setter(value.replace(/[^01]/g, "").slice(0, 8));
  };

  const selectGate = (next: Gate) => {
    setGate(next);
    document.getElementById("simulatore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <nav className="topbar" aria-label="Navigazione principale">
        <a className="brand" href="#top" aria-label="LogicLab, torna all’inizio"><span className="brand-mark"><i /><i /><i /></span><span>LOGIC<span>LAB</span></span></a>
        <div className="nav-links"><a href="#simulatore">Simulatore</a><a href="#binario">Numeri binari</a><a href="#atlante">Porte logiche</a><a href="#teoria">Teoria</a></div>
        <span className="status"><i /> LAB ONLINE</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> LABORATORIO DI ELETTRONICA DIGITALE</div>
          <h1>La logica,<br /><em>in movimento.</em></h1>
          <p>Sette porte. Due bit. Infinite possibilità.<br />Prova, osserva e impara come ragionano i circuiti.</p>
          <div className="hero-actions"><a className="primary-cta" href="#simulatore">APRI IL SIMULATORE <span>↘</span></a><a href="#atlante">ESPLORA LE 7 PORTE</a></div>
        </div>
        <div className="hero-board" aria-hidden="true">
          <span className="board-tag">LIVE PREVIEW</span>
          <div className="hero-circuit">
            <GateShape info={gates[5]} />
            <i className="circuit-pin pin-a on" />
            <i className="circuit-pin pin-b" />
            <span className="circuit-output"><i />1</span>
          </div>
          <span className="board-formula">Y = A ⊕ B</span>
        </div>
        <div className="hero-stats"><span><b>07</b> PORTE</span><span><b>02</b> INPUT</span><span><b>01</b> BIT DI OUTPUT</span></div>
      </section>

      <section className="simulator-section" id="simulatore">
        <div className="section-heading">
          <div><span className="section-index">01 / SIMULATORE</span><h2>Costruisci il segnale.</h2></div>
          <p>Scegli una porta, cambia gli ingressi<br />e segui il flusso fino al risultato.</p>
        </div>

        <div className="gate-palette" role="tablist" aria-label="Scegli una porta logica">
          {gates.map((item, index) => (
            <button key={item.name} type="button" role="tab" aria-selected={gate === item.name} className={gate === item.name ? "active" : ""} onClick={() => setGate(item.name)}>
              <small>0{index + 1}</small><GateShape info={item} compact /><span><strong>{item.name}</strong><em>{item.tagline}</em></span>
            </button>
          ))}
        </div>

        <div className={`lab-panel ${output ? "output-on" : ""}`}>
          <div className="panel-top"><span>LIVE CIRCUIT / {gate}</span><span><i /> AGGIORNAMENTO ISTANTANEO</span></div>
          <div className="circuit" aria-live="polite" aria-label={`Porta ${gate}. Input A ${inputA}${info.unary ? "" : `, input B ${inputB}`}, output ${output}`}>
            <div className={`inputs-column ${info.unary ? "unary" : ""}`}>
              <Toggle label="A" value={inputA} onChange={() => setInputA((v) => 1 - v)} />
              {!info.unary && <Toggle label="B" value={inputB} onChange={() => setInputB((v) => 1 - v)} />}
              {info.unary && <div className="unused-input"><span>INPUT B</span><strong>—</strong><small>NON USATO</small></div>}
            </div>

            <div className={`wire-zone ${info.unary ? "unary" : ""}`} aria-hidden="true">
              <div className={`wire wire-a ${inputA ? "hot" : ""}`}><i /></div>
              {!info.unary && <div className={`wire wire-b ${inputB ? "hot" : ""}`}><i /></div>}
              <GateShape info={info} />
              <div className={`wire wire-out ${output ? "hot" : ""}`}><i /></div>
            </div>

            <div className="output-card"><span>OUTPUT Y</span><strong>{output}</strong><small><i /> {output ? "SEGNALE ATTIVO" : "SEGNALE INATTIVO"}</small></div>
          </div>

          <div className="formula-row">
            <div><span>ESPRESSIONE</span><code>Y = {info.formula} = <b>{output}</b></code></div>
            <p><strong>Che cosa succede?</strong>{info.rule}</p>
          </div>
        </div>

        <div className="truth-strip">
          <div className="truth-intro"><span className="section-index">TABELLA LIVE</span><h3>Tutti i casi possibili.</h3><p>La riga verde corrisponde agli input impostati nel circuito.</p></div>
          <div className="truth-table-wrap">
            <table>
              <thead><tr><th>INPUT A</th>{!info.unary && <th>INPUT B</th>}<th>OUTPUT Y</th></tr></thead>
              <tbody>{rows.map(([a, b]) => {
                const value = resultFor(gate, a, b);
                const current = a === inputA && (info.unary || b === inputB);
                return <tr key={`${a}${b}`} className={current ? "current" : ""}><td>{a}</td>{!info.unary && <td>{b}</td>}<td><span className={value ? "bit-on" : ""}>{value}</span>{current && <small>LIVE</small>}</td></tr>;
              })}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="binary-section" id="binario">
        <div className="section-heading binary-heading">
          <div><span className="section-index">02 / NUMERI BINARI</span><h2>Conta come un computer.</h2></div>
          <p>Converti, calcola e osserva<br />il peso reale di ogni bit.</p>
        </div>

        <div className="binary-lab">
          <article className="bit-converter">
            <div className="binary-panel-title"><span>CONVERTITORE LIVE</span><strong>8 BIT / 0—255</strong></div>
            <label className="decimal-control">
              <span>NUMERO DECIMALE</span>
              <input type="number" min="0" max="255" value={decimalValue} onChange={(event) => setDecimalValue(Math.min(255, Math.max(0, Number(event.target.value) || 0)))} />
            </label>

            <div className="bit-ruler" aria-label={`${decimalValue} in binario è ${eightBits}`}>
              {bitWeights.map((weight, index) => {
                const active = eightBits[index] === "1";
                return (
                  <button key={weight} type="button" className={active ? "active" : ""} aria-pressed={active} aria-label={`Bit di peso ${weight}: ${active ? 1 : 0}`} onClick={() => setDecimalValue((value) => value ^ weight)}>
                    <small>{weight}</small><b>{active ? 1 : 0}</b><span>2<sup>{7 - index}</sup></span>
                  </button>
                );
              })}
            </div>

            <div className="base-results">
              <div><span>BASE 2</span><strong>{eightBits}</strong></div>
              <div><span>BASE 8</span><strong>{decimalValue.toString(8).toUpperCase()}</strong></div>
              <div><span>BASE 10</span><strong>{decimalValue}</strong></div>
              <div><span>BASE 16</span><strong>{decimalValue.toString(16).toUpperCase()}</strong></div>
            </div>
          </article>

          <article className="conversion-method">
            <div className="binary-panel-title"><span>COME SI CONVERTE</span><strong>÷ 2</strong></div>
            <h3>Divisioni successive.</h3>
            <p>Dividi per 2 e leggi i resti dal basso verso l’alto.</p>
            <div className="division-steps">
              {conversionSteps.map((step, index) => <div key={`${step.value}-${index}`}><code>{step.value} ÷ 2 = {step.quotient}</code><span>RESTO <b>{step.remainder}</b></span></div>)}
            </div>
            <div className="read-back"><span>LETTURA ↑</span><strong>{decimalValue}₁₀ = {Number(decimalValue).toString(2)}₂</strong></div>
          </article>
        </div>

        <article className="binary-calculator">
          <div className="binary-panel-title"><span>CALCOLATRICE BINARIA</span><strong>ARITMETICA + BITWISE</strong></div>
          <div className="calculation-row">
            <label><span>OPERANDO A</span><input value={binaryA} inputMode="numeric" aria-label="Operando A in binario" onChange={(event) => updateBinary(event.target.value, setBinaryA)} /><small>{decimalA} in decimale</small></label>
            <label><span>OPERAZIONE</span><select value={binaryOp} aria-label="Operazione binaria" onChange={(event) => setBinaryOp(event.target.value as BinaryOperation)}>{(["+", "−", "×", "÷", "AND", "OR", "XOR"] as BinaryOperation[]).map((operation) => <option key={operation}>{operation}</option>)}</select><small>{binaryOp === "÷" ? "quoziente intero" : binaryOp.length > 1 ? "bit per bit" : "aritmetica"}</small></label>
            <label><span>OPERANDO B</span><input value={binaryB} inputMode="numeric" aria-label="Operando B in binario" onChange={(event) => updateBinary(event.target.value, setBinaryB)} /><small>{decimalB} in decimale</small></label>
            <div className={`binary-result ${calculation === null ? "invalid" : ""}`}><span>RISULTATO</span><strong>{calculationBits}</strong><small>{calculation === null ? "impossibile dividere per zero" : `${decimalA} ${binaryOp} ${decimalB} = ${calculation} in decimale`}</small></div>
          </div>
          <p className="operator-note"><strong>AND</strong> conserva i bit entrambi a 1 · <strong>OR</strong> conserva almeno un 1 · <strong>XOR</strong> vale 1 quando i bit sono diversi.</p>
        </article>
      </section>

      <section className="atlas-section" id="atlante">
        <div className="section-heading light">
          <div><span className="section-index">03 / ATLANTE</span><h2>Sette modi di decidere.</h2></div>
          <p>Ogni porta applica una regola diversa.<br />Cliccane una per provarla nel circuito.</p>
        </div>
        <div className="atlas-grid">
          {gates.map((item, index) => (
            <article className={gate === item.name ? "selected" : ""} key={item.name}>
              <div className="atlas-card-top"><span>0{index + 1}</span><GateShape info={item} compact /></div>
              <h3>{item.name}</h3><span className="atlas-tagline">{item.tagline}</span>
              <code>Y = {item.formula}</code><p>{item.rule}</p>
              <div className="mini-truth">{(item.unary ? [[0, 0], [1, 0]] : binaryRows).map(([a, b]) => <span key={`${a}${b}`}>{item.unary ? a : `${a}${b}`}<b>→</b><strong>{resultFor(item.name, a, b)}</strong></span>)}</div>
              <button type="button" onClick={() => selectGate(item.name)}>PROVA {item.name} <span>↗</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="theory-section" id="teoria">
        <div className="theory-title"><span className="section-index">04 / TEORIA ESSENZIALE</span><h2>Dal bit<br />al circuito.</h2><p>Le porte logiche sono i mattoni elementari di processori, memorie e dispositivi digitali.</p></div>
        <div className="theory-content">
          <article><span>01</span><div><h3>Il bit: zero oppure uno</h3><p>Un circuito digitale rappresenta l’informazione con due stati. <strong>0</strong> indica tipicamente tensione bassa, <strong>1</strong> tensione alta. Questi stati si chiamano valori booleani.</p></div></article>
          <article><span>02</span><div><h3>Input, regola, output</h3><p>Ogni porta riceve uno o più input, applica una regola logica e produce un solo output. La tabella di verità elenca il risultato per ogni combinazione possibile.</p></div></article>
          <article><span>03</span><div><h3>Porte universali</h3><p><strong>NAND e NOR</strong> sono speciali: combinando più porte dello stesso tipo si può ricreare qualunque altra funzione logica, persino un intero computer.</p></div></article>
          <article><span>04</span><div><h3>Dalle porte ai computer</h3><p>Migliaia di porte formano registri e sommatori; miliardi di transistor organizzati in porte formano i moderni processori. Tutto parte da decisioni tra 0 e 1.</p></div></article>
        </div>
      </section>

      <section className="example-section">
        <div><span className="section-index">NEL MONDO REALE</span><h2>La logica è ovunque.</h2></div>
        <div className="example-cards">{gates.slice(0, 4).map((item) => <article key={item.name}><strong>{item.name}</strong><p>{item.example}</p></article>)}</div>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /></span><span>LOGIC<span>LAB</span></span></a><p>Sette porte. Un linguaggio universale.</p><a href="#top">TORNA SU ↑</a></footer>
    </main>
  );
}
