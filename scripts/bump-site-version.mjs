import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VERSION_FILE = join(ROOT, "app", "site-version.ts");
const source = await readFile(VERSION_FILE, "utf8");
const match = source.match(/export const SITE_VERSION = "(\d+)\.(\d{2})";/);

if (!match) {
  throw new Error(
    "app/site-version.ts doit contenir SITE_VERSION au format X.YY.",
  );
}

const current = Number(match[1]) * 100 + Number(match[2]);
const next = current + 1;
const nextVersion = `${Math.floor(next / 100)}.${String(next % 100).padStart(2, "0")}`;
const updated = source.replace(match[0], `export const SITE_VERSION = "${nextVersion}";`);

if (updated === source) throw new Error("La version du site n'a pas changé.");

await writeFile(VERSION_FILE, updated, "utf8");
console.log(`Version Game Note : ${match[1]}.${match[2]} -> ${nextVersion}`);
