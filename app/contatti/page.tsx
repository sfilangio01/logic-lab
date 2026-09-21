import type { Metadata } from "next";
import Link from "next/link";
import EduShell from "../components/EduShell";

export const metadata: Metadata = {
  title: "Contatti e progetto | LogicLab",
  description: "Chi cura LogicLab e come segnalare errori, proporre miglioramenti o inviare richieste sulla privacy.",
  alternates: { canonical: "/contatti" },
};

export default function ContactsPage() {
  return <EduShell><main className="edu-main contact-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span aria-current="page">Contatti</span></nav>
    <header className="edu-hero"><span className="section-index">IL PROGETTO</span><h1>Parliamo di<br />logica.</h1><p>LogicLab è un progetto educativo di VF Web Solutions. Se trovi un errore, hai un suggerimento o vuoi informazioni sul trattamento dei dati, puoi scriverci direttamente.</p></header>
    <section className="contact-panel" aria-labelledby="contact-title">
      <div><span className="section-index">CONTATTO DIRETTO</span><h2 id="contact-title">Una domanda o una correzione?</h2><p>Indica la pagina e, se possibile, i passaggi per riprodurre il problema. Non inviare password o altri dati riservati.</p><a className="contact-email" href="mailto:filangerivincenzo01@gmail.com?subject=LogicLab%20-%20segnalazione">filangerivincenzo01@gmail.com <span aria-hidden="true">↗</span></a></div>
      <aside><h3>Responsabile del progetto</h3><p><strong>Vincenzo Filangeri</strong><br />VF Web Solutions<br />P. IVA 07418110826</p><a href="https://www.vfwebsolutions.com/" target="_blank" rel="noopener noreferrer">Visita VF Web Solutions ↗</a></aside>
    </section>
    <aside className="next-callout"><div><span>TRASPARENZA</span><h2>Come funziona il sito?</h2></div><Link href="/privacy">LEGGI LA PRIVACY →</Link></aside>
  </main></EduShell>;
}
