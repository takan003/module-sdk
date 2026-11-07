import "server-only";
import { UserRole, TwoFactorMethod } from "@/types/users";
export declare const SESSION_COOKIE: string;
export declare const SESSION_MAX_AGE_SECONDS: number;
/** 絕對上限：無論 keepalive 如何續期，超過此時間必須重新登入（防被竊 cookie 無限續命） */
export declare const SESSION_ABSOLUTE_MAX_AGE_SECONDS: number;
/** 兩階段驗證中途憑證 cookie：密碼驗證通過、第二階段尚未完成時使用 */
export declare const PENDING_2FA_COOKIE: string;
/** 第二階段驗證時限：逾時必須重新輸入帳密 */
export declare const PENDING_2FA_MAX_AGE_SECONDS: number;
/** 選擇身分中途憑證 cookie：登入（含兩階段驗證）完成、尚未選擇要進入的身分時使用 */
export declare const PENDING_ROLE_COOKIE: string;
/** 選擇身分時限：逾時必須重新登入 */
export declare const PENDING_ROLE_MAX_AGE_SECONDS: number;
/** 多身分候選：身分＋該身分的使用者帳號文件 id（登入時一併帶入 session，供切換身分使用） */
export interface RoleCandidate {
    role: UserRole;
    id: string;
}
export interface SessionPayload {
    uid: string;
    email: string;
    account: string;
    displayName: string;
    role: UserRole;
    /** 本次登入可進入的身分（多身分共用帳號時用於選擇與切換） */
    candidates?: RoleCandidate[];
    tokenVersion: number;
    jti: string;
    /** 最後一次使用者活動（epoch ms），用於伺服器端閒置逾時檢查 */
    lastActivityAt: number;
    /** 絕對過期時間（epoch ms），續期時保留原值、不重設 */
    absoluteExpiresAt: number;
}
export declare function signSessionToken(payload: SessionPayload): Promise<string>;
export declare function verifySessionToken(token: string): Promise<SessionPayload | null>;
/**
 * 兩階段驗證中途憑證：帳密已驗證通過、第二階段尚未完成。
 * 與 session 共用金鑰但帶 purpose claim，兩者不可互換（見 verifySessionToken）。
 */
export interface Pending2FAInput {
    uid: string;
    email: string;
    account: string;
    displayName: string;
    role: UserRole;
    /** 本次登入的多身分候選：第二階段完成後用來決定要進入的身分 */
    candidates?: RoleCandidate[];
    /** 登入時已判定的慣用身分（候選唯一命中時才存在；候選文件不在手邊，故先算好帶入） */
    preferred?: UserRole | null;
    /** 需要完成的第二階段方式 */
    method: Exclude<TwoFactorMethod, "off" | "email_notify">;
    /** 是從密碼登入還是 Google 登入進入第二階段（用來記 lastLoginMethod） */
    via: "password" | "google";
}
export interface Pending2FAPayload extends Pending2FAInput {
    /** 中途憑證過期時間（epoch ms） */
    expiresAt: number;
}
export declare function signPending2FAToken(payload: Pending2FAInput): Promise<string>;
export declare function verifyPending2FAToken(token: string): Promise<Pending2FAPayload | null>;
/**
 * 選擇身分中途憑證：登入（含兩階段驗證）已驗證通過、尚未決定要進入的身分。
 * 與 session 共用金鑰但帶 purpose claim，兩者不可互換（見 verifySessionToken）。
 */
export interface PendingRoleInput {
    /** 登入用的電子郵件／帳號：選擇時用來確認候選文件仍是同一組帳號 */
    email: string;
    account: string;
    /** 顯示用稱謂（取自通過驗證的帳號文件） */
    displayName: string;
    /** 寫入 lastLoginMethod 的來源（password／google，兩階段驗證以 +方式 併接） */
    via: string;
    /** 可選擇的身分候選 */
    candidates: RoleCandidate[];
}
export interface PendingRolePayload extends PendingRoleInput {
    /** 中途憑證過期時間（epoch ms） */
    expiresAt: number;
}
export declare function signPendingRoleToken(payload: PendingRoleInput): Promise<string>;
export declare function verifyPendingRoleToken(token: string): Promise<PendingRolePayload | null>;
