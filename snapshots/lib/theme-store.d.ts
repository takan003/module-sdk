/**
 * 主題本體的瀏覽器端儲存層（Step 9）。
 *
 * 主程式部署於 Vercel、production 檔案系統唯讀，因此安裝紀錄不走檔案系統：
 * - 主題內容（token colors）→ localStorage `campusTheme_{themeId}`
 * - 已安裝清單 → localStorage `campusThemeInstalled`
 * - 帳號層 themeId 同步為 Phase 4（users.cssThemeId），本層先負責本機快取
 *
 * 鍵名為歷史命名（與早期 CSS 主題規劃一致），既有使用者快取相容，勿任意變更：
 * - 主題內容 → localStorage `campusTheme_{themeId}`
 * - 已安裝清單 → localStorage `campusThemeInstalled`
 */
import { Theme } from "@/types/theme";
export interface InstalledThemeRecord {
    id: string;
    name: string;
    version: string;
    source: "market" | "custom";
    installedAt: string;
    /** 自訂主題的色彩備援（方案 C：僅編輯器儲存時寫入帳號，供跨裝置還原） */
    colors?: Record<string, string>;
}
export declare function listInstalledThemes(): InstalledThemeRecord[];
/** 讀取已安裝主題（market:/custom:），格式不合法時回 null */
export declare function readStoredTheme(id: string): Theme | null;
export declare function isThemeInstalled(id: string): boolean;
/** 安裝／更新主題（安裝路由驗證通過後由前端呼叫） */
export declare function saveInstalledTheme(record: InstalledThemeRecord, theme: Pick<Theme, "colors" | "preview">): void;
export declare function removeInstalledTheme(id: string): void;
export interface ThemeAccountPrefs {
    cssThemeId: string;
    installedThemes: InstalledThemeRecord[];
}
/** 從主程式內容端點取回 market: 主題（伺服器已驗證 checksum／契約），存入本機快取 */
export declare function ensureMarketTheme(id: string): Promise<Theme | null>;
/** 讀取帳號主題偏好（未登入或失敗回 null） */
export declare function fetchAccountThemePrefs(): Promise<ThemeAccountPrefs | null>;
export declare function saveAccountThemeId(themeId: string): Promise<void>;
/**
 * 把本機已安裝清單同步到帳號（安裝／卸載後呼叫）。
 * 方案 C：只在呼叫端指定 includeColorsFor 時（＝編輯器按「儲存」的罕見時刻）
 * 才把該自訂主題的色彩附上——切主題、登入等高頻行為一律不寫色彩。
 */
export declare function syncInstalledThemesToAccount(options?: {
    includeColorsFor?: string;
}): Promise<void>;
/**
 * 從帳號偏好還原本機缺貨的自訂主題（登入時呼叫，方案 C 的讀回路徑）。
 * 只還原本機不存在的 custom: 主題；market: 走 ensureMarketTheme 從市集重抓。
 * 回傳是否有還原任何主題。
 */
export declare function restoreInstalledFromAccount(records: InstalledThemeRecord[]): boolean;
