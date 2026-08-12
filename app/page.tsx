import type { Metadata } from "next";
import LogicLab from "./LogicLab";

export const metadata: Metadata = {
  title: "LogicLab — Visualizzatore di porte logiche",
  description:
    "Sperimenta con porte AND e OR, modifica gli input e osserva il segnale attraversare il circuito in tempo reale.",
};

export default function Home() {
  return <LogicLab />;
}
