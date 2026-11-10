/**
 * API request body 大小限制的純政策（P0-4）。
 *
 * 零依賴，供 `http-body.ts`、模組 runtime 與測試共用。
 * 目的：在讀取（`request.json()`／`request.formData()`）之前先依
 * Content-Length／Content-Type 擋掉明顯過大的請求，避免整包內容被
 * 緩衝進記憶體造成 DoS。
 */
/** JSON 預設上限：1 MiB（一般表單／設定／批次選取都遠小於此）。 */
export declare const DEFAULT_JSON_BODY_BYTES = 1048576;
/** multipart／檔案上傳預設上限：25 MiB（模組 zip 另有自己的更嚴上限）。 */
export declare const DEFAULT_FORM_BODY_BYTES: number;
/** 其他文字型內容預設上限：1 MiB。 */
export declare const DEFAULT_OTHER_BODY_BYTES = 1048576;
export interface BodyLimitInput {
    method: string;
    contentType: string | null;
    contentLength: string | null;
    transferEncoding: string | null;
    jsonMaxBytes?: number;
    formMaxBytes?: number;
    otherMaxBytes?: number;
}
export type BodyLimitDecision = {
    ok: true;
    maxBytes: number;
} | {
    ok: false;
    reason: "too-large" | "unknown-length";
    maxBytes: number;
};
/** 依 Content-Type 決定這個請求適用的上限。 */
export declare function maxBytesForContentType(contentType: string | null, overrides?: Pick<BodyLimitInput, "jsonMaxBytes" | "formMaxBytes" | "otherMaxBytes">): number;
/** 解析 Content-Length；格式不合法回 null（呼叫端應 fail-closed）。 */
export declare function parseContentLength(raw: string | null): number | null;
/**
 * 判斷請求是否應在讀取前被拒絕。
 *
 * - 沒有 body 的方法 → 直接放行。
 * - 有 Content-Length → 超過上限即拒絕。
 * - 沒有 Content-Length 且使用 chunked → 拒絕（無法在讀取前確認大小，fail-closed）。
 * - 沒有 Content-Length 也沒有 chunked → 視為無 body 放行。
 */
export declare function evaluateBodyLimit(input: BodyLimitInput): BodyLimitDecision;
