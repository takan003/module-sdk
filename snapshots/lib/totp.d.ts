export declare const TOTP_STEP_SECONDS = 30;
export declare const TOTP_DIGITS = 6;
/** 產生 Base32 密鑰（預設 20 bytes = 16 字元，Google Authenticator 慣用長度） */
export declare function generateTotpSecret(bytes?: number): string;
export declare function base32Encode(bytes: Uint8Array): string;
export declare function base32Decode(input: string): Uint8Array;
/** 取得指定時間的 6 組數字驗證碼（驗證頁的 30 秒倒數用） */
export declare function totpCode(secret: string, atMs?: number): string;
/** 驗證碼比對（含 T±1 容差），以 timingSafeEqual 比對避免時序側漏 */
export declare function verifyTotpCode(secret: string, code: unknown, window?: number, atMs?: number): boolean;
/** otpauth:// 連結，供前端產生 QR Code（金鑰不出伺服器之外的這條 URL） */
export declare function buildOtpauthUrl(options: {
    secret: string;
    account: string;
    issuer?: string;
}): string;
