import "server-only";
import { NextRequest, NextResponse } from "next/server";
export { DEFAULT_FORM_BODY_BYTES, DEFAULT_OTHER_BODY_BYTES, } from "@/lib/http-body-policy";
/**
 * API request body 大小限制（P0-4）。
 *
 * 用法：
 * ```ts
 * const parsed = await readJsonBody<{ id?: unknown }>(request);
 * if (!parsed.ok) return parsed.response;
 * const body = parsed.data;
 * ```
 *
 * `readJsonBody` 會在串流讀取時計數，即使沒有 Content-Length（chunked）
 * 也不會把超過上限的內容整包緩衝進記憶體。
 */
export declare function bodyTooLargeResponse(): NextResponse;
/**
 * 在讀取 body 前先依 Content-Length／Content-Type 擋掉過大的請求。
 * 適合 `request.formData()` 這類無法自行串流計數的呼叫。
 *
 * @returns 需要拒絕時回傳 413 回應；否則回 null。
 */
export declare function assertBodySize(request: NextRequest, maxBytes?: number): NextResponse | null;
export type JsonBodyResult<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    response: NextResponse;
};
/**
 * 讀取 JSON body，並套用大小上限。
 *
 * - 超過上限 → `{ ok: false, response: 413 }`
 * - JSON 格式錯誤 → `{ ok: false, response: 400 }`
 */
export declare function readJsonBody<T = unknown>(request: NextRequest, maxBytes?: number): Promise<JsonBodyResult<T>>;
