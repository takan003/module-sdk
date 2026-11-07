/**
 * 市集 repo 的 GitHub 服務帳號橋樑（M2.5／§21）。
 *
 * 以環境變數 `THEME_MARKET_GITHUB_TOKEN`（僅需目標倉庫 contents ＋ pull requests 寫入）
 * 對市集 repo 開 PR——PR 即審核佇列，不設市集端資料庫與帳密。
 * 檔案內容依契約 §11.2：theme.json＋tokens.json＋styles.css（生成器產出，CI merge 後會再重建索引）。
 */
export interface ThemeSubmissionInput {
    mode: "publish" | "submit";
    id: string;
    name: string;
    description: string;
    author: string;
    version: string;
    tags: string[];
    colors: Record<string, string>;
    provenance: string;
}
/** 解析服務帳號設定；未設定時回 null（路由回 503 指引） */
export declare function resolveMarketGithubConfig(): {
    token: string;
    repo: string;
} | null;
/** 驗證並整理投稿／發佈 payload（不符合契約 §11.1 時 throw，訊息可直回使用者） */
export declare function prepareThemeSubmission(body: Record<string, unknown>, options: {
    mode: "publish" | "submit";
    defaultAuthor: string;
}): ThemeSubmissionInput;
/** 對市集 repo 開 PR（管理員發佈＝正式 PR；使用者投稿＝draft PR） */
export declare function createThemePullRequest(input: ThemeSubmissionInput): Promise<{
    prUrl: string;
    branch: string;
}>;
