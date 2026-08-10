import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "docs", "guide-catalog.json");
const strict = process.argv.includes("--strict");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const active = catalog.entries.filter((entry) => entry.scope === "full-guide");
const issues = [];
const pending = [];

for (const entry of active) {
  const filePath = path.join(root, entry.file);
  if (!fs.existsSync(filePath)) {
    pending.push(entry.title);
    continue;
  }

  const text = fs.readFileSync(filePath, "utf8");
  const checks = [
    [/chronologique/i, "route chronologique"],
    [/(100\s*%|100\s*pour\s*cent).*Steam/i, "périmètre 100 % Steam"],
    [/missable|ratable|manquable/i, "alertes missables"],
    [/sans spoiler|sans r[ée]v[ée]ler|anti-spoiler/i, "règle anti-spoiler"],
  ];

  for (const [pattern, label] of checks) {
    if (!pattern.test(text)) {
      issues.push(`${entry.id}: section attendue absente (${label})`);
    }
  }
}

console.log(`Guides actifs : ${active.length}`);
console.log(`Guides présents : ${active.length - pending.length}`);
console.log(`Guides encore planifiés : ${pending.length}`);
if (pending.length > 0) console.log(`À rédiger : ${pending.join(", ")}`);

if (issues.length > 0) {
  console.error("Contrôles de structure en échec :");
  for (const issue of issues) console.error(`- ${issue}`);
  if (strict) process.exitCode = 1;
}

if (strict && pending.length > 0) {
  console.error("Contrôle strict impossible tant que tous les guides actifs ne sont pas présents.");
  process.exitCode = 1;
}
