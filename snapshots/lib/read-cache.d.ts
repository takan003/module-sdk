/** 型別快照：宿主 @/lib/read-cache（簽名以主程式 0.391 實作為準） */
export function cachedRead<T>(key: string, ttlMs: number, load: () => Promise<T>): Promise<T>;
/** 讀取後呼叫；prefix 缺省＝全域失效 */
export function invalidateReadCache(prefix?: string): void;
