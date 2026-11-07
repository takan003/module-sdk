/**
 * 主題市集索引契約（對應市集 repo 的 docs/PROTOCOL.md §4.1）。
 * 解析規則比照模組市集（types/module-market.ts）：只驗必填字串，
 * checksum／URL／版本安全檢查在安裝路由強制執行。
 */
export interface ThemeMarketEntry {
    id: string;
    name: string;
    description: string;
    version: string;
    latestVersion?: string;
    minHostVersion?: string;
    repoUrl?: string;
    downloadUrl?: string;
    checksumSha256?: string;
    category?: string;
    tags?: string[];
}
export interface ThemeMarketIndex {
    generatedAt?: string;
    marketplaceVersion?: string;
    themes: ThemeMarketEntry[];
}
export declare function parseThemeMarketEntry(value: unknown): ThemeMarketEntry | null;
/**
 * 解析市集索引。契約規定 category 固定為 "theme"（市集 repo 只發佈主題），
 * 缺少 category 的條目一律過濾，避免模組條目混入主題市集。
 */
export declare function parseThemeMarketIndex(value: unknown): ThemeMarketIndex | null;
