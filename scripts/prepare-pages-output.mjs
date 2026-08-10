import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const GUIDE_DIR = join(ROOT, "public", "guides");
const OUTPUT_DIR = join(ROOT, "dist", "client");
const OUTPUT_SERVICE_WORKER = join(OUTPUT_DIR, "service-worker.js");

const guideNames = (await readdir(GUIDE_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".txt"))
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right));

if (guideNames.length === 0) throw new Error("Aucun guide TXT n'est disponible pour la sortie Pages.");

const guideUrls = guideNames.map((name) => `/guides/${name}`);
const indexHtml = await readFile(join(OUTPUT_DIR, "index.html"), "utf8");
const staticUrls = Array.from(
  indexHtml.matchAll(/(?:src|href)="(\/_next\/static\/[^"?#]+)"/g),
  (match) => match[1],
).filter((url, index, urls) => urls.indexOf(url) === index);
const source = await readFile(OUTPUT_SERVICE_WORKER, "utf8");
const hash = createHash("sha256").update(indexHtml).update(source);
for (const name of guideNames) hash.update(name).update("\0").update(await readFile(join(GUIDE_DIR, name)));
const fingerprint = hash.digest("hex").slice(0, 12);
const output = source
  .replace('const CACHE_NAME = "__GAME_NOTE_CACHE_NAME__";', `const CACHE_NAME = "game-note-${fingerprint}";`)
  .replace("const GUIDE_URLS = [];", `const GUIDE_URLS = ${JSON.stringify(guideUrls)};`)
  .replace("const STATIC_URLS = [];", `const STATIC_URLS = ${JSON.stringify(staticUrls)};`);
if (output === source) throw new Error("Le modèle du service worker n'a pas pu être préparé.");
await writeFile(OUTPUT_SERVICE_WORKER, output, "utf8");
console.log(`Sortie Pages préparée : ${guideNames.length} guides hors-ligne, cache ${fingerprint}.`);
