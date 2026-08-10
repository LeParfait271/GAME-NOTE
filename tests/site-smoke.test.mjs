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
const serviceWorker = await read("dist/client/service-worker.js");
const headers = await read("dist/client/_headers");
const redirects = await read("dist/client/_redirects");
const manifest = JSON.parse(await read("dist/client/manifest.json"));

test("le shell statique conserve les repères accessibles", () => {
  assert.match(index, /<html lang="fr"/);
  assert.match(index, /class="skip-link"/);
  assert.match(index, /application\/ld\+json/);
  assert.match(index, /class="mobile-bottom-nav"/);
  assert.match(index, /aria-keyshortcuts="Control\+K Meta\+K"/);
  assert.match(index, /aria-keyshortcuts="\/"/);
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

test("les champs de recherche ont un label", () => {
  const inputs = [...index.matchAll(/<input\b[^>]*\bid="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.ok(inputs.length >= 2);
  for (const id of inputs) {
    assert.match(index, new RegExp('<label\\b[^>]*\\bfor="' + id + '"', "i"));
  }
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
});
