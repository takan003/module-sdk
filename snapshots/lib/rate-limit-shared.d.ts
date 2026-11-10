/**
 * Upstash REST 固定視窗限流的純邏輯（P0-3）。
 *
 * 與 `rate-limit.ts` 分開，方便用假 `fetch` 做單元測試。
 * 這裡不讀 `process.env`，設定由呼叫端傳入。
 */
export interface SharedRateLimitConfig {
    url: string;
    token: string;
}
export interface SharedRateLimitResult {
    ok: boolean;
    remaining: number;
    retryAfterSec: number;
}
/** 解析 Upstash 設定；缺少任一項回 null（代表不啟用跨實例）。 */
export declare function parseSharedRateLimitConfig(url: string | undefined, token: string | undefined): SharedRateLimitConfig | null;
/** Redis key 只放雜湊，避免 IP／信箱等識別資料原樣送到外部服務。 */
export declare function hashRateLimitKey(key: string): string;
/** 固定視窗 key：同一視窗共用一個計數桶。 */
export declare function buildSharedRateLimitKey(now: number, windowMs: number, key: string): string;
/** 解析 Upstash pipeline 回應的第一個 INCR 結果。 */
export declare function parsePipelineCount(payload: unknown): number | null;
/** 依計數產生限流結果；超限時計算到下一個視窗的秒數。 */
export declare function decideSharedRateLimit(count: number, limit: number, now: number, windowMs: number): SharedRateLimitResult;
/**
 * 呼叫 Upstash REST pipeline（INCR＋PEXPIRE）。
 *
 * 回傳 null 代表呼叫失敗或回應格式不符；呼叫端應退回進程內結果。
 * 固定視窗的副作用是視窗交界可能允許短暫兩倍流量，對本專案的防護足夠。
 */
export declare function checkSharedRateLimit(options: {
    key: string;
    limit: number;
    windowMs: number;
    config: SharedRateLimitConfig;
    now?: number;
    fetchImpl?: typeof fetch;
}): Promise<SharedRateLimitResult | null>;
