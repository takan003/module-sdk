# module-sdk（期 1）

[![CI](https://github.com/takan003/module-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/takan003/module-sdk/actions/workflows/ci.yml)

數位校園工具箱選用（外掛）功能模組 SDK：讓外部開發者在**沒有主程式**的環境也能寫模組、跑基本驗證。
規格：`campus-toolkit/docs/模組市集與外掛開發.md` §3.2、§6.3、附錄 A。

## 內容

| 內容 | 位置 |
|---|---|
| 契約常數（`MODULE_CONTRACT_VERSION`、白名單、內建代碼/路由快照） | `src/constants.mjs` |
| manifest 驗證（schema 結構驗證＋宿主語意規則） | `src/validate-manifest.mjs`、`src/schema-validate.mjs`、`module.schema.json` |
| `module:check` 靜態掃描（§6.3 十條規則的可自動化子集） | `src/check.mjs`、`src/scan-code.mjs`、`bin/module-check.mjs` |
| 型別快照 `.d.ts`（§3.3 允許面；由主程式自動產生） | `snapshots/` |
| 快照產生器（從主程式 tsc 宣告檔重生） | `bin/module-snapshot-gen.mjs` |
| 影子 tsc【E14】（快照模式＋宿主模式） | `bin/module-shadow-tsc.mjs`、`tsconfig.shadow.json` |
| manifest JSON Schema（市集與安裝端雙邊同一份） | `module.schema.json` |
| 附錄 A 測試案例 | `test/run-tests.mjs`（`npm test`） |

## 用法

```bash
# 靜態檢查（零依賴，Node ≥20）
node bin/module-check.mjs <模組資料夾> [--host-version 0.675] [--json]
# 退出碼 0＝通過（warning 不擋）；1＝有 error

# 影子 tsc（快照模式；需環境有 tsc，或借主程式的）
node bin/module-shadow-tsc.mjs <模組資料夾> --tsc <tsc路徑>

# 影子 tsc（宿主模式；最準確，需主程式原始碼與 node_modules）
node bin/module-shadow-tsc.mjs <模組資料夾> --host ../campus-toolkit

# 維護者：從主程式重新產生 snapshots 並更新 HOST_SURFACE_SNAPSHOT
node bin/module-snapshot-gen.mjs --host ../campus-toolkit
```

也可以把 SDK 以 Git 依賴加到模組專案（釘標籤，避免上游變動影響）：

```json
{
  "devDependencies": {
    "module-sdk": "github:takan003/module-sdk#v1.0.0"
  }
}
```

```bash
npx module-check .
npx module-shadow-tsc . --host ../campus-toolkit
```

## 契約權威順序（v1）

**A（主程式）與官方範例模組 E／F／G 的實際可運作 > B（module-sdk）。**

B 是衍生工具，不是規則來源；B 的 allowlist／snapshots 與 E／F／G 衝突時，修改 B，不是修改 E／F／G。
`npm test` 會用 E／F／G 當 golden modules（找不到時 skip；可用 `GOLDEN_MODULES_DIR` 指定路徑）。

## 穩定性承諾【E4】

同一 `contractVersion`（目前 `1`）內，§3.3 允許面**只增不改不刪**；破壞性變更才遞增版本。
`snapshots/` 已對應宿主 `0.675`（`HOST_SURFACE_SNAPSHOT`），由快照產生器從主程式宣告檔產生；
`module:check` 預設也比對宿主 `0.675`（`DEFAULT_HOST_VERSION`，跟隨主程式目前版本）。
`npm test` 的 golden modules 會同時跑 `module:check` 與影子 tsc（快照模式）；
設定 `SHADOW_TSC_HOST=1` 可改用主程式真實型別的宿主模式。

## 邊界（讀懂這段才不會誤用）

- `module:check` 是**啟發式靜態掃描**（字串＋import 比對）：能抓常見違規，抓不完——
  宿主安裝端⑨與 `npm run lint`（真 tsc＋eslint）才是最終判定。
- `module.schema.json` 是 SDK 的**結構驗證來源**：`validate-manifest.mjs` 會先跑 schema，再跑跨欄位語意規則
  （路由前綴、保留集合、掛勾前綴、撞名等）。A 宿主掃描器仍是最終判定，C 的 publish 也會呼叫 A 的 `module-check`。
- 影子 tsc 有兩種模式：**快照模式**（預設，給沒有主程式原始碼的外部開發者）與
  **宿主模式**（`--host`，直接借主程式的 tsconfig／真實依賴，最準確）。
  快照模式仍使用寬鬆樁型別（react/next 為 any 層），目的是提前抓「用錯公開面」
  （例如 import 錯名、props 缺漏），不是完整型別驗證；宿主端 `npm run lint` 仍是最終判定。
- #4（status=live 上架條件）與 #13（sha256 完整性）屬市集/安裝端案例，本地 check 不實作（見附錄 A 測試輸出）。
- **核心個資集合唯讀**（名冊四表＋學生個人資料三表）：掃描器會擋直接鏈式寫入；
  `scopedDb` 另在 runtime 擋 `set`／`update`／`delete`／`add`／batch／transaction。
  設施集合（`announcements`／`calendarEvents`）不可直接存取，一律使用掛勾函式。

## 更新流程

1. 宿主 `campus-toolkit` 公開面變更 → 執行
   `node bin/module-snapshot-gen.mjs --host ../campus-toolkit`
   （自動重生 `snapshots/lib`、`types`、`components` 並更新 `HOST_SURFACE_SNAPSHOT`）
1. `npm test`（附錄 A 全綠＋ golden modules 的 check 與影子 tsc）
1. commit 訊息註明宿主版本對應；tag `v1.x` 供市集以 `github:<owner>/module-sdk#v1.x` 釘版

## 維護者：CI 與分支保護

請在 GitHub repo 的 **Settings → Branches** 把 `CI / test` 設為 required status check，
避免未通過測試的變更直接進 `main`。

## 安全性

請不要開公開 issue；回報方式與範圍見 [`SECURITY.md`](SECURITY.md)。
`module:check` 是啟發式掃描，**不是沙箱**——它降低風險，但不能保證模組安全。

## 授權

[MIT](LICENSE)
