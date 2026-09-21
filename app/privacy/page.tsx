import type { Metadata } from "next";
import Link from "next/link";
import EduShell from "../components/EduShell";

export const metadata: Metadata = { title: "Privacy | LogicLab", description: "Informazioni sulla privacy e sui dati salvati da LogicLab.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <EduShell><main className="edu-main legal-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span aria-current="page">Privacy</span></nav><h1>Privacy</h1><p>LogicLab è un laboratorio educativo. Le preferenze del tema e i progressi negli esercizi vengono salvati esclusivamente nel browser tramite localStorage e non vengono inviati a un database.</p><h2>Dati tecnici</h2><p>Il servizio di hosting può elaborare dati tecnici necessari a sicurezza e funzionamento, come indirizzo IP, user agent e log delle richieste.</p><h2>Pubblicità e misurazione</h2><p>Al momento LogicLab non carica annunci pubblicitari né cookie di profilazione. Questa pagina verrà aggiornata prima dell’attivazione di eventuali servizi pubblicitari o analitici che richiedano consenso.</p><h2>Gestione dei dati locali</h2><p>Puoi cancellare preferenze e progressi eliminando i dati del sito dalle impostazioni del browser.</p><p className="legal-update">Ultimo aggiornamento: 21 settembre 2026.</p></main></EduShell>;
}
