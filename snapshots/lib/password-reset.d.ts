import "server-only";
import { UserRole } from "@/types/users";
/**
 * 密碼重設一次性連結。
 * - token：32 bytes 隨機（base64url），只在產生當下出現一次，資料庫僅存 sha256(token)
 * - 有效期：10 分鐘（PASSWORD_RESET_TTL_MS），逾時即失效
 * - 一次性：以 Firestore transaction 標記 usedAt，重複使用回「已使用過」
 * - 同一用戶重新申請時，舊連結立刻失效（只保留最新一封信）
 * 客戶端一律無法存取此 collection（firestore.rules 預設拒絕）。
 */
export declare const PASSWORD_RESET_TTL_MS: number;
export declare const PASSWORD_RESET_TTL_MINUTES: number;
export interface PasswordResetRequest {
    uid: string;
    role: UserRole;
    email: string;
    displayName?: string;
}
export interface CreatedPasswordResetToken extends PasswordResetRequest {
    token: string;
    expiresAt: number;
}
export type ResetTokenStatus = "ok" | "invalid" | "expired" | "used";
export interface ResetTokenRecord extends PasswordResetRequest {
    expiresAt: number;
    usedAt: number;
    createdAt: number;
}
/**
 * 產生並儲存重設 token。
 * 同時刪除：① 該用戶既有的舊連結 ② 已過期的文件（無 TTL policy 時的機械式清理）
 */
export declare function createPasswordResetToken(request: PasswordResetRequest, requestIp?: string): Promise<CreatedPasswordResetToken>;
/** 不消耗 token，僅供重設頁在使用者輸入密碼前先確認連結是否有效 */
export declare function inspectPasswordResetToken(token: unknown): Promise<{
    status: ResetTokenStatus;
    record?: ResetTokenRecord;
}>;
/**
 * 消耗 token（transaction 確保同一 token 只能成功一次）。
 * 成功時回傳 token 所屬用戶；否則回傳失敗狀態。
 */
export declare function consumePasswordResetToken(token: unknown): Promise<{
    status: ResetTokenStatus;
    record?: ResetTokenRecord;
}>;
