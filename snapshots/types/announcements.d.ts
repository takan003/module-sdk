/**
 * 公告功能模組的型別與純函式（前端與伺服器共用；**不可** import server-only）。
 *
 * 資料存於 Firestore `announcements` 集合（不入 settings/system，避免整份覆寫抹掉）。
 * 模組設定（分類、顯示方式）存 `settings/announcements` 單文件。
 *
 * 跨模組協議：其他模組在伺服器端呼叫 `src/lib/announcements.ts` 的 `publishFromModule()`，
 * 只寫本集合、必填 `sourceModule`，受眾必須明確（見該檔註解）。
 */
import { UserRole } from "./users";
export declare const ANNOUNCEMENTS_COLLECTION = "announcements";
export declare const ANNOUNCEMENT_SETTINGS_DOC_ID = "announcements";
/** 個人公告提醒：doc id＝`${announcementId}_${uid}` */
export declare const ANNOUNCEMENT_REMINDERS_COLLECTION = "announcementReminders";
export type AnnouncementStatus = "published" | "archived";
/** 依字數截斷（超出加 ...）；空白整併成單行——橫幅三行與單行清單共用 */
export declare function clipText(text: string, max: number): string;
/**
 * 公告閱讀權限：可多選身分（學生／家長／教職員），
 * 或獨立勾選「無」＝公開——任何人均可看見，不需先登入系統。
 * 「無」與身分選項互斥（isPublic）。
 */
export declare const ANNOUNCEMENT_PERMISSION_ROLES: UserRole[];
/** 「無（公開）」的權限文字 */
export declare const PUBLIC_PERMISSION_LABEL = "\u7121";
/**
 * 公告顯示位置（5 處）：
 * 系統首頁登入表單上方＋四種身分功能首頁（切換身分下拉選單下方、第一個登出按鈕上方）。
 * 每處由管理員個別決定「顯示與否／顯示方式／顯示筆數」。
 */
export type AnnouncementSurface = "login" | "student" | "parent" | "staff" | "admin";
export declare const ANNOUNCEMENT_SURFACES: AnnouncementSurface[];
export declare const ANNOUNCEMENT_SURFACE_LABELS: Record<AnnouncementSurface, string>;
export declare function isAnnouncementSurface(value: unknown): value is AnnouncementSurface;
/**
 * 顯示位置的顯示方式：
 * - 清單＝單行（日期｜分類｜標題 20 字內）；
 * - 「清單，置頂公告橫幅」＝置頂公告三行卡片、其餘單行清單；
 * - 橫幅＝三行卡片（標題 20 字內／內容摘要 40 字內／公告資訊）。
 * 橫幅儲存值沿用 `marquee` 以免遷移舊設定。
 */
export type AnnouncementSurfaceMethod = "list" | "pinnedTop" | "marquee";
export declare const ANNOUNCEMENT_SURFACE_METHOD_LABELS: Record<AnnouncementSurfaceMethod, string>;
/** 顯示方式寬容解析（缺漏／毀損退回 list） */
export declare function normalizeSurfaceMethod(value: unknown): AnnouncementSurfaceMethod;
export interface AnnouncementSurfaceSetting {
    enabled: boolean;
    method: AnnouncementSurfaceMethod;
    /** 顯示筆數（1～20） */
    limit: number;
}
export type AnnouncementSurfaces = Record<AnnouncementSurface, AnnouncementSurfaceSetting>;
export declare const ANNOUNCEMENT_SURFACE_LIMIT_MIN = 1;
export declare const ANNOUNCEMENT_SURFACE_LIMIT_MAX = 20;
export declare const ANNOUNCEMENT_SURFACE_LIMIT_DEFAULT = 5;
export declare function normalizeSurfaceLimit(value: unknown): number;
export declare function defaultAnnouncementSurfaces(): AnnouncementSurfaces;
/** 全站不限班級的 classCodes 哨兵（Firestore array-contains 查詢用） */
export declare const ALL_CLASSES_SENTINEL = "*";
export interface AnnouncementAudience {
    /**欲送身分（至少一個） */
    roles: UserRole[];
    /**
     * 班級代碼；空陣列或含 `*` ＝不限班級。
     * 有具體代碼時＝僅這些班可見（導師班公告）。
     */
    classCodes: string[];
}
export interface AnnouncementCategory {
    id: string;
    name: string;
    sortOrder: number;
    enabled: boolean;
}
/**
 * 公告原則（「規則設定」卡片設定）：
 * - `enablePinned`：允許將公告設為置頂（關閉＝新增／編輯皆無法再設定置頂）；
 * - `forceExpire`：到期時間留空時自動補上發布後一個月，避免過舊公告長期佔據公告區；
 * - `hardDeleteExpired`：封存或到期的公告連同個人提醒真實刪除（關閉＝僅隱藏保留、不進入搜尋）。
 */
export interface AnnouncementPolicies {
    enablePinned: boolean;
    forceExpire: boolean;
    hardDeleteExpired: boolean;
}
export declare const DEFAULT_ANNOUNCEMENT_POLICIES: AnnouncementPolicies;
export interface AnnouncementSettings {
    categories: AnnouncementCategory[];
    /** 是否啟用個人公告提醒（首頁鈴鐺＋收件匣「提醒我」按鈕），管理於「規則設定」切換 */
    defaultRemindersEnabled: boolean;
    /** 5 個顯示位置的顯示與否／方式／筆數 */
    surfaces: AnnouncementSurfaces;
    /** 公告原則（置頂／到期下架／真實刪除） */
    policies: AnnouncementPolicies;
}
export declare const DEFAULT_ANNOUNCEMENT_CATEGORIES: AnnouncementCategory[];
export declare const DEFAULT_ANNOUNCEMENT_SETTINGS: AnnouncementSettings;
/**
 * 後備公告分類（不可刪除）：分類被刪除後，既有公告顯示時自動歸入此分類。
 * 「其他」＝分不下時的垃圾場，與行事曆的後備類型一致。
 * 見 `types/category.ts` 的刪除機制說明。
 */
export declare const ANNOUNCEMENT_FALLBACK_CATEGORY_ID = "other";
export declare const ANNOUNCEMENT_FALLBACK_CATEGORY_NAME = "\u5176\u4ED6";
/** 補齊後備分類用的預設條目（sortOrder 由呼叫端決定） */
export declare function defaultAnnouncementFallbackCategory(sortOrder: number): AnnouncementCategory;
export interface AnnouncementRecord {
    id: string;
    title: string;
    body: string;
    categoryId: string;
    /** 來源模組代碼；公告頁自己發＝"announcements"；其他模組掛勾發文時必填其代碼 */
    sourceModule: string;
    /** 來源模組的資料 id（如補修單號），選填 */
    sourceRef?: string;
    authorUid: string;
    authorName: string;
    authorRole: UserRole;
    audience: AnnouncementAudience;
    /**
     * 閱讀權限＝「無」（公開）：任何人可見，**不需登入**（顯示於系統首頁等公開位置）。
     * 為 true 時 audience 為全校＋全身分（登入者亦由一般查詢看到）。
     */
    isPublic: boolean;
    status: AnnouncementStatus;
    /** epoch ms */
    publishAt: number;
    /** epoch ms；缺省＝不過期 */
    expireAt?: number;
    academicYear?: number;
    semester?: 1 | 2;
    pinned?: boolean;
    createdAt: number;
    updatedAt: number;
}
/** 收件匣清單項目（API 回傳；含頁內提醒標示） */
export interface AnnouncementInboxItem {
    id: string;
    title: string;
    body: string;
    categoryId: string;
    categoryName: string;
    sourceModule: string;
    authorName: string;
    authorRole: UserRole;
    audienceRoles: UserRole[];
    classScoped: boolean;
    classCodes: string[];
    /** 閱讀權限＝「無」（公開，不需登入） */
    isPublic: boolean;
    publishAt: number;
    expireAt?: number;
    pinned: boolean;
    /** 是否即將到期（3 日內） */
    expiringSoon: boolean;
    /** 使用者是否已設定個人提醒（API 依登入 uid 補上） */
    reminded?: boolean;
}
/** 顯示位置（首頁／登入頁）回傳的公告項目 */
export interface AnnouncementSurfaceItem {
    id: string;
    title: string;
    body: string;
    categoryId: string;
    categoryName: string;
    sourceModule: string;
    authorName: string;
    publishAt: number;
    expireAt?: number;
    pinned: boolean;
    isPublic: boolean;
}
/**
 * 公告專頁（`/announcements`，5 處顯示位置共用入口）回傳的公告項目：
 * 比顯示位置多帶 `classScoped`，供專頁標示班級／校級。
 */
export interface AnnouncementArchiveItem extends AnnouncementSurfaceItem {
    classScoped: boolean;
}
/** 個人提醒（首頁鈴鐺／提醒列表）：僅回仍可閱讀的公告 */
export interface AnnouncementReminderItem {
    announcementId: string;
    title: string;
    body: string;
    categoryName: string;
    authorName: string;
    publishAt: number;
    expireAt?: number;
    expiringSoon: boolean;
    classScoped: boolean;
    createdAt: number;
}
/** 不限班級的受眾 */
export declare function schoolWideAudience(roles: UserRole[]): AnnouncementAudience;
/** 是否為「不限班級」受眾 */
export declare function isSchoolWideAudience(audience: AnnouncementAudience): boolean;
export declare function audienceClassScoped(audience: AnnouncementAudience): boolean;
/** 受眾是否包含該身分 */
export declare function audienceHasRole(audience: AnnouncementAudience, role: UserRole): boolean;
/** 受眾是否可見於該班級（校級公告恒為 true；班級公告比對 classCode） */
export declare function audienceCoversClass(audience: AnnouncementAudience, classCode: string | undefined | null): boolean;
/** 公告對「該身分＋該班級」是否可見（管理端清單不受此限） */
export declare function canViewAnnouncement(audience: AnnouncementAudience, role: UserRole, classCode: string | undefined | null): boolean;
/** 是否在可閱讀時間窗內（已發布、未過期） */
export declare function isAnnouncementReadable(item: {
    status: AnnouncementStatus;
    publishAt: number;
    expireAt?: number;
}, now?: number): boolean;
export declare const EXPIRING_SOON_MS: number;
export declare function isExpiringSoon(item: {
    expireAt?: number;
}, now?: number): boolean;
export interface AnnouncementInput {
    title: string;
    body: string;
    categoryId?: string;
    audience: AnnouncementAudience;
    /** 閱讀權限＝「無」（公開，不需登入可見）；與身分選項互斥 */
    isPublic?: boolean;
    publishAt?: number;
    expireAt?: number | null;
    pinned?: boolean;
    academicYear?: number;
    semester?: 1 | 2;
}
export interface ValidatedAnnouncementInput {
    title: string;
    body: string;
    categoryId: string;
    audience: AnnouncementAudience;
    isPublic: boolean;
    publishAt: number;
    expireAt?: number;
    pinned: boolean;
    academicYear?: number;
    semester?: 1 | 2;
}
export type AnnouncementValidation = {
    ok: true;
    value: ValidatedAnnouncementInput;
} | {
    ok: false;
    message: string;
};
/** 驗證並正規化公告輸入（發佈表單與跨模組 publish 共用） */
export declare function validateAnnouncementInput(input: AnnouncementInput, options?: {
    allowedRoles?: readonly UserRole[];
}): AnnouncementValidation;
/** 教職員發佈時：受眾若限定班級，必須包含自己的導師班（防發到別班） */
export declare function staffAudienceAllowed(audience: AnnouncementAudience, staffClassCode: string | undefined | null): boolean;
/** Firestore 原始文件 → 公告記錄（寬容解析） */
export declare function readAnnouncementRecord(id: string, raw: Record<string, unknown> | null | undefined): AnnouncementRecord | null;
/** 公告記錄 → Firestore 寫入欄位（audience 拉平為陣列欄位以便 array-contains 查詢） */
export declare function announcementToFirestore(record: Omit<AnnouncementRecord, "id">): Record<string, unknown>;
/** 分類表寬容讀取 */
export declare function readAnnouncementSettings(raw: unknown): AnnouncementSettings;
/** 閱讀權限顯示文字：「無（公開）」或身分名稱串接 */
export declare function announcementPermissionText(audience: AnnouncementAudience, isPublic: boolean): string;
export declare function announcementCategoryName(settings: AnnouncementSettings, categoryId: string): string;
