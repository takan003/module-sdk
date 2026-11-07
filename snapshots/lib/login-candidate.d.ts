import "server-only";
import type { DocumentReference, DocumentData } from "firebase-admin/firestore";
import { UserRole } from "@/types/users";
/** 使用者帳號的查詢結果（身分尚未決定；身分來自當期身分名冊） */
export interface AccountHit {
    /** 帳號文件 id（即 uid） */
    id: string;
    ref: DocumentReference;
    data: DocumentData;
}
/** 使用者帳號的一筆候選（身分 × 同一份使用者帳號文件） */
export interface AccountCandidate {
    role: UserRole;
    /** 帳號文件 id（即 uid，所有候選相同） */
    id: string;
    ref: DocumentReference;
    data: DocumentData;
}
/**
 * 依欄位（email／account）查找唯一的使用者帳號。
 * 帳號與電子郵件都全站唯一，故最多只會有一筆。
 */
export declare function findAccountBy(field: "email" | "account", value: string): Promise<AccountHit | null>;
/**
 * 身分候選：同一份使用者帳號在「當期」名冊中有效的身分，順序固定 ALL_ROLES。
 * ①帳號狀態有效 ②具備當期（同學年度學期）且狀態有效的身分名冊條目
 * ③該身分於身分開關（settings 的 roleEnabled）中為啟用。
 * adminsOnly（系統維護）時只保留管理員且不套身分停用，與非管理員一律 503 的行為一致，
 * 避免身分開關異常時連管理員都進不去、無從修正。
 */
export declare function detectRoleCandidates(hit: AccountHit, options?: {
    adminsOnly?: boolean;
}): Promise<AccountCandidate[]>;
/**
 * 慣用身分：彙整候選上的 preferredRole（僅承認候選中真實存在的身分），
 * 剛好只有一個選擇才生效；沒有設定或多個互斥設定都回 null（交由選擇步驟處理）。
 */
export declare function preferredRoleAmong(candidates: readonly {
    role: UserRole;
    data: DocumentData;
}[]): UserRole | null;
/** 多身分選擇回應的身分清單（固定 ALL_ROLES 順序） */
export declare function orderRoles(roles: UserRole[]): UserRole[];
/**
 * 載入「使用者帳號＋當期該身分名冊條目」，並檢查兩層狀態。
 * 帳號不存在／帳號無效／名冊條目不存在或無效都回 null（session 與中途憑證都該失效）。
 */
export declare function loadRoleContext(uid: string, role: UserRole): Promise<{
    account: AccountHit;
    entry: Record<string, unknown>;
} | null>;
