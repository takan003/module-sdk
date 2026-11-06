/**
 * Golden modules：B 的契約必須能驗過 A 的官方範例模組 E／F／G。
 *
 * 來源順序：
 *   1. GOLDEN_MODULES_DIR（可指向任一資料夾，裡面放 selfDirectedLearning／examRegistration／identityTaxInquiry）
 *   2. SDK repo 的上一層（本 workspace 的 A／E／F／G 並排配置）
 *
 * 找不到模組時 skip（外部 clone 不會失敗）；找到但 check 不通過時 exit 1。
 * 注意：這是 v1 對齊測試；EFG 不因 B 的規則而修改，B 要修到能驗過 EFG。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkModule } from "../src/check.mjs";
import { DEFAULT_HOST_VERSION } from "../src/constants.mjs";

const SDK_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modulesRoot = process.env.GOLDEN_MODULES_DIR
  ? path.resolve(process.env.GOLDEN_MODULES_DIR)
  : path.resolve(SDK_ROOT, "..");

const GOLDEN = ["examRegistration", "identityTaxInquiry", "selfDirectedLearning"];
let checked = 0;
let failed = 0;

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
}

if (checked === 0) {
  process.stdout.write("[golden] 找不到 E／F／G，skip（設定 GOLDEN_MODULES_DIR 可指定路徑）\n");
} else if (failed > 0) {
  process.stderr.write(`[golden] ${failed}/${checked} 支官方模組未通過；請修 B 的 snapshots／allowlist。\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`[golden] ${checked} 支官方模組全數通過。\n`);
}
