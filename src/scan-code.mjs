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
const EXCLUDE_DIRS = new Set([".git", "node_modules", ".next"]);
const IMPORT_RE = /(?:^|\n)\s*(?:import|export)[^"'`]*from\s+["']([^"']+)["']/g;
const REQUIRE_RE = /require\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
const DYNAMIC_IMPORT_RE = /\bimport\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
const DYNAMIC_IMPORT_DYNAMIC_RE = /\bimport\s*\(\s*[A-Za-z_$]/;
const COLLECTION_RE = /\.collection\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
const DOC_PATH_RE = /\.doc\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
const CLIENT_STORAGE_RE = /\b(?:localStorage|sessionStorage)\b|\bdocument\s*\.\s*cookie\b|\beval\s*\(|new\s+Function\s*\(/;
const SCRIPT_TEST_RE = /^(?:scripts|tests?)\//;

function isScriptOrTest(rel) {
  return SCRIPT_TEST_RE.test(rel);
}

/** 找出真正的 "use client"（允許前面有註解／空白） */
function isUseClient(text) {
  const stripped = text
    .replace(/^\uFEFF/, "")
    .replace(/^(?:\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*/, "");
  return /^["']use client["']/.test(stripped);
}

/** 遞迴列出模組內程式碼檔（相對路徑，/ 分隔） */
export function listCodeFiles(root) {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (CODE_EXT.has(path.extname(entry.name))) out.push(path.relative(root, full).split(path.sep).join("/"));
    }
  };
  walk(root);
  return out.sort();
}

/** import 規則：relative 必須留在模組內；@/ 前綴白名單；npm 白名單【E10】 */
function classifyImport(spec, file, full, root) {
  if (spec.startsWith(".")) {
    const resolved = path.resolve(path.dirname(full), spec);
    const target = path.relative(root, resolved);
    if (target.startsWith("..") || path.isAbsolute(target)) {
      return { rule: "R1", message: `${file}：相對路徑「${spec}」逃出模組資料夾【P0-3】` };
    }
    const normalized = target.split(path.sep).join("/");
    if (!isScriptOrTest(file) && isScriptOrTest(normalized)) {
      return { rule: "R1", message: `${file}：執行期檔案不可 import scripts/tests「${spec}」【P0-3】` };
    }
    return null;
  }
  if (spec.startsWith("node:")) {
    if (!isScriptOrTest(file)) {
      return { rule: "R1", message: `${file}：執行期檔案禁用 node: 內建模組「${spec}」【P0-3】` };
    }
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

/** 管理頁是否有任一祖先 layout 使用 AdminSectionShell（P0-8） */
function hasAdminShellAncestor(root, rel) {
  let dir = path.posix.dirname(rel);
  while (dir === "admin" || dir.startsWith("admin/")) {
    for (const name of ["layout.tsx", "layout.ts", "layout.jsx", "layout.js"]) {
      const candidate = dir === "." ? name : `${dir}/${name}`;
      const full = path.join(root, candidate);
      if (fs.existsSync(full)) {
        const text = fs.readFileSync(full, "utf-8");
        if (text.includes("AdminSectionShell")) return true;
      }
    }
    if (dir === "admin") break;
    dir = path.posix.dirname(dir);
  }
  return false;
}

/** API route 守門三件套＋非管理端 module gate 的存在性檢查（P0-8） */
function scanRouteGuards(root, rel, text, errors) {
  if (/^api\/.*\/route\.(ts|js)$/.test(rel) || /^api\/route\.(ts|js)$/.test(rel)) {
    const routePath = `/${rel.replace(/route\.(ts|js)$/, "").replace(/\/$/, "")}`;
    if (!/enforceRateLimit\s*\(|checkRateLimit\s*\(/.test(text)) {
      errors.push(`${rel}：缺少限流（enforceRateLimit／checkRateLimit）【P0-8】`);
    }
    if (!/requireRole\s*\(|requireAdminModule\s*\(|requireModulePermission\s*\(/.test(text)) {
      errors.push(`${rel}：缺少鑑權（requireRole／requireAdminModule／requireModulePermission）【P0-8】`);
    }
    const mutating =
      /export\s+(?:async\s+)?function\s+(POST|PUT|PATCH|DELETE)\b/.test(text) ||
      /export\s+const\s+(POST|PUT|PATCH|DELETE)\s*=/.test(text);
    if (mutating && !/assertSameOrigin\s*\(/.test(text)) {
      errors.push(`${rel}：寫入方法缺少 CSRF（assertSameOrigin）【P0-8】`);
    }
    if (/^\/api\/(student|parent|staff)\//.test(routePath) && !/requireFeatureModuleEnabled\s*\(/.test(text)) {
      errors.push(`${rel}：${routePath} 缺少模組啟用閘門（requireFeatureModuleEnabled）【P0-8】`);
    }
  }

  if (rel.startsWith("admin/") && /page\.(tsx|ts|jsx|js)$/.test(rel)) {
    if (!hasAdminShellAncestor(root, rel)) {
      errors.push(`${rel}：管理頁缺少任一祖先 layout 的 AdminSectionShell 權限殼【P0-8】`);
    }
  }
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

    // R1/R5/R9：import（靜態＋require＋動態 import 字面值）
    const specs = new Set();
    for (const re of [IMPORT_RE, REQUIRE_RE, DYNAMIC_IMPORT_RE]) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(text))) specs.add(match[1]);
    }
    for (const spec of specs) {
      const hit = classifyImport(spec, rel, full, root);
      if (hit) errors.push(hit.message);
    }
    if (!isScriptOrTest(rel) && DYNAMIC_IMPORT_DYNAMIC_RE.test(text)) {
      errors.push(`${rel}：動態 import 非字面值，無法驗證【P0-3】`);
    }

    // R2：settings 直接存取（v1 警告；v2 收斂）
    COLLECTION_RE.lastIndex = 0;
    DOC_PATH_RE.lastIndex = 0;
    let col;
    const seenCollections = new Set();
    while ((col = COLLECTION_RE.exec(text))) seenCollections.add(col[1]);
    while ((col = DOC_PATH_RE.exec(text))) {
      const name = col[1].split("/")[0]?.trim();
      if (name) seenCollections.add(name);
    }
    for (const name of seenCollections) {
      if (name === "settings") {
        warnings.push(
          `${rel}：直接存取 settings 集合（含 settings/system）——v1 相容放行，v2 請改走宿主公開面【§6.3-2】`
        );
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

    // P0-8：API 守門三件套與管理頁權限殼
    scanRouteGuards(root, rel, text, errors);

    // R8：客戶端危險存取
    if (isUseClient(text) && CLIENT_STORAGE_RE.test(text)) {
      errors.push(
        `${rel}："use client" 檔禁存取 localStorage／sessionStorage／document.cookie／eval【§6.3-8】`
      );
    }
  }

  // R4 附：value 前綴一致性已在 manifest 驗證；此處補一個提示性檢查（無）
  void value;
  return { errors, warnings };
}
