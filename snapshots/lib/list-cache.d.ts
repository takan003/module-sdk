/** 型別快照：宿主 @/lib/list-cache（管理端列表共用快取；簽名以主程式 0.391 實作為準） */
/** 回傳連同 epoch：快取 key 與回應 cacheEpoch 必須同源 */
export async function cachedListRead<T>(
  key: string,
  load: () => Promise<T>,
  ttlMs?: number
): Promise<{ data: T; epoch: number }>;
export function invalidateAdminListCache(): Promise<void>;
export const LIST_CACHE_TTL_MS: number;
