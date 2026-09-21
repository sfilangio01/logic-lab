export type GateName = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR";

export type GateDefinition = {
  name: GateName;
  slug: string;
  tagline: string;
  formula: string;
  description: string;
  example: string;
  confusion: string;
  unary?: boolean;
};

export const gateDefinitions: GateDefinition[] = [
  { name: "AND", slug: "and", tagline: "Tutti veri", formula: "Y = A · B", description: "L’uscita vale 1 soltanto quando tutti gli ingressi valgono 1.", example: "Un macchinario parte solo se la protezione è chiusa e il pulsante è premuto.", confusion: "AND non significa sommare: con 1 e 1 produce ancora un solo bit di uscita, 1." },
  { name: "OR", slug: "or", tagline: "Uno o entrambi", formula: "Y = A ∨ B", description: "L’uscita vale 1 se almeno un ingresso vale 1, compreso il caso in cui entrambi valgono 1.", example: "Un allarme suona se si apre la porta, la finestra oppure entrambe.", confusion: "OR è inclusivo. A differenza di XOR, con A=1 e B=1 produce 1." },
  { name: "NOT", slug: "not", tagline: "Il contrario", formula: "Y = ¬A", description: "Inverte il suo unico ingresso: 0 diventa 1 e 1 diventa 0.", example: "Una luce crepuscolare si accende quando il sensore non rileva luce.", confusion: "NOT ha un solo ingresso; una seconda variabile non fa parte della sua tabella di verità.", unary: true },
  { name: "NAND", slug: "nand", tagline: "Non tutti veri", formula: "Y = ¬(A · B)", description: "È la negazione di AND: vale 0 soltanto quando entrambi gli ingressi valgono 1.", example: "NAND è universale: combinando più NAND si può costruire qualsiasi funzione logica.", confusion: "La negazione riguarda tutto il risultato di AND, non soltanto l’ingresso A." },
  { name: "NOR", slug: "nor", tagline: "Nessuno vero", formula: "Y = ¬(A ∨ B)", description: "È la negazione di OR: vale 1 soltanto quando tutti gli ingressi valgono 0.", example: "Un indicatore segnala che nessuno dei due sottosistemi è attivo.", confusion: "NOR non è NAND: il suo unico 1 si trova nella riga 0,0." },
  { name: "XOR", slug: "xor", tagline: "Esattamente uno", formula: "Y = A ⊕ B", description: "L’uscita vale 1 quando i due ingressi sono diversi.", example: "Nel mezzo sommatore XOR calcola il bit di somma.", confusion: "XOR esclude il caso 1,1; OR invece lo include." },
  { name: "XNOR", slug: "xnor", tagline: "Uguali", formula: "Y = ¬(A ⊕ B)", description: "L’uscita vale 1 quando i due ingressi coincidono.", example: "Un comparatore usa XNOR per verificare se due bit sono uguali.", confusion: "XNOR è il contrario di XOR: produce 1 per 0,0 e per 1,1." },
];

export function evaluateGate(name: GateName, a: number, b = 0) {
  switch (name) {
    case "AND": return Number(a === 1 && b === 1);
    case "OR": return Number(a === 1 || b === 1);
    case "NOT": return Number(a === 0);
    case "NAND": return Number(!(a === 1 && b === 1));
    case "NOR": return Number(!(a === 1 || b === 1));
    case "XOR": return Number(a !== b);
    case "XNOR": return Number(a === b);
  }
}

export function truthRows(gate: GateDefinition) {
  const inputs = gate.unary ? [[0, 0], [1, 0]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
  return inputs.map(([a, b]) => ({ a, b, output: evaluateGate(gate.name, a, b) }));
}
