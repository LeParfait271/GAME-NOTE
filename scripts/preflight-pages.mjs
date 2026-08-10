import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;
const strictCatalog = process.argv.includes("--strict-catalog");
const checks = [
  ["guides strict", "scripts/validate-guides.mjs", "--strict"],
  ["site guardrails", "scripts/validate-site-guardrails.mjs"],
  ["Pages output", "scripts/validate-pages-output.mjs"],
];

for (const [label, script, ...args] of checks) {
  console.log("\n> " + label);
  const checkArgs =
    strictCatalog && script === "scripts/validate-site-guardrails.mjs"
      ? [...args, "--strict-catalog"]
      : args;
  const result = spawnSync(node, [script, ...checkArgs], {
    cwd: ROOT,
    stdio: "inherit",
    shell: false,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\nPréflight Game Note OK.");
