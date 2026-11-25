// battery-last-text — a make.fun entry for "The Battery's Last Text to Its Charger".
//
// The entry is a dying battery's last text written as a will. The field's
// saturated angles are the waited-all-day-at-1% lament, the breakup text, and
// petty alarm-password theft. Ours is the inheritance angle instead: the
// battery bequeaths its final 1% to the flashlight — the one app that earned
// it — disinherits the charger entirely, and leaves the clock frozen at
// 11:47, the last time it will ever show.
//
// The program writes the single line to /output/entry.txt (override the
// directory with the OUTPUT_DIR environment variable).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I leave my final 1% to the flashlight. It earned it. You get nothing — not even the time. It is 11:47 forever now.";

// The kit's gate for /output/entry.txt: UTF-8 text of 1 to 200 characters,
// not only whitespace. The entry itself must also be exactly one line.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1 to 200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

function main(): void {
  // The length is part of the entry: the authored line is exactly 114
  // characters, and any edit that changes that is a different entry.
  if (TEXT.length !== 114) {
    throw new Error(`entry must be exactly 114 characters, got ${TEXT.length}`);
  }
  validateEntry(TEXT);

  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, TEXT, "utf8");

  // Read the file back and prove what landed on disk is the entry itself:
  // re-validate it against the gate and compare it byte for byte with TEXT.
  const written = readFileSync(entryPath, "utf8");
  validateEntry(written);
  if (written !== TEXT) {
    throw new Error("written entry differs from TEXT");
  }
}

main();
