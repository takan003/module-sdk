/**
 * module:check 編排：讀模組資料夾 → manifest 驗證 → 程式碼掃描 → 體積檢查。
 * 回傳統一結果：{ ok, errors[], warnings[] }；ok＝零 error（warning 不擋）。
 * 規格：docs/模組市集與外掛開發.md §6.3、附錄 A。
 */

import fs from "node:fs";
import path from "node:path";
import { PACKAGE_SIZE_LIMIT } from "./constants.mjs";
import { validateManifest } from "./validate-manifest.mjs";
import { listCodeFiles, scanCode } from "./scan-code.mjs";

const EXCLUDE_DIRS = new Set([".git", "node_modules", ".next", "dist", "build"]);

/** 計算套件總體積（bytes）：排除 .git／node_modules／.next（近似 zip 內容） */
export function packageSize(root) {
  let total = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || EXCLUDE_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else total += fs.statSync(full).size;
    }
  };
  walk(root);
  return total;
}

/**
 * @param {string} moduleDir 模組根目錄
 * @param {{ hostVersion?: string }} [opts]
 * @returns {{ ok: boolean, errors: string[], warnings: string[], sizeBytes: number }}
 */
export function checkModule(moduleDir, opts = {}) {
  const root = path.resolve(moduleDir);
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    return { ok: false, errors: [`路徑不存在或不是資料夾：${root}`], warnings, sizeBytes: 0 };
  }

  const manifestPath = path.join(root, "module.json");
  if (!fs.existsSync(manifestPath)) {
    return { ok: false, errors: ["缺少 module.json（模組資料夾根目錄）"], warnings, sizeBytes: 0 };
  }

  let manifest = null;
  try {
    const raw = fs.readFileSync(manifestPath, "utf-8").replace(/^﻿/, "");
    manifest = JSON.parse(raw);
  } catch (e) {
    return {
      ok: false,
      errors: [`module.json 解析失敗：${e instanceof Error ? e.message : String(e)}`],
      warnings,
      sizeBytes: 0,
    };
  }

  const result = validateManifest(manifest, { hostVersion: opts.hostVersion });
  errors.push(...result.errors);
  warnings.push(...result.warnings);

  // 套件體積（§6.3 附錄 A #11）
  const size = packageSize(root);
  if (size > PACKAGE_SIZE_LIMIT) {
    errors.push(
      `套件 ${Math.round(size / 1024)}KB 超過上限 500KB（§九-3；請精簡或移除大檔）`
    );
  }

  // 程式碼掃描（manifest 基本可用才掃）
  if (typeof manifest?.value === "string") {
    const scanned = scanCode(root, manifest);
    errors.push(...scanned.errors);
    warnings.push(...scanned.warnings);
  }

  // 提示：無程式碼檔（僅 manifest）——合法但值得提醒
  if (listCodeFiles(root).length === 0) {
    warnings.push("模組內無程式碼檔（僅 manifest）——尚未實作任何路由實體");
  }

  return { ok: errors.length === 0, errors, warnings, sizeBytes: size };
}
