import "server-only";
/**
 * 清理已過期的撤銷紀錄（expiresAt = 撤銷時的 JWT 到期時間）。
 * Firestore TTL 政策需在主控台另行設定，此處為程式面的機會式清理。
 */
export declare function purgeExpiredRevocations(force?: boolean): Promise<void>;
export declare function revokeJti(jti: string): Promise<void>;
export declare function isJtiRevoked(jti: string): Promise<boolean>;
