import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";
import { CORE_READ_ONLY_COLLECTIONS, HOST_FACILITY_COLLECTIONS, HOST_RESERVED_COLLECTIONS, isCoreReadOnlyCollection } from "@/lib/module-db-scope";
/** 取得受限的 AdminDb（見檔頭政策） */
export declare function scopedDb(moduleValue: string): ReturnType<typeof getAdminDb>;
/** 該模組是否被允許存取某集合（供測試與除錯；核心集合回 true，但僅唯讀） */
export declare function canAccessCollection(moduleValue: string, collectionName: string): boolean;
export { CORE_READ_ONLY_COLLECTIONS, HOST_FACILITY_COLLECTIONS, HOST_RESERVED_COLLECTIONS, isCoreReadOnlyCollection, };
