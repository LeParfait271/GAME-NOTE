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
const publication = JSON.parse(
  await readFile(join(ROOT, "docs", "site-publication.json"), "utf8"),
);
const visibleGuideIds = new Set(publication.visibleGuideIds ?? []);
const visibleGuideFiles = new Set(
  (publication.visibleGuideFiles ?? []).map((file) => file.split("/").at(-1)),
);

const active = catalog.entries.filter(
  (entry) =>
    visibleGuideIds.has(entry.id) ||
    (typeof entry.file === "string" &&
      visibleGuideFiles.has(entry.file.split("/").at(-1))),
);
const auditById = new Map(steamAudit.games.map((game) => [game.id, game]));
const results = [];

const count = (text, pattern) => (text.match(pattern) ?? []).length;
const hasAny = (text, patterns) => patterns.some((pattern) => pattern.test(text));

const hasContiguousIds = (text, pattern, last) => {
  const ids = new Set(
    [...text.matchAll(pattern)].map((match) => Number.parseInt(match[1], 10)),
  );
  if (ids.size !== last) return false;
  for (let id = 1; id <= last; id += 1) {
    if (!ids.has(id)) return false;
  }
  return true;
};

const specificIssues = (id, text) => {
  const issues = [];
  const requireAny = (label, patterns) => {
    if (!hasAny(text, patterns)) issues.push(label);
  };

  if (id === "expedition-33") {
    [
      ["compteur Steam 55/55 absent", [/55\/55 succes Steam/i]],
      ["compteur journaux 49/49 absent", [/49\/49 journaux/i]],
      ["compteur disques 33/33 absent", [/33\/33 disques/i]],
      ["compteur Nevrons 10/10 absent", [/10\/10 quetes de Nevrons/i]],
      ["compteur Gestrals 9/9 absent", [/9\/9 Gestrals/i]],
      ["compteur jeux gestral 5/5 absent", [/5\/5 jeux gestral/i]],
      ["compteur Monoco 46/46 absent", [/46\/46 competences de Monoco/i]],
      ["compteur relations 35/35 absent", [/35\/35 interactions/i]],
      ["reponse Antoine incomplete", [/quiz d'Antoine, avec les reponses 67, Expedition Zero/i]],
      ["controle prologue absent", [/AVANT DE SORTIR - PROLOGUE/i]],
      ["choix de fin absent", [/CHOIX DE FIN/i]],
      ["post-game absent", [/POST-GAME/i]],
    ].forEach(([label, patterns]) => requireAny(label, patterns));
  }

  if (id === "octopath-traveler-1") {
    [
      ["compteur Steam 88/88 absent", [/88\/88 succes Steam/i]],
      ["compteur coffres 734/734 absent", [/734\/734 coffres/i]],
      ["compteur objets caches 152/152 absent", [/152\/152 objets/i]],
      ["compteur recits 101/101 absent", [/101\/101 recits|101\/101 récits/i]],
      ["compteur Strategiste 381/381 absent", [/381\/381\*{0,2}\s*entrees|381\/381\*{0,2}\s*entrées/i]],
      ["alerte seconde sauvegarde absente", [/Seconde sauvegarde/i]],
      ["controle Galdera absent", [/Galdera/i]],
      ["controle Original Tome absent", [/Original Tome/i]],
    ].forEach(([label, patterns]) => requireAny(label, patterns));
  }

  if (id === "octopath-traveler-2") {
    [
      ["compteur Steam 33/33 absent", [/33\/33 succes Steam/i]],
      ["compteur Side Stories 67 absent", [/67 Side Stories/i]],
      ["compteur Records 30 absent", [/30 Records/i]],
      ["compteur Battle-Tested 7 absent", [/7 Battle-Tested/i]],
      ["compteur EX Skills 16 absent", [/16 EX Skills/i]],
      ["The Traveler's Bag absent", [/The Traveler's Bag/i]],
      ["A Gate Between Worlds absent", [/A Gate Between Worlds/i]],
      ["The Journey for the Dawn absent", [/The Journey for the Dawn/i]],
    ].forEach(([label, patterns]) => requireAny(label, patterns));

    if (!hasContiguousIds(text, /#(\d{3})\b/g, 632)) {
      issues.push("registre coffres #001-#632 incomplet");
    }
    if (!hasContiguousIds(text, /H(\d{3})\b/g, 237)) {
      issues.push("registre objets caches H001-H237 incomplet");
    }

    const finalPhaseStart = text.indexOf("PHASE 8 - PREPARATION DU CHAPITRE FINAL");
    const finalPhase = finalPhaseStart >= 0 ? text.slice(finalPhaseStart) : "";
    if (
      !/66 Side Stories[\s\S]*A Gate Between Worlds[\s\S]*THE JOURNEY FOR THE DAWN[\s\S]*credits/i.test(
        finalPhase,
      )
    ) {
      issues.push("ordre final 66 Side Stories -> A Gate -> credits absent");
    }
    if (!/The Traveler's Bag[\s\S]*65 Side Stories preparatoires fixes[\s\S]*A Gate Between Worlds/i.test(text)) {
      issues.push("decompte OT2 67 = sac + 65 preparatoires + A Gate absent");
    }
    if (/Traveler's Bag et 66 autres recits fixes/i.test(text)) {
      issues.push("ancien decompte OT2 contradictoire detecte");
    }
    if (/(?:SANS SPOILER|aucun rep[eè]re additionnel|\bTODO\b|\bTBD\b)/i.test(text)) {
      issues.push("placeholder ou ancienne fiche detecte");
    }
  }

  return issues;
};

const isHeadingLike = (line) => {
  const trimmed = line.trim();
  if (!trimmed) return false;
  return (
    !/^[-*]/.test(trimmed) &&
    (trimmed.startsWith("#") ||
      /^\d+(?:\.\d+)*[.)]\s+/.test(trimmed) ||
      trimmed === trimmed.toLocaleUpperCase("fr"))
  );
};

const finalChecklistCount = (text) => {
  const lines = text.split(/\r?\n/);
  const starts = lines.reduce((indices, line, index) => {
    const trimmed = line.trim();
    if (isHeadingLike(trimmed) && /(?:checklist|liste complete)/i.test(trimmed)) {
      indices.push(index);
    }
    return indices;
  }, []);
  if (starts.length === 0) return 0;

  const start = starts.at(-1);
  const endOffset = lines.slice(start + 1).findIndex((line) => {
    const trimmed = line.trim();
    if (/^(?:verification|sources|fin du guide)\b/i.test(trimmed)) return true;
    return false;
  });
  const end = endOffset < 0 ? lines.length : start + 1 + endOffset;
  return lines
    .slice(start, end)
    .filter((line) => /^\s*(?:[-*]\s*)?\[\s*\]\s+.+$/i.test(line))
    .length;
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
  const routeHeadings = count(
    text,
    /^(?:#\s+|(?:PARTIE|CHAPITRE|ACTE|EPISODE|ROUTE|ORDRE)\b|\d+(?:\.\d+)*[.)]\s+)/gim,
  );
  const locationAnchors = count(
    text,
    /\b(?:zone|salle|donjon|chapitre|mission|niveau|secteur|coffre|tresor|objet|materia|collectible|quete|ville|village|temple|foret|grotte|cave|room|map)\b/gi,
  );
  const issues = [];

  issues.push(...specificIssues(entry.id, text));

  if (lines.length < 180) issues.push("fiche courte");
  if (routeHeadings < 3) issues.push("route trop peu decoupee");
  if (!hasAny(text, [/missable|manquable|ratable|fenetre/i])) issues.push("alertes missables absentes");
  if (!hasAny(text, [/checklist|verification/i])) issues.push("verification finale absente");
  if (expected > 0 && checklist !== expected) issues.push(`checklist ${checklist}/${expected}`);
  if (locationAnchors < 8) issues.push("reperes de lieux insuffisants");
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
console.log(`Fiches controlees : ${results.length}`);
console.log(`Fiches conformes au nouveau seuil : ${passed.length}`);
console.log(`Fiches a reecrire : ${needsRewrite.length}`);

for (const result of needsRewrite) {
  console.log(
    `- ${result.title}: ${result.issues.join(", ")} (${result.lines ?? 0} lignes, ${result.checklist ?? 0}/${result.expected ?? 0} cases finales)`,
  );
}

if (process.argv.includes("--strict") && needsRewrite.length > 0) {
  process.exitCode = 1;
}
