/**
 * manifest 驗證：鏡射宿主掃描器規則（scripts/build-module-registry.mjs）
 * ＋ SDK 擴充規則【E1】（contractVersion／minHostVersion／hooks／dataCollections）。
 * 規格：docs/主程式模組與功能模組.md §3.2、docs/模組市集與外掛開發.md §3.3、§6.3-4。
 */

import {
  BUILTIN_VALUES,
  HOST_ROUTES,
  KNOWN_HOOKS,
  MODULE_CONTRACT_VERSION,
  PAGE_PREFIXES,
} from "./constants.mjs";

const CATEGORIES = ["帳號與權限", "校務資料", "系統與紀錄"];
const STATUSES = ["planned", "building", "live"];
const VALUE_RE = /^[a-z][A-Za-z0-9]*$/;
const RATE_KEY_RE = /^[A-Z][A-Z0-9_]*$/;
const AUDIT_ACTION_RE = /^[a-z][a-z0-9_]*$/;
const COLLECTION_RE = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
const HOST_VERSION_RE = /^\d+\.\d+$/;

const isString = (v) => typeof v === "string";
const isNonEmptyString = (v) => isString(v) && v.trim() !== "";
const toUpperSnake = (value) => value.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
const toSnake = (value) => value.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();

/** 版本比較："0.388" < "0.999"；回傳 -1/0/1 */
export function compareHostVersion(a, b) {
  const pa = String(a).split(".").map((n) => Number(n));
  const pb = String(b).split(".").map((n) => Number(n));
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const da = pa[i] ?? 0;
    const db = pb[i] ?? 0;
    if (da !== db) return da < db ? -1 : 1;
  }
  return 0;
}

/**
 * @param {unknown} m 解析後的 manifest
 * @param {{ hostVersion?: string }} [opts] hostVersion＝學校主程式版本（--host-version）
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function validateManifest(m, opts = {}) {
  const errors = [];
  const warnings = [];
  const at = (msg) => errors.push(`module.json：${msg}`);
  const warn = (msg) => warnings.push(`module.json：${msg}`);

  if (!m || typeof m !== "object" || Array.isArray(m)) {
    at("需為 JSON 物件");
    return { errors, warnings };
  }

  if (!isNonEmptyString(m.value) || !VALUE_RE.test(m.value)) {
    at(`value 需為 camelCase（小寫起頭英數字），實得 ${JSON.stringify(m.value)}`);
    return { errors, warnings }; // value 錯了後續比對無意義
  }
  if (BUILTIN_VALUES.includes(m.value)) {
    at(`value「${m.value}」與內建／管理端模組撞名（快照 ${"HOST_SURFACE_SNAPSHOT_0.388"}）`);
  }
  if (!isNonEmptyString(m.label)) at("缺少 label");
  if (m.kind !== "optional") at(`kind 需為 "optional"，實得 ${JSON.stringify(m.kind)}`);
  if (!STATUSES.includes(m.status)) at(`status 需為 ${STATUSES.join("／")} 之一`);
  if (!isNonEmptyString(m.description)) at("缺少 description");
  if (!isString(m.href)) at("缺少 href（尚未建頁給空字串）");
  if (m.status === "live" && m.href === "") at('status 為 live 時 href 不可為空（上架條件）');

  const author = m.author && typeof m.author === "object" ? m.author : null;
  if (!author) {
    at("缺少 author 物件");
  } else {
    for (const key of ["author", "authorUrl", "version", "releasedAt"]) {
      if (!isString(author[key])) at(`author.${key} 需為字串`);
    }
    if (isString(author.version) && author.version.trim() === "") at("author.version 不可為空");
  }

  const provides = m.provides && typeof m.provides === "object" ? m.provides : null;
  if (!provides) {
    at("缺少 provides 物件");
  } else {
    for (const role of ["student", "parent", "staff", "admin"]) {
      if (typeof provides[role] !== "boolean") at(`provides.${role} 需為布林值`);
    }
  }

  if (!Array.isArray(m.routes) || m.routes.length === 0) {
    at("routes 需為非空陣列");
  } else {
    m.routes.forEach((route, i) => {
      const kind = route && route.kind;
      const p = route && route.path;
      if (kind !== "page" && kind !== "api") {
        at(`routes[${i}].kind 需為 page 或 api`);
        return;
      }
      if (!isNonEmptyString(p)) {
        at(`routes[${i}].path 缺少或為空`);
        return;
      }
      if (p.length > 1 && p.endsWith("/")) {
        at(`routes[${i}].path「${p}」不可有結尾斜線`);
        return;
      }
      if (kind === "page") {
        const ok = PAGE_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
        if (!ok) {
          at(
            `routes[${i}] 頁面路徑「${p}」不在白名單前綴（${PAGE_PREFIXES.join("、")}）——該前綴之外無 proxy 角色閘門【E13】`
          );
        }
      } else if (!p.startsWith("/api/")) {
        at(`routes[${i}] API 路徑「${p}」需以 /api/ 開頭`);
      }
      // 與宿主既有路由快照比對（撞名＝build 失敗）【E13】附錄 A #15
      if (HOST_ROUTES.some((r) => r.kind === kind && r.path === p)) {
        at(`routes[${i}] 路徑「${p}」與宿主既有路由撞名（快照比對；安裝端⑨仍會全量複驗）【E13】`);
      }
    });
  }

  const permission = m.permission && typeof m.permission === "object" ? m.permission : null;
  if (!permission) {
    at("缺少 permission 物件");
  } else if (permission.mode === "new") {
    if (permission.value !== m.value) at('permission.mode 為 "new" 時 permission.value 需等於 value');
    if (!CATEGORIES.includes(permission.category)) {
      at(`permission.category 需為 ${CATEGORIES.join("／")} 之一`);
    }
  } else if (permission.mode === "reuse") {
    if (!isNonEmptyString(permission.value)) at('permission.mode 為 "reuse" 時需給 permission.value');
  } else {
    at('permission.mode 需為 "new" 或 "reuse"');
  }

  if (m.rateLimits !== undefined) {
    if (!Array.isArray(m.rateLimits)) {
      at("rateLimits 需為陣列");
    } else {
      const prefix = `${toUpperSnake(m.value)}_`;
      const seen = new Set();
      m.rateLimits.forEach((bucket, i) => {
        if (!bucket || typeof bucket !== "object") {
          at(`rateLimits[${i}] 需為物件`);
          return;
        }
        const key = bucket.key;
        if (!isNonEmptyString(key) || !RATE_KEY_RE.test(key)) {
          at(`rateLimits[${i}].key 需為 UPPER_SNAKE`);
          return;
        }
        if (!key.startsWith(prefix)) {
          at(`rateLimits[${i}].key「${key}」需以「${prefix}」開頭（模組代碼前綴）`);
        } else if (seen.has(key)) {
          at(`rateLimits 重複：${key}`);
        }
        seen.add(key);
        if (!Number.isInteger(bucket.limit) || bucket.limit <= 0) {
          at(`rateLimits[${i}].limit 需為正整數`);
        }
        if (!Number.isInteger(bucket.windowMs) || bucket.windowMs <= 0) {
          at(`rateLimits[${i}].windowMs 需為正整數`);
        }
      });
    }
  }

  if (m.auditActions !== undefined) {
    if (!Array.isArray(m.auditActions)) {
      at("auditActions 需為陣列");
    } else {
      const prefix = `${toSnake(m.value)}_`;
      const seen = new Set();
      m.auditActions.forEach((action, i) => {
        if (!isNonEmptyString(action) || !AUDIT_ACTION_RE.test(action)) {
          at(`auditActions[${i}] 需為 snake_case`);
          return;
        }
        if (!action.startsWith(prefix)) {
          at(`auditActions[${i}]「${action}」需以「${prefix}」開頭（模組代碼前綴）`);
        } else if (seen.has(action)) {
          at(`auditActions 重複：${action}`);
        }
        seen.add(action);
      });
    }
  }

  if (m.dataCollections !== undefined) {
    if (!Array.isArray(m.dataCollections)) {
      at("dataCollections 需為陣列");
    } else {
      const seen = new Set();
      m.dataCollections.forEach((name, i) => {
        if (!isNonEmptyString(name) || !COLLECTION_RE.test(name)) {
          at(`dataCollections[${i}] 需為合法集合名（英數字與 _-）`);
          return;
        }
        if (seen.has(name)) at(`dataCollections 重複：${name}`);
        seen.add(name);
      });
    }
  }

  if (m.hooks !== undefined) {
    if (!Array.isArray(m.hooks)) {
      at("hooks 需為陣列");
    } else {
      for (const hook of m.hooks) {
        if (!KNOWN_HOOKS.includes(hook)) {
          warn(`hooks 含主程式尚未實作的掛勾「${hook}」（可安裝，掛勾不生效）【E9】`);
        }
      }
    }
  }

  if (m.contractVersion !== undefined) {
    if (!Number.isInteger(m.contractVersion) || m.contractVersion < 1) {
      at("contractVersion 需為正整數");
    } else if (m.contractVersion > MODULE_CONTRACT_VERSION) {
      at(
        `contractVersion ${m.contractVersion} ＞ 主程式契約 ${MODULE_CONTRACT_VERSION}——主程式契約過舊，請升級主程式【E1】`
      );
    }
  } else {
    warn("缺少 contractVersion（建議補上，預設視為 1）");
  }

  if (m.minHostVersion !== undefined) {
    if (!isString(m.minHostVersion) || !HOST_VERSION_RE.test(m.minHostVersion)) {
      at('minHostVersion 需為 "主.次" 格式字串（如 "0.388"）');
    } else {
      const school = opts.hostVersion;
      if (isString(school) && HOST_VERSION_RE.test(school)) {
        if (compareHostVersion(m.minHostVersion, school) > 0) {
          at(`需升級主程式至 ${m.minHostVersion}（學校目前 ${school}）【E1】`);
        }
      }
    }
  }

  for (const key of ["icon", "license", "repository", "keywords", "firestoreIndexes"]) {
    if (key === "firestoreIndexes" && m[key] !== undefined && !Array.isArray(m[key])) {
      at("firestoreIndexes 需為陣列（選填）");
    }
  }

  return { errors, warnings };
}
