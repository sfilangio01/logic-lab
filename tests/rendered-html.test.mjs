import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("includes the seven-gate interactive simulator", async () => {
  const source = await readFile(new URL("../app/LogicLab.tsx", import.meta.url), "utf8");
  assert.match(source, /"AND" \| "OR" \| "NOT" \| "NAND" \| "NOR" \| "XOR" \| "XNOR"/);
  assert.match(source, /role="switch"/);
  assert.match(source, /TABELLA ATTUALE/);
  assert.match(source, /resultFor\(gate, inputA, inputB\)/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /aria-controls="gate-panel"/);
  assert.match(source, /ArrowRight/);
  assert.doesNotMatch(source, /codex-preview|react-loading-skeleton/i);
});

test("includes binary conversion and calculation tools", async () => {
  const source = await readFile(new URL("../app/LogicLab.tsx", import.meta.url), "utf8");
  assert.match(source, /CONVERTITORE INTERATTIVO/);
  assert.match(source, /CALCOLATRICE BINARIA/);
  assert.match(source, /Divisioni successive/);
  assert.match(source, /AND bit a bit/);
  assert.match(source, /decimalValid/);
  assert.match(source, /binaryAValid/);
  assert.match(source, /complemento a due/);
  assert.match(source, /Overflow/);
});

test("includes mobile navigation and persistent color theme", async () => {
  const source = await readFile(new URL("../app/LogicLab.tsx", import.meta.url), "utf8");
  assert.match(source, /mobile-navigation/);
  assert.match(source, /aria-expanded=\{menuOpen\}/);
  assert.match(source, /logiclab-theme/);
  assert.match(source, /Attiva tema scuro/);
});
