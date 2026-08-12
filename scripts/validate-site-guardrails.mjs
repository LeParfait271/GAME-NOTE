import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const errors = [];
const notices = [];
const strictCatalog = process.argv.includes("--strict-catalog");

const fail = (message) => errors.push(message);
const notice = (message) => notices.push(message);
const pathFromRoot = (file) => join(ROOT, file);

async function exists(file) {
  try {
    await stat(pathFromRoot(file));
    return true;
  } catch {
    return false;
  }
}

async function readText(file) {
  try {
    return await readFile(pathFromRoot(file), "utf8");
  } catch {
    fail(file + ": fichier absent ou illisible.");
    return "";
  }
}

async function readJson(file) {
  const text = await readText(file);
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    fail(file + ": JSON invalide.");
    return null;
  }
}

async function filesIn(directory) {
  try {
    return (await readdir(pathFromRoot(directory), { withFileTypes: true }))
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right));
  } catch {
    return [];
  }
}

async function walk(directory) {
  const root = pathFromRoot(directory);
  const output = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const absolute = join(current, entry.name);
      if (entry.isDirectory()) {
        await visit(absolute);
      } else {
        output.push(relative(root, absolute).replace(/\\/g, "/"));
      }
    }
  }
  if (await exists(directory)) await visit(root);
  return output.sort();
}

function unique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) fail(label + ": doublon " + value + ".");
    seen.add(value);
  }
  return seen;
}

function parseArrayConstant(text, name) {
  const match = text.match(new RegExp("const " + name + " = (\\[[\\s\\S]*?\\]);"));
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    fail("service-worker.js: " + name + " n'est pas un tableau JSON valide.");
    return null;
  }
}

function outputPath(url) {
  const clean = String(url).replace(/^\/+/, "");
  return clean || "index.html";
}

function htmlText(value) {
  return value
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&(?:times|#215);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const requiredSourceFiles = [
  "A_LIRE_EN_PREMIER.md",
  "GAME_NOTE_RULES.md",
  "app/page.tsx",
  "app/GuideReader.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "app/pwa-register.tsx",
  "next.config.ts",
  "package.json",
  "public/_headers",
  "public/_redirects",
  "public/manifest.json",
  "public/robots.txt",
  "public/service-worker.js",
  "public/sitemap.xml",
  "wrangler.toml",
  "docs/guide-catalog.json",
  "docs/site-guardrails.md",
  "docs/steam-audit.json",
  "scripts/preflight-pages.mjs",
  "scripts/validate-site-guardrails.mjs",
  "tests/site-smoke.test.mjs",
];

for (const file of requiredSourceFiles) {
  if (!(await exists(file))) fail(file + ": fichier source requis absent.");
}

const page = await readText("app/page.tsx");
const reader = await readText("app/GuideReader.tsx");
const layout = await readText("app/layout.tsx");
const stylesheet = await readText("app/globals.css");
const serviceWorkerSource = await readText("public/service-worker.js");
const headers = await readText("public/_headers");
const redirects = await readText("public/_redirects");
const robots = await readText("public/robots.txt");
const sitemap = await readText("public/sitemap.xml");
const nextConfig = await readText("next.config.ts");
const wrangler = await readText("wrangler.toml");
const packageJson = await readJson("package.json");
const manifest = await readJson("public/manifest.json");
const catalog = await readJson("docs/guide-catalog.json");
const steamAudit = await readJson("docs/steam-audit.json");

const guideBlockMatch = page.match(
  /const guides\s*:\s*Guide\[\]\s*=\s*\[([\s\S]*?)\n\];/,
);
if (!guideBlockMatch) {
  fail("app/page.tsx: tableau guides introuvable ou mal fermé.");
}

const guideBlock = guideBlockMatch?.[1] ?? "";
const pageIds = [...guideBlock.matchAll(/\bid:\s*"([^"]+)"/g)].map(
  (match) => match[1],
);
const pageFiles = [...guideBlock.matchAll(/\bfile:\s*"([^"]+)"/g)].map(
  (match) => match[1],
);
if (pageIds.length !== pageFiles.length) {
  fail(
    "app/page.tsx: chaque carte doit avoir exactement un id et un fichier TXT.",
  );
}
unique(pageIds, "app/page.tsx ids");
unique(pageFiles, "app/page.tsx fichiers");
if (page.length !== 0 && (page.match(/const guides\s*:/g) ?? []).length !== 1) {
  fail("app/page.tsx: plusieurs tableaux guides détectés.");
}
if ((reader.match(/className="reader-cover"/g) ?? []).length !== 1 ||
    (reader.match(/className="reader-layout"/g) ?? []).length !== 1) {
  fail("app/GuideReader.tsx: fiche premium ou mise en page du lecteur absente ou dupliquée.");
}
if ((page.match(/export default function Home/g) ?? []).length !== 1) {
  fail("app/page.tsx: export Home absent ou dupliqué.");
}

const catalogEntries = Array.isArray(catalog?.entries) ? catalog.entries : [];
const auditEntries = Array.isArray(steamAudit?.games) ? steamAudit.games : [];
const guideFilename = (file) =>
  String(file ?? "")
    .replace(/^public\/guides\//, "")
    .trim();
const catalogById = new Map();
const catalogByFile = new Map();
const auditById = new Map();
for (const entry of catalogEntries) {
  if (!entry?.id) {
    fail("docs/guide-catalog.json: entrée sans id.");
  } else if (catalogById.has(entry.id)) {
    fail("docs/guide-catalog.json: id dupliqué " + entry.id + ".");
  } else {
    catalogById.set(entry.id, entry);
  }
  const file = guideFilename(entry?.file);
  if (file) {
    if (catalogByFile.has(file)) {
      fail("docs/guide-catalog.json: fichier dupliqué " + file + ".");
    } else {
      catalogByFile.set(file, entry);
    }
  }
}
for (const entry of auditEntries) {
  if (!entry?.id) {
    fail("docs/steam-audit.json: entrée sans id.");
  } else if (auditById.has(entry.id)) {
    fail("docs/steam-audit.json: id dupliqué " + entry.id + ".");
  } else {
    auditById.set(entry.id, entry);
  }
}

const catalogGuideEntries = catalogEntries.filter(
  (entry) => entry?.scope === "full-guide" || entry?.scope === "special",
);
const pendingCards = [];
const pageCatalogIdSet = new Set();

for (let index = 0; index < pageIds.length; index += 1) {
  const id = pageIds[index];
  const file = pageFiles[index];
  const entry = catalogById.get(id) ?? catalogByFile.get(file);
  if (!entry) {
    fail(
      "app/page.tsx: carte absente du catalogue " + id + " (" + file + ").",
    );
    continue;
  }
  pageCatalogIdSet.add(entry.id);
  const expectedFile = guideFilename(entry.file);
  if (!expectedFile || expectedFile !== file) {
    fail(
      "app/page.tsx: fichier incohérent pour " +
        id +
        " (" +
        file +
        " au lieu de " +
        expectedFile +
        ").",
    );
  }
  if (!auditById.has(entry.id)) {
    fail("docs/steam-audit.json: audit absent pour " + entry.id + ".");
  }
  if (!(await exists(join("public", "guides", file)))) {
    fail("public/guides/" + file + ": TXT absent pour " + entry.id + ".");
  }
}

for (const entry of catalogGuideEntries) {
  const id = entry.id;
  const file = guideFilename(entry.file);
  if (!file) {
    fail("docs/guide-catalog.json: fichier absent pour " + id + ".");
    continue;
  }
  if (!auditById.has(id)) {
    fail("docs/steam-audit.json: audit absent pour " + id + ".");
  }
  if (!(await exists(join("public", "guides", file)))) {
    fail("public/guides/" + file + ": TXT absent pour " + id + ".");
    continue;
  }
  const text = await readText(join("public", "guides", file));
  if (text.trim().length < 200) {
    fail("public/guides/" + file + ": guide vide ou trop court.");
  }
  if (text.includes("\uFFFD")) {
    fail("public/guides/" + file + ": caractère UTF-8 corrompu.");
  }
  if (!pageCatalogIdSet.has(id)) {
    pendingCards.push(id);
  }
}

if (pendingCards.length > 0) {
  notice(
    "Cartes en attente de raccordement : " +
      pendingCards.join(", ") +
      ".",
  );
  if (strictCatalog) {
    fail(
      "Catalogue strict : " +
        pendingCards.length +
        " entrée(s) active(s) ou spéciale(s) sans carte.",
    );
  }
}

const sourceTextChecks = [
  ["app/page.tsx", page],
  ["app/layout.tsx", layout],
  ["app/globals.css", stylesheet],
  ["public/service-worker.js", serviceWorkerSource],
  ["public/_headers", headers],
  ["public/_redirects", redirects],
];
for (const [file, text] of sourceTextChecks) {
  if (text.includes("\uFFFD")) fail(file + ": caractère UTF-8 corrompu.");
}

if (!layout.includes('<html lang="fr"')) {
  fail("app/layout.tsx: lang=fr absent.");
}
for (const fragment of [
  "skip-link",
  "aria-keyshortcuts",
  "application/ld+json",
  "guide-card-open",
  "normalizeCatalogText",
]) {
  if (!page.includes(fragment)) fail("app/page.tsx: garde-fou UI absent (" + fragment + ").");
}
if (!nextConfig.includes('output: "export"')) {
  fail("next.config.ts: export statique absent.");
}
if (!wrangler.includes('pages_build_output_dir = "dist/client"')) {
  fail("wrangler.toml: sortie Pages incohérente.");
}
for (const scriptName of [
  "build",
  "lint",
  "validate:guides:strict",
  "validate:pages",
  "preflight",
]) {
  if (!packageJson?.scripts?.[scriptName]) {
    fail("package.json: script " + scriptName + " absent.");
  }
}

for (const fragment of [
  "Content-Security-Policy:",
  "frame-ancestors 'none'",
  "X-Frame-Options: DENY",
  "X-Content-Type-Options: nosniff",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy:",
  "Cross-Origin-Opener-Policy: same-origin",
  "/service-worker.js",
  "/_next/static/*",
  "immutable",
  "/guides/*",
  "max-age=300",
]) {
  if (!headers.includes(fragment)) {
    fail("public/_headers: règle absente (" + fragment + ").");
  }
}
if (headers.includes("unsafe-eval")) {
  fail("public/_headers: unsafe-eval interdit dans la CSP.");
}
if (!redirects.split(/\r?\n/).some((line) => line.trim() === "/index.html / 301")) {
  fail("public/_redirects: redirection /index.html absente.");
}
for (const fragment of [
  "install",
  "activate",
  "SKIP_WAITING",
  "cacheFirst",
  "networkFirst",
]) {
  if (!serviceWorkerSource.includes(fragment)) {
    fail("public/service-worker.js: stratégie absente (" + fragment + ").");
  }
}
if (/\bconsole\.(?:log|warn|error)\s*\(/.test(serviceWorkerSource)) {
  fail("public/service-worker.js: log runtime interdit.");
}
if (
  manifest?.name !== "Game Note" ||
  manifest?.display !== "standalone" ||
  !String(manifest?.start_url ?? "").startsWith("/")
) {
  fail("public/manifest.json: identité PWA incohérente.");
}
if (
  !Array.isArray(manifest?.icons) ||
  !manifest.icons.some(
    (icon) => icon.src === "/favicon.svg" || icon.src === "favicon.svg",
  )
) {
  fail("public/manifest.json: icône favicon absente.");
}
if (!robots.includes("Sitemap: https://game-note.pages.dev/sitemap.xml")) {
  fail("public/robots.txt: sitemap canonique absente.");
}
if (!sitemap.includes("<loc>https://game-note.pages.dev/</loc>")) {
  fail("public/sitemap.xml: URL canonique absente.");
}

const distRequired = [
  "index.html",
  "404.html",
  "favicon.svg",
  "manifest.json",
  "robots.txt",
  "sitemap.xml",
  "service-worker.js",
  "_headers",
  "_redirects",
];
for (const file of distRequired) {
  if (!(await exists(join("dist", "client", file)))) {
    fail("dist/client/" + file + ": sortie obligatoire absente.");
  }
}

if (await exists("dist/client/index.html")) {
  const indexHtml = await readText("dist/client/index.html");
  const outputWorker = await readText("dist/client/service-worker.js");
  const outputHeaders = await readText("dist/client/_headers");
  const outputRedirects = await readText("dist/client/_redirects");
  if (indexHtml.includes("\uFFFD")) fail("dist/client/index.html: UTF-8 corrompu.");
  for (const fragment of [
    '<html lang="fr"',
    'id="main-content"',
    'class="skip-link"',
    "application/ld+json",
    'rel="manifest"',
    'rel="canonical"',
    'class="guide-card-open"',
  ]) {
    if (!indexHtml.includes(fragment)) {
      fail("dist/client/index.html: fragment absent (" + fragment + ").");
    }
  }
  if (outputWorker.includes("__GAME_NOTE_CACHE_NAME__")) {
    fail("dist/client/service-worker.js: cache non fingerprinté.");
  }
  if (!/^const CACHE_NAME = "game-note-[a-f0-9]{12}";/m.test(outputWorker)) {
    fail("dist/client/service-worker.js: empreinte de cache invalide.");
  }
  const cachedGuides = parseArrayConstant(outputWorker, "GUIDE_URLS") ?? [];
  const cachedAssets = parseArrayConstant(outputWorker, "STATIC_URLS") ?? [];
  for (const url of [...cachedGuides, ...cachedAssets]) {
    if (!(await exists(join("dist", "client", outputPath(url))))) {
      fail("dist/client/service-worker.js: URL précachée absente (" + url + ").");
    }
  }
  const outputGuideNames = await filesIn("dist/client/guides");
  const sourceGuideNames = await filesIn("public/guides");
  if (JSON.stringify(outputGuideNames) !== JSON.stringify(sourceGuideNames)) {
    fail("dist/client/guides: parité TXT source/sortie rompue.");
  }
  const scripts = [
    ...indexHtml.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g),
  ].map((match) => match[1]);
  for (const src of scripts) {
    if (!src.startsWith("/_next/")) {
      fail("dist/client/index.html: script externe ou non versionné (" + src + ").");
    }
  }
  const buttons = [
    ...indexHtml.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g),
  ];
  for (const [, attributes, body] of buttons) {
    const hasName =
      /\baria-label\s*=\s*["'][^"']+["']/i.test(attributes) ||
      /\btitle\s*=\s*["'][^"']+["']/i.test(attributes) ||
      htmlText(body).length > 0;
    if (!hasName) fail("dist/client/index.html: bouton sans nom accessible.");
  }
  for (const match of indexHtml.matchAll(/<input\b[^>]*\bid="([^"]+)"/g)) {
    const id = match[1];
    if (
      !new RegExp('<label\\b[^>]*\\bfor="' + id + '"', "i").test(indexHtml)
    ) {
      fail("dist/client/index.html: champ sans label (" + match[1] + ").");
    }
  }
  if (!outputHeaders.includes("Content-Security-Policy:")) {
    fail("dist/client/_headers: CSP absente.");
  }
  if (!outputRedirects.includes("/index.html / 301")) {
    fail("dist/client/_redirects: redirection canonique absente.");
  }

  const outputFiles = await walk("dist/client");
  const forbiddenOutput = outputFiles.filter((file) =>
    /^(?:\.git|node_modules|scripts|tests|docs|\.env)/i.test(file),
  );
  for (const file of forbiddenOutput) {
    fail("dist/client: fichier de développement publié (" + file + ").");
  }
  for (const file of [
    "index.html",
    "manifest.json",
    "robots.txt",
    "sitemap.xml",
    "service-worker.js",
    "_headers",
    "_redirects",
  ]) {
    const text = await readText(join("dist", "client", file));
    if (text.includes("\uFFFD")) fail("dist/client/" + file + ": UTF-8 corrompu.");
  }

  const budgetChecks = [
    ["index.html", 180 * 1024],
    ["service-worker.js", 32 * 1024],
  ];
  for (const [file, limit] of budgetChecks) {
    const size = (await stat(pathFromRoot(join("dist", "client", file)))).size;
    if (size > limit) {
      fail(
        "dist/client/" +
          file +
          ": poids " +
          size +
          " > budget " +
          limit +
          " octets.",
      );
    }
  }
  const staticFiles = await walk("dist/client/_next/static");
  let jsBytes = 0;
  let cssBytes = 0;
  for (const file of staticFiles) {
    const size = (
      await stat(
        pathFromRoot(join("dist", "client", "_next", "static", file)),
      )
    ).size;
    if (file.endsWith(".js")) jsBytes += size;
    if (file.endsWith(".css")) cssBytes += size;
  }
  if (jsBytes > 700 * 1024) fail("_next/static JS: budget dépassé.");
  if (cssBytes > 180 * 1024) fail("_next/static CSS: budget dépassé.");
}

if (notices.length > 0) {
  for (const message of notices) console.log("NOTICE: " + message);
}
if (errors.length > 0) {
  console.error("Garde-fous Game Note en échec :");
  for (const message of errors) console.error("- " + message);
  process.exitCode = 1;
} else {
  console.log(
    "Garde-fous Game Note OK : " +
      pageIds.length +
      " cartes, " +
      catalogGuideEntries.length +
      " entrées guides, sortie Pages contrôlée.",
  );
}
