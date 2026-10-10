/**
 * 附錄 A 驗收測試：市集文件 §附錄 A 十六案例中，屬於 module:check 的子集。
 * #4（status=live 上架條件）與 #13（sha256 完整性）屬市集/安裝端，標記 skip。
 * 每案例動態建 tmp 模組資料夾 → 跑 checkModule → 比對期望（pass／warn／fail＋關鍵字）。
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { checkModule } from "../src/check.mjs";

const HOST_VERSION = "0.388";

/** 合法基底 manifest（案例 1 用） */
function baseManifest(overrides = {}) {
  return {
    value: "demoModule",
    label: "示範模組",
    kind: "optional",
    status: "building",
    description: "附錄 A 測試用最小模組。",
    href: "",
    contractVersion: 1,
    minHostVersion: "0.380",
    author: { author: "Tester", authorUrl: "", version: "0.1.0", releasedAt: "2026-10-10" },
    provides: { student: false, parent: false, staff: true, admin: true },
    routes: [{ kind: "page", path: "/admin/demo-module" }],
    permission: { mode: "new", value: "demoModule", category: "校務資料" },
    ...overrides,
  };
}

const DEFAULT_FILES = {
  "admin/demo-module/page.tsx": `export default function Page() {\n  return <main>demo</main>;\n}\n`,
};

function buildCase(manifest, files = DEFAULT_FILES, pkgJson = null) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sdk-case-"));
  fs.writeFileSync(path.join(dir, "module.json"), JSON.stringify(manifest, null, 2));
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(dir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  if (pkgJson) fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pkgJson, null, 2));
  return dir;
}

const cases = [
  {
    n: 1,
    title: "合法 manifest＋合法程式碼",
    expect: "pass",
    run: () => buildCase(baseManifest()),
  },
  {
    n: 2,
    title: "contractVersion 2（契約過新）",
    expect: "fail",
    keyword: "契約過舊",
    run: () => buildCase(baseManifest({ contractVersion: 2 })),
  },
  {
    n: 3,
    title: "minHostVersion 0.999",
    expect: "fail",
    keyword: "需升級主程式至 0.999",
    run: () => buildCase(baseManifest({ minHostVersion: "0.999" })),
  },
  {
    n: 4,
    title: "status=building 投稿（上架條件＝市集端）",
    expect: "skip-market",
    note: "module:check 不擋 building（作者開發期合法）；上架閘門在市集端",
  },
  {
    n: 5,
    title: "live 但 href 為空",
    expect: "fail",
    keyword: "href",
    run: () => buildCase(baseManifest({ status: "live", href: "" })),
  },
  {
    n: 6,
    title: "value 撞內建 announcements",
    expect: "fail",
    keyword: "撞名",
    run: () => buildCase(baseManifest({ value: "announcements", permission: { mode: "new", value: "announcements", category: "校務資料" } })),
  },
  {
    n: 7,
    title: "package.json 含 dependencies",
    expect: "fail",
    keyword: "依賴",
    // 依賴以 import 掃描把關：放一支 import lodash
    run: () =>
      buildCase(
        baseManifest(),
        {
          ...DEFAULT_FILES,
          "lib/bad.ts": `import _ from "lodash";\nexport const x = _;\n`,
        },
        { name: "demo", dependencies: { lodash: "^4.0.0" } }
      ),
  },
  {
    n: 8,
    title: "import @/types/modules（核心檔）",
    expect: "fail",
    keyword: "核心檔",
    run: () =>
      buildCase(baseManifest(), {
        ...DEFAULT_FILES,
        "lib/bad.ts": `import { MODULES } from "@/types/modules";\nexport const x = MODULES;\n`,
      }),
  },
  {
    n: 9,
    title: "寫入未宣告集合 fooCollection",
    expect: "fail",
    keyword: "fooCollection",
    run: () =>
      buildCase(baseManifest({ dataCollections: ["demoEvents"] }), {
        ...DEFAULT_FILES,
        "lib/db.ts": `export const c = "demoEvents";\n// 模擬 getAdminDb().collection("fooCollection")\nexport function touch(db: { collection(name: string): unknown }) {\n  return db.collection("fooCollection");\n}\n`,
      }),
  },
  {
    n: 10,
    title: "rateLimits.key 無模組前綴",
    expect: "fail",
    keyword: "前綴",
    run: () =>
      buildCase(
        baseManifest({
          rateLimits: [{ key: "GET", limit: 10, windowMs: 60000 }],
        })
      ),
  },
  {
    n: 11,
    title: "套件 600KB",
    expect: "fail",
    keyword: "超過上限",
    run: () => {
      const dir = buildCase(baseManifest());
      fs.writeFileSync(path.join(dir, "big.bin"), Buffer.alloc(600 * 1024, 1));
      return dir;
    },
  },
  {
    n: 12,
    title: "hooks 含未實作掛勾",
    expect: "warn",
    keyword: "掛勾",
    run: () => buildCase(baseManifest({ hooks: ["announcements", "teleport"] })),
  },
  {
    n: 13,
    title: "sha256 與市集宣告不符",
    expect: "skip-market",
    note: "完整性驗證在安裝/下載端（期 6）",
  },
  {
    n: 14,
    title: "routes 前綴非法（/dashboard）",
    expect: "fail",
    keyword: "白名單前綴",
    run: () => buildCase(baseManifest({ routes: [{ kind: "page", path: "/dashboard" }] })),
  },
  {
    n: 15,
    title: "routes 與宿主既有路由撞名（快照比對）",
    expect: "fail",
    keyword: "撞",
    run: () =>
      buildCase(
        baseManifest({
          routes: [
            { kind: "page", path: "/admin/demo-module" },
            { kind: "api", path: "/api/admin/announcements" },
          ],
        })
      ),
  },
  {
    n: 16,
    title: '"use client" 檔存取 localStorage',
    expect: "fail",
    keyword: "localStorage",
    run: () =>
      buildCase(baseManifest(), {
        ...DEFAULT_FILES,
        "admin/demo-module/client-part.tsx": `"use client";\nexport function save() {\n  localStorage.setItem("k", "v");\n}\n`,
      }),
  },
];

// —— 路由撞名快照檢查尚未併入 check.mjs：以 #15 為驅動補上 ——（見下方 assert）

let pass = 0;
let failCount = 0;
for (const c of cases) {
  if (c.expect === "skip-market") {
    process.stdout.write(`#${String(c.n).padStart(2, "0")} ${c.title} → 市集/安裝端案例（skip：${c.note}）\n`);
    continue;
  }
  const dir = c.run();
  const result = checkModule(dir, { hostVersion: HOST_VERSION });
  const text = [...result.errors, ...result.warnings].join("\n");
  let ok = false;
  if (c.expect === "pass") ok = result.ok && result.warnings.length === 0;
  else if (c.expect === "warn") ok = result.ok && result.warnings.some((w) => w.includes(c.keyword));
  else if (c.expect === "fail") ok = !result.ok && text.includes(c.keyword);
  fs.rmSync(dir, { recursive: true, force: true });
  if (ok) {
    pass++;
    process.stdout.write(`#${String(c.n).padStart(2, "0")} ${c.title} → OK（${c.expect}）\n`);
  } else {
    failCount++;
    process.stderr.write(
      `#${String(c.n).padStart(2, "0")} ${c.title} → NG（期望 ${c.expect}${c.keyword ? ` 含「${c.keyword}」` : ""}）\n  實得 errors=${JSON.stringify(result.errors)} warnings=${JSON.stringify(result.warnings)}\n`
    );
  }
}

process.stdout.write(`\n附錄 A：通過 ${pass}、失敗 ${failCount}\n`);
process.exit(failCount === 0 ? 0 : 1);
