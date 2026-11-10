import { type ModuleValue } from "./modules";
export type UserRole = "student" | "parent" | "staff" | "admin";
/** 四種身分的固定順序（查找、顯示、選擇清單共用） */
export declare const ALL_ROLES: UserRole[];
/** 使用者帳號唯一集合（1 張表、無週期、永久） */
export declare const USER_COLLECTION = "users";
export declare const ROLE_HOME: Record<UserRole, string>;
export declare const ROLE_LABELS: Record<UserRole, string>;
export declare function isUserRole(value: unknown): value is UserRole;
/**
 * 兩階段驗證方式（存於使用者帳號 `twoFactor` 欄位）。
 * 選項文字與舊 GAS 站 account.html 一致：關閉 / 登入通知 / 電子郵件驗證碼 / 驗證碼APP。
 */
export declare const TWO_FACTOR_METHODS: readonly [{
    readonly value: "off";
    readonly label: "關閉 - 高風險";
    readonly short: "未啟用";
}, {
    readonly value: "email_notify";
    readonly label: "電子郵件發送登入通知 - 中風險";
    readonly short: "登入通知";
}, {
    readonly value: "email_otp";
    readonly label: "電子郵件驗證碼 - 低風險";
    readonly short: "驗證信";
}, {
    readonly value: "totp";
    readonly label: "驗證碼APP - 低風險";
    readonly short: "驗證APP";
}];
export type TwoFactorMethod = (typeof TWO_FACTOR_METHODS)[number]["value"];
export declare const DEFAULT_TWO_FACTOR: TwoFactorMethod;
export declare function isTwoFactorMethod(value: unknown): value is TwoFactorMethod;
/** 顯示用標籤；未知值一律視為「關閉」（fail-safe，不會誤觸驗證） */
export declare function twoFactorLabel(value: unknown): string;
/** 清單用簡稱：未啟用／登入通知／驗證信／驗證APP */
export declare function twoFactorShortLabel(value: unknown): string;
/** 需要第二階段驗證才建立 session 的方式（登入通知不阻擋登入） */
export declare function requiresSecondFactor(value: unknown): value is "email_otp" | "totp";
/**
 * 狀態（帳號層＝是否可登入；名冊層＝該期該身分是否可用），兩層共用同一組值。
 * 有效＝正常；無效＝停用（不可用）。舊資料的「停權」已併入無效，讀取時自動轉換。
 */
export type AccountStatus = "有效" | "無效";
export declare const ACCOUNT_STATUSES: AccountStatus[];
/** 可用的狀態 */
export declare const ACTIVE_STATUS: AccountStatus;
/** 顯示名稱：儲存值為「無效」，介面一律稱「停用」 */
export declare const STATUS_LABELS: Record<AccountStatus, string>;
export declare function statusLabel(status: AccountStatus): string;
export declare function isAccountStatus(value: unknown): value is AccountStatus;
/**
 * 讀取資料時的狀態正規化：舊「停權」視為無效（不可用，不會意外復活）；
 * 缺值或未知值維持原預設＝有效。
 */
export declare function normalizeAccountStatus(value: unknown): AccountStatus;
/** 是否為「有效」狀態（名冊條目、帳號文件共用） */
export declare function isActiveStatus(value: unknown): boolean;
/**
 * 使用者帳號是否有效（可登入）。
 * 有 status 以 status 為準；無 status 的文件視為有效（僅剛建立尚未寫入的瞬間）。
 */
export declare function isAccountActive(data: Record<string, unknown> | null | undefined): boolean;
/** 最後登入時間：由登入紀錄推導（登入紀錄依序累加，最後一筆即最新） */
export declare function lastLoginOf(data: Record<string, unknown> | null | undefined): number;
/**
 * 管理員可指定的功能模組（**指定機制已退役**，政策修改書決議二）：
 * 有當期管理員名冊條目＝全體模組全開；不再看 attribute／modules。
 * 模組決定：首頁卡片是否顯示、對應 API 是否放行（requireAdminModule）。
 * 清單由功能模組註冊表（`types/modules.ts` 的 `MODULES`）派生——
 * 新增／調整模組請改註冊表，此處只做投影，不要另立清單。
 * 注意：個人頁「帳號、身分與安全管理」不是模組——每個帳號都用得到，管理員首頁固定顯示。
 * 非管理員身分（教職員／家長／學生）的功能模組指派改存名冊條目 `managedModules`
 * （含子權限），由 requireModulePermission 判定。
 */
export type AdminModule = ModuleValue;
export declare const ADMIN_MODULES: {
    value: AdminModule;
    label: string;
}[];
export declare const ADMIN_MODULE_VALUES: AdminModule[];
/**
 * 管理員的「基本模組」（註冊表 scope＝core）：不需指派、每位管理員（含一般屬性）一律具備，
 * 用途＝首頁固定顯示該入口（系統設定的讀寫另由超級管理員判定，見 hasSettingsManage）。
 * 「系統設定」是每個管理員都有的入口。
 */
export declare const BASE_ADMIN_MODULES: AdminModule[];
/**
 * 【已退役語意】scope＝superOnly 的模組代碼——屬性分級取消後（政策修改書決議二），
 * 全體管理員皆可用；本清單僅供文件與 UI 分組參考，adminModulesOf 不再剝除。
 */
export declare const SUPER_ONLY_ADMIN_MODULES: AdminModule[];
export declare function isAdminModule(value: unknown): value is AdminModule;
/** 解析一個模組代碼或標籤（含舊值），無法辨識回 undefined */
export declare function resolveAdminModule(token: string): AdminModule | undefined;
/**
 * 【已退役】管理員屬性：超級／一般——政策修改書決議二取消，全體管理員平等。
 * 型別保留一個版本週期供舊資料相容（isAdminAttribute 不再參與授予判定）。
 */
export type AdminAttribute = "超級" | "一般";
export declare const ADMIN_ATTRIBUTES: AdminAttribute[];
export declare function isAdminAttribute(value: unknown): value is AdminAttribute;
/**
 * 教職員屬性（互斥，不疊加）：
 * 教師＝純教學；兼導師＝教師兼任導師；兼行政＝教師兼任行政（組長／主任等）或職員編制；
 * 職員＝專任行政人員。要分辨誰是教師兼行政，看「單位」與「職稱」欄。
 */
export type StaffAttribute = "教師" | "兼導師" | "兼行政" | "職員";
export declare const STAFF_ATTRIBUTES: StaffAttribute[];
export declare function isStaffAttribute(value: unknown): value is StaffAttribute;
/** 讀寫教職員屬性：舊值轉新制、去除前後空白，其餘原樣保留（未知值照原樣顯示） */
export declare function resolveStaffAttribute(value: unknown): string;
/**
 * 使用者帳號（`users` 集合文件）：1 張表、無週期、永久。
 * 回答「這個人能否登入、怎麼登入」；兩階段驗證設置於此層。
 * 班級、學號等名冊資料不在此，存於四張身分名冊（隨學年度、學期變動）。
 */
export interface AccountRecord {
    /** 電子郵件地址：選填、有值即全站唯一（登入識別＋2FA 收信）；與帳號至少填一個 */
    email: string;
    /** 帳號：選填、全站唯一（登入識別）；與電子郵件至少填一個 */
    account: string;
    /** 密碼雜湊（bcrypt）：密碼只在這一層，名冊不存密碼 */
    passwordHash: string;
    /** 姓名（帳號層預設值；顯示以當期名冊姓名為準） */
    name: string;
    /** 狀態：有效／無效（停用；決定能否登入，缺省＝有效） */
    status?: AccountStatus;
    /** 慣用身分：多身分時登入預設進入的身分；未設定＝登入時詢問 */
    preferredRole?: UserRole;
    /** 兩階段驗證方式，缺省視為 off */
    twoFactor?: TwoFactorMethod;
    /** TOTP Base32 密鑰（twoFactor=totp 時使用；靜態加密後存放，讀取時解密） */
    totpSecret?: string;
    /** Email OTP：只存 sha256(uid:code)，有效期限與寄送節流 */
    otpHash?: string;
    otpExpiresAt?: number;
    otpSentAt?: number;
    /** TOTP 防重放：90 秒內同一組驗證碼不可重複使用 */
    totpLastCode?: string;
    totpLastUsedAt?: number;
    /** 登入紀錄（epoch ms，依序累加，最多 50 筆；最後登入＝最後一筆） */
    loginRecords: number[];
    /** 最後一次登入方式（登入方式） */
    lastLoginMethod: string;
    /** 登入次數 */
    loginCount: number;
    /** CSS 主題 ID */
    cssThemeId: string;
    /** 已安裝主題清單（JSON 陣列字串） */
    installedThemes: string;
    /** 鎖定至（epoch ms），0 表示未鎖定 */
    lockedUntil: number;
    /** 觸發鎖定時的來源 IP（綁定鎖定，防跨 IP 鎖號 DoS；空字串＝全域鎖定） */
    lockIp?: string;
    /** 連續登入失敗次數 */
    failedAttempts: number;
    /** 每次重設密碼 +1，使舊 JWT 全數失效 */
    tokenVersion: number;
    /**
     * 需由本人修改密碼（管理員設定的預設密碼）：登入後全螢幕要求先改密碼才放行。
     * 建立帳號、管理員重設他人密碼時標記；本人改密或一次性連結重設時清除。
     * 缺省（舊帳號、Google 建立的帳號）＝false，不強制。
     */
    mustChangePassword?: boolean;
    createdAt: number;
}
/**
 * 「使用者帳號管理」工作表的一列（API 回傳格式，不含密碼）。
 * 具備身分＝該帳號於「當期」四張身分名冊中存在條目（不論條目狀態）。
 */
export interface AccountSummary {
    uid: string;
    email: string;
    account: string;
    name: string;
    status: AccountStatus;
    /** 慣用身分（未設定＝登入時詢問） */
    preferredRole?: UserRole;
    /** 兩階段驗證方式原值（顯示請用 twoFactorLabel） */
    twoFactor?: TwoFactorMethod;
    lastLogin?: number;
    loginCount?: number;
    /** 具備身分（當期名冊有條目者，順序 ALL_ROLES） */
    roles: UserRole[];
}
/** 「使用者帳號管理」批次作業的三種模式（上傳試算表） */
export type AccountBatchMode = "create" | "update" | "delete";
export declare const ACCOUNT_BATCH_MODES: {
    value: AccountBatchMode;
    label: string;
}[];
export declare const ACCOUNT_BATCH_MODE_LABELS: Record<AccountBatchMode, string>;
/** 預覽中單一欄位的變更內容（顯示用） */
export interface AccountBatchChange {
    label: string;
    from: string;
    to: string;
}
export interface AccountBatchRow {
    /** 工作表實際列號（第 1 列為標題） */
    row: number;
    /** 該列的辨識鍵（電子郵件地址或帳號） */
    key: string;
    action: "create" | "update" | "delete" | "skip";
    /** 僅 skip 有值 */
    reason?: string;
    /** 僅 update 有值 */
    changes?: AccountBatchChange[];
    /** 附加說明（新增列同時建立當期身分時） */
    note?: string;
}
export interface AccountBatchPreview {
    mode: AccountBatchMode;
    total: number;
    created: number;
    updated: number;
    deleted: number;
    skipped: number;
    /** 新增列中同時建立當期身分名冊條目的筆數 */
    rostered?: number;
    rows: AccountBatchRow[];
}
export interface AccountBatchResult {
    created: number;
    updated: number;
    deleted: number;
    /** 同時建立當期身分名冊條目的筆數 */
    rostered?: number;
    /** 自動銜接的孤兒名冊條目筆數（重建同辨識鍵帳號時） */
    linked?: number;
    skipped: {
        row: number;
        reason: string;
    }[];
}
/** 批次執行的分批進度：伺服器每次只處理一批，前端依 done 決定是否繼續送下一批 */
export interface AccountBatchProgress {
    /** 本批的起始列索引（0 起，相對資料列） */
    offset: number;
    /** 本批實際處理的列數 */
    processed: number;
    /** 檔案資料列總數 */
    total: number;
    /** 是否已處理完所有列 */
    done: boolean;
}
/** 刪除帳號時的名冊條目處理範圍（單筆與批次刪除皆可選，預設 all） */
export type RosterDeleteScope = "all" | "current" | "none";
/** 各處理範圍的完整說明（用於成功訊息與稽核紀錄） */
export declare const ROSTER_DELETE_SCOPE_LABELS: Record<RosterDeleteScope, string>;
