import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (file) => readFile(join(ROOT, file), "utf8");
const exists = async (file) => {
  try {
    await stat(join(ROOT, file));
    return true;
  } catch {
    return false;
  }
};
const parseArray = (text, name) => {
  const match = text.match(new RegExp("const " + name + " = (\\[[\\s\\S]*?\\]);"));
  return match ? JSON.parse(match[1]) : [];
};
const outputPath = (url) => String(url).replace(/^\/+/, "") || "index.html";
const stripHtml = (value) =>
  value
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const index = await read("dist/client/index.html");
const pageSource = await read("app/page.tsx");
const readerSource = await read("app/GuideReader.tsx");
const readerStylesheet = await read("app/guide-reader-layout.css");
const readerGlobalStylesheet = await read("app/globals.css");
const terminalStyles = await read("app/terminal-pass-four.css");
const packageJson = JSON.parse(await read("package.json"));
const localPreview = await read("APERCU_LOCAL.cmd");
const serviceWorker = await read("dist/client/service-worker.js");
const headers = await read("dist/client/_headers");
const redirects = await read("dist/client/_redirects");
const manifest = JSON.parse(await read("dist/client/manifest.json"));
const socialCard = await stat(join(ROOT, "dist", "client", "og.png"));

test("le shell statique conserve les repères accessibles", () => {
  assert.match(index, /<html lang="fr"/);
  assert.match(index, /class="skip-link"/);
  assert.match(index, /application\/ld\+json/);
  assert.match(index, /class="guide-card-open"/);
  assert.match(pageSource, /localeCompare\(right\.title, "fr", \{ sensitivity: "base" \}\)/);
  assert.match(pageSource, /className="library-reset"/);
  assert.match(pageSource, /visibleGuides\.findIndex/);
  assert.match(pageSource, /className="catalog-index"/);
  assert.match(pageSource, /searchParams\.set\("letter", catalogLetter\)/);
  assert.match(pageSource, /const effectiveCatalogLimit = catalogLimit/);
  assert.match(pageSource, /const heroGuides = siteGuides;/);
  assert.match(pageSource, /disabled={!availableCatalogLetters\.has\(letter\)}/);
  assert.match(pageSource, /steam\/apps\/\$\{appId\}\/capsule_616x353\.jpg/);
  assert.match(pageSource, /dataset\.fallbackApplied/);
  assert.match(readerSource, /steam\/apps\/\$\{appId\}\/capsule_616x353\.jpg/);
  assert.match(readerSource, /dataset\.fallbackApplied/);
  assert.match(readerSource, /className="reader-neighbors"/);
  assert.match(readerSource, /reader-outline-toggle/);
  assert.match(readerSource, /className="guide-step"/);
  assert.match(readerSource, /kind: "heading" \| "subheading" \| "step"/);
  assert.match(readerSource, /type GuideTableData =/);
  assert.match(readerSource, /const parseGuideTableRow =/);
  assert.match(readerSource, /className="guide-table-wrap"/);
  assert.match(readerSource, /data-label=\{header\}/);
  assert.match(readerSource, /const splitRouteSequences =/);
  assert.match(readerSource, /className="guide-route-sequence-list"/);
  assert.match(readerSource, /className=\{`guide-sequence-card/);
  assert.match(readerSource, /numberedHeading && !numberedSection/);
  assert.match(readerSource, /isCompactSequence/);
  assert.match(readerSource, /className="guide-sequence-card-meta"/);
  assert.match(readerSource, /import "\.\/guide-reader-layout\.css"/);
  assert.match(readerStylesheet, /\.guide-sequence-card\.is-current/);
  assert.match(readerStylesheet, /\.guide-sequence-card\.guide-sequence-card\.is-compact/);
  assert.match(readerStylesheet, /\.reader-cover\.reader-cover/);
  assert.match(readerStylesheet, /aspect-ratio: 16 \/ 9/);
  assert.match(readerStylesheet, /\.reader-cover\.reader-cover \.reader-cover-art/);
  assert.match(readerStylesheet, /\.reader-cover\.reader-cover \.reader-cover-alert/);
  assert.match(readerStylesheet, /\.guide-sequence-card\.guide-sequence-card \.guide-sequence-card-meta/);
  assert.match(readerStylesheet, /\.guide-sequence-card\.guide-sequence-card \.guide-bullet/);
  assert.match(readerStylesheet, /\.guide-prelude-panel > summary/);
  assert.match(readerStylesheet, /\.guide-reference-panel > summary/);
  assert.match(readerStylesheet, /\.guide-search-results > \.guide-paragraph/);
  assert.match(readerStylesheet, /top: 112px/);
  assert.match(readerStylesheet, /grid-template-columns: minmax\(0, 1fr\) minmax\(0, 1fr\)/);
  assert.match(readerStylesheet, /padding-inline: 10px/);
  assert.match(readerStylesheet, /text-wrap: pretty/);
  assert.match(readerGlobalStylesheet, /Garde-fou mobile : aucun bloc de route ne doit depasser la largeur utile\./);
  assert.match(readerGlobalStylesheet, /\.site-shell\.is-reader-mode \.guide-lane-content/);
  assert.match(readerGlobalStylesheet, /\.site-shell\.is-reader-mode \.guide-step-copy/);
  assert.match(readerGlobalStylesheet, /overflow-wrap: anywhere/);
  assert.match(readerStylesheet, /position: static;\s+order: [12];/);
  assert.match(terminalStyles, /@media screen and \(min-width: 1440px\)/);
  assert.match(terminalStyles, /transform: translateX\(-50%\);/);
  assert.match(terminalStyles, /width: min\(38vw, 430px\)/);
  assert.match(terminalStyles, /font-size: clamp\(4\.4rem, 5\.5vw, 6\.6rem\)/);
  assert.match(terminalStyles, /left: 52%;/);
  assert.match(terminalStyles, /overflow-x: visible;/);
  assert.match(terminalStyles, /flex: 1 1 100%;/);
  assert.match(terminalStyles, /@media screen and \(min-width: 681px\) and \(max-width: 980px\)/);
  assert.match(terminalStyles, /grid-template-columns: minmax\(0, 1fr\) minmax\(220px, 0\.78fr\);/);
  assert.match(terminalStyles, /grid-template-rows: auto auto;/);
  assert.match(terminalStyles, /@media screen and \(max-width: 340px\)/);
  assert.match(terminalStyles, /html,\s*body\s*\{\s*min-width: 0;/);
  assert.match(readerSource, /type GuideHeadingRole =/);
  assert.match(readerSource, /const getGuideHeadingRole =/);
  assert.match(readerSource, /const routeOutlineGroups = useMemo/);
  assert.match(readerSource, /const referenceOutlineGroups = useMemo/);
  assert.match(readerSource, /className="reader-outline-category"/);
  assert.match(readerSource, /guide-heading-row-\$\{headingRole\}/);
  assert.match(readerSource, /const headingLevel = markdownHeading\[1\]\.length/);
  assert.match(readerSource, /const visibleBlocks = blocks\.filter/);
  assert.match(readerSource, /type GuideOutlineGroup =/);
  assert.match(readerSource, /const buildGuideOutlineGroups =/);
  assert.match(readerSource, /className="reader-outline-major"/);
  assert.match(readerSource, /className="reader-outline-details"/);
  assert.match(readerSource, /activeRouteId/);
  assert.match(readerSource, /activeOutlineId/);
  assert.match(readerSource, /className="reader-current-route"/);
  assert.match(readerSource, /guide-heading-meta/);
  assert.match(readerSource, /aria-current=\{item\.id === activeOutlineId/);
  assert.match(readerSource, /const isOpen = event\.currentTarget\.open;/);
  assert.match(readerSource, /\[group\.id\]: isOpen,/);
  assert.doesNotMatch(
    readerSource,
    /setOutlineGroupsOpen\(\(current\) => \(\{[\s\S]{0,400}event\.currentTarget\.open/,
  );
  assert.doesNotMatch(readerSource, /outline\.map\(/);
  assert.match(readerSource, /position A–Z/);
  assert.match(readerSource, /game-note-reading-/);
  assert.match(readerSource, /className="reader-resume"/);
  assert.doesNotMatch(index, /favorite-toggle|Afficher les guides favoris|Favoris \(/i);
  assert.doesNotMatch(index, /hero-feature|route-console|method-section|mobile-bottom-nav/);
  assert.equal(packageJson.scripts["preview:local"], "vinext dev --host 127.0.0.1 --port 3000");
  assert.match(localPreview, /http:\/\/localhost:3000\//);
  assert.match(index, /aria-keyshortcuts="Control\+K Meta\+K"/);
  assert.match(readerSource, /aria-keyshortcuts="\/"/);
  assert.doesNotMatch(index, /\uFFFD/);
});

test("les cartes et les boutons ont un contenu utilisable", () => {
  const cards = [...index.matchAll(/<article class="guide-card\b/g)];
  assert.ok(cards.length > 0, "aucune carte de guide rendue");
  const buttons = [...index.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
  assert.ok(buttons.length >= cards.length, "actions de cartes absentes");
  for (const [, attributes, body] of buttons) {
    const named =
      /\baria-label\s*=\s*["'][^"']+["']/i.test(attributes) ||
      /\btitle\s*=\s*["'][^"']+["']/i.test(attributes) ||
      stripHtml(body).length > 0;
    assert.equal(named, true, "bouton sans nom accessible");
  }
});

test("le retour d une fiche reactive la bibliotheque", () => {
  assert.match(pageSource, /const library = libraryRef\.current;/);
  assert.match(pageSource, /observer\.observe\(library\);/);
  assert.match(pageSource, /library\.classList\.add\("is-in-view"\)/);
  assert.match(pageSource, /\}, \[readerMode\]\);/);
});

test("les champs de recherche ont un label", () => {
  const inputs = [...index.matchAll(/<input\b[^>]*\bid="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.ok(inputs.length >= 1);
  for (const id of inputs) {
    assert.match(index, new RegExp('<label\\b[^>]*\\bfor="' + id + '"', "i"));
  }
  assert.match(readerSource, /<label htmlFor="guide-search">/);
});

test("le service worker ne précache que des fichiers présents", async () => {
  assert.match(serviceWorker, /^const CACHE_NAME = "game-note-[a-f0-9]{12}";/m);
  assert.doesNotMatch(serviceWorker, /__GAME_NOTE_CACHE_NAME__/);
  for (const url of [
    ...parseArray(serviceWorker, "GUIDE_URLS"),
    ...parseArray(serviceWorker, "STATIC_URLS"),
  ]) {
    assert.equal(
      await exists(join("dist", "client", outputPath(url))),
      true,
      "URL précachée absente: " + url,
    );
  }
  assert.match(serviceWorker, /SKIP_WAITING/);
  assert.match(serviceWorker, /cacheFirst/);
  assert.match(serviceWorker, /networkFirst/);
  assert.doesNotMatch(serviceWorker, /console\.(?:log|warn|error)\s*\(/);
});

test("la surface Cloudflare reste protégée", () => {
  assert.match(headers, /Content-Security-Policy:/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /Cross-Origin-Opener-Policy: same-origin/);
  assert.doesNotMatch(headers, /unsafe-eval/);
  assert.match(redirects, /\/index\.html \/\s*301/);
  assert.equal(manifest.display, "standalone");
  assert.equal(
    manifest.shortcuts.some((shortcut) => /favori/i.test(JSON.stringify(shortcut))),
    false,
    "raccourci favoris obsolète",
  );
});

test("la carte sociale suit l’identité du site", () => {
  assert.match(index, /og\.png/);
  assert.ok(socialCard.size > 1000, "carte sociale absente ou vide");
});
