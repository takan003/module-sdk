/**
 * 模組資料存取範圍（P0-2 v2）——純政策＋Proxy 實作。
 *
 * 本檔不 import server-only／宿主模組，方便測試；
 * 實際的 AdminDb 由 `module-db.ts` 注入。
 *
 * 集合政策：
 * - `reserved`：宿主保留集合，模組一律不可讀寫（users／settings／activityLog／revokedJTIs）。
 * - `facility`：宿主設施集合（announcements／calendarEvents），一律走掛勾函式，不可直接存取。
 * - `coreReadOnly`：核心個資集合（身分名冊、個人資料），可讀不可寫。
 * - `unknown`：需在 manifest `dataCollections` 宣告；宣告後可讀寫。
 */
/** 宿主保留集合：一律拒絕（P0-2） */
export declare const HOST_RESERVED_COLLECTIONS: readonly ["users", "settings", "activityLog", "revokedJTIs"];
/** 宿主設施集合：一律走 publishFromModule／publishScheduleFromModule */
export declare const HOST_FACILITY_COLLECTIONS: readonly ["announcements", "calendarEvents"];
/**
 * 核心個資集合：模組可讀、不可寫。
 * 名冊四張表＋學生個人資料三張表。
 */
export declare const CORE_READ_ONLY_COLLECTIONS: readonly ["rosterStudents", "rosterParents", "rosterStaff", "rosterAdmins", "studentPersonalInfo", "studentPersonalIdentity", "studentPersonalPhoto"];
export type CollectionAccess = "readwrite" | "readonly";
export declare function isReservedCollection(name: string): boolean;
export declare function isFacilityCollection(name: string): boolean;
export declare function isCoreReadOnlyCollection(name: string): boolean;
/**
 * 判斷模組對某集合的存取模式；不允許時直接拋錯（fail-safe）。
 * @param moduleValue 模組代碼（僅用於錯誤訊息）
 * @param name 集合名稱
 * @param declared manifest `dataCollections` 宣告的集合
 */
export declare function resolveCollectionAccess(moduleValue: string, name: string, declared: ReadonlySet<string>): CollectionAccess;
/**
 * 建立受限的 AdminDb 代理。
 * @param db 真實 AdminDb（或測試用 fake）
 * @param moduleValue 模組代碼
 * @param declared manifest `dataCollections`
 */
export declare function createScopedDb<T extends Record<string, any>>(db: T, moduleValue: string, declared: ReadonlySet<string>): T;
