/**
 * 前端清單快取（tab 內模組層）：三張管理端清單在頁面重掛時免重新請求。
 *
 * 正確性不靠 TTL，靠 cacheEpoch：
 * - 伺服器每次寫入都會遞增 `settings/system.cacheEpoch`（見 list-cache.ts），
 *   任何一份清單回應都附帶當時的 epoch。
 * - 快取命中條件＝「存入時的 epoch」等於「目前的 epoch」（由 /api/settings 採用），
 *   epoch 一變（其他分頁、其他管理者寫入）即刻失效，即使 TTL 尚未到期。
 * - TTL 10 分鐘僅為防呆硬上限，與伺服端 list-cache 一致。
 *
 * 與伺服器的分工：
 * - 伺服端快取省的是 Firestore 讀取（實例內 30 秒＋epoch 跨實例失效）。
 * - 這裡省的是網路往返與渲染，並讓「變更後就地 patch」有可寫入的存放處。
 */
/** 讀取快取：epoch 不符或逾齡即視為未命中（不回 stale 資料） */
export declare function readList<T>(key: string, epoch: number | null | undefined): T | null;
/** 寫入快取：epoch 缺漏時改為清除（寧可下次重抓，不留無法驗證的資料） */
export declare function writeList<T>(key: string, epoch: number | null | undefined, data: T): void;
/** 主動捨棄（批次／銜接等整表 refetch 前呼叫，確保不命中舊資料） */
export declare function dropList(key: string): void;
