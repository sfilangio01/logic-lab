import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("includes the interactive AND/OR simulator", async () => {
  const source = await readFile(new URL("../app/LogicLab.tsx", import.meta.url), "utf8");
  assert.match(source, /type Gate = "AND" \| "OR"/);
  assert.match(source, /role="switch"/);
  assert.match(source, /TABELLA DI VERITÀ/);
  assert.match(source, /resultFor\(gate, inputA, inputB\)/);
  assert.doesNotMatch(source, /codex-preview|react-loading-skeleton/i);
});
