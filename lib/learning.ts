export type LearningExample = {
  title: string;
  scenario: string;
  steps: string[];
  result: string;
};

export type LearningSection = {
  title: string;
  paragraphs: string[];
  keyPoints?: string[];
  example?: LearningExample;
};

export type LearningCheckpoint = {
  question: string;
  answer: string;
  explanation: string;
};

export type Lesson = {
  slug: string;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  level: string;
  prerequisites: string[];
  objectives: string[];
  introduction: string;
  sections: LearningSection[];
  commonMistakes: { title: string; explanation: string }[];
  checkpoints: LearningCheckpoint[];
  recap: string[];
};

export const lessons: Lesson[] = [
  {
    slug: "bit-e-sistema-binario",
    order: 1,
    title: "Bit e sistema binario",
    shortTitle: "Bit e binario",
    description: "Scopri come i computer rappresentano numeri e informazioni usando soltanto 0 e 1.",
    duration: "12 minuti",
    level: "Fondamenti",
    prerequisites: ["Nessun prerequisito"],
    objectives: [
      "Spiegare che cosa rappresenta un bit.",
      "Leggere il valore posizionale di un numero binario.",
      "Convertire piccoli numeri tra base 2 e base 10.",
    ],
    introduction: "Il sistema binario non è un linguaggio misterioso: è un modo di contare in cui ogni posizione può contenere solo 0 oppure 1. È adatto ai circuiti elettronici, che distinguono con affidabilità due stati fisici.",
    sections: [
      {
        title: "Un bit, due stati",
        paragraphs: [
          "Bit significa binary digit, cioè cifra binaria. Un bit può assumere soltanto i valori 0 e 1. Nei circuiti reali questi simboli rappresentano intervalli di tensione, non due valori elettrici perfettamente identici in ogni dispositivo.",
          "Otto bit formano un byte. Con 8 bit si possono costruire 256 combinazioni diverse, da 00000000 a 11111111, e rappresentare i numeri senza segno da 0 a 255.",
        ],
        keyPoints: ["1 bit: 2 combinazioni", "2 bit: 4 combinazioni", "8 bit: 256 combinazioni"],
      },
      {
        title: "Il peso di ogni posizione",
        paragraphs: [
          "Nel sistema decimale le posizioni valgono potenze di 10. Nel sistema binario valgono potenze di 2: partendo da destra troviamo 1, 2, 4, 8, 16 e così via.",
          "Per leggere un numero binario si sommano soltanto i pesi delle posizioni che contengono 1.",
        ],
        example: {
          title: "Convertiamo 10110₂",
          scenario: "Le cinque posizioni valgono, da sinistra, 16, 8, 4, 2 e 1.",
          steps: ["1 × 16 = 16", "0 × 8 = 0", "1 × 4 = 4", "1 × 2 = 2", "0 × 1 = 0"],
          result: "16 + 4 + 2 = 22, quindi 10110₂ = 22₁₀.",
        },
      },
      {
        title: "Dal decimale al binario",
        paragraphs: [
          "Un metodo generale consiste nel dividere ripetutamente il numero per 2, annotando ogni resto. Quando il quoziente arriva a zero, i resti si leggono dal basso verso l’alto.",
          "Per numeri piccoli puoi anche cercare i pesi necessari. Per 13 scegli 8, poi 4, poi 1: nelle rispettive posizioni scrivi 1 e nelle altre 0.",
        ],
        example: {
          title: "Convertiamo 13₁₀",
          scenario: "Cerchiamo quali potenze di 2 compongono 13.",
          steps: ["13 − 8 = 5", "5 − 4 = 1", "1 − 1 = 0", "I pesi 8, 4 e 1 sono attivi"],
          result: "13₁₀ = 1101₂.",
        },
      },
      {
        title: "Somma e operazioni bit a bit",
        paragraphs: [
          "Per sommare due numeri binari allinea le cifre a destra e procedi da destra verso sinistra. In ogni colonna: 0+0=0, 0+1=1, 1+1=10₂. In quest’ultimo caso scrivi 0 e riporti 1 alla colonna successiva.",
          "Le operazioni bit a bit confrontano le cifre nella stessa posizione: AND dà 1 se entrambe sono 1; OR se almeno una è 1; XOR se sono diverse. A differenza della somma, queste operazioni non generano riporti.",
        ],
        example: { title: "Sommiamo 0011₂ e 0001₂", scenario: "Partiamo dalla colonna più a destra.", steps: ["1 + 1 = 10₂: scrivi 0 e riporta 1", "1 + 0 + riporto 1 = 10₂: scrivi 0 e riporta 1", "0 + 0 + riporto 1 = 1"], result: "0011₂ + 0001₂ = 0100₂, cioè 3 + 1 = 4." },
      },
    ],
    commonMistakes: [
      { title: "Leggere 101 come centouno", explanation: "Il valore dipende dalla base: 101₂ vale 5₁₀." },
      { title: "Partire con i pesi da zero", explanation: "La posizione più a destra vale 2⁰, cioè 1, non zero." },
      { title: "Confondere bit e byte", explanation: "Un bit è una singola cifra; un byte contiene normalmente 8 bit." },
    ],
    checkpoints: [
      { question: "Quanto vale 1001₂ in decimale?", answer: "9", explanation: "Sono attivi i pesi 8 e 1: 8 + 1 = 9." },
      { question: "Qual è la rappresentazione binaria di 6₁₀?", answer: "110₂", explanation: "6 è formato dai pesi 4 e 2, mentre il peso 1 resta spento." },
      { question: "Quanti valori diversi rappresentano 4 bit?", answer: "16", explanation: "Ogni bit raddoppia le possibilità: 2⁴ = 16 combinazioni, da 0 a 15 senza segno." },
    ],
    recap: ["Un bit può essere 0 oppure 1.", "Le posizioni binarie valgono potenze di 2.", "Con n bit esistono 2ⁿ combinazioni."],
  },
  {
    slug: "logica-booleana",
    order: 2,
    title: "Logica booleana",
    shortTitle: "Logica booleana",
    description: "Impara a trasformare condizioni vere e false in espressioni logiche precise.",
    duration: "14 minuti",
    level: "Fondamenti",
    prerequisites: ["Bit e sistema binario"],
    objectives: [
      "Riconoscere variabili e valori booleani.",
      "Interpretare correttamente NOT, AND e OR.",
      "Tradurre semplici regole quotidiane in espressioni logiche.",
    ],
    introduction: "La logica booleana studia espressioni che producono uno di due risultati: vero o falso. Nei circuiti questi risultati vengono rappresentati con 1 e 0.",
    sections: [
      {
        title: "Variabili e condizioni",
        paragraphs: [
          "Una variabile booleana descrive una condizione con due soli stati. Per esempio A può significare “la tessera è valida”: A = 1 se è valida, A = 0 se non lo è.",
          "Dare un significato esplicito alle variabili è essenziale. Senza una legenda, una formula può essere corretta ma difficile da interpretare nel mondo reale.",
        ],
      },
      {
        title: "Tre operazioni fondamentali",
        paragraphs: [
          "NOT inverte un valore. AND richiede che tutte le condizioni collegate siano vere. OR richiede che almeno una condizione sia vera e resta vero anche quando entrambe lo sono.",
          "Nelle formule di questa lezione ¬ indica NOT, il punto · indica AND e il simbolo + indica OR logico. Il + logico non è una somma aritmetica: 1 OR 1 produce 1, non 2.",
        ],
        keyPoints: ["¬0 = 1", "1 · 1 = 1", "0 + 1 = 1", "1 + 1 = 1 in logica booleana"],
      },
      {
        title: "Dalle frasi alle formule",
        paragraphs: [
          "Individua prima le condizioni semplici, assegna una lettera a ciascuna e poi cerca parole come non, e, oppure. Le parentesi chiariscono quali operazioni devono essere valutate insieme.",
        ],
        example: {
          title: "Accesso a un laboratorio",
          scenario: "La porta si apre se la tessera è valida e l’allarme non è attivo.",
          steps: ["T = tessera valida", "A = allarme attivo", "“non attivo” diventa ¬A", "Le due condizioni sono unite da AND"],
          result: "Apertura = T · ¬A.",
        },
      },
      {
        title: "Precedenza e leggi di De Morgan",
        paragraphs: [
          "Quando non ci sono parentesi, la convenzione comune è valutare prima NOT, poi AND, infine OR. Per evitare ambiguità scrivi le parentesi: ¬A · B + C significa (¬A · B) + C.",
          "Le due leggi di De Morgan sono ¬(A · B) = ¬A + ¬B e ¬(A + B) = ¬A · ¬B. Quando la negazione attraversa la parentesi, cambiano sia gli ingressi sia l’operatore.",
        ],
        example: { title: "Neghiamo una AND", scenario: "Vogliamo capire quando NON sono vere contemporaneamente A e B.", steps: ["Parti da ¬(A · B)", "Almeno uno tra A e B deve essere falso", "Scrivi ¬A + ¬B"], result: "¬(A · B) e ¬A + ¬B sono equivalenti in tutte le righe della tabella." },
      },
    ],
    commonMistakes: [
      { title: "Trattare OR come esclusivo", explanation: "L’OR normale è vero anche se entrambe le condizioni sono vere. L’esclusività appartiene a XOR." },
      { title: "Dimenticare le parentesi", explanation: "¬(A · B) e ¬A · B non descrivono la stessa funzione." },
      { title: "Cambiare significato alle variabili", explanation: "Definisci ogni lettera una volta e mantieni quella convenzione per tutto il problema." },
    ],
    checkpoints: [
      { question: "Se A = 1, quanto vale ¬A?", answer: "0", explanation: "NOT produce sempre il valore opposto." },
      { question: "Quanto vale A · B quando A = 1 e B = 0?", answer: "0", explanation: "AND vale 1 soltanto quando tutti gli operandi valgono 1." },
      { question: "Un allarme scatta se porta o finestra sono aperte. Quale operatore serve?", answer: "OR", explanation: "È sufficiente che almeno uno dei due accessi sia aperto." },
    ],
    recap: ["I valori booleani sono vero/falso, spesso scritti 1/0.", "NOT inverte, AND richiede tutte le condizioni, OR ne richiede almeno una.", "Una legenda rende le formule comprensibili."],
  },
  {
    slug: "porte-fondamentali",
    order: 3,
    title: "Porte logiche fondamentali",
    shortTitle: "AND, OR e NOT",
    description: "Comprendi simboli, regole e tabelle di verità delle porte AND, OR e NOT.",
    duration: "15 minuti",
    level: "Base",
    prerequisites: ["Bit e sistema binario", "Logica booleana"],
    objectives: [
      "Prevedere l’uscita delle porte AND, OR e NOT.",
      "Collegare una formula alla relativa porta.",
      "Usare una tabella di verità per controllare una previsione.",
    ],
    introduction: "Una porta logica riceve uno o più segnali, applica una regola booleana e produce un’uscita. AND, OR e NOT costituiscono il vocabolario di base con cui costruire circuiti più articolati.",
    sections: [
      {
        title: "AND: tutte le condizioni",
        paragraphs: [
          "La porta AND a due ingressi produce 1 solo per A = 1 e B = 1. In tutti gli altri casi l’uscita è 0.",
          "È adatta a descrivere autorizzazioni che richiedono più condizioni contemporaneamente.",
        ],
        example: { title: "Avvio in sicurezza", scenario: "Un motore parte solo con riparo chiuso e pulsante premuto.", steps: ["R = riparo chiuso", "P = pulsante premuto", "Entrambe le condizioni sono obbligatorie"], result: "Motore = R · P." },
      },
      {
        title: "OR: almeno una condizione",
        paragraphs: [
          "La porta OR produce 1 quando almeno un ingresso vale 1. Produce 0 soltanto quando tutti gli ingressi valgono 0.",
          "La parola “oppure” nel linguaggio comune può essere ambigua; in logica OR include il caso in cui entrambe le condizioni sono vere.",
        ],
        example: { title: "Segnale di chiamata", scenario: "Una luce si accende se viene premuto il pulsante A, il pulsante B o entrambi.", steps: ["A = primo pulsante", "B = secondo pulsante", "Una singola richiesta è sufficiente"], result: "Luce = A + B." },
      },
      {
        title: "NOT: un ingresso, valore opposto",
        paragraphs: [
          "La porta NOT ha un solo ingresso. Se riceve 0 produce 1; se riceve 1 produce 0. Il piccolo cerchio sul simbolo grafico indica la negazione.",
        ],
        example: { title: "Luce automatica", scenario: "La lampada si accende quando non c’è luce ambientale.", steps: ["L = luce rilevata", "La lampada richiede il contrario di L"], result: "Lampada = ¬L." },
      },
    ],
    commonMistakes: [
      { title: "Credere che AND significhi sommare", explanation: "AND valuta condizioni: 1 AND 1 vale 1." },
      { title: "Assegnare due ingressi a NOT", explanation: "La porta NOT standard è unaria: possiede un solo ingresso." },
      { title: "Ignorare il cerchio di negazione", explanation: "Il cerchio all’uscita cambia completamente la funzione della porta." },
    ],
    checkpoints: [
      { question: "AND riceve A = 1 e B = 1. Qual è l’uscita?", answer: "1", explanation: "Entrambi gli ingressi soddisfano la condizione." },
      { question: "OR riceve A = 0 e B = 0. Qual è l’uscita?", answer: "0", explanation: "Nessun ingresso è attivo." },
      { question: "NOT riceve A = 0. Qual è l’uscita?", answer: "1", explanation: "NOT inverte il valore dell’unico ingresso." },
    ],
    recap: ["AND vale 1 solo se tutti gli ingressi valgono 1.", "OR vale 1 se almeno un ingresso vale 1.", "NOT inverte il proprio ingresso."],
  },
  {
    slug: "porte-derivate",
    order: 4,
    title: "Porte derivate e confronto",
    shortTitle: "NAND, NOR, XOR, XNOR",
    description: "Distingui le quattro porte derivate e scopri perché NAND e NOR sono universali.",
    duration: "17 minuti",
    level: "Base",
    prerequisites: ["Porte logiche fondamentali"],
    objectives: [
      "Calcolare le uscite di NAND, NOR, XOR e XNOR.",
      "Distinguere OR da XOR.",
      "Spiegare in termini semplici che cosa rende universale una porta.",
    ],
    introduction: "Negando o confrontando le funzioni fondamentali otteniamo altre quattro porte molto utili. I loro nomi simili possono confondere, ma ogni porta risponde a una domanda precisa.",
    sections: [
      {
        title: "NAND e NOR",
        paragraphs: [
          "NAND equivale a una AND seguita da NOT: vale 0 soltanto quando entrambi gli ingressi sono 1. NOR equivale a una OR seguita da NOT: vale 1 soltanto quando entrambi gli ingressi sono 0.",
          "Sono dette porte universali perché collegando più NAND, oppure più NOR, è possibile ricostruire NOT, AND, OR e quindi qualsiasi funzione booleana.",
        ],
        keyPoints: ["NAND = ¬(A · B)", "NOR = ¬(A + B)", "Il cerchio in uscita indica la negazione"],
      },
      {
        title: "XOR: esattamente uno",
        paragraphs: [
          "XOR produce 1 quando gli ingressi sono diversi. Con due ingressi equivale a dire “esattamente uno è attivo”. Se entrambi valgono 1, XOR produce 0 mentre OR produce 1.",
        ],
        example: { title: "Deviazione da due punti", scenario: "La lampada è accesa quando le posizioni dei due deviatori sono diverse.", steps: ["00 → stessa posizione", "01 o 10 → posizioni diverse", "11 → stessa posizione"], result: "La condizione “diversi” è descritta da A ⊕ B." },
      },
      {
        title: "XNOR: valori uguali",
        paragraphs: [
          "XNOR è la negazione di XOR. Produce 1 quando gli ingressi coincidono: entrambi 0 oppure entrambi 1. Per questo può essere usata come comparatore di uguaglianza per un singolo bit.",
        ],
        example: { title: "Confronto di un bit", scenario: "Vogliamo verificare se un bit ricevuto coincide con quello atteso.", steps: ["Bit uguali → XOR vale 0", "La negazione trasforma 0 in 1"], result: "Corrispondenza = ¬(A ⊕ B)." },
      },
    ],
    commonMistakes: [
      { title: "Confondere OR e XOR", explanation: "Con ingressi 1 e 1, OR vale 1 ma XOR vale 0." },
      { title: "Negare gli ingressi invece dell’uscita", explanation: "NAND è ¬(A · B), non ¬A · ¬B." },
      { title: "Pensare che universale significhi più potente", explanation: "Significa che una sola tipologia di porta può costruire tutte le funzioni, usando più componenti." },
    ],
    checkpoints: [
      { question: "Quanto vale NAND con A = 1 e B = 1?", answer: "0", explanation: "AND produrrebbe 1; NAND nega quel risultato." },
      { question: "Quale porta vale 1 quando A e B sono diversi?", answer: "XOR", explanation: "Le combinazioni attive di XOR sono 01 e 10." },
      { question: "XNOR riceve 0 e 0. Qual è l’uscita?", answer: "1", explanation: "XNOR segnala che i due ingressi sono uguali." },
    ],
    recap: ["NAND e NOR negano rispettivamente AND e OR.", "XOR riconosce ingressi diversi; XNOR riconosce ingressi uguali.", "NAND e NOR sono porte universali."],
  },
  {
    slug: "tabelle-di-verita",
    order: 5,
    title: "Tabelle di verità",
    shortTitle: "Tabelle di verità",
    description: "Impara a elencare tutti gli ingressi e a valutare espressioni logiche senza saltare casi.",
    duration: "18 minuti",
    level: "Intermedio",
    prerequisites: ["Porte logiche fondamentali", "Porte derivate e confronto"],
    objectives: [
      "Determinare il numero di righe necessario.",
      "Compilare una tabella per una formula composta.",
      "Usare colonne intermedie per verificare ogni passaggio.",
    ],
    introduction: "Una tabella di verità è un esperimento completo: elenca ogni possibile combinazione degli ingressi e mostra il risultato della funzione. È anche uno strumento per confrontare due circuiti.",
    sections: [
      {
        title: "Quante righe servono?",
        paragraphs: [
          "Con n ingressi indipendenti esistono 2ⁿ combinazioni. Un ingresso richiede 2 righe, due ingressi 4 righe, tre ingressi 8 righe.",
          "Per non dimenticare combinazioni, fai cambiare l’ultima variabile a ogni riga, la precedente ogni due righe, quella ancora precedente ogni quattro.",
        ],
        keyPoints: ["1 ingresso → 2 righe", "2 ingressi → 4 righe", "3 ingressi → 8 righe"],
      },
      {
        title: "Colonne intermedie",
        paragraphs: [
          "Per una formula composta valuta prima le operazioni racchiuse tra parentesi e annotale in colonne separate. Questo rende visibile il ragionamento e riduce gli errori.",
          "Una convenzione comune, in assenza di parentesi, valuta prima NOT, poi AND e infine OR. In un’attività didattica è comunque meglio usare parentesi esplicite.",
        ],
        example: {
          title: "Valutiamo Y = (A + B) · ¬C",
          scenario: "Consideriamo la riga A = 0, B = 1, C = 0.",
          steps: ["A + B = 0 OR 1 = 1", "¬C = ¬0 = 1", "1 · 1 = 1"],
          result: "Per la combinazione 010, Y vale 1.",
        },
      },
      {
        title: "Confrontare due espressioni",
        paragraphs: [
          "Due espressioni sono equivalenti se le loro colonne finali coincidono in ogni riga. Un solo risultato diverso è sufficiente per dimostrare che non sono equivalenti.",
          "Per esempio ¬(A · B) e ¬A + ¬B producono la stessa colonna: è una delle leggi di De Morgan.",
        ],
      },
    ],
    commonMistakes: [
      { title: "Saltare una combinazione", explanation: "Usa un ordine binario regolare, da 00…0 a 11…1." },
      { title: "Calcolare tutto mentalmente", explanation: "Le colonne intermedie rendono gli errori individuabili e correggibili." },
      { title: "Applicare NOT al termine sbagliato", explanation: "Controlla l’estensione della negazione: ¬C riguarda solo C, ¬(A + B) riguarda l’intera parentesi." },
    ],
    checkpoints: [
      { question: "Quante righe ha una tabella con 3 ingressi?", answer: "8", explanation: "Le combinazioni sono 2³ = 8." },
      { question: "Per A = 1, B = 0, quanto vale ¬A + B?", answer: "0", explanation: "¬A vale 0; quindi 0 OR 0 vale 0." },
      { question: "Quando due espressioni sono equivalenti?", answer: "Quando le uscite coincidono in ogni combinazione", explanation: "Il confronto deve valere per tutte le righe, non soltanto per alcuni esempi." },
    ],
    recap: ["Con n ingressi servono 2ⁿ righe.", "Le colonne intermedie documentano il calcolo.", "Colonne finali identiche dimostrano l’equivalenza."],
  },
  {
    slug: "circuiti-combinatori",
    order: 6,
    title: "Circuiti combinatori",
    shortTitle: "Circuiti combinatori",
    description: "Combina più porte per sommare bit, confrontare valori e prendere decisioni digitali.",
    duration: "20 minuti",
    level: "Intermedio",
    prerequisites: ["Tabelle di verità", "Porte derivate e confronto"],
    objectives: [
      "Seguire un segnale attraverso più porte.",
      "Spiegare il funzionamento di un half-adder.",
      "Riconoscere le idee alla base di sommatore completo e comparatore.",
    ],
    introduction: "Una singola porta esegue una regola elementare. Collegando più porte possiamo costruire blocchi che elaborano diversi ingressi. Nei circuiti combinatori l’uscita dipende dagli ingressi presenti in quell’istante, non da una memoria interna.",
    sections: [
      {
        title: "Leggere il circuito a tappe",
        paragraphs: [
          "Segui il circuito da sinistra verso destra. Calcola prima le porte che ricevono direttamente gli ingressi, assegna un nome ai segnali intermedi e prosegui fino all’uscita.",
          "Se un segnale si divide e raggiunge più porte, mantiene lo stesso valore su ogni ramo. Una linea che si incrocia non implica sempre un collegamento: negli schemi il nodo viene solitamente indicato da un punto.",
        ],
      },
      {
        title: "Half-adder: sommare due bit",
        paragraphs: [
          "La somma di due bit può richiedere due uscite. S è la cifra della somma nella posizione corrente; C è il riporto verso la posizione successiva.",
          "XOR calcola S perché vale 1 quando uno solo degli ingressi è 1. AND calcola C perché il riporto nasce soltanto quando A e B valgono entrambi 1.",
        ],
        example: {
          title: "Sommiamo 1 + 1",
          scenario: "Un half-adder riceve A = 1 e B = 1.",
          steps: ["S = A XOR B = 0", "C = A AND B = 1", "Il riporto viene scritto a sinistra della somma"],
          result: "C S = 10₂, che corrisponde a 2₁₀.",
        },
        keyPoints: ["S = A ⊕ B", "C = A · B"],
      },
      {
        title: "Full-adder e confronto",
        paragraphs: [
          "Per sommare numeri con più cifre serve considerare anche il riporto in ingresso Cin. Il full-adder calcola S = A ⊕ B ⊕ Cin e Cout = (A · B) + (Cin · (A ⊕ B)). Qui + indica OR logico.",
          "Un comparatore di uguaglianza a un bit usa XNOR. Per confrontare parole di più bit, ogni coppia viene confrontata e una AND finale verifica che tutte le posizioni coincidano.",
        ],
        example: {
          title: "Confrontiamo 101 e 101",
          scenario: "Ogni coppia di bit corrispondenti entra in una XNOR.",
          steps: ["1 XNOR 1 = 1", "0 XNOR 0 = 1", "1 XNOR 1 = 1", "AND dei tre risultati = 1"],
          result: "Le due parole binarie sono uguali.",
        },
      },
      {
        title: "Multiplexer: scegliere una strada",
        paragraphs: [
          "Un multiplexer 2 a 1 ha due ingressi dati D0 e D1, un selettore SEL e un’uscita Y. Quando SEL=0 passa D0; quando SEL=1 passa D1. Non somma i due ingressi.",
          "La formula è Y = ¬SEL·D0 + SEL·D1, dove + indica OR logico. È un circuito combinatorio perché l’uscita dipende soltanto dai valori attuali di D0, D1 e SEL.",
        ],
        example: { title: "Selezioniamo D1", scenario: "D0=0, D1=1 e SEL=1.", steps: ["Il selettore 1 sceglie D1", "D1 vale 1", "L’altro ingresso non influenza l’uscita"], result: "Y=1." },
      },
    ],
    commonMistakes: [
      { title: "Ignorare i segnali intermedi", explanation: "Nominali e calcolali uno alla volta; tentare un salto diretto rende opaco il circuito." },
      { title: "Confondere somma e riporto", explanation: "Nell’half-adder XOR genera S, mentre AND genera C." },
      { title: "Dimenticare Cin nel full-adder", explanation: "Cin trasporta il riporto prodotto dalla posizione meno significativa." },
    ],
    checkpoints: [
      { question: "In un half-adder, quali porte generano S e C?", answer: "XOR genera S; AND genera C", explanation: "XOR rappresenta la cifra locale, AND rileva il caso 1 + 1 che produce riporto." },
      { question: "Quanto vale l’half-adder per A = 1 e B = 0?", answer: "S = 1, C = 0", explanation: "Gli ingressi sono diversi, quindi XOR vale 1; non sono entrambi 1, quindi AND vale 0." },
      { question: "Come si verifica l’uguaglianza di due parole binarie?", answer: "XNOR su ogni coppia e AND dei risultati", explanation: "Ogni posizione deve coincidere affinché le parole complete siano uguali." },
    ],
    recap: ["Un circuito combinatorio non conserva memoria interna.", "L’half-adder usa XOR per la somma e AND per il riporto.", "Blocchi semplici possono essere combinati per elaborare parole di più bit."],
  },
];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonNavigation(slug: string) {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: lessons[index - 1], next: lessons[index + 1] };
}

export const totalLearningMinutes = lessons.reduce((total, lesson) => {
  const minutes = Number.parseInt(lesson.duration, 10);
  return total + (Number.isNaN(minutes) ? 0 : minutes);
}, 0);
