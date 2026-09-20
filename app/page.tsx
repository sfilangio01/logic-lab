import type { Metadata } from "next";
import LogicLab from "./LogicLab";

export const metadata: Metadata = {
  title: "LogicLab — Porte logiche e numeri binari interattivi",
  description:
    "Simula le sette porte logiche, esplora le tabelle di verità, converti numeri e prova operazioni binarie passo dopo passo.",
};

export default function Home() {
  return <LogicLab />;
}
