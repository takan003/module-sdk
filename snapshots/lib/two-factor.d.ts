import "server-only";
import type { DocumentReference, DocumentData } from "firebase-admin/firestore";
import { TwoFactorMethod, UserRole } from "@/types/users";
/**
 * 兩階段驗證服務層（與舊 GAS 站 auth.js 對齊）：
 * - Email OTP：6 位數、10 分鐘效期、同一用戶 120 秒節流、驗證碼只存 sha256
 * - TOTP：RFC 6238 T±1、90 秒防重放
 * - 以上驗證都必須完成後才建立 session（見 /api/auth/2fa）
 */
export declare const EMAIL_OTP_TTL_MS: number;
export declare const EMAIL_OTP_TTL_MINUTES: number;
export declare const EMAIL_OTP_COOLDOWN_MS: number;
export declare const TOTP_REPLAY_MS: number;
/** 失敗次數門檻：達上限直接拒絕該用戶（與帳號鎖定分開計數） */
export declare const TWO_FACTOR_MAX_ATTEMPTS = 5;
export declare const TWO_FACTOR_ATTEMPT_WINDOW_MS: number;
export declare function checkTwoFactorAttempt(key: string): boolean;
export declare function resetTwoFactorAttempts(key: string): void;
export declare function sha256(value: string): string;
/** 遮蔽電子郵件（回第二階段驗證頁顯示「驗證碼寄到哪裡」，仍保留足夠辨識度） */
export declare function maskEmail(email: unknown): string;
/** 產生 6 位數 OTP（100000-999999，避免前導零造成使用者輸入困擾） */
export declare function generateOtp(): string;
export interface TwoFactorProfile {
    method: TwoFactorMethod;
    /** TOTP Base32 密鑰（method !== "totp" 時可能為空） */
    totpSecret: string;
}
export declare function readTwoFactorProfile(data: DocumentData | undefined): TwoFactorProfile;
/** 讀取並產生 TOTP 密鑰（首次啟用驗證碼APP時呼叫，寫回文件） */
export declare function ensureTotpSecret(ref: DocumentReference, data: DocumentData): Promise<string>;
/** 重新產生 TOTP 密鑰（使用者手動觸發，舊密鑰立即失效） */
export declare function rotateTotpSecret(ref: DocumentReference): Promise<string>;
/** Email OTP：寫入一次性驗證碼（只存 hash） */
export declare function writeEmailOtp(ref: DocumentReference): Promise<string>;
export type OtpSendResult = "sent" | "cooldown" | "smtp";
/**
 * 寄送 Email OTP。同一用戶 120 秒內只能請求一次（GAS eotp_req_ 節流）。
 * 回傳 cooldown 時不重新寄信，讓使用者等待既有驗證碼。
 */
export declare function sendEmailOtp(options: {
    ref: DocumentReference;
    data: DocumentData;
    email: string;
    displayName: string;
    account: string;
    role: UserRole;
}): Promise<OtpSendResult>;
/** 驗證 Email OTP（成功即清除一次性資料） */
export declare function verifyEmailOtp(data: DocumentData, uid: string, code: unknown): boolean;
/** 驗證 TOTP（含 90 秒防重放）；成功即記錄已使用代碼 */
export declare function verifyTotpWithReplay(ref: DocumentReference, data: DocumentData, code: unknown): Promise<boolean>;
/** 驗證成功後清除 OTP 暫存資料（避免殘留可重用紀錄） */
export declare function clearOtpState(ref: DocumentReference): Promise<void>;
/** 寄送登入通知信（best-effort，失敗不阻擋登入） */
export declare function sendLoginNotification(options: {
    email: string;
    displayName: string;
    account: string;
    role: UserRole;
}): Promise<void>;
