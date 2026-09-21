"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EduShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("logiclab-theme");
    document.documentElement.dataset.theme = saved === "dark" ? "dark" : saved === "light" ? "light" : theme;
  }, [pathname, theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("logiclab-theme", next);
  };

  return (
    <div className="edu-site">
      <header className="edu-header">
        <Link className="brand" href="/" aria-label="LogicLab, pagina iniziale"><span className="brand-mark"><i /><i /><i /></span><span>LOGIC<span>LAB</span></span></Link>
        <nav aria-label="Navigazione didattica"><Link href="/impara">Lezioni</Link><Link href="/porte-logiche">Porte</Link><Link href="/visualizza">Visual</Link><Link href="/esercizi">Esercizi</Link><Link href="/#simulatore">Laboratorio</Link></nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"}><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><b>{theme === "light" ? "NOTTE" : "GIORNO"}</b></button>
      </header>
      {children}
      <footer className="edu-footer"><Link className="brand" href="/">LOGICLAB</Link><p>Impara la logica digitale con spiegazioni, visualizzazioni ed esercizi.</p><Link href="/privacy">Privacy</Link><Link href="/impara">Continua il percorso →</Link></footer>
    </div>
  );
}
