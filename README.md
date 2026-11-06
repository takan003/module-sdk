# module-sdk（期 1）

數位校園工具箱選用（外掛）功能模組 SDK：讓外部開發者在**沒有主程式**的環境也能寫模組、跑基本驗證。
規格：`campus-toolkit/docs/模組市集與外掛開發.md` §3.2、§6.3、附錄 A。

## 內容

| 內容 | 位置 |
|---|---|
| 契約常數（`MODULE_CONTRACT_VERSION`、白名單、內建代碼/路由快照） | `src/constants.mjs` |
| manifest 驗證（宿主掃描器鏡射＋E1 規則） | `src/validate-manifest.mjs` |
| `module:check` 靜態掃描（§6.3 十條規則的可自動化子集） | `src/check.mjs`、`src/scan-code.mjs`、`bin/module-check.mjs` |
| 型別快照 `.d.ts`（§3.3 允許面） | `snapshots/` |
| 影子 tsc【E14】（快照＋paths 對模組跑 `tsc --noEmit`） | `bin/module-shadow-tsc.mjs`、`tsconfig.shadow.json` |
| manifest JSON Schema（市集與安裝端雙邊同一份） | `module.schema.json` |
| 附錄 A 測試案例 | `test/run-tests.mjs`（`npm test`） |

## 用法

```bash
# 靜態檢查（零依賴，Node ≥20）
node bin/module-check.mjs <模組資料夾> [--host-version 0.388] [--json]
# 退出碼 0＝通過（warning 不擋）；1＝有 error

# 影子 tsc（需環境有 tsc；本機可借宿主的）
node bin/module-shadow-tsc.mjs <模組資料夾> --tsc <tsc路徑>
```

## 契約權威順序（v1）

**A（主程式）與官方範例模組 E／F／G 的實際可運作 > B（module-sdk）。**

B 是衍生工具，不是規則來源；B 的 allowlist／snapshots 與 E／F／G 衝突時，修改 B，不是修改 E／F／G。
`npm test` 會用 E／F／G 當 golden modules（找不到時 skip；可用 `GOLDEN_MODULES_DIR` 指定路徑）。

## 穩定性承諾【E4】

同一 `contractVersion`（目前 `1`）內，§3.3 允許面**只增不改不刪**；破壞性變更才遞增版本。
`snapshots/` 目前仍對應宿主 `0.391`（待重生）；`module:check` 預設比對宿主 `0.628`（`DEFAULT_HOST_VERSION`）。
第一階段已先把 allowlist 與官方 E／F／G 對齊；影子 tsc／snapshots 是下一階段。

## 邊界（讀懂這段才不會誤用）

- `module:check` 是**啟發式靜態掃描**（字串＋import 比對）：能抓常見違規，抓不完——
  宿主安裝端⑨與 `npm run lint`（真 tsc＋eslint）才是最終判定。
- 影子 tsc 用寬鬆樁型別（react/next 為 any 層）：目的是提前抓「用錯公開面」（例如 import 錯名、
  props 缺漏），不是完整型別驗證。
- #4（status=live 上架條件）與 #13（sha256 完整性）屬市集/安裝端案例，本地 check 不實作（見附錄 A 測試輸出）。

## 更新流程

1. 宿主 `campus-toolkit` 公開面變更 → 更新對應 `snapshots/*.d.ts`＋必要時 `src/constants.mjs` 快照
2. `npm test`（附錄 A 全綠）
3. commit 訊息註明宿主版本對應；tag `v1.x` 供市集以 `github:<owner>/module-sdk#v1.x` 釘版
