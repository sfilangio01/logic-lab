import type { Metadata } from "next";
import Link from "next/link";
import EduShell from "../components/EduShell";

export const metadata: Metadata = { title: "Privacy | LogicLab", description: "Come LogicLab gestisce preferenze locali, progressi, dati tecnici e richieste inviate via email.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <EduShell><main className="edu-main legal-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span aria-current="page">Privacy</span></nav>
    <h1>Privacy</h1>
    <p>LogicLab è un progetto educativo di VF Web Solutions. Questa pagina descrive i dati trattati dal sito nella sua configurazione attuale, senza pubblicità né strumenti di profilazione.</p>
    <h2>Responsabile e contatti</h2>
    <p>Il titolare del progetto è Vincenzo Filangeri, VF Web Solutions, P. IVA 07418110826. Per domande o richieste relative ai dati puoi scrivere a <a href="mailto:filangerivincenzo01@gmail.com">filangerivincenzo01@gmail.com</a>. Trovi gli stessi riferimenti nella pagina <Link href="/contatti">Contatti</Link>.</p>
    <h2>Dati salvati sul dispositivo</h2>
    <p>La preferenza giorno/notte e le risposte agli esercizi sono salvate tramite localStorage nel tuo browser. LogicLab non le invia a un proprio database. Puoi cancellare i progressi con il pulsante “Azzera progressi” nella pagina <Link href="/esercizi">Esercizi</Link>; puoi eliminare anche la preferenza del tema cancellando i dati del sito dalle impostazioni del browser.</p>
    <h2>Dati tecnici di hosting</h2>
    <p>Il servizio di hosting Vercel può elaborare dati tecnici necessari a funzionamento e sicurezza, come indirizzo IP, user agent e log delle richieste. Per i dettagli sul trattamento effettuato dal fornitore consulta la <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">sua informativa sulla privacy</a>.</p>
    <h2>Messaggi inviati via email</h2>
    <p>Se scegli di scriverci, useremo il tuo indirizzo e il contenuto del messaggio per risponderti o gestire la segnalazione. Il sito non contiene un modulo di contatto e non raccoglie questi dati automaticamente.</p>
    <h2>Pubblicità, analisi e pagamenti</h2>
    <p>Al momento LogicLab non carica annunci AdSense, strumenti di analisi con cookie di profilazione né servizi di pagamento. Prima dell’eventuale attivazione di pubblicità o misurazione che richiedano consenso, aggiorneremo questa informativa e predisporremo i relativi controlli.</p>
    <p className="legal-update">Ultimo aggiornamento: 21 settembre 2026.</p>
  </main></EduShell>;
}
