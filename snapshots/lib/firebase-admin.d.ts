import "server-only";
import { ServiceAccount } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";
import { Auth } from "firebase-admin/auth";
/** 解析 `FIREBASE_SERVICE_ACCOUNT_KEY`（純 JSON／引號包覆 JSON／base64 皆可）；「統計儀表板」取用以呼叫 Cloud Monitoring */
export declare function parseServiceAccount(raw: string): ServiceAccount;
export declare function getAdminDb(): Firestore;
export declare function getAdminAuth(): Auth;
/** Firebase Storage 私有 bucket：每個主程式 fork 使用自己的 NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET。 */
export declare function getAdminStorageBucket(): import("@google-cloud/storage").Bucket;
export { FieldValue } from "firebase-admin/firestore";
