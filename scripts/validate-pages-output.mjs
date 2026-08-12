import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SOURCE_GUIDE_DIR = join(ROOT, "public", "guides");
const OUTPUT_DIR = join(ROOT, "dist", "client");
const fail = (message) => { throw new Error(`Validation Pages Game Note échouée : ${message}`); };
const filesIn = async (directory) => (await readdir(directory, { withFileTypes: true }))
  .filter((entry) => entry.isFile()).map((entry) => entry.name).sort((a, b) => a.localeCompare(b));

for (const file of ["index.html", "404.html", "favicon.svg", "manifest.json", "robots.txt", "sitemap.xml", "service-worker.js", "_headers", "_redirects"]) {
  try { await readFile(join(OUTPUT_DIR, file)); } catch { fail(`fichier absent dans dist/client : ${file}`); }
}

const sourceGuides = await filesIn(SOURCE_GUIDE_DIR);
const outputGuides = await filesIn(join(OUTPUT_DIR, "guides"));
if (!sourceGuides.length) fail("aucun guide TXT source");
if (JSON.stringify(sourceGuides) !== JSON.stringify(outputGuides)) fail("les guides TXT copiés ne correspondent pas aux sources");

const html = await readFile(join(OUTPUT_DIR, "index.html"), "utf8");
if (!html.includes("Game Note") || !html.includes("/_next/")) fail("shell Game Note absent de index.html");
const headers = await readFile(join(OUTPUT_DIR, "_headers"), "utf8");
for (const fragment of ["Content-Security-Policy:", "/guides/*", "Cache-Control: public, max-age=300, must-revalidate", "/_next/static/*", "immutable"]) {
  if (!headers.includes(fragment)) fail(`règle header absente : ${fragment}`);
}
const redirects = await readFile(join(OUTPUT_DIR, "_redirects"), "utf8");
if (!redirects.includes("/index.html / 301")) fail("redirection canonique absente");

const serviceWorker = await readFile(join(OUTPUT_DIR, "service-worker.js"), "utf8");
if (serviceWorker.includes("__GAME_NOTE_CACHE_NAME__")) fail("service worker non préparé");
const expectedBrandAssets = [
  "/images/logo/game-note-logo-ink-script-header.png",
  "/images/logo/game-note-symbol-route.png",
  "/images/icons/game-note-app-icon-192.png",
];
const expectedStaticUrls = [...new Set([
  ...Array.from(html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?#]+)"/g), (match) => match[1]),
  ...expectedBrandAssets,
])];
const staticUrlsMatch = serviceWorker.match(/const STATIC_URLS = (\[[\s\S]*?\]);/);
if (!staticUrlsMatch || JSON.stringify(JSON.parse(staticUrlsMatch[1])) !== JSON.stringify(expectedStaticUrls)) fail("assets statiques hors-ligne incomplets");
const guideUrlsMatch = serviceWorker.match(/const GUIDE_URLS = (\[[\s\S]*?\]);/);
const expectedGuideUrls = sourceGuides.map((name) => `/guides/${name}`);
if (!guideUrlsMatch || JSON.stringify(JSON.parse(guideUrlsMatch[1])) !== JSON.stringify(expectedGuideUrls)) fail("guides hors-ligne incomplets");
console.log(`Validation Pages Game Note OK : ${sourceGuides.length} guides, shell statique, SEO, cache et offline.`);
