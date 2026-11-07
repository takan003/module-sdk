import "server-only";
import type { AppHostingUsage } from "@/types/usage";
/** App Hosting 每月免費額度（見 Firebase「Understand App Hosting costs」官方文件） */
export declare const APP_HOSTING_FREE_LIMITS: {
    /** Cloud Run 請求數（次） */
    readonly requests: 2000000;
    /** Cloud Run CPU 時間（vCPU-秒） */
    readonly cpuSeconds: 180000;
    /** Cloud Run 記憶體時間（GiB-秒） */
    readonly memoryGibSeconds: 360000;
};
/** 取得 App Hosting 本月用量（任何失敗都回結構化結果，不丟例外） */
export declare function getAppHostingUsage(): Promise<AppHostingUsage>;
