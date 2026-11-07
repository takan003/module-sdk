import "server-only";
/**
 * SMTP 寄信模組（Gmail 應用程式密碼 / 任何 SMTP 服務皆可）。
 * 必要環境變數：
 *   SMTP_HOST  例如 smtp.gmail.com
 *   SMTP_USER  寄信帳號
 *   SMTP_PASS  應用程式密碼（Google 帳號 → 登入與安全性 → 應用程式密碼）
 * 選用：
 *   SMTP_PORT  預設 465（SMTP_SECURE=true 時）或 587
 *   SMTP_SECURE "true"/"false"，未設時以 port===465 判斷
 *   SMTP_FROM  寄件者顯示名稱，預設 "數位校園工具箱 <SMTP_USER>"
 */
export declare function isMailConfigured(): boolean;
export interface PasswordResetMailOptions {
    /** 收件人（已正規化的電子郵件） */
    to: string;
    /** 收件人顯示名稱，可為空 */
    displayName?: string;
    /**
     * 本次要重設的身分（學生／家長／教職員／管理員）。
     * 同一信箱可能同時存在多個身分（種子帳號即共用一個信箱），
     * 信件列出身分讓收件人確認這封信要重設的是哪個帳號。
     */
    roleLabel?: string;
    /** 一次性重設連結（含 token） */
    resetUrl: string;
    /** 有效期限（分鐘） */
    expiresMinutes: number;
    /** 系統（程式）名稱，未提供時用預設系統名稱 */
    systemName?: string;
    /** 學校名稱，與系統名稱併列於信件抬頭（可為空） */
    schoolName?: string;
}
export declare function sendPasswordResetEmail(options: PasswordResetMailOptions): Promise<void>;
export interface LoginOtpMailOptions {
    to: string;
    displayName?: string;
    /** 6 位數登入驗證碼 */
    code: string;
    /** 系統（程式）名稱，未提供時用預設系統名稱 */
    systemName?: string;
    /** 學校名稱，與系統名稱併列於信件抬頭（可為空） */
    schoolName?: string;
    roleLabel?: string;
    expiresInMinutes: number;
}
/** 兩階段驗證：電子郵件驗證碼信 */
export declare function sendLoginOtpEmail(options: LoginOtpMailOptions): Promise<void>;
export interface LoginNotificationMailOptions {
    to: string;
    displayName?: string;
    /** 系統（程式）名稱，未提供時用預設系統名稱 */
    systemName?: string;
    /** 學校名稱，與系統名稱併列於信件抬頭（可為空） */
    schoolName?: string;
    roleLabel?: string;
    /** 登入時間（本機時間） */
    time: Date;
}
/** 兩階段驗證：電子郵件發送登入通知信（不阻擋登入） */
export declare function sendLoginNotificationEmail(options: LoginNotificationMailOptions): Promise<void>;
