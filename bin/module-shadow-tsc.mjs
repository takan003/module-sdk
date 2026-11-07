#!/usr/bin/env node
/**
 * 影子 tsc【E14】：對模組原始碼跑 `tsc --noEmit`。
 *
 * 兩種模式：
 *
 * 1. 快照模式（預設）：用 `snapshots/` 的 `.d.ts`＋`tsconfig.shadow.json` 的 paths。
 *    適合沒有主程式原始碼的外部開發者；需要環境有 tsc
 *    （PATH 的 tsc、`TSC_PATH` 或 `--tsc <path>`）。
 *
 * 2. 宿主模式：`--host <campus-toolkit>`。
 *    直接沿用主程式的 `tsconfig.json`、真實 React／Next／Firebase 型別，
 *    並暫時在模組資料夾建立 node_modules 連結（若沒有），跑完即移除。
 *    這是最準確的模式，適合本 workspace 的 golden 測試與維護者。
 *
 * 用法：
 *   node bin/module-shadow-tsc.mjs <模組資料夾> [--tsc <tsc路徑>]
 *   node bin/module-shadow-tsc.mjs <模組資料夾> --host ../campus-toolkit
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
let hostArg = "";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--tsc") {
    tscCmd = args[i + 1] ?? tscCmd;
    i++;
  } else if (args[i] === "--host") {
    hostArg = args[i + 1] ?? "";
    i++;
  } else if (!args[i].startsWith("--") && !target) {
    target = args[i];
  }
}
if (!target) {
  console.error(
    "[shadow-tsc] 用法：node bin/module-shadow-tsc.mjs <模組資料夾> [--tsc <tsc路徑>] [--host <主程式路徑>]"
  );
  process.exit(1);
}
const moduleDir = path.resolve(target);
const toPosix = (value) => value.split(path.sep).join("/");

function exists(targetPath) {
  try {
    fs.lstatSync(targetPath);
    return true;
  } catch {
    return false;
  }
}

function removeLink(linkPath) {
  try {
    fs.unlinkSync(linkPath);
  } catch {
    try {
      fs.rmdirSync(linkPath);
    } catch {
      // 清理失敗不影響驗證結果
    }
  }
}

// ——— 宿主模式：沿用主程式 tsconfig 與真實依賴 ———
if (hostArg) {
  const host = path.resolve(hostArg);
  const hostTsconfig = path.join(host, "tsconfig.json");
  const hostSrc = path.join(host, "src");
  const hostTsc = path.join(host, "node_modules", "typescript", "bin", "tsc");
  const hostNodeModules = path.join(host, "node_modules");
  if (!fs.existsSync(hostTsconfig) || !fs.existsSync(hostSrc) || !fs.existsSync(hostTsc)) {
    console.error(
      `[shadow-tsc] 宿主模式需要 ${host} 的 tsconfig.json、src 與 node_modules/typescript。`
    );
    process.exit(2);
  }

  let createdLink = "";
  const moduleNodeModules = path.join(moduleDir, "node_modules");
  if (!exists(moduleNodeModules)) {
    try {
      fs.symlinkSync(
        hostNodeModules,
        moduleNodeModules,
        process.platform === "win32" ? "junction" : "dir"
      );
      createdLink = moduleNodeModules;
    } catch (error) {
      console.error(
        `[shadow-tsc] 無法建立暫時 node_modules 連結：${
          error instanceof Error ? error.message : String(error)
        }`
      );
      process.exit(2);
    }
  }

  const configPath = path.join(host, `.module-sdk-shadow-${process.pid}.json`);
  fs.writeFileSync(
    configPath,
    JSON.stringify(
      {
        extends: "./tsconfig.json",
        compilerOptions: { noEmit: true, incremental: false },
        include: [
          "next-env.d.ts",
          "src/**/*.ts",
          "src/**/*.tsx",
          toPosix(path.join(moduleDir, "**", "*.ts")),
          toPosix(path.join(moduleDir, "**", "*.tsx")),
        ],
        exclude: ["node_modules", toPosix(moduleNodeModules)],
      },
      null,
      2
    )
  );

  const result = spawnSync(process.execPath, [hostTsc, "-p", configPath], { stdio: "inherit" });
  fs.rmSync(configPath, { force: true });
  if (createdLink) removeLink(createdLink);
  if (result.error) {
    console.error(`[shadow-tsc] 無法執行宿主 tsc：${result.error.message}`);
    process.exit(2);
  }
  process.exit(result.status ?? 1);
}

// ——— 快照模式：型別快照＋寬鬆樁 ———
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "module-shadow-"));
const tsconfigPath = path.join(tmp, "tsconfig.json");
fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(
    {
      extends: toPosix(path.join(SDK_ROOT, "tsconfig.shadow.json")),
      include: [
        toPosix(path.join(SDK_ROOT, "snapshots", "**", "*.d.ts")),
        toPosix(path.join(moduleDir, "**", "*")),
      ],
      exclude: [toPosix(path.join(moduleDir, "node_modules"))],
    },
    null,
    2
  )
);

const result = spawnSync(tscCmd, ["-p", tsconfigPath], {
  stdio: "inherit",
  shell: process.platform === "win32",
});
fs.rmSync(tmp, { recursive: true, force: true });
if (result.error) {
  console.error(
    `[shadow-tsc] 無法執行 tsc（${tscCmd}）：${result.error.message}——型別檢查跳過（宿主端 lint 仍會查）`
  );
  process.exit(2);
}
process.exit(result.status ?? 1);
