export type ExerciseCategory = "porte" | "binario" | "tabelle" | "circuiti";

export type ExerciseChoice = {
  id: string;
  label: string;
};

export type GateVisual = {
  kind: "gate";
  gate: string;
  inputs: Array<{ label: string; value: 0 | 1 }>;
};

export type BinaryVisual = {
  kind: "binary";
  expression: string;
  note?: string;
};

export type TruthTableVisual = {
  kind: "truth-table";
  gate: string;
  headers: string[];
  rows: Array<Array<string | number>>;
};

export type CircuitVisual = {
  kind: "circuit";
  expression: string;
  inputs: Array<{ label: string; value: 0 | 1 }>;
  stages: string[];
};

export type ExerciseVisual = GateVisual | BinaryVisual | TruthTableVisual | CircuitVisual;

export type Exercise = {
  id: string;
  category: ExerciseCategory;
  difficulty: 1 | 2 | 3;
  title: string;
  prompt: string;
  choices: ExerciseChoice[];
  correctChoiceId: string;
  explanation: string;
  hint: string;
  visual: ExerciseVisual;
};

const bitChoices: ExerciseChoice[] = [
  { id: "0", label: "0" },
  { id: "1", label: "1" },
];

export const exercises: Exercise[] = [
  {
    id: "gate-and-11",
    category: "porte",
    difficulty: 1,
    title: "Porta AND",
    prompt: "Quale uscita produce la porta?",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "AND produce 1 soltanto quando tutti gli ingressi valgono 1. Qui A e B sono entrambi attivi.",
    hint: "Cerca l’unico caso in cui AND lascia passare il segnale.",
    visual: { kind: "gate", gate: "AND", inputs: [{ label: "A", value: 1 }, { label: "B", value: 1 }] },
  },
  {
    id: "gate-or-01",
    category: "porte",
    difficulty: 1,
    title: "Porta OR",
    prompt: "Quale uscita produce la porta?",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "OR produce 1 quando almeno un ingresso vale 1. L’ingresso B è sufficiente ad attivare l’uscita.",
    hint: "Per OR non è necessario che entrambi gli ingressi siano attivi.",
    visual: { kind: "gate", gate: "OR", inputs: [{ label: "A", value: 0 }, { label: "B", value: 1 }] },
  },
  {
    id: "gate-not-0",
    category: "porte",
    difficulty: 1,
    title: "Porta NOT",
    prompt: "Qual è il valore invertito?",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "NOT inverte il suo unico ingresso: un ingresso 0 diventa un’uscita 1.",
    hint: "NOT restituisce sempre il contrario del valore ricevuto.",
    visual: { kind: "gate", gate: "NOT", inputs: [{ label: "A", value: 0 }] },
  },
  {
    id: "gate-xor-11",
    category: "porte",
    difficulty: 2,
    title: "Porta XOR",
    prompt: "Quale uscita produce XOR con due ingressi uguali?",
    choices: bitChoices,
    correctChoiceId: "0",
    explanation: "XOR produce 1 solo quando gli ingressi sono diversi. Con 1 e 1 gli ingressi coincidono, quindi l’uscita è 0.",
    hint: "XOR controlla se i due bit sono diversi.",
    visual: { kind: "gate", gate: "XOR", inputs: [{ label: "A", value: 1 }, { label: "B", value: 1 }] },
  },
  {
    id: "gate-xnor-00",
    category: "porte",
    difficulty: 2,
    title: "Porta XNOR",
    prompt: "Quale uscita produce XNOR?",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "XNOR riconosce l’uguaglianza. I due ingressi sono entrambi 0, quindi l’uscita vale 1.",
    hint: "XNOR vale 1 quando i due ingressi coincidono.",
    visual: { kind: "gate", gate: "XNOR", inputs: [{ label: "A", value: 0 }, { label: "B", value: 0 }] },
  },
  {
    id: "binary-decimal-42",
    category: "binario",
    difficulty: 1,
    title: "Da decimale a binario",
    prompt: "Qual è la rappresentazione a 8 bit del numero decimale 42?",
    choices: [
      { id: "a", label: "00101010" },
      { id: "b", label: "00101100" },
      { id: "c", label: "01010010" },
      { id: "d", label: "00011010" },
    ],
    correctChoiceId: "a",
    explanation: "42 = 32 + 8 + 2. Attivando i pesi 32, 8 e 2 si ottiene 00101010₂.",
    hint: "Scomponi 42 come somma di potenze di 2.",
    visual: { kind: "binary", expression: "42₁₀ = ?₂", note: "Usa esattamente 8 bit." },
  },
  {
    id: "binary-to-decimal-110101",
    category: "binario",
    difficulty: 1,
    title: "Da binario a decimale",
    prompt: "Quanto vale 110101₂ in base 10?",
    choices: [
      { id: "45", label: "45" },
      { id: "51", label: "51" },
      { id: "53", label: "53" },
      { id: "57", label: "57" },
    ],
    correctChoiceId: "53",
    explanation: "110101₂ attiva i pesi 32, 16, 4 e 1: la loro somma è 53.",
    hint: "Leggi i pesi da destra: 1, 2, 4, 8, 16, 32.",
    visual: { kind: "binary", expression: "110101₂ = ?₁₀", note: "Somma soltanto i pesi associati ai bit 1." },
  },
  {
    id: "binary-sum-1011-0110",
    category: "binario",
    difficulty: 2,
    title: "Somma binaria",
    prompt: "Qual è il risultato della somma?",
    choices: [
      { id: "a", label: "01111" },
      { id: "b", label: "10001" },
      { id: "c", label: "10101" },
      { id: "d", label: "11001" },
    ],
    correctChoiceId: "b",
    explanation: "1011₂ vale 11 e 0110₂ vale 6. La somma è 17, cioè 10001₂.",
    hint: "1 + 1 in binario produce 0 con riporto 1.",
    visual: { kind: "binary", expression: "1011₂ + 0110₂", note: "Considera anche il riporto finale." },
  },
  {
    id: "binary-and-1010-1100",
    category: "binario",
    difficulty: 2,
    title: "AND bit per bit",
    prompt: "Qual è il risultato dell’operazione?",
    choices: [
      { id: "a", label: "1000" },
      { id: "b", label: "1010" },
      { id: "c", label: "1110" },
      { id: "d", label: "0110" },
    ],
    correctChoiceId: "a",
    explanation: "AND conserva un 1 solo dove entrambi gli operandi hanno 1. L’unica posizione comune è quella del peso 8: 1000₂.",
    hint: "Confronta le due sequenze colonna per colonna.",
    visual: { kind: "binary", expression: "1010 AND 1100", note: "Applica AND separatamente a ogni coppia di bit." },
  },
  {
    id: "binary-xor-1010-1100",
    category: "binario",
    difficulty: 2,
    title: "XOR bit per bit",
    prompt: "Qual è il risultato dell’operazione?",
    choices: [
      { id: "a", label: "0010" },
      { id: "b", label: "0110" },
      { id: "c", label: "1000" },
      { id: "d", label: "1110" },
    ],
    correctChoiceId: "b",
    explanation: "XOR vale 1 nelle posizioni diverse. 1010 e 1100 differiscono nei pesi 4 e 2, quindi il risultato è 0110₂.",
    hint: "Bit uguali danno 0; bit diversi danno 1.",
    visual: { kind: "binary", expression: "1010 XOR 1100", note: "Confronta i bit nella stessa posizione." },
  },
  {
    id: "table-nor-missing",
    category: "tabelle",
    difficulty: 1,
    title: "Completa la NOR",
    prompt: "Quale valore sostituisce il punto interrogativo?",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "NOR è la negazione di OR. Quando A e B valgono entrambi 0, OR vale 0 e NOR lo inverte in 1.",
    hint: "NOR vale 1 soltanto quando nessun ingresso è attivo.",
    visual: { kind: "truth-table", gate: "NOR", headers: ["A", "B", "Y"], rows: [[0, 0, "?"], [0, 1, 0], [1, 0, 0], [1, 1, 0]] },
  },
  {
    id: "table-nand-missing",
    category: "tabelle",
    difficulty: 1,
    title: "Completa la NAND",
    prompt: "Quale valore manca nella riga A=1, B=1?",
    choices: bitChoices,
    correctChoiceId: "0",
    explanation: "AND vale 1 con due ingressi a 1; NAND nega quel risultato e produce 0.",
    hint: "NAND è una AND seguita da una NOT.",
    visual: { kind: "truth-table", gate: "NAND", headers: ["A", "B", "Y"], rows: [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, "?"]] },
  },
  {
    id: "table-or-row-10",
    category: "tabelle",
    difficulty: 1,
    title: "Leggi la tabella OR",
    prompt: "Completa l’uscita della riga A=1, B=0.",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "OR richiede almeno un ingresso a 1. Nella riga indicata A è attivo, quindi Y vale 1.",
    hint: "Osserva se nella riga è presente almeno un 1.",
    visual: { kind: "truth-table", gate: "OR", headers: ["A", "B", "Y"], rows: [[0, 0, 0], [0, 1, 1], [1, 0, "?"], [1, 1, 1]] },
  },
  {
    id: "table-identify-xor",
    category: "tabelle",
    difficulty: 2,
    title: "Riconosci la porta",
    prompt: "Quale porta è descritta da questa tabella?",
    choices: [
      { id: "OR", label: "OR" },
      { id: "NOR", label: "NOR" },
      { id: "XOR", label: "XOR" },
      { id: "XNOR", label: "XNOR" },
    ],
    correctChoiceId: "XOR",
    explanation: "La sequenza 0, 1, 1, 0 vale 1 solo quando gli ingressi sono diversi: è la regola di XOR.",
    hint: "Confronta le righe 01 e 10 con le righe 00 e 11.",
    visual: { kind: "truth-table", gate: "?", headers: ["A", "B", "Y"], rows: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]] },
  },
  {
    id: "table-not-sequence",
    category: "tabelle",
    difficulty: 2,
    title: "Tabella della NOT",
    prompt: "Quale coppia completa le uscite per A=0 e A=1?",
    choices: [
      { id: "00", label: "0, 0" },
      { id: "01", label: "0, 1" },
      { id: "10", label: "1, 0" },
      { id: "11", label: "1, 1" },
    ],
    correctChoiceId: "10",
    explanation: "NOT inverte ogni ingresso: a 0 associa 1 e a 1 associa 0. Le uscite sono quindi 1, 0.",
    hint: "Scrivi il contrario di ciascun valore di A.",
    visual: { kind: "truth-table", gate: "NOT", headers: ["A", "Y"], rows: [[0, "?"], [1, "?"]] },
  },
  {
    id: "circuit-or-then-and",
    category: "circuiti",
    difficulty: 2,
    title: "OR seguita da AND",
    prompt: "Calcola l’uscita finale Y.",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "Prima OR(0,1) produce 1. Poi AND(1,1) riceve anche C=1 e produce Y=1.",
    hint: "Risolvi prima la parentesi OR(A,B), poi usa il risultato nella AND.",
    visual: { kind: "circuit", expression: "Y = (A OR B) AND C", inputs: [{ label: "A", value: 0 }, { label: "B", value: 1 }, { label: "C", value: 1 }], stages: ["OR(A,B)", "AND(risultato,C)"] },
  },
  {
    id: "circuit-and-then-not",
    category: "circuiti",
    difficulty: 2,
    title: "AND seguita da NOT",
    prompt: "Calcola l’uscita finale Y.",
    choices: bitChoices,
    correctChoiceId: "0",
    explanation: "AND(1,1) produce 1. La porta NOT inverte quel risultato, quindi Y vale 0.",
    hint: "Calcola AND e soltanto dopo applica l’inversione.",
    visual: { kind: "circuit", expression: "Y = NOT(A AND B)", inputs: [{ label: "A", value: 1 }, { label: "B", value: 1 }], stages: ["AND(A,B)", "NOT(risultato)"] },
  },
  {
    id: "circuit-and-xor",
    category: "circuiti",
    difficulty: 3,
    title: "AND dentro XOR",
    prompt: "Calcola l’uscita finale Y.",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "AND(1,0) produce 0. XOR confronta quel risultato con C=1: i valori sono diversi, quindi Y vale 1.",
    hint: "Il primo segnale intermedio è AND(A,B).",
    visual: { kind: "circuit", expression: "Y = (A AND B) XOR C", inputs: [{ label: "A", value: 1 }, { label: "B", value: 0 }, { label: "C", value: 1 }], stages: ["AND(A,B)", "XOR(risultato,C)"] },
  },
  {
    id: "circuit-not-or",
    category: "circuiti",
    difficulty: 3,
    title: "NOT dentro OR",
    prompt: "Calcola l’uscita finale Y.",
    choices: bitChoices,
    correctChoiceId: "0",
    explanation: "NOT(1) produce 0. OR confronta 0 con B=0: nessun ingresso è attivo, quindi Y vale 0.",
    hint: "Inizia invertendo A.",
    visual: { kind: "circuit", expression: "Y = (NOT A) OR B", inputs: [{ label: "A", value: 1 }, { label: "B", value: 0 }], stages: ["NOT(A)", "OR(risultato,B)"] },
  },
  {
    id: "circuit-xor-xnor",
    category: "circuiti",
    difficulty: 3,
    title: "XOR dentro XNOR",
    prompt: "Calcola l’uscita finale Y.",
    choices: bitChoices,
    correctChoiceId: "1",
    explanation: "XOR(1,0) produce 1. XNOR confronta 1 con C=1: i valori coincidono, quindi Y vale 1.",
    hint: "XNOR produce 1 quando i suoi due ingressi sono uguali.",
    visual: { kind: "circuit", expression: "Y = (A XOR B) XNOR C", inputs: [{ label: "A", value: 1 }, { label: "B", value: 0 }, { label: "C", value: 1 }], stages: ["XOR(A,B)", "XNOR(risultato,C)"] },
  },
];

export const exerciseCategoryLabels: Record<ExerciseCategory, string> = {
  porte: "Porte logiche",
  binario: "Numeri binari",
  tabelle: "Tabelle di verità",
  circuiti: "Circuiti combinati",
};

