#!/usr/bin/env node
/**
 * 影子 tsc【E14】：以型別快照＋paths 別名對模組原始碼跑 tsc --noEmit。
 * 需要環境有 tsc（PATH 的 tsc，或 TSC_PATH 環境變數／--tsc <path>）。
 * 宿主端 `npm run lint` 仍是最終判定；本工具目的是讓市集/投稿端提前攔型別錯誤。
 *
 * 用法：node bin/module-shadow-tsc.mjs <模組資料夾> [--tsc <tsc路徑>]
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SDK_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
let tscCmd = process.env.TSC_PATH || "tsc";
let target = "";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--tsc") {
    tscCmd = args[i + 1] ?? tscCmd;
    i++;
  } else if (!args[i].startsWith("--") && !target) {
    target = args[i];
  }
}
if (!target) {
  console.error("[shadow-tsc] 用法：node bin/module-shadow-tsc.mjs <模組資料夾> [--tsc <tsc路徑>]");
  process.exit(1);
}
const moduleDir = path.resolve(target);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "module-shadow-"));
const tsconfigPath = path.join(tmp, "tsconfig.json");
fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(
    {
      extends: path.join(SDK_ROOT, "tsconfig.shadow.json").split(path.sep).join("/"),
      include: [
        path.join(SDK_ROOT, "snapshots", "**", "*.d.ts").split(path.sep).join("/"),
        path.join(moduleDir, "**", "*").split(path.sep).join("/"),
      ],
      exclude: [path.join(moduleDir, "node_modules").split(path.sep).join("/")],
    },
    null,
    2
  )
);

const result = spawnSync(tscCmd, ["-p", tsconfigPath], { stdio: "inherit", shell: process.platform === "win32" });
fs.rmSync(tmp, { recursive: true, force: true });
if (result.error) {
  console.error(`[shadow-tsc] 無法執行 tsc（${tscCmd}）：${result.error.message}——型別檢查跳過（宿主端 lint 仍會查）`);
  process.exit(2);
}
process.exit(result.status ?? 1);
