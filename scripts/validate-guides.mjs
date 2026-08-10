import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "docs", "guide-catalog.json");
const steamAuditPath = path.join(root, "docs", "steam-audit.json");
const strict = process.argv.includes("--strict");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const steamAudit = JSON.parse(fs.readFileSync(steamAuditPath, "utf8"));
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
  const auditEntry = steamAudit.games.find((game) => game.id === entry.id);
  const steamCheck = entry.id === "breath-of-fire-iv"
    ? [/(0|aucun)\s+succ[eè]s?\s+Steam/i, "exception sans succès Steam"]
    : [/(100\s*%|100\s*pour\s*cent).*Steam/i, "périmètre 100 % Steam"];
  const checks = [
    [/chronologique/i, "route chronologique"],
    steamCheck,
    [/missable|ratable|manquable/i, "alertes missables"],
    [/sans spoiler|sans r[ée]v[ée]ler|anti-spoiler/i, "règle anti-spoiler"],
  ];

  for (const [pattern, label] of checks) {
    if (!pattern.test(text)) {
      issues.push(`${entry.id}: section attendue absente (${label})`);
    }
  }

  if (auditEntry) {
    const countMatch = text.match(/(?:\d+\s*\/\s*)?(\d+)\s+succ[eè]s?\s+Steam/i);
    if (!countMatch) {
      issues.push(`${entry.id}: nombre de succès Steam absent de l'en-tête`);
    } else if (Number(countMatch[1]) !== auditEntry.steamAchievements) {
      issues.push(
        `${entry.id}: en-tête annonce ${countMatch[1]} succès, audit Steam ${auditEntry.steamAchievements}`,
      );
    }
  }

  const explicitSpoiler = /(spoilers?\s+(int[ée]graux|importants|[àa]\s+venir)|avec\s+spoilers?|voici\s+la\s+fin|twist\s+r[ée]v[ée]l[ée]|r[ée]v[ée]lation\s+(de\s+la\s+fin|finale))/i;
  if (explicitSpoiler.test(text)) {
    issues.push(`${entry.id}: formulation incompatible avec la règle sans spoiler`);
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
