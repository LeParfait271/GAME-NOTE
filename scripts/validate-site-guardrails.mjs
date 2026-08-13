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
  "app/site-version.ts",
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
  ".githooks/pre-commit",
  "scripts/bump-site-version.mjs",
  "wrangler.toml",
  "docs/guide-catalog.json",
  "docs/site-publication.json",
  "docs/site-publication-workflow.md",
  "docs/guide-rebuild-queue.json",
  "docs/guide-research/expedition-33-evidence.md",
  "docs/guide-research/octopath-traveler-1-evidence.md",
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
const siteVersionSource = await readText("app/site-version.ts");
const reader = await readText("app/GuideReader.tsx");
const layout = await readText("app/layout.tsx");
const stylesheet = await readText("app/globals.css");
const serviceWorkerSource = await readText("public/service-worker.js");
const octopathGuide = await readText("public/guides/octopath-traveler-1.txt");
const octopathZeroDraftPath = "public/guides/octopath-traveler-0.txt";
const octopathZeroDraft = await exists(octopathZeroDraftPath)
  ? await readText(octopathZeroDraftPath)
  : "";
const headers = await readText("public/_headers");
const redirects = await readText("public/_redirects");
const robots = await readText("public/robots.txt");
const sitemap = await readText("public/sitemap.xml");
const nextConfig = await readText("next.config.ts");
const wrangler = await readText("wrangler.toml");
const packageJson = await readJson("package.json");
const manifest = await readJson("public/manifest.json");
const catalog = await readJson("docs/guide-catalog.json");
const publication = await readJson("docs/site-publication.json");
const guideQueue = await readJson("docs/guide-rebuild-queue.json");
const steamAudit = await readJson("docs/steam-audit.json");

const siteVersionMatch = siteVersionSource.match(
  /export const SITE_VERSION = "(\d+)\.(\d{2})";/,
);
const siteVersion = siteVersionMatch
  ? `${siteVersionMatch[1]}.${siteVersionMatch[2]}`
  : null;
if (!siteVersion) {
  fail("app/site-version.ts: format attendu X.YY absent.");
}
if (!page.includes("SITE_VERSION")) {
  fail("app/page.tsx: version du site absente du pied de page.");
}
if (packageJson?.scripts?.["version:bump"] !== "node scripts/bump-site-version.mjs") {
  fail("package.json: script version:bump absent ou incohérent.");
}
const siteVisibilityMatch = page.match(
  /const SITE_VISIBLE_GUIDE_IDS = new Set\(\[([\s\S]*?)\]\);/,
);
const siteVisibleIds = siteVisibilityMatch
  ? [...siteVisibilityMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
  : [];
if (JSON.stringify(siteVisibleIds) !== JSON.stringify(["expedition-33", "octopath"])) {
  fail("app/page.tsx: la publication temporaire doit rester limitée aux deux guides cibles.");
}

if (JSON.stringify(publication?.visibleGuideIds) !== JSON.stringify(["expedition-33", "octopath"]) ||
    JSON.stringify(publication?.visibleGuideFiles) !== JSON.stringify(["expedition-33.txt", "octopath-traveler-1.txt"])) {
  fail("docs/site-publication.json: liste temporaire incoherente.");
}
if (!reader.includes('"octopath"')) {
  fail("app/GuideReader.tsx: les marqueurs premium Octopath sont désactivés.");
}
for (const required of ["734/734", "152/152", "101/101", "381/381", "DOSSIER PREMIUM"]) {
  if (!octopathGuide.includes(required)) {
    fail(`public/guides/octopath-traveler-1.txt: registre Octopath incomplet (${required} absent).`);
  }
}
if (/sans spoiler/i.test(octopathGuide)) {
  fail("public/guides/octopath-traveler-1.txt: l'ancienne politique sans spoiler est encore annoncée.");
}
if (octopathZeroDraft) {
  const treasureAppendixEntries = [
    ...octopathZeroDraft.matchAll(/^(?:\[COFFRE\] \[ \]|\[COFFRE\] \[MANQUABLE\] \[ \]) #\d{3} —/gm),
  ];
  if (treasureAppendixEntries.length !== 454) {
    fail(
      `${octopathZeroDraftPath}: le registre numéroté doit contenir exactement 454 trésors (actuel : ${treasureAppendixEntries.length}).`,
    );
  }
  const finalSteamChecklist = octopathZeroDraft.split("CHECKLIST FINALE DES SUCCÈS STEAM")[1] ?? "";
  const finalSteamChecklistOnly = finalSteamChecklist.split("CONTRÔLE AVANT PUBLICATION")[0] ?? "";
  const steamChecks = [...finalSteamChecklistOnly.matchAll(/^- \[ \] .+$/gm)];
  if (steamChecks.length !== 37) {
    fail(
      `${octopathZeroDraftPath}: la checklist finale OT0 doit contenir exactement 37 succès (actuel : ${steamChecks.length}).`,
    );
  }
  const sideStoryHeading = "RÉCITS SECONDAIRES — ROUTE CHRONOLOGIQUE (57/57)";
  const characterSection = octopathZeroDraft.split("36 PERSONNAGES JOUABLES")[1]?.split(sideStoryHeading)[0] ?? "";
  const characterChecks = [...characterSection.matchAll(/^- \[ \] \d{2} .+$/gm)];
  if (characterChecks.length !== 36) {
    fail(
      `${octopathZeroDraftPath}: le registre des personnages doit contenir exactement 36 cases (actuel : ${characterChecks.length}).`,
    );
  }
  const sideStorySection = octopathZeroDraft.split(sideStoryHeading)[1]?.split("BESTOWER OF WEALTH")[0] ?? "";
  const sideStoryChecks = [...sideStorySection.matchAll(/^- \[ \] .+$/gm)];
  if (sideStoryChecks.length !== 57) {
    fail(
      `${octopathZeroDraftPath}: le registre des récits secondaires doit contenir exactement 57 cases (actuel : ${sideStoryChecks.length}).`,
    );
  }
  for (const requiredSideStory of ["An Encounter with H'aanit", "The Monster Arena", "Greatest Expectations", "Unnatural Tremors"]) {
    if (!sideStorySection.includes(requiredSideStory)) {
      fail(`${octopathZeroDraftPath}: récit secondaire requis absent (${requiredSideStory}).`);
    }
  }
  for (const requiredFragment of ["Theatropolis", "Waterpool Caves", "Cat of Graceful Bearing", "Path to Herminia's Manse", "Golden Palace"]) {
    if (!octopathZeroDraft.includes(requiredFragment)) {
      fail(`${octopathZeroDraftPath}: fragment de lettre ou emplacement de contrôle absent (${requiredFragment}).`);
    }
  }
  const blueChestHeading = "COFFRES BLEUS \u2014 DÉBLOCAGE ET RATTRAPAGE (44/44)";
  const blueChestSection = octopathZeroDraft.split(blueChestHeading)[1]?.split("OBJECTIF DE PARTIE")[0] ?? "";
  const blueChestChecks = [...blueChestSection.matchAll(/^- \[ \] \[COFFRE\] \[BLEU\] #\d{3} \u2014/gm)];
  if (blueChestChecks.length !== 44) {
    fail(
      octopathZeroDraftPath + ": la checklist des coffres bleus doit contenir exactement 44 cases (actuel : " + blueChestChecks.length + ").",
    );
  }
  const requiredBlueChestIds = [
    "#008", "#012", "#016", "#018", "#025", "#030", "#033", "#037",
    "#094", "#120", "#123", "#145", "#146", "#175", "#176", "#192",
    "#196", "#202", "#206", "#209", "#222", "#232", "#278", "#290",
    "#292", "#303", "#308", "#315", "#325", "#327", "#331", "#343",
    "#347", "#352", "#358", "#375", "#386", "#392", "#403", "#409",
    "#424", "#426", "#446", "#454",
  ];
  for (const requiredBlueChestId of requiredBlueChestIds) {
    if (!blueChestSection.includes(requiredBlueChestId + " \u2014")) {
      fail(octopathZeroDraftPath + ": coffre bleu requis absent (" + requiredBlueChestId + ").");
    }
  }
  const mapIndexHeading = "CARTES DE RATTRAPAGE \u2014 37 CARTES DE ZONE";
  const mapIndexSection = octopathZeroDraft.split(mapIndexHeading)[1]?.split("REGISTRE COMPLET DES 454 TRÉSORS")[0] ?? "";
  const mapLinks = [...mapIndexSection.matchAll(/^- \[CARTE\] .+https:\/\/octopathtraveler0\.com\/images\/maps\/.+\.png$/gm)];
  if (mapLinks.length !== 37) {
    fail(
      octopathZeroDraftPath + ": l'index cartographique OT0 doit contenir exactement 37 cartes (actuel : " + mapLinks.length + ").",
    );
  }
  if (!mapIndexSection.includes("https://game8.jp/octopathtraveler0/746437")) {
    fail(octopathZeroDraftPath + ": index étendu Game8 des cartes OT0 absent.");
  }
  const enrichedTreasureIds = [
    "#004", "#009", "#011", "#013", "#014", "#015", "#017", "#019",
    "#022", "#023", "#026", "#027", "#034", "#036", "#038", "#041",
    "#043", "#044", "#045", "#046", "#049", "#059", "#060", "#061",
    "#062", "#063", "#064", "#065", "#069", "#070", "#071", "#072",
    "#073", "#074", "#075", "#077", "#078", "#079", "#080", "#081",
    "#082", "#083", "#084", "#085", "#086", "#089", "#098", "#100",
    "#101", "#102", "#104", "#105", "#117", "#118", "#119", "#121",
    "#127", "#128", "#129", "#130", "#131", "#132",
  ];
  for (const enrichedTreasureId of enrichedTreasureIds) {
    const treasureLine = octopathZeroDraft
      .split(/\r?\n/)
      .find((line) => line.includes(`${enrichedTreasureId} —`));
    if (!treasureLine || treasureLine.includes("aucun repère additionnel")) {
      fail(
        `${octopathZeroDraftPath}: repère de coffre enrichi absent ou redevenu générique (${enrichedTreasureId}).`,
      );
    }
  }
  const bossDossierHeading = "FICHES BOSS — PRÉPARATION, FAIBLESSES ET MÉCANIQUES";
  if (!octopathZeroDraft.includes(bossDossierHeading)) {
    fail(octopathZeroDraftPath + ": dossier opérationnel des boss OT0 absent.");
  }
  for (const requiredBossEntry of [
    "B-01 — EMERALD DIREWOLF",
    "B-07 — LADY HERMINIA",
    "B-11 — COMMANDER TYTOS",
    "B-13 — AUGUSTE THE PLAYWRIGHT",
    "B-18 — KING PARDIS III",
    "B-30 — BESTOWER OF ALL",
    "B-31 — AELFRIC, OR'GALDERA ET AMATSUKAMI NO OROCHI",
  ]) {
    if (!octopathZeroDraft.includes(requiredBossEntry)) {
      fail(octopathZeroDraftPath + ": fiche boss requise absente (" + requiredBossEntry + ").");
    }
  }
  const bossRouteReferences = [...octopathZeroDraft.matchAll(/\(voir fiche B-\d{2}\)/g)];
  if (bossRouteReferences.length < 10) {
    fail(octopathZeroDraftPath + ": les combats de la route doivent renvoyer vers au moins 10 fiches boss.");
  }
}

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

const queueGroups = ["active", "queued", "excluded"];
for (const group of queueGroups) {
  if (!Array.isArray(guideQueue?.[group])) {
    fail("docs/guide-rebuild-queue.json: groupe absent ou invalide " + group + ".");
  }
}
const queueActive = Array.isArray(guideQueue?.active) ? guideQueue.active : [];
const queueQueued = Array.isArray(guideQueue?.queued) ? guideQueue.queued : [];
const queueExcluded = Array.isArray(guideQueue?.excluded) ? guideQueue.excluded : [];
unique(
  [...queueActive, ...queueQueued, ...queueExcluded].map((entry) => entry?.id),
  "docs/guide-rebuild-queue.json ids",
);
for (const entry of [...queueActive, ...queueQueued, ...queueExcluded]) {
  if (!entry?.id || typeof entry.id !== "string") {
    fail("docs/guide-rebuild-queue.json: entrée sans id.");
  }
}
for (const entry of queueActive) {
  const catalogEntry = catalogById.get(entry?.id);
  const siteId = entry?.siteId ?? entry?.id;
  if (!catalogEntry) fail("docs/guide-rebuild-queue.json: actif absent du catalogue " + entry?.id + ".");
  if (!(publication?.visibleGuideIds ?? []).includes(siteId)) {
    fail("docs/guide-rebuild-queue.json: actif absent de la publication " + siteId + ".");
  }
}
for (const entry of queueQueued) {
  const catalogEntry = catalogById.get(entry?.id);
  if (!catalogEntry) fail("docs/guide-rebuild-queue.json: queue absente du catalogue " + entry?.id + ".");
  if (catalogEntry?.scope === "excluded") {
    fail("docs/guide-rebuild-queue.json: entrée exclue présente dans queued " + entry?.id + ".");
  }
  if ((publication?.visibleGuideIds ?? []).includes(entry?.id)) {
    fail("docs/guide-rebuild-queue.json: entrée queued visible " + entry?.id + ".");
  }
  if (entry?.state === "research") {
    if (!entry?.evidenceFile || typeof entry.evidenceFile !== "string") {
      fail("docs/guide-rebuild-queue.json: entrée research sans evidenceFile " + entry?.id + ".");
    } else if (!(await exists(entry.evidenceFile))) {
      fail("docs/guide-rebuild-queue.json: matrice absente pour " + entry?.id + " (" + entry.evidenceFile + ").");
    }
  }
}
for (const entry of queueExcluded) {
  const catalogEntry = catalogById.get(entry?.id);
  if (!catalogEntry || catalogEntry.scope !== "excluded") {
    fail("docs/guide-rebuild-queue.json: exclusion incohérente " + entry?.id + ".");
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
  if (siteVersion) {
    let versionPublished = indexHtml.includes(`v${siteVersion}`) ||
      (indexHtml.includes("site-footer-version") && indexHtml.includes(siteVersion));
    if (!versionPublished) {
      const staticFiles = await walk("dist/client/_next/static");
      for (const file of staticFiles.filter((entry) => entry.endsWith(".js"))) {
        const staticSource = await readText(join("dist/client/_next/static", file));
        if (
          staticSource.includes("Game Note · guides personnels · v") &&
          staticSource.includes(siteVersion)
        ) {
          versionPublished = true;
          break;
        }
      }
    }
    if (!versionPublished) {
      fail("dist/client: version du site absente de la sortie hydratée.");
    }
  }
  const visibleCardCount = (indexHtml.match(/class="guide-card-open"/g) ?? []).length;
  if (visibleCardCount !== siteVisibleIds.length) {
    fail(
      "dist/client/index.html: " +
        visibleCardCount +
        " cartes visibles au lieu de " +
        siteVisibleIds.length +
        ".",
    );
  }
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
  const sourceGuideNames = publication?.visibleGuideFiles ?? [];
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
