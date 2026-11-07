import "server-only";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, PENDING_2FA_COOKIE, PENDING_ROLE_COOKIE, Pending2FAInput, Pending2FAPayload, PendingRoleInput, PendingRolePayload, SessionPayload } from "@/lib/session-token";
export { SESSION_COOKIE, PENDING_2FA_COOKIE, PENDING_ROLE_COOKIE };
export type { SessionPayload, Pending2FAInput, Pending2FAPayload, PendingRoleInput, PendingRolePayload, };
export declare function createSession(payload: Omit<SessionPayload, "jti" | "lastActivityAt" | "absoluteExpiresAt"> & {
    jti?: string;
    lastActivityAt?: number;
    absoluteExpiresAt?: number;
}): Promise<SessionPayload>;
/** 使用者活動時滑動續期：重簽同 jti/tokenVersion 的 token，更新 lastActivityAt；absoluteExpiresAt 保留原值不重設 */
export declare function refreshSessionActivity(session: SessionPayload): Promise<void>;
export declare function getSession(): Promise<SessionPayload | null>;
export declare function deleteSession(): Promise<void>;
/** 密碼驗證通過、第二階段未完成：寫入短期中途憑證 cookie */
export declare function setPending2FACookie(payload: Pending2FAInput): Promise<void>;
/** 讀取並驗證中途憑證；無效／過期回 null（前端應導回登入頁） */
export declare function getPending2FAPayload(): Promise<Pending2FAPayload | null>;
/** 驗證成功或要回到登入頁時清除，避免殘留可用憑證 */
export declare function clearPending2FACookie(): Promise<void>;
/** 登入（含兩階段驗證）通過、多身分且未設定慣用身分：寫入選擇身分中途憑證 */
export declare function setPendingRoleCookie(payload: PendingRoleInput): Promise<void>;
/** 讀取並驗證選擇身分中途憑證；無效／過期回 null（前端應導回登入頁） */
export declare function getPendingRolePayload(): Promise<PendingRolePayload | null>;
/** 已選擇身分或要回到登入頁時清除，避免殘留可用憑證 */
export declare function clearPendingRoleCookie(): Promise<void>;
export declare function unauthorized(message?: string): NextResponse;
export declare function forbidden(message?: string): NextResponse;
