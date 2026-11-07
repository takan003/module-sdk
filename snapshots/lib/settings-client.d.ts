/**
 * `/api/settings` 的前端共用讀寫（模組層）：
 * - 快取依「目前 session 身分」分槽（未登入＝"anon"），30 秒內同身分重複請求
 *   直接吃快取；身分一變（登入／登出／切換／選身分）key 自然不符 → 強制重抓，
 *   避免舊身分的 visibleModules 在新身分頁殘留（入口卡鬼魂）或反向全數消失。
 * - 同身分內併入 in-flight 去重，避免同畫面多處呼叫重複打網路。
 * - 任何回應自帶的 `cacheEpoch` 一律採用（伺服器真相），
 *   供 list-store 判斷手上的清單是否已過期。
 *
 * 變更設定後（admin/settings 的 PUT）或身分切換（RoleSwitcher）呼叫
 * `invalidateSettings()` 捨棄全部分槽，強制下次讀回最新值。
 */
import { Settings } from "@/types/settings";
export interface SettingsResponse {
    success?: boolean;
    /** 已併入預設值前的原始設定（各頁自行以 defaultSettings 補預設值） */
    settings?: Partial<Settings>;
    manageable?: boolean;
    /** 目前身分可見的功能模組代碼（提供功能 AND 顯示與否；未登入＝空陣列） */
    visibleModules?: string[];
    /** 清單快取的跨實例失效旗標（number；缺漏表示尚未取得） */
    cacheEpoch?: number;
}
/** 採用伺服器宣告的目前 epoch（任何形式的回應都可呼叫） */
export declare function adoptCacheEpoch(value: unknown): number | null;
/** 目前已知的 epoch（null＝尚未取得，list-store 會因此拒絕命中） */
export declare function getCacheEpoch(): number | null;
/** 讀取系統設定（依身分分槽的 30 秒快取＋同身分去重；force＝捨棄快取重新取得） */
export declare function fetchSettings(options?: {
    force?: boolean;
}): Promise<SettingsResponse>;
/** 捨棄全部身分的設定快取（設定被寫入或身分切換後呼叫；新值由下次 fetchSettings 取得） */
export declare function invalidateSettings(): void;
