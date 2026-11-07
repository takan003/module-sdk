import "server-only";
import type { FirebaseUsage } from "@/types/usage";
/** Firestore 每日免費額度（見 Firebase 定價文件） */
export declare const FIRESTORE_FREE_LIMITS: {
    readonly reads: 50000;
    readonly writes: 20000;
    readonly deletes: 20000;
};
/** 取得 Firestore 今日與近 7 日用量（任何失敗都回結構化結果，不丟例外） */
export declare function getFirebaseUsage(): Promise<FirebaseUsage>;
