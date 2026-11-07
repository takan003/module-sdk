# 安全性政策（module-sdk）

## 回報漏洞

請**不要**開公開 issue。請使用 GitHub 的私人安全回報：

<https://github.com/takan003/module-sdk/security/advisories/new>

回報時請附上：

1. 受影響的 SDK 版本（`package.json`）與宿主版本（`snapshots/.meta.json`）
2. 重現步驟或最小範例
3. 影響範圍（例如掃描器繞過、快照錯誤導致誤放行）
4. 是否涉及實際部署或個資

修復前請勿公開細節；確認後會盡快回覆與修正。

## 範圍

- `module:check` 靜態掃描規則的繞過
- manifest 驗證錯誤導致不安全模組可通過
- 影子 tsc／快照錯誤導致公開面誤判
- CI／發布流程的供應鏈風險

## 不在範圍

- 主程式本身的安全問題（請回報到 `takan003/campus-toolkit`）
- 市集索引與簽章（請回報到 `takan003/campus-toolkit-marketplace`）
- fork 主人自行修改的 SDK 或 local 模組
- `module:check` 是啟發式掃描，**不是沙箱**；已知限制不視為漏洞

## 支援版本

僅支援最新 `main` 與最近一個 `v1.x` 標籤。舊版請先升級再回報。
