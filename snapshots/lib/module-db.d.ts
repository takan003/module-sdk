import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";
/**
 * 取得受限的 AdminDb：`collection(name)` 超出宣告範圍即拋錯。
 * 其餘 Firestore 介面（doc/getAll/runTransaction…）原樣委派。
 */
export declare function scopedDb(moduleValue: string): ReturnType<typeof getAdminDb>;
/** 該模組是否被允許存取某集合（供測試與除錯） */
export declare function canAccessCollection(moduleValue: string, collectionName: string): boolean;
