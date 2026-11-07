import "server-only";
/**
 * Cloud Monitoring 共用元件（僅伺服器端）——統計儀表板的 Firestore 與 App Hosting 用量共用。
 *
 * 職責：服務帳號解析 → 存取權杖（記憶體快取 45 分鐘）→ `projects.timeSeries.list`
 * 呼叫與 Google API 錯誤解析，並提供缺權限／API 未啟用時的授權指引字串。
 * 指標語意（切日、額度表）留在各使用端（`usage-firebase`／`usage-apphosting`）。
 */
export declare const MONITORING_BASE = "https://monitoring.googleapis.com/v3";
export interface GoogleApiError {
    message: string;
    /** `error.details[].reason`（如 `SERVICE_DISABLED`、`ACCESS_NOT_GRANTED`） */
    reasons: string[];
}
/** 解析 Google API 錯誤回應（`{"error":{"code","message","status","details"}}`） */
export declare function parseGoogleError(body: string): GoogleApiError | null;
export interface MonitoringCredentials {
    clientEmail: string;
    privateKey: string;
    projectId: string;
}
export declare function resolveCredentials(): {
    ok: true;
    credentials: MonitoringCredentials;
} | {
    ok: false;
    message: string;
};
export declare function getAccessToken(): Promise<string>;
export interface TimeSeriesPoint {
    startTime: string;
    value: number;
}
export type TimeSeriesResult = {
    points: TimeSeriesPoint[];
} | {
    error: {
        status: number;
        message: string;
        reasons: string[];
    };
};
/** 抓單一指標在區間內的合計點列（alignmentPeriod 內 ALIGN_SUM＋跨系列 REDUCE_SUM） */
export declare function fetchTimeSeries(projectId: string, options: {
    filter: string;
    startTime: string;
    endTime: string;
    /** Google Duration 字串（如 "3600s"、"86400s"）；寫成純數字會回 400 */
    alignmentPeriod: string;
    perSeriesAligner: string;
    crossSeriesReducer?: string;
    pageSize?: string;
}): Promise<TimeSeriesResult>;
export declare const MONITORING_SETUP_HINT = "\u8A2D\u5B9A\u6B65\u9A5F\uFF1A\n1. \u53D6\u5F97\u670D\u52D9\u5E33\u865F\u4FE1\u7BB1\uFF08FIREBASE_SERVICE_ACCOUNT_KEY JSON \u5167\u7684 client_email\uFF09\n2. \u6388\u4E88 Cloud Monitoring \u6AA2\u8996\u6B0A\u9650\uFF08\u4E0B\u65B9\u6307\u5F15\u5DF2\u81EA\u52D5\u5E36\u5165\u5C08\u6848\u8207\u670D\u52D9\u5E33\u865F\uFF09\n3. \u91CD\u65B0\u90E8\u7F72\uFF0F\u91CD\u555F\u5F8C\u518D\u91CD\u65B0\u6574\u7406\u672C\u9801\n\uFF08Cloud Monitoring \u6307\u6A19\u8CC7\u6599\u901A\u5E38\u6709 1\uFF5E2 \u5206\u9418\u5EF6\u9072\uFF0C\u525B\u90E8\u7F72\u6642\u53EF\u80FD\u5C1A\u7121\u8CC7\u6599\u3002\uFF09";
/** 依實際專案／服務帳號產生的授權指引（指令與 Console 路徑都可直接照做） */
export declare function monitoringPermissionHint(projectId: string, clientEmail: string): string;
/** Cloud Monitoring API 未啟用的指引 */
export declare function monitoringApiDisabledHint(projectId: string): string;
