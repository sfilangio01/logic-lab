"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EduShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const footerAction = pathname === "/impara"
    ? { href: "/impara/bit-e-sistema-binario", label: "Inizia la prima lezione →" }
    : pathname === "/esercizi"
      ? { href: "/impara", label: "Ripassa le lezioni →" }
      : { href: "/esercizi", label: "Mettiti alla prova →" };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("logiclab-theme", next);
  };

  return (
    <div className="edu-site">
      <header className="edu-header">
        <Link className="brand" href="/" aria-label="LogicLab, pagina iniziale"><span className="brand-mark brand-mark-logo" aria-hidden="true">L</span><span>LOGIC<span>LAB</span></span></Link>
        <nav aria-label="Navigazione didattica, scorri orizzontalmente per tutte le sezioni"><Link href="/impara">Lezioni</Link><Link href="/porte-logiche">Porte</Link><Link href="/visualizza">Visual</Link><Link href="/esercizi">Esercizi</Link><Link href="/#simulatore">Laboratorio</Link></nav><span className="edu-nav-hint" aria-hidden="true">ALTRE →</span>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"}><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><b>{theme === "light" ? "NOTTE" : "GIORNO"}</b></button>
      </header>
      {children}
      <footer className="edu-footer"><Link className="brand" href="/">LOGICLAB</Link><p>Impara la logica digitale con spiegazioni, visualizzazioni ed esercizi.</p><Link href="/metodo">Il metodo</Link><Link href="/contatti">Contatti</Link><Link href="/privacy">Privacy</Link><Link href={footerAction.href}>{footerAction.label}</Link></footer>
    </div>
  );
}
