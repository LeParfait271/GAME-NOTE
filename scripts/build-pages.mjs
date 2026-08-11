import { access, mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const OUTPUT_DIR = join(ROOT, "dist", "client");
const OUTPUT_WRANGLER_CONFIG = join(ROOT, "dist", "server", "wrangler.json");
const VINEXT_CLI = join(ROOT, "node_modules", "vinext", "dist", "cli.js");

const result = await new Promise((resolveBuild, rejectBuild) => {
  const child = spawn(process.execPath, [VINEXT_CLI, "build"], {
    cwd: ROOT,
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", (chunk) => {
    process.stdout.write(chunk);
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    process.stderr.write(chunk);
    output += chunk.toString();
  });
  child.on("error", rejectBuild);
  child.on("close", (code, signal) => resolveBuild({ code, signal, output }));
});

let outputExists = true;
try {
  await access(join(OUTPUT_DIR, "index.html"));
} catch {
  outputExists = false;
}

const knownWindowsAssertion = /Assertion failed:[\s\S]*UV_HANDLE_CLOSING[\s\S]*async\.c, line 76/;
const toleratedPostBuildExit = process.platform === "win32"
  && outputExists
  && knownWindowsAssertion.test(result.output);

if (result.code !== 0 && !toleratedPostBuildExit) {
  process.exit(result.code ?? 1);
}
if (!outputExists) throw new Error("Le build Pages n'a pas produit dist/client/index.html.");

// Vinext's Cloudflare plugin must run for the build, but its generated Worker
// config is incompatible with this project's static Cloudflare Pages deploy.
// Cloudflare's v2 build flow already points .wrangler/deploy/config.json at
// this path, so replace the generated config with a valid Pages config rather
// than removing the file and breaking that redirect.
await mkdir(join(ROOT, "dist", "server"), { recursive: true });
await writeFile(
  OUTPUT_WRANGLER_CONFIG,
  `${JSON.stringify({ name: "game-note", pages_build_output_dir: OUTPUT_DIR }, null, 2)}\n`,
  "utf8",
);

await import("./prepare-pages-output.mjs");
await import("./validate-pages-output.mjs");
await import("./validate-site-guardrails.mjs");
