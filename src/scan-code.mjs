/**
 * 程式碼靜態掃描（§6.3 規則 1–3、5–9）：
 * import 白名單、settings 禁區、掛勾集合禁直寫、禁新依賴、
 * dataCollections 外集合比對、use client 危險存取、禁 import 其他模組。
 * 誤報文化：以「字串字面值＋import 路徑」啟發式掃描；安裝端⑨仍是最終判定。
 */

import fs from "node:fs";
import path from "node:path";
import {
  ALLOWED_HOST_IMPORTS,
  ALLOWED_NPM_PACKAGES,
  ALLOWED_NPM_PREFIXES,
  FORBIDDEN_HOST_IMPORTS,
  HOOK_COLLECTIONS,
} from "./constants.mjs";

const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const EXCLUDE_DIRS = new Set([".git", "node_modules", ".next", "dist", "build"]);
const IMPORT_RE = /(?:^|\n)\s*(?:import|export)[^"'`]*from\s+["']([^"']+)["']/g;
const REQUIRE_RE = /require\(\s*["']([^"']+)["']\s*\)/g;
const COLLECTION_RE = /\.collection\(\s*["']([^"']+)["']\s*\)/g;
const CLIENT_STORAGE_RE = /\b(?:localStorage|sessionStorage)\b|\bdocument\s*\.\s*cookie\b|\beval\s*\(|new\s+Function\s*\(/;

/** 遞迴列出模組內程式碼檔（相對路徑，/ 分隔） */
export function listCodeFiles(root) {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || EXCLUDE_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (CODE_EXT.has(path.extname(entry.name))) out.push(path.relative(root, full).split(path.sep).join("/"));
    }
  };
  walk(root);
  return out.sort();
}

/** import 規則：relative ok；@/ 前綴白名單；npm 白名單【E10】 */
function classifyImport(spec, file) {
  if (spec.startsWith(".") || spec.startsWith("node:")) {
    if (spec.startsWith("node:")) return null; // 程式建構可用
    return null;
  }
  if (spec.startsWith("@/")) {
    const base = spec.replace(/\/index$/, "");
    if (base.startsWith("@/modules/")) {
      const rest = base.slice("@/modules/".length);
      return { rule: "R9", message: `${file}：禁 import 其他模組資料夾（@/modules/<非自己>/**）【E15】` };
    }
    if (FORBIDDEN_HOST_IMPORTS.includes(base)) {
      return { rule: "R1", message: `${file}：禁止 import 宿主核心檔「${spec}」（§6.3-1）` };
    }
    const ok = ALLOWED_HOST_IMPORTS.some((prefix) => base === prefix || base.startsWith(`${prefix}/`));
    if (!ok) {
      return { rule: "R1", message: `${file}：import「${spec}」不在宿主公開面白名單（§3.3）` };
    }
    return null;
  }
  // bare package
  const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
  const allowed =
    ALLOWED_NPM_PACKAGES.includes(pkg) ||
    ALLOWED_NPM_PREFIXES.some((prefix) => (prefix.endsWith("/") ? spec.startsWith(prefix) : pkg === prefix));
  if (!allowed) {
    return { rule: "R5", message: `${file}：import「${spec}」不在主程式依賴白名單，禁新增依賴【E10】` };
  }
  return null;
}

/**
 * @param {string} root 模組根目錄
 * @param {{ value: string, dataCollections?: string[] }} manifest
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function scanCode(root, manifest) {
  const errors = [];
  const warnings = [];
  const declared = new Set([
    ...(Array.isArray(manifest.dataCollections) ? manifest.dataCollections : []),
    ...HOOK_COLLECTIONS,
    "settings", // 宿主保留集合：出現在比對名單但另有專條禁止
  ]);
  const value = manifest.value;

  for (const rel of listCodeFiles(root)) {
    const full = path.join(root, rel);
    const text = fs.readFileSync(full, "utf-8").replace(/^﻿/, "");

    // R1/R5/R9：import
    const specs = new Set();
    for (const re of [IMPORT_RE, REQUIRE_RE]) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(text))) specs.add(match[1]);
    }
    for (const spec of specs) {
      const hit = classifyImport(spec, rel);
      if (hit) errors.push(hit.message);
    }

    // R2：禁讀寫 settings/system（連 settings 集合一併擋）
    COLLECTION_RE.lastIndex = 0;
    let col;
    const seenCollections = new Set();
    while ((col = COLLECTION_RE.exec(text))) seenCollections.add(col[1]);
    for (const name of seenCollections) {
      if (name === "settings") {
        errors.push(`${rel}：禁直接讀寫 settings 集合（含 settings/system）——走宿主公開面【§6.3-2】`);
        continue;
      }
      // R3：掛勾集合禁直寫（一律走 publishFromModule／publishScheduleFromModule）
      if (name === "announcements" || name === "calendarEvents") {
        errors.push(
          `${rel}：禁直寫掛勾集合「${name}」——改用 publishFromModule／publishScheduleFromModule【§6.3-3】`
        );
        continue;
      }
      // R6：dataCollections 宣告比對
      if (!declared.has(name)) {
        errors.push(
          `${rel}：使用未宣告集合「${name}」——manifest.dataCollections 未列（宣告即承諾）【§3.3-7】`
        );
      }
    }

    // R8：客戶端危險存取
    if (/^["']use client["']/.test(text) && CLIENT_STORAGE_RE.test(text)) {
      errors.push(
        `${rel}："use client" 檔禁存取 localStorage／sessionStorage／document.cookie／eval【§6.3-8】`
      );
    }
  }

  // R4 附：value 前綴一致性已在 manifest 驗證；此處補一個提示性檢查（無）
  void value;
  return { errors, warnings };
}
