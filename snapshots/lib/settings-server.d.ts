import "server-only";
import { SchoolPeriod } from "@/types/settings";
export declare const SETTINGS_COLLECTION = "settings";
export declare const SETTINGS_DOC_ID = "system";
/** 任何設定（含 roleEnabled、featureModules 欄位）寫入後呼叫，讓設定快取立即失效 */
export declare function invalidateSettingsCache(): void;
/** 全域清單快取版本旗標的欄位名（見 docs/資料庫讀取規範.md 鐵律 6：跨實例失效） */
export declare const CACHE_EPOCH_FIELD = "cacheEpoch";
/**
 * 讀取 `settings/system.cacheEpoch`（全域清單快取的失效旗標）。
 * 讀同一份 readSystemDoc 快取（30 秒），因此**每請求驗證路徑已讀過時為 0 次額外讀取**；
 * 欄位缺漏或讀失敗回 0（未 bump 過的初始值）。
 */
export declare function getCacheEpoch(): Promise<number>;
/**
 * 遞增 `settings/system.cacheEpoch`，讓**所有實例**的清單快取（key 綁 epoch）立即失效。
 * serverless 多實例間無法互通知程序內快取，改以這份跨實例共用的旗標傳達「有資料變更」；
 * 讀端以 readSystemDoc 快取吸收，延遲上限＝設定快取 TTL（30 秒）。
 * 使用 merge set＋FieldValue.increment：settings/system 尚未存在時也能安全建立。
 * 成功後同步清除本程序的設定快取（立即看到新 epoch）。
 */
export declare function bumpCacheEpoch(): Promise<void>;
/**
 * 讀取 `settings/system` 整份文件（30 秒 in-process 快取，全站共用）。
 * 讀失敗回退上次快取值；從未成功讀取過則回 null，由各讀取函式自行套用預設值
 * （維持各欄位原本 fail-safe／fail-closed 的預設行為）。
 */
export declare function readSystemDoc(): Promise<Record<string, unknown> | null>;
/**
 * 讀取 settings.systemEnabled（維護模式），供伺服器端強制執行。
 * 讀同一份 settings/system 快取；欄位缺漏時回預設啟用（fail-safe）。
 */
export declare function isSystemEnabled(): Promise<boolean>;
/**
 * 讀取 settings.oauthEnabled（是否啟用 Google OAuth 登入）。
 * 啟用時首頁才顯示 Google 登入入口，且 Google 登入免兩階段驗證（由 Google 把關）；
 * 帳密登入不受此開關影響，仍照常檢查使用者設定的兩階段驗證。
 * 欄位缺漏＝停用（fail-closed）。
 */
export declare function isGoogleOAuthEnabled(): Promise<boolean>;
/**
 * 讀取 settings.sessionTimeout（分鐘），供伺服器端閒置逾時檢查使用。
 * 讀同一份 settings/system 快取；欄位缺漏或值無效時回預設值。
 */
export declare function getSessionTimeoutMinutes(): Promise<number>;
/**
 * 讀取 settings.cacheTtlSeconds（清單類快取壽命，秒）。
 * 主程式與所有功能模組統一使用：`cachedListRead` 預設 TTL 與模組名單快取皆由此取得。
 * 讀同一份 settings/system 快取；欄位缺漏、非有限數或超出 30–300 範圍時自動夾到合法值。
 */
export declare function getCacheTtlSeconds(): Promise<number>;
/**
 * 讀取 settings.emailChangeAllowed（是否開放使用者自行變更電子郵件地址）。
 * 讀同一份 settings/system 快取；欄位缺漏＝預設開放。
 */
export declare function isEmailChangeAllowed(): Promise<boolean>;
/**
 * 目前學年度與學期（settings.system 的 academicYear／semester）。
 * 身分名冊（roster 集合）寫入與讀取都以這個期間為準，讀同一份 settings/system 快取；
 * 欄位缺漏或讀失敗時回退依日期推算的值。
 */
export declare function getCurrentPeriod(): Promise<SchoolPeriod>;
/**
 * 驗證碼APP（TOTP）的發行者名稱，顯示為「系統名稱-學校簡稱：帳號」。
 * 學校簡稱未填時退用學校全稱，兩者都沒填時只顯示系統名稱。
 */
export declare function getTotpIssuer(): Promise<string>;
/**
 * 取得信件抬頭用的識別名稱：
 * systemName 一律有值（未自命名時用預設系統名稱），schoolFullName 可為空。
 * 信件以「系統名稱｜學校名稱」併列，讓收件人知道信件來自哪一個程式系統。
 */
export declare function getMailIdentity(): Promise<{
    systemName: string;
    schoolFullName: string;
}>;
