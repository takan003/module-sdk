export declare function clampCostFactor(value: unknown, fallback?: number): number;
export declare function normalizeEmail(value: unknown): string | null;
export declare function normalizeAccount(value: unknown): string | null;
/** 電子郵件格式是否正確（不含空白值判定，空白是否允許由各頁面自行決定） */
export declare function isValidEmail(value: unknown): boolean;
/** 帳號格式是否正確（不含空白值判定，空白是否允許由各頁面自行決定） */
export declare function isValidAccount(value: unknown): boolean;
/** 帳號與安全卡即時驗證訊息（客戶端與伺服器共用，兩側文字需一致） */
export declare const EMAIL_FORMAT_MESSAGE = "\u96FB\u5B50\u90F5\u4EF6\u683C\u5F0F\u7121\u6548\uFF0C\u4F8B\u5982 name@example.com";
export declare const ACCOUNT_FORMAT_MESSAGE = "\u5E33\u865F\u683C\u5F0F\u7121\u6548\uFF1A2-64 \u5B57\u5143\uFF0C\u9650\u5C0F\u5BEB\u82F1\u6587\u3001\u6578\u5B57\u8207 . _ @ -";
/** 身分識別：電子郵件地址與帳號至少填寫一個（登入識別用），另一欄可留空 */
export declare const ACCOUNT_IDENTIFIER_REQUIRED_MESSAGE = "\u8ACB\u586B\u5BEB\u96FB\u5B50\u90F5\u4EF6\u5730\u5740\u6216\u5E33\u865F\uFF08\u81F3\u5C11\u586B\u5BEB\u4E00\u500B\uFF09";
/** 密碼長度上限（規則檢查與略過規則時共用） */
export declare const PASSWORD_MAX_LENGTH = 128;
/**
 * 密碼規則：至少 8 碼，且需同時包含大寫字母、小寫字母與數字（符號可有可無）、擋常見弱密碼。
 * 客戶端與伺服器共用此檢查，兩側訊息需一致。
 */
export declare function isStrongPassword(value: unknown): value is string;
export declare const PASSWORD_REQUIREMENT_MESSAGE = "\u5BC6\u78BC\u81F3\u5C11 8 \u78BC\uFF0C\u4E14\u9700\u5305\u542B\u5927\u5BEB\u5B57\u6BCD\u3001\u5C0F\u5BEB\u5B57\u6BCD\u8207\u6578\u5B57";
