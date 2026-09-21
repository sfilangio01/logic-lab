"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  { name: "AND", formula: "A · B", symbol: "&", tagline: "Tutti veri", rule: "L’uscita vale 1 soltanto quando entrambi gli ingressi valgono 1.", example: "Un macchinario parte se protezione e pulsante sono attivi." },
  { name: "OR", formula: "A + B", symbol: "≥1", tagline: "Uno o entrambi", rule: "L’uscita vale 1 se A, B oppure entrambi valgono 1. Qui + indica OR logico, non una somma.", example: "Un allarme suona se si apre una porta oppure una finestra." },
  { name: "NOT", formula: "¬A", symbol: "1", tagline: "Il contrario", rule: "Inverte l’unico ingresso: 0 diventa 1 e 1 diventa 0.", example: "Una luce si accende quando il sensore non rileva luminosità." , unary: true },
  { name: "NAND", formula: "¬(A · B)", symbol: "&", tagline: "Non entrambi", rule: "È una AND seguita da NOT: vale 0 solo quando entrambi gli ingressi sono 1.", example: "È una porta universale: da sola può costruire ogni circuito logico." },
  { name: "NOR", formula: "¬(A + B)", symbol: "≥1", tagline: "Nessuno vero", rule: "È una OR seguita da NOT: vale 1 soltanto quando entrambi gli ingressi sono 0.", example: "Segnala che nessuno dei due sistemi è attivo." },
  { name: "XOR", formula: "A ⊕ B", symbol: "=1", tagline: "Esattamente uno", rule: "L’uscita vale 1 quando esattamente uno dei due ingressi vale 1.", example: "Riconosce la parità ed è il cuore dei circuiti sommatori." },
  { name: "XNOR", formula: "¬(A ⊕ B)", symbol: "=", tagline: "Uguali", rule: "L’uscita vale 1 quando i due ingressi hanno lo stesso valore.", example: "Confronta due bit e segnala quando coincidono." },
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
  return value.toString(2).padStart(minWidth, "0");
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
      <span className="toggle-label">INGRESSO {label}</span>
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
  const [decimalInput, setDecimalInput] = useState("42");
  const [binaryA, setBinaryA] = useState("00101101");
  const [binaryB, setBinaryB] = useState("00000111");
  const [binaryOp, setBinaryOp] = useState<BinaryOperation>("+");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const info = gates.find((item) => item.name === gate) ?? gates[0];
  const output = useMemo(() => resultFor(gate, inputA, inputB), [gate, inputA, inputB]);
  const rows = info.unary ? [[0, 0], [1, 0]] : binaryRows;
  const decimalValid = /^(0|[1-9]\d{0,2})$/.test(decimalInput) && Number(decimalInput) <= 255;
  const decimalValue = decimalValid ? Number(decimalInput) : 0;
  const eightBits = decimalValid ? decimalValue.toString(2).padStart(8, "0") : "————————";
  const binaryAValid = /^[01]{1,8}$/.test(binaryA);
  const binaryBValid = /^[01]{1,8}$/.test(binaryB);
  const decimalA = binaryAValid ? Number.parseInt(binaryA, 2) : null;
  const decimalB = binaryBValid ? Number.parseInt(binaryB, 2) : null;
  const calculation = decimalA === null || decimalB === null ? undefined : binaryOperation(decimalA, decimalB, binaryOp);
  let signedWidth = 8;
  if (typeof calculation === "number" && calculation < 0) {
    while (calculation < -(2 ** (signedWidth - 1))) signedWidth += 1;
  }
  const signedBits = typeof calculation === "number" && calculation < 0
    ? (2 ** signedWidth + calculation).toString(2).padStart(signedWidth, "0")
    : null;
  const calculationBits = calculation === undefined ? "—" : calculation === null ? "NON DEFINITO" : signedBits ? `${signedBits}₂` : formatBinary(calculation);
  const calculationOverflow = typeof calculation === "number" && calculation > 255;
  const calculationNegative = typeof calculation === "number" && calculation < 0;
  const wrappedEightBits = typeof calculation === "number" && calculation >= 0 ? (calculation & 255).toString(2).padStart(8, "0") : null;
  const resultDetail = calculation === undefined
    ? "Correggi gli operandi per eseguire il calcolo."
    : calculation === null
      ? "Non puoi dividere per zero. Imposta l’operando B a un valore diverso da 0."
      : `${decimalA} ${binaryOp} ${decimalB} = ${calculation} in decimale`;
  const resultNote = calculationNegative
    ? `Risultato negativo: ${signedBits}₂ è la sua rappresentazione in complemento a due su ${signedWidth} bit. Non è rappresentabile senza segno.`
    : calculationOverflow
      ? `Overflow: servono ${calculation.toString(2).length} bit. Su 8 bit restano ${wrappedEightBits}₂.`
      : "Gli operandi sono numeri a 8 bit senza segno (da 0 a 255); i risultati aritmetici possono richiedere più di 8 bit.";
  const conversionSteps = useMemo(() => {
    if (!decimalValid) return [];
    if (decimalValue === 0) return [{ value: 0, quotient: 0, remainder: 0 }];
    const steps = [];
    let value = decimalValue;
    while (value > 0) {
      steps.push({ value, quotient: Math.floor(value / 2), remainder: value % 2 });
      value = Math.floor(value / 2);
    }
    return steps;
  }, [decimalValid, decimalValue]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("logiclab-theme", next);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleGateKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = gates.findIndex((item) => item.name === gate);
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? gates.length - 1 : event.key === "ArrowRight" ? (current + 1) % gates.length : (current - 1 + gates.length) % gates.length;
    const next = gates[nextIndex].name;
    setGate(next);
    requestAnimationFrame(() => document.getElementById(`gate-tab-${next.toLowerCase()}`)?.focus());
  };

  const selectGate = (next: Gate) => {
    setGate(next);
    window.history.replaceState(null, "", "#simulatore");
    document.getElementById("simulatore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="LogicLab, torna all’inizio"><span className="brand-mark brand-mark-logo" aria-hidden="true">L</span><span>LOGIC<span>LAB</span></span></a>
        <nav className="nav-links" aria-label="Navigazione principale"><Link href="/impara">Lezioni</Link><Link href="/visualizza">Visualizza</Link><Link href="/esercizi">Esercizi</Link><a href="#simulatore">Simulatore</a><Link href="/porte-logiche">Porte logiche</Link></nav>
        <div className="topbar-actions">
          <span className="status"><i /> LAB ATTIVO</span>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"}><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><b>{theme === "light" ? "NOTTE" : "GIORNO"}</b></button>
          <button ref={menuButtonRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Chiudi menu" : "Apri menu"} onClick={() => setMenuOpen((value) => !value)}><span aria-hidden="true">{menuOpen ? "×" : "☰"}</span></button>
        </div>
        <nav id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "open" : ""}`} aria-label="Navigazione mobile" hidden={!menuOpen}>
          <Link href="/impara" onClick={closeMenu}>Segui le lezioni</Link><Link href="/visualizza" onClick={closeMenu}>Visualizza i circuiti</Link><Link href="/esercizi" onClick={closeMenu}>Allenati con gli esercizi</Link><a href="#simulatore" onClick={closeMenu}>Simula una porta</a><Link href="/porte-logiche" onClick={closeMenu}>Confronta le 7 porte</Link>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> LABORATORIO INTERATTIVO DI LOGICA DIGITALE</div>
          <h1>La logica,<br /><em>in movimento.</em></h1>
          <p>Impara porte logiche e numeri binari: cambia gli ingressi, <br />osserva l’uscita e scopri perché il risultato cambia.</p>
          <div className="hero-actions"><Link className="primary-cta" href="/impara">INIZIA IL PERCORSO <span>↗</span></Link><Link href="/esercizi">PROVA GLI ESERCIZI</Link></div>
        </div>
        <div className="hero-board" aria-hidden="true">
          <span className="board-tag">ANTEPRIMA XOR</span>
          <div className="hero-circuit">
            <GateShape info={gates[5]} />
            <i className="circuit-pin pin-a on" />
            <i className="circuit-pin pin-b" />
            <span className="circuit-output"><i />1</span>
          </div>
          <span className="board-formula">Y = A ⊕ B</span>
        </div>
        <div className="hero-stats"><span><b>07</b> PORTE</span><span><b>02</b> INGRESSI MAX</span><span><b>01</b> USCITA</span></div>
      </section>

      <section className="simulator-section" id="simulatore">
        <div className="section-heading">
          <div><span className="section-index">01 / SIMULATORE</span><h2>Costruisci il segnale.</h2></div>
          <p>Scegli una porta, cambia gli ingressi<br />e segui il flusso fino al risultato.</p>
        </div>

        <div className="quick-start" aria-label="Come usare il simulatore"><strong>LA TUA PRIMA PORTA IN 30 SECONDI</strong><ol><li>Scegli una porta.</li><li>Imposta gli ingressi su 0 oppure 1.</li><li>Confronta uscita e tabella di verità.</li></ol></div>
        <p className="scroll-hint">Scorri per scegliere una delle 7 porte <span>↔</span></p>

        <div className="gate-palette" role="tablist" aria-label="Scegli una porta logica" onKeyDown={handleGateKeys}>
          {gates.map((item, index) => (
            <button key={item.name} id={`gate-tab-${item.name.toLowerCase()}`} type="button" role="tab" aria-selected={gate === item.name} aria-controls="gate-panel" tabIndex={gate === item.name ? 0 : -1} className={gate === item.name ? "active" : ""} onClick={() => setGate(item.name)}>
              <small>0{index + 1}</small><GateShape info={item} compact /><span><strong>{item.name}</strong><em>{item.tagline}</em></span>
            </button>
          ))}
        </div>

        <div id="gate-panel" role="tabpanel" aria-labelledby={`gate-tab-${gate.toLowerCase()}`} tabIndex={0} className={`lab-panel ${output ? "output-on" : ""}`}>
          <div className="panel-top"><span>CIRCUITO ATTIVO / {gate}</span><span><i /> AGGIORNAMENTO ISTANTANEO</span></div>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Porta {gate}: ingresso A {inputA}{info.unary ? "" : `, ingresso B ${inputB}`}, uscita {output}.</p>
          <div className="circuit" aria-label={`Porta ${gate}. Ingresso A ${inputA}${info.unary ? "" : `, ingresso B ${inputB}`}, uscita ${output}`}>
            <div className={`inputs-column ${info.unary ? "unary" : ""}`}>
              <Toggle label="A" value={inputA} onChange={() => setInputA((v) => 1 - v)} />
              {!info.unary && <Toggle label="B" value={inputB} onChange={() => setInputB((v) => 1 - v)} />}
              {info.unary && <div className="unused-input"><span>INGRESSO B</span><strong>—</strong><small>NON USATO</small></div>}
            </div>

            <div className={`wire-zone ${info.unary ? "unary" : ""}`} aria-hidden="true">
              <div className={`wire wire-a ${inputA ? "hot" : ""}`}><i /></div>
              {!info.unary && <div className={`wire wire-b ${inputB ? "hot" : ""}`}><i /></div>}
              <GateShape info={info} />
              <div className={`wire wire-out ${output ? "hot" : ""}`}><i /></div>
            </div>

            <div className="output-card"><span>USCITA Y</span><strong>{output}</strong><small><i /> {output ? "SEGNALE ATTIVO" : "SEGNALE INATTIVO"}</small></div>
          </div>

          <div className="formula-row">
            <div><span>ESPRESSIONE</span><code>Y = {info.formula} = <b>{output}</b></code></div>
            <p><strong>Che cosa succede?</strong>{info.rule}</p>
          </div>
        </div>

        <div className="truth-strip">
          <div className="truth-intro"><span className="section-index">TABELLA ATTUALE</span><h3>Tutti i casi possibili.</h3><p>La riga evidenziata corrisponde agli ingressi impostati nel circuito.</p></div>
          <div className="truth-table-wrap">
            <table>
              <caption className="sr-only">Tabella di verità della porta {gate}</caption>
              <thead><tr><th scope="col">INGRESSO A</th>{!info.unary && <th scope="col">INGRESSO B</th>}<th scope="col">USCITA Y</th></tr></thead>
              <tbody>{rows.map(([a, b]) => {
                const value = resultFor(gate, a, b);
                const current = a === inputA && (info.unary || b === inputB);
                return <tr key={`${a}${b}`} className={current ? "current" : ""}><td>{current && <span className="sr-only">Combinazione attualmente simulata. </span>}{a}</td>{!info.unary && <td>{b}</td>}<td><span className={value ? "bit-on" : ""}>{value}</span>{current && <small>ATTUALE</small>}</td></tr>;
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
            <div className="binary-panel-title"><span>CONVERTITORE INTERATTIVO</span><strong>8 BIT / 0—255</strong></div>
            <label className="decimal-control">
              <span>INTERO DECIMALE</span>
              <input type="text" inputMode="numeric" pattern="[0-9]*" value={decimalInput} aria-invalid={!decimalValid} aria-describedby="decimal-help decimal-error" onChange={(event) => setDecimalInput(event.target.value)} />
            </label>
            <p id="decimal-help" className="field-help">Inserisci un numero intero da 0 a 255.</p>
            {!decimalValid && <p id="decimal-error" className="field-error" role="alert">Usa solo numeri interi compresi tra 0 e 255.</p>}

            <div className="bit-ruler" aria-label={decimalValid ? `${decimalValue} in binario è ${eightBits}` : "Conversione non disponibile: numero decimale non valido"}>
              {bitWeights.map((weight, index) => {
                const active = decimalValid && eightBits[index] === "1";
                return (
                  <button key={weight} type="button" className={active ? "active" : ""} aria-pressed={active} aria-label={`Bit di peso ${weight}: ${active ? 1 : 0}`} onClick={() => setDecimalInput(String((decimalValid ? decimalValue : 0) ^ weight))}>
                    <small>{weight}</small><b>{active ? 1 : 0}</b><span>2<sup>{7 - index}</sup></span>
                  </button>
                );
              })}
            </div>
            <p className="bit-help">Tocca un bit per cambiarlo tra 0 e 1.</p>

            <div className="base-results">
              <div><span>BASE 2</span><strong>{eightBits}</strong></div>
              <div><span>BASE 8</span><strong>{decimalValid ? decimalValue.toString(8).toUpperCase() : "—"}</strong></div>
              <div><span>BASE 10</span><strong>{decimalValid ? decimalValue : "—"}</strong></div>
              <div><span>BASE 16</span><strong>{decimalValid ? decimalValue.toString(16).toUpperCase() : "—"}</strong></div>
            </div>
          </article>

          <article className="conversion-method">
            <div className="binary-panel-title"><span>COME SI CONVERTE</span><strong>÷ 2</strong></div>
            <h3>Divisioni successive.</h3>
            <p>Dividi per 2 e leggi i resti dal basso verso l’alto.</p>
            <div className="division-steps">
              {conversionSteps.map((step, index) => <div key={`${step.value}-${index}`}><code>{step.value} ÷ 2 = {step.quotient}</code><span>RESTO <b>{step.remainder}</b></span></div>)}
            </div>
            <div className="read-back"><span>LETTURA ↑</span><strong>{decimalValid ? `${decimalValue}₁₀ = ${decimalValue.toString(2)}₂` : "In attesa di un intero valido"}</strong></div>
          </article>
        </div>

        <article className="binary-calculator">
          <div className="binary-panel-title"><span>CALCOLATRICE BINARIA</span><strong>ARITMETICA E OPERAZIONI BIT A BIT</strong></div>
          <div className="calculation-row">
            <label><span>OPERANDO A</span><input type="text" value={binaryA} inputMode="numeric" pattern="[01]{1,8}" maxLength={8} autoComplete="off" spellCheck={false} aria-label="Operando A in binario" aria-invalid={!binaryAValid} aria-describedby="binary-a-help binary-a-error" onChange={(event) => setBinaryA(event.target.value)} /><small id="binary-a-help">Da 1 a 8 bit, soltanto 0 e 1. {binaryAValid ? `${decimalA} in decimale.` : ""}</small>{!binaryAValid && <small id="binary-a-error" className="input-error" role="alert">Inserisci almeno un bit usando solo 0 e 1.</small>}</label>
            <label><span>OPERAZIONE</span><select value={binaryOp} aria-label="Operazione binaria" onChange={(event) => setBinaryOp(event.target.value as BinaryOperation)}><option value="+">+ Somma</option><option value="−">− Sottrazione</option><option value="×">× Moltiplicazione</option><option value="÷">÷ Divisione intera</option><option value="AND">AND bit a bit</option><option value="OR">OR bit a bit</option><option value="XOR">XOR bit a bit</option></select><small>{binaryOp === "÷" ? "divisione intera" : binaryOp.length > 1 ? "operazione bit a bit" : "aritmetica"}</small></label>
            <label><span>OPERANDO B</span><input type="text" value={binaryB} inputMode="numeric" pattern="[01]{1,8}" maxLength={8} autoComplete="off" spellCheck={false} aria-label="Operando B in binario" aria-invalid={!binaryBValid} aria-describedby="binary-b-help binary-b-error" onChange={(event) => setBinaryB(event.target.value)} /><small id="binary-b-help">Da 1 a 8 bit, soltanto 0 e 1. {binaryBValid ? `${decimalB} in decimale.` : ""}</small>{!binaryBValid && <small id="binary-b-error" className="input-error" role="alert">Inserisci almeno un bit usando solo 0 e 1.</small>}</label>
            <div className={`binary-result ${calculation === null || calculation === undefined ? "invalid" : ""}`} role={calculation === null || calculation === undefined ? "alert" : "status"} aria-live="polite" aria-atomic="true"><span>{calculation === null || calculation === undefined ? "ERRORE" : "RISULTATO"}</span><strong>{calculationBits}</strong><small>{resultDetail}</small><small className="result-note">{resultNote}</small></div>
          </div>
          <p className="operator-note"><strong>AND</strong> produce 1 se entrambi i bit sono 1 · <strong>OR</strong> produce 1 se almeno un bit è 1 · <strong>XOR</strong> produce 1 se i bit sono diversi.</p>
        </article>
      </section>

      <section className="atlas-section" id="atlante">
        <div className="section-heading light">
          <div><span className="section-index">03 / ATLANTE</span><h2>Sette modi di decidere.</h2></div>
          <p>Ogni porta applica una regola diversa.<br />Cliccane una per provarla nel circuito.</p>
        </div>
        <p className="scroll-hint light-hint">Scorri le schede e scegli “Prova” <span>↔</span></p>
        <div className="atlas-grid" aria-label="Atlante delle sette porte logiche">
          {gates.map((item, index) => (
            <article className={gate === item.name ? "selected" : ""} key={item.name}>
              <div className="atlas-card-top"><span>0{index + 1}{gate === item.name && <b> · SELEZIONATA</b>}</span><GateShape info={item} compact /></div>
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
          <article><span>02</span><div><h3>Ingresso, regola, uscita</h3><p>L’<strong>ingresso (input)</strong> è il valore che entra nella porta; l’<strong>uscita (output)</strong> è il risultato. La tabella di verità elenca ogni combinazione possibile.</p></div></article>
          <article><span>03</span><div><h3>Porte universali</h3><p><strong>NAND e NOR</strong> sono speciali: combinando più porte dello stesso tipo si può ricreare qualunque altra funzione logica, persino un intero computer.</p></div></article>
          <article><span>04</span><div><h3>Operazioni bit a bit e overflow</h3><p>Un’operazione <strong>bit a bit (bitwise)</strong> confronta le cifre nella stessa posizione. Si ha <strong>overflow</strong> quando il risultato richiede più bit di quelli disponibili.</p></div></article>
          <article><span>05</span><div><h3>Dalle porte ai computer</h3><p>Migliaia di porte formano registri e sommatori; miliardi di transistor organizzati in porte formano i moderni processori. Tutto parte da decisioni tra 0 e 1.</p></div></article>
        </div>
      </section>

      <section className="example-section">
        <div><span className="section-index">NEL MONDO REALE</span><h2>La logica è ovunque.</h2></div>
        <div className="example-cards">{gates.slice(0, 4).map((item) => <article key={item.name}><strong>{item.name}</strong><p>{item.example}</p></article>)}</div>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark brand-mark-logo" aria-hidden="true">L</span><span>LOGIC<span>LAB</span></span></a><p>Porte logiche, conversioni e calcoli binari in un unico laboratorio interattivo.</p><Link href="/metodo">METODO</Link><Link href="/contatti">CONTATTI</Link><Link href="/privacy">PRIVACY</Link><a href="#top">TORNA SU ↑</a></footer>
    </main>
  );
}
