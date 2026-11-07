import "server-only";
interface EndpointStat {
    label: string;
    requests: number;
    reads: number;
    writes: number;
    deletes: number;
    firstAt: number;
    lastAt: number;
}
export interface ReadStatsSnapshot {
    enabled: boolean;
    instanceId: string;
    startedAt: number;
    totals: {
        requests: number;
        reads: number;
        writes: number;
        deletes: number;
    };
    byEndpoint: EndpointStat[];
    byCollection: Array<{
        name: string;
        reads: number;
    }>;
    /** 執行環境診斷（僅回報存在與否＋字元數，不回報內容） */
    diag: ReadStatsDiag;
}
/** 執行環境診斷：讓儀表板能看出「環境變數到底有沒有進到這個實例」 */
export interface ReadStatsDiag {
    /** `process.env.NODE_ENV` */
    nodeEnv: string;
    /** `READ_STATS` 是否存在與其字元數（不含空白前後） */
    readStats: {
        set: boolean;
        len: number;
    };
    /** `READ_STATS_LOG` 是否存在與其字元數 */
    readStatsLog: {
        set: boolean;
        len: number;
    };
    /** `FIREBASE_SERVICE_ACCOUNT_KEY` 是否存在（儀表板另一區塊的前置條件） */
    serviceAccountKey: {
        set: boolean;
        len: number;
    };
    /** App Hosting／Cloud Run 執行環境指標（存在＝部署在 GCP 伺服端） */
    kService: boolean;
}
/** production 關閉、其他環境（dev/test）預設啟用；READ_STATS 可在 production 強制開啟（1/true/yes/on）、關閉（0/false/no/off） */
export declare function isReadStatsEnabled(): boolean;
/**
 * 建立（或沿用）當前請求的讀取範圍。
 * 已在範圍內（同一請求已呼叫過）＝不覆蓋，保留最初建立時的 label。
 */
export declare function ensureReadScope(label: string): void;
/** 記錄 n 次文件讀取（呼叫端已算好計費語意的 n） */
export declare function recordReads(collection: string, n: number): void;
/** 記錄 n 次文件寫入（set/update/create/add/batch 對應筆數） */
export declare function recordWrites(n: number): void;
/** 記錄 n 次文件刪除 */
export declare function recordDeletes(n: number): void;
/** 儀表板快照：端點排行（依讀取數、上限 50）＋集合排行（上限 50）＋總計 */
export declare function getReadStatsSnapshot(): ReadStatsSnapshot;
/** 開發用：清空本實例統計 */
export declare function resetReadStats(): void;
export {};
