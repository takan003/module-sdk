/** 型別快照：宿主 @/lib/read-cache */
export function cachedRead<T>(key: string, loader: () => Promise<T>, ttlMs?: number): Promise<T>;
/** 寫入後呼叫；prefix 缺省＝全域失效 */
export function invalidateReadCache(prefix?: string): void;
