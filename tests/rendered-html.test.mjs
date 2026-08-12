import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("includes the seven-gate interactive simulator", async () => {
  const source = await readFile(new URL("../app/LogicLab.tsx", import.meta.url), "utf8");
  assert.match(source, /"AND" \| "OR" \| "NOT" \| "NAND" \| "NOR" \| "XOR" \| "XNOR"/);
  assert.match(source, /role="switch"/);
  assert.match(source, /TABELLA LIVE/);
  assert.match(source, /resultFor\(gate, inputA, inputB\)/);
  assert.doesNotMatch(source, /codex-preview|react-loading-skeleton/i);
});
