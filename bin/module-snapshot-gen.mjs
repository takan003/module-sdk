#!/usr/bin/env node
/**
 * 型別快照產生器（維護者用）。
 *
 * 從主程式原始碼以 `tsc --declaration --emitDeclarationOnly` 產生 `.d.ts`，
 * 只複製 `src/lib`、`src/types`、`src/components`（模組允許面會用到的區塊）
 * 到 `snapshots/`，並更新 `HOST_SURFACE_SNAPSHOT`。
 *
 * 用法：
 *   node bin/module-snapshot-gen.mjs --host ../campus-toolkit
 *
 * 需求：主程式已安裝 node_modules（含 typescript）。外部開發者不需要執行本檔。
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SDK_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOTS_DIR = path.join(SDK_ROOT, "snapshots");
const COPY_DIRS = ["lib", "types", "components"];

function fail(message) {
  console.error(`[snapshot-gen] ${message}`);
  process.exit(1);
}

const args = process.argv.slice(2);
let hostArg = "";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--host") {
    hostArg = args[i + 1] ?? "";
    i++;
  } else if (!args[i].startsWith("--") && !hostArg) {
    hostArg = args[i];
  }
}
if (!hostArg) hostArg = path.join(SDK_ROOT, "..", "campus-toolkit");
const host = path.resolve(hostArg);

const hostTsconfig = path.join(host, "tsconfig.json");
const hostSrc = path.join(host, "src");
const hostTsc = path.join(host, "node_modules", "typescript", "bin", "tsc");
if (!fs.existsSync(hostTsconfig)) fail(`找不到主程式 tsconfig：${hostTsconfig}`);
if (!fs.existsSync(hostSrc)) fail(`找不到主程式 src：${hostSrc}`);
if (!fs.existsSync(hostTsc)) fail(`找不到主程式 TypeScript：${hostTsc}（請先在主程式 npm install）`);

function readHostVersion() {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(hostSrc, "version.json"), "utf-8"));
    return typeof raw.version === "string" ? raw.version : "0";
  } catch {
    return "0";
  }
}

const hostVersion = readHostVersion();
const tmpOut = fs.mkdtempSync(path.join(os.tmpdir(), "module-sdk-snapshots-"));
const tmpConfig = path.join(host, ".module-sdk-snapshot.tsconfig.json");

function toPosix(value) {
  return value.split(path.sep).join("/");
}

fs.writeFileSync(
  tmpConfig,
  JSON.stringify(
    {
      extends: "./tsconfig.json",
      compilerOptions: {
        noEmit: false,
        declaration: true,
        emitDeclarationOnly: true,
        rootDir: ".",
        outDir: toPosix(tmpOut),
        incremental: false,
        plugins: [],
      },
      include: ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx"],
      exclude: ["node_modules", "src/modules"],
    },
    null,
    2
  )
);

let result;
try {
  result = spawnSync(process.execPath, [hostTsc, "-p", tmpConfig], {
    cwd: host,
    encoding: "utf-8",
    timeout: 900_000,
  });
} finally {
  fs.rmSync(tmpConfig, { force: true });
}

if (result.error || result.status !== 0) {
  const output = `${result.stderr || ""}${result.stdout || ""}`.trim();
  fs.rmSync(tmpOut, { recursive: true, force: true });
  fail(`主程式宣告檔產生失敗：${output.split("\n").slice(-8).join("\n")}`);
}

let copied = 0;
for (const dir of COPY_DIRS) {
  const from = path.join(tmpOut, "src", dir);
  const to = path.join(SNAPSHOTS_DIR, dir);
  if (!fs.existsSync(from)) continue;
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(to, { recursive: true });
  for (const file of fs.readdirSync(from)) {
    if (!file.endsWith(".d.ts")) continue;
    fs.copyFileSync(path.join(from, file), path.join(to, file));
    copied += 1;
  }
}

fs.rmSync(tmpOut, { recursive: true, force: true });

fs.writeFileSync(
  path.join(SNAPSHOTS_DIR, ".meta.json"),
  `${JSON.stringify({ hostVersion, generatedAt: new Date().toISOString() }, null, 2)}\n`
);

const constantsPath = path.join(SDK_ROOT, "src", "constants.mjs");
const constants = fs.readFileSync(constantsPath, "utf-8");
const updated = constants.replace(
  /export const HOST_SURFACE_SNAPSHOT = "[^"]*";/,
  `export const HOST_SURFACE_SNAPSHOT = "${hostVersion}";`
);
if (updated === constants) {
  fail("無法更新 src/constants.mjs 的 HOST_SURFACE_SNAPSHOT");
}
fs.writeFileSync(constantsPath, updated);

process.stdout.write(
  `[snapshot-gen] 已從主程式 ${hostVersion} 產生 ${copied} 個快照（lib／types／components）。\n`
);
