/**
 * 用戶端安全讀取 API 回應：Vercel 逾時（504）等錯誤回的是純文字或 HTML，
 * 直接 res.json() 會拋出難解的 JSON 解析錯誤；先讀成文字再解析，
 * 依 status／內容給出可讀的中文訊息。回應為合法 JSON 時原樣返回，
 * 仍由呼叫端檢查 res.ok 與 data.success。
 */
export declare function readJsonResponse<T = Record<string, unknown>>(res: Response): Promise<T>;
