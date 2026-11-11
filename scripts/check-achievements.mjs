// Vérifie que chaque succès Steam officiel (data/achievements/<jeu>.json)
// est placé dans la route de la soluce, avant la checklist finale.
// Usage : node scripts/check-achievements.mjs [jeu...]
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");
const dataDir = join(root, "data", "achievements");
const games = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(dataDir).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));

const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-").replace(/\s+/g, " ").toLowerCase();

let failed = false;
for (const game of games) {
  const data = JSON.parse(readFileSync(join(dataDir, `${game}.json`), "utf8"));
  const text = readFileSync(join(root, "public", "guides", `${game}.txt`), "utf8");
  // La route s'arrête à la checklist finale : un succès cité seulement là n'est pas placé.
  const cut = text.search(/^#+ .*CHECKLIST FINALE/im);
  const route = norm(cut > 0 ? text.slice(0, cut) : text);
  const missing = data.achievements.filter((a) => !route.includes(norm(a.name)));
  const placed = data.achievements.length - missing.length;
  console.log(`${game} : ${placed}/${data.achievements.length} succès placés dans la route`);
  for (const a of missing) console.log(`  MANQUANT  ${a.name} — ${a.desc}`);
  if (missing.length) failed = true;
}
process.exit(failed ? 1 : 0);
