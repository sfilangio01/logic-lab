import type { Metadata } from "next";
import Link from "next/link";
import EduShell from "@/app/components/EduShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Il metodo LogicLab: impara, simula, verifica",
  description:
    "Scopri come usare lezioni, circuiti visuali ed esercizi di LogicLab e quali sono i limiti delle simulazioni logiche e dei calcoli a 8 bit.",
  alternates: { canonical: "/metodo" },
  openGraph: {
    title: "Il metodo LogicLab: dalla teoria alla prova",
    description:
      "Un percorso trasparente per imparare la logica digitale: cosa mostrano i simulatori, cosa non mostrano e come esercitarsi.",
    url: "/metodo",
    type: "article",
  },
};

const steps = [
  {
    number: "01",
    title: "Capisci la regola",
    copy: "Parti da una lezione breve. Definisci gli ingressi, leggi la formula e prova a prevedere l’uscita prima di guardare la risposta.",
    href: "/impara",
    label: "VAI ALLE LEZIONI",
  },
  {
    number: "02",
    title: "Cambia un ingresso",
    copy: "Nel simulatore modifica un bit alla volta. Confronta l’uscita con la riga corrispondente della tabella di verità.",
    href: "/#simulatore",
    label: "APRI IL SIMULATORE",
  },
  {
    number: "03",
    title: "Segui il segnale",
    copy: "Le visualizzazioni mostrano come le porte collaborano in un mezzo sommatore e in un multiplexer 2 a 1.",
    href: "/visualizza",
    label: "GUARDA I CIRCUITI",
  },
  {
    number: "04",
    title: "Verifica il perché",
    copy: "Rispondi agli esercizi senza tentare a caso. Leggi la spiegazione anche quando la risposta è corretta.",
    href: "/esercizi",
    label: "PROVA GLI ESERCIZI",
  },
];

export default function MetodoPage() {
  return (
    <EduShell>
      <main className={styles.page}>
        <div className={styles.shell}>
          <nav className={styles.breadcrumbs} aria-label="Percorso di navigazione">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Il metodo</span>
          </nav>

          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>COME FUNZIONA LOGICLAB</span>
              <h1>Impara una regola.<br /><em>Mettila alla prova.</em></h1>
              <p>
                LogicLab collega spiegazioni, tabelle di verità e strumenti interattivi.
                Non ti chiede di memorizzare un risultato: ti aiuta a prevederlo, osservarlo e spiegarlo.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryLink} href="/impara">INIZIA IL PERCORSO <span aria-hidden="true">↗</span></Link>
                <a href="#limiti">SCOPRI I LIMITI <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className={styles.heroVisual} aria-label="Esempio: la porta AND con ingressi A uguale 1 e B uguale 0 produce 0" role="img">
              <span className={styles.visualLabel}>MODELLO / 01</span>
              <div className={styles.logicDiagram} aria-hidden="true">
                <div className={styles.diagramInputs}>
                  <span><small>A</small><strong>1</strong></span>
                  <span><small>B</small><strong>0</strong></span>
                </div>
                <div className={styles.diagramGate}>AND</div>
                <div className={styles.diagramOutput}><small>USCITA</small><strong>0</strong></div>
              </div>
              <p>Stessi ingressi, stessa regola, stessa uscita.</p>
            </div>
          </header>

          <section className={styles.principle} aria-labelledby="principle-title">
            <span className={styles.kicker}>IL PRINCIPIO</span>
            <h2 id="principle-title">Prima prevedi.<br />Poi accendi il circuito.</h2>
            <p>
              Imparare la logica digitale significa passare da una frase come “entrambi devono essere attivi”
              a una formula, poi a una tabella e infine a un risultato osservabile.
              Il simulatore serve per verificare il ragionamento, non per sostituirlo.
            </p>
          </section>

          <section className={styles.routeSection} aria-labelledby="route-title">
            <div className={styles.sectionHeading}>
              <span className={styles.kicker}>UN PERCORSO, QUATTRO AZIONI</span>
              <h2 id="route-title">Dalla teoria al controllo.</h2>
              <p>Puoi seguire l’ordine suggerito oppure usare una singola sezione per ripassare un dubbio preciso.</p>
            </div>
            <ol className={styles.steps}>
              {steps.map((step) => (
                <li key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                  <Link href={step.href}>{step.label} <span aria-hidden="true">↗</span></Link>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.limitsSection} id="limiti" aria-labelledby="limits-title">
            <div className={styles.sectionHeading}>
              <span className={styles.kicker}>TRASPARENZA SUL MODELLO</span>
              <h2 id="limits-title">Che cosa vedi.<br />Che cosa resta fuori.</h2>
              <p>Una simulazione è utile quando sai esattamente quale domanda può risolvere.</p>
            </div>
            <div className={styles.limitGrid}>
              <article className={styles.limitYes}>
                <span className={styles.limitTag}>QUI PUOI OSSERVARE</span>
                <h3>La logica dei segnali.</h3>
                <ul>
                  <li>Ingressi e uscite idealizzati come <strong>0 e 1 logici</strong>.</li>
                  <li>Le regole di AND, OR, NOT, NAND, NOR, XOR e XNOR.</li>
                  <li>Le combinazioni riportate nelle tabelle di verità.</li>
                  <li>Il risultato logico di circuiti combinatori semplici.</li>
                </ul>
              </article>
              <article className={styles.limitNo}>
                <span className={styles.limitTag}>QUI NON STAI MISURANDO</span>
                <h3>L’elettronica fisica.</h3>
                <ul>
                  <li>Tensioni, correnti, soglie o rumore di un componente reale.</li>
                  <li>Ritardi di propagazione, tempi di commutazione e sincronizzazione.</li>
                  <li>Consumi, temperatura, tolleranze o guasti hardware.</li>
                  <li>Comportamenti incerti o transitori tra due stati stabili.</li>
                </ul>
              </article>
            </div>
            <p className={styles.limitFootnote}>
              Le linee illuminate sono una rappresentazione visiva dello stato logico: non indicano una misura di tensione né il tempo impiegato dal segnale per propagarsi.
            </p>
          </section>

          <section className={styles.binarySection} aria-labelledby="binary-title">
            <div className={styles.binaryIntro}>
              <span className={styles.kicker}>NOTA SUI NUMERI BINARI</span>
              <h2 id="binary-title">Otto bit sono un confine,
                <br /><em>non tutta la matematica.</em></h2>
              <p>
                Il convertitore lavora con interi senza segno da <strong>0 a 255</strong> e li mostra su 8 bit.
                La calcolatrice accetta operandi binari da 1 a 8 bit. Alcune operazioni producono risultati
                che richiedono più bit, oppure numeri negativi: LogicLab li segnala anziché nasconderli.
              </p>
            </div>
            <div className={styles.binaryExamples}>
              <div><span>CONVERSIONE</span><code>255₁₀ = 11111111₂</code><p>Il massimo valore senza segno su 8 bit.</p></div>
              <div><span>OVERFLOW</span><code>255 + 1 = 256</code><p>Il risultato richiede 9 bit; su 8 bit rimane 00000000₂.</p></div>
              <div><span>RISULTATO NEGATIVO</span><code>0 − 1 = −1</code><p>Non è un valore unsigned; nel range rappresentabile, il complemento a due viene spiegato separatamente.</p></div>
              <div><span>DIVISIONE</span><code>5 ÷ 2 = 2</code><p>La calcolatrice mostra il quoziente intero, senza parte frazionaria.</p></div>
            </div>
          </section>

          <section className={styles.privacySection} aria-labelledby="privacy-title">
            <div>
              <span className={styles.kicker}>PRIVACY E PROGRESSI</span>
              <h2 id="privacy-title">Il tuo percorso resta qui.</h2>
              <p>
                LogicLab non richiede un account. La preferenza giorno/notte e i progressi degli esercizi
                vengono conservati nel browser del dispositivo tramite localStorage; se cancelli i dati del sito,
                questi progressi si perdono. Non vengono sincronizzati tra dispositivi.
              </p>
            </div>
            <Link href="/privacy">LEGGI L’INFORMATIVA PRIVACY <span aria-hidden="true">↗</span></Link>
          </section>

          <section className={styles.finalCta} aria-labelledby="final-title">
            <span className={styles.kicker}>PRONTO A PROVARE?</span>
            <h2 id="final-title">Parti da un bit.<br />Arriva a un circuito.</h2>
            <Link href="/impara/bit-e-sistema-binario">INIZIA DALLA PRIMA LEZIONE <span aria-hidden="true">→</span></Link>
          </section>
        </div>
      </main>
    </EduShell>
  );
}
