/** 型別快照：宿主 @/lib/list-cache（管理端列表共用快取） */
export function cachedListRead<T>(key: string, loader: () => Promise<T>): Promise<T>;
export function invalidateAdminListCache(): Promise<void>;
export const LIST_CACHE_TTL_MS: number;
