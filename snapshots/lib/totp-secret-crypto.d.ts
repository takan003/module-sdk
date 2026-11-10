/** 是否為本版加密格式（供遷移判斷） */
export declare function isEncryptedTotpSecret(value: unknown): boolean;
/** 加密 TOTP 密鑰；空字串維持空字串。 */
export declare function encryptTotpSecret(plaintext: string): string;
/**
 * 解密 TOTP 密鑰。
 *
 * - 空白／非字串 → 空字串
 * - 舊版明文（沒有前缀）→ 原樣回傳，讓既有使用者無痛遷移
 * - 密文解密失敗 → 空字串（記錄錯誤，不拋例外，避免登入流程 500）
 */
export declare function decryptTotpSecret(value: unknown): string;
