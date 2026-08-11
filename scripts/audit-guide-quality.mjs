import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const catalog = JSON.parse(
  await readFile(join(ROOT, "docs", "guide-catalog.json"), "utf8"),
);
const steamAudit = JSON.parse(
  await readFile(join(ROOT, "docs", "steam-audit.json"), "utf8"),
);

const active = catalog.entries.filter(
  (entry) => entry.scope === "full-guide" || entry.scope === "special",
);
const auditById = new Map(steamAudit.games.map((game) => [game.id, game]));
const results = [];

const count = (text, pattern) => (text.match(pattern) ?? []).length;
const hasAny = (text, patterns) => patterns.some((pattern) => pattern.test(text));
const checklistPattern = /^\s*(?:[-*]\s*)?\[\s*\]\s+.+$/gim;

const finalChecklistCount = (text) => {
  const headings = [
    ...text.matchAll(/^(?:(?:#\s*)?.*(?:checklist|liste complète|liste complete).*)$/gim),
  ];
  if (headings.length === 0) return 0;
  const start = headings.at(-1).index ?? 0;
  const tail = text.slice(start);
  const end = tail.search(/^(?:vérification|verification|sources|fin du guide)\b/im);
  return count(end >= 0 ? tail.slice(0, end) : tail, checklistPattern);
};

for (const entry of active) {
  const file = join(ROOT, entry.file);
  let text = "";
  try {
    text = await readFile(file, "utf8");
  } catch {
    results.push({ id: entry.id, title: entry.title, status: "missing", issues: ["fichier absent"] });
    continue;
  }

  const lines = text.split(/\r?\n/);
  const expected = auditById.get(entry.id)?.steamAchievements ?? 0;
  const checklist = finalChecklistCount(text);
  const routeHeadings = count(text, /^(?:#\s+|(?:PARTIE|CHAPITRE|ACTE|ÉPISODE|EPISODE|ROUTE|ORDRE)\b|\d+(?:\.\d+)*[.)]\s+)/gim);
  const locationAnchors = count(
    text,
    /\b(?:zone|salle|donjon|chapitre|mission|niveau|secteur|coffre|trésor|objet|materia|collectible|quête|ville|village|temple|forêt|grotte|cave|room|map)\b/gi,
  );
  const issues = [];

  if (lines.length < 180) issues.push("fiche courte");
  if (routeHeadings < 3) issues.push("route trop peu découpée");
  if (!hasAny(text, [/missable|manquable|ratable|fenêtre/i])) issues.push("alertes missables absentes");
  if (!hasAny(text, [/checklist|vérification|verification/i])) issues.push("vérification finale absente");
  if (expected > 0 && checklist !== expected) issues.push(`checklist ${checklist}/${expected}`);
  if (locationAnchors < 8) issues.push("repères de lieux insuffisants");
  if (text.includes("\uFFFD")) issues.push("UTF-8 corrompu");

  results.push({
    id: entry.id,
    title: entry.title,
    status: issues.length === 0 ? "pass" : "needs-rewrite",
    lines: lines.length,
    checklist,
    expected,
    routeHeadings,
    locationAnchors,
    issues,
  });
}

const needsRewrite = results.filter((result) => result.status === "needs-rewrite");
const passed = results.filter((result) => result.status === "pass");
console.log(`Fiches contrôlées : ${results.length}`);
console.log(`Fiches conformes au nouveau seuil : ${passed.length}`);
console.log(`Fiches à réécrire : ${needsRewrite.length}`);

for (const result of needsRewrite) {
  console.log(
    `- ${result.title}: ${result.issues.join(", ")} (${result.lines ?? 0} lignes, ${result.checklist ?? 0}/${result.expected ?? 0} cases finales)`,
  );
}

if (process.argv.includes("--strict") && needsRewrite.length > 0) {
  process.exitCode = 1;
}
