#!/usr/bin/env node
/**
 * module-check CLI（§3.2：可獨立執行；需 tsc 的檢查一律在宿主或市集影子 tsc 跑）。
 *
 * 用法：
 *   node bin/module-check.mjs <模組資料夾> [--host-version 0.388] [--json]
 *
 * 退出碼：0＝通過（可含 warning）；1＝有 error。
 */

import { checkModule } from "../src/check.mjs";
import { HOST_SURFACE_SNAPSHOT } from "../src/constants.mjs";

const args = process.argv.slice(2);
const json = args.includes("--json");
let hostVersion = HOST_SURFACE_SNAPSHOT;
let target = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--host-version") {
    hostVersion = args[i + 1] ?? hostVersion;
    i++;
  } else if (!args[i].startsWith("--") && !target) {
    target = args[i];
  }
}

if (!target) {
  console.error("[module-check] 用法：node bin/module-check.mjs <模組資料夾> [--host-version x.y] [--json]");
  process.exit(1);
}

const result = checkModule(target, { hostVersion });

if (json) {
  process.stdout.write(`${JSON.stringify({ ...result, hostVersion }, null, 2)}\n`);
  process.exit(result.ok ? 0 : 1);
}

const out = (line) => process.stdout.write(`${line}\n`);
out(`[module-check] 模組：${target}（契約比對宿主 ${hostVersion}，SDK 快照 ${HOST_SURFACE_SNAPSHOT}）`);
for (const message of result.errors) console.error(`[module-check] 錯誤：${message}`);
for (const message of result.warnings) console.warn(`[module-check] 警示：${message}`);
out(
  `[module-check] ${result.ok ? "通過" : "未通過"}——錯誤 ${result.errors.length} 項、警示 ${result.warnings.length} 項、體積 ${Math.round(result.sizeBytes / 1024)}KB`
);
process.exit(result.ok ? 0 : 1);
