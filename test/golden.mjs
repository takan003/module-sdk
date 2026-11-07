/**
 * Golden modules：B 的契約必須能驗過 A 的官方範例模組 E／F／G。
 *
 * 來源順序：
 *   1. GOLDEN_MODULES_DIR（可指向任一資料夾，裡面放 selfDirectedLearning／examRegistration／identityTaxInquiry）
 *   2. SDK repo 的上一層（本 workspace 的 A／E／F／G 並排配置）
 *
 * 每個模組會跑：
 *   1. `module:check`（manifest／import／集合／靜態掃描）
 *   2. 影子 tsc（快照模式；有 tsc 才跑）
 *      — 設定 SHADOW_TSC_HOST=1 且有主程式時，改用宿主模式（最準確）。
 *
 * 找不到模組時 skip（外部 clone 不會失敗）；找到但驗證不通過時 exit 1。
 * 注意：這是 v1 對齊測試；EFG 不因 B 的規則而修改，B 要修到能驗過 EFG。
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { checkModule } from "../src/check.mjs";
import { DEFAULT_HOST_VERSION } from "../src/constants.mjs";

const SDK_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modulesRoot = process.env.GOLDEN_MODULES_DIR
  ? path.resolve(process.env.GOLDEN_MODULES_DIR)
  : path.resolve(SDK_ROOT, "..");
const hostDir = process.env.HOST_DIR
  ? path.resolve(process.env.HOST_DIR)
  : path.resolve(SDK_ROOT, "..", "campus-toolkit");

const GOLDEN = ["examRegistration", "identityTaxInquiry", "selfDirectedLearning"];
let checked = 0;
let failed = 0;
let shadowChecked = 0;
let shadowFailed = 0;

function resolveTsc() {
  if (process.env.TSC_PATH && fs.existsSync(process.env.TSC_PATH)) return process.env.TSC_PATH;
  const bin = path.join(hostDir, "node_modules", ".bin");
  for (const name of process.platform === "win32" ? ["tsc.cmd", "tsc.exe"] : ["tsc"]) {
    const candidate = path.join(bin, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  return "";
}

const tscPath = resolveTsc();
const useHost = process.env.SHADOW_TSC_HOST === "1" && fs.existsSync(path.join(hostDir, "tsconfig.json"));
if (!tscPath && !useHost) {
  process.stdout.write("[golden] 找不到 tsc，影子型別檢查 skip（設定 TSC_PATH 可指定）\n");
}

function runShadowTsc(dir) {
  const args = ["bin/module-shadow-tsc.mjs", dir];
  if (useHost) {
    args.push("--host", hostDir);
  } else {
    args.push("--tsc", tscPath);
  }
  const result = spawnSync(process.execPath, args, {
    cwd: SDK_ROOT,
    encoding: "utf-8",
    timeout: 900_000,
  });
  return {
    ok: result.status === 0,
    output: `${result.stdout || ""}${result.stderr || ""}`.trim(),
  };
}

for (const name of GOLDEN) {
  const dir = path.join(modulesRoot, name);
  if (!fs.existsSync(path.join(dir, "module.json"))) {
    process.stdout.write(`[golden] ${name}：找不到，skip\n`);
    continue;
  }
  checked += 1;
  const result = checkModule(dir, { hostVersion: DEFAULT_HOST_VERSION });
  if (result.ok) {
    process.stdout.write(
      `[golden] ${name}：OK（警告 ${result.warnings.length} 項、壓縮估計 ${Math.round(result.sizeBytes / 1024)}KB）\n`
    );
  } else {
    failed += 1;
    process.stderr.write(`[golden] ${name}：NG（B 需要對齊，不是改 ${name}）\n`);
    for (const message of result.errors) process.stderr.write(`  - ${message}\n`);
  }

  if (!tscPath && !useHost) continue;
  shadowChecked += 1;
  const shadow = runShadowTsc(dir);
  if (shadow.ok) {
    process.stdout.write(
      `[golden] ${name}：影子 tsc OK（${useHost ? "宿主模式" : "快照模式"}）\n`
    );
  } else {
    shadowFailed += 1;
    process.stderr.write(
      `[golden] ${name}：影子 tsc NG（${useHost ? "宿主模式" : "快照模式"}；B 需修 snapshots／stubs）\n`
    );
    for (const line of shadow.output.split("\n").slice(0, 12)) {
      if (line.trim()) process.stderr.write(`  ${line}\n`);
    }
  }
}

if (checked === 0) {
  process.stdout.write("[golden] 找不到 E／F／G，skip（設定 GOLDEN_MODULES_DIR 可指定路徑）\n");
} else if (failed > 0 || shadowFailed > 0) {
  process.stderr.write(
    `[golden] ${failed}/${checked} 支模組 check 未通過、${shadowFailed}/${shadowChecked} 支影子 tsc 未通過；請修 B 的 snapshots／allowlist。\n`
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `[golden] ${checked} 支官方模組全數通過（影子 tsc ${shadowChecked} 支）。\n`
  );
}
