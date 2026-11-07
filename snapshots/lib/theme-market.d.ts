/**
 * 主題市集伺服器端共用工具（比照模組市集 install/route.ts 的安全檢查模式）。
 *
 * 職責（協議 docs/PROTOCOL.md §6）：
 * - 市集來源 URL 解析（https 唯一，dev 例外放行 localhost）
 * - downloadUrl 安全檢查（hostname 必須與市集來源一致，防 SSRF）
 * - theme.json manifest 驗證
 * - styles.css token 白名單與值安全驗證
 * - minHostVersion 比較（主程式版本取自 src/version.json）
 */
import { ThemeMarketIndex } from "@/types/theme-market";
export declare const SUPPORTED_CONTRACT_VERSION = 1;
/** theme.json 上限（bytes） */
export declare const MAX_THEME_JSON_BYTES: number;
/** styles.css 上限（bytes）：純變數覆寫，遠小於此限 */
export declare const MAX_CSS_BYTES: number;
export interface ThemeManifest {
    id: string;
    name: string;
    version: string;
    themeId: string;
    minHostVersion: string;
    author: string;
    description: string;
    preview: string;
    category: string;
    tags: string[];
    contractVersion: number;
    cssFile: string;
}
/**
 * 內建預設市集來源：fork 的學校零設定即可使用主題市集。
 * 環境變數 THEME_MARKET_INDEX_URL / THEME_MARKET_URL 僅供「想指向自己市集」的部署覆寫。
 */
export declare const DEFAULT_THEME_MARKET_INDEX_URL = "https://raw.githubusercontent.com/takan003/campus-toolkit-theme-marketplace/main/index.json";
export declare const THEME_MARKET_INDEX_URL_FIELD = "themeMarketIndexUrl";
export declare function resolveThemeMarketIndexUrl(): Promise<string | null>;
export declare function resolveThemeMarketHost(): Promise<string | null>;
/** downloadUrl 安全檢查：https 唯一（dev localhost 例外）＋主機必須＝市集來源主機 */
export declare function assertSafeThemeDownloadUrl(raw: string): Promise<URL>;
export declare function readHostVersion(): string;
/** current >= min（semver 數值比較，缺段補 0；比對不合法時回 false＝拒絕） */
export declare function versionAtLeast(current: string, min: string): boolean;
/** theme.json manifest 驗證（契約 theme.schema.json ＋ §6-8） */
export declare function validateThemeManifest(raw: unknown, expectedId: string): ThemeManifest;
/** token 值安全驗證：僅允許安全的 CSS 宣告值（契約 §6-9） */
export declare function assertSafeThemeColorValue(key: string, value: string): string;
/**
 * styles.css token 解析（契約 §5.2/§5.3）：
 * - 必須恰好含一個 html[data-theme="market:{id}"] 區塊，且檔案中不得有其他規則
 * - 鍵必須屬於 THEME_COLOR_KEYS 白名單
 * - 值必須通過 assertSafeThemeColorValue
 */
export declare function parseThemeCssVariables(css: string, themeId: string): Record<string, string>;
/** 主題套件下載上限（bytes，契約 §6-6 建議 5MB） */
export declare const MAX_ARCHIVE_BYTES: number;
/** token 物件驗證（投稿／發佈 payload 用）：白名單＋必填鍵＋值安全 */
export declare function validateColorTokens(raw: unknown): Record<string, string>;
/** 由 token 物件生成 styles.css（契約 §5.2/§5.4，輸出格式固定） */
export declare function generateThemeCss(themeId: string, colors: Record<string, string>): string;
/** 下載主題 zip 並驗證 sha256（含 URL 安全檢查與大小上限） */
export declare function downloadThemeZip(downloadUrl: string, expectedSha256: string): Promise<{
    filePath: string;
    sha256: string;
}>;
/** 解壓 zip（含 zip slip／解壓炸彈防護），回傳解壓根目錄 */
export declare function extractThemeZip(filePath: string): string;
export declare function findThemeManifestRoot(sourceDir: string): string;
export interface LoadedThemePackage {
    manifest: ThemeManifest;
    colors: import("@/types/theme").ThemeColors;
    checksumSha256?: string;
}
/** 讀取並驗證解壓目錄中的主題包（theme.json → manifest、styles.css → colors 以預設補底） */
export declare function loadThemePackage(workingDir: string, expectedId: string, options?: {
    expectedVersion?: string;
    checksumSha256?: string;
}): LoadedThemePackage;
/** 抓取市集索引（5 分鐘記憶體快取；來源不可用時若持有過期快取則降級使用） */
export declare function fetchThemeMarketIndex(): Promise<ThemeMarketIndex>;
