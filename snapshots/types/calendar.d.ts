/**
 * 行事曆功能模組的型別與純函式（前端與伺服器共用；**不可** import server-only）。
 *
 * 資料存於 Firestore `calendarEvents` 集合（不入 settings/system，避免整份覆寫抹掉）。
 * 個人提醒存 `calendarReminders`（doc id＝`${eventId}_${uid}`）。
 * 模組設定（分類、提醒開關、顯示位置、行程原則）存 `settings/calendar` 單文件。
 *
 * 跨模組協議：其他模組在伺服器端呼叫 `src/lib/calendar.ts` 的
 * `publishScheduleFromModule()`（含 upsert 語意），只寫本集合、必填 `sourceModule`，
 * 受眾必須明確（見該檔註解）。
 */
import { UserRole } from "./users";
export declare const CALENDAR_COLLECTION = "calendarEvents";
export declare const CALENDAR_SETTINGS_DOC_ID = "calendar";
/** 個人行程提醒：doc id＝`${eventId}_${uid}` */
export declare const CALENDAR_REMINDERS_COLLECTION = "calendarReminders";
/** active＝顯示中；cancelled＝保留文件、不顯示（供來源模組對帳） */
export type CalendarEventStatus = "active" | "cancelled";
/** 全站不限班級的 classCodes 哨兵（Firestore array-contains 查詢用） */
export declare const ALL_CLASSES_SENTINEL = "*";
export interface CalendarAudience {
    /** 閱讀權限（至少一個身分；「無」＝公開時由系統補為四身分以便 array-contains 查詢） */
    roles: UserRole[];
    /**
     * 班級代碼；空陣列或含 `*` ＝不限班級。
     * 有具體代碼時＝僅這些班可見（導師班行程）。
     */
    classCodes: string[];
}
export interface CalendarCategory {
    id: string;
    name: string;
    sortOrder: number;
    enabled: boolean;
}
/** 年級／班級候選（學校活動層級勾選用） */
export interface CalendarGradeOption {
    grade: string;
    classes: {
        code: string;
        name: string;
    }[];
}
/** 學校活動層級：受影響的年級（classCodes 空＝全年級） */
export interface CalendarSchoolActivityGrade {
    grade: string;
    classCodes: string[];
}
/**
 * 學校活動層級（用於日後衝堂比對，如自主學習計畫撰寫）：
 * - school＝全校活動；grades＝受影響的年級／班級（可多選）。
 * - 兩者皆空＝無（預設）。
 */
export interface CalendarSchoolActivity {
    school: boolean;
    grades: CalendarSchoolActivityGrade[];
}
/** 無學校活動層級（預設值；每次回傳新物件避免共用參照） */
export declare function emptySchoolActivity(): CalendarSchoolActivity;
/** 寬容解析學校活動層級（去重、去空白、限制長度與筆數） */
export declare function normalizeSchoolActivity(value: unknown): CalendarSchoolActivity;
/** 學校活動層級顯示文字（無＝空字串） */
export declare function schoolActivityText(activity: CalendarSchoolActivity | null | undefined): string;
/**
 * 行程顯示位置（5 處，比照系統公告）：
 * 系統首頁登入表單上方＋四種身分功能首頁（切換身分下拉選單下方、第一個登出按鈕上方）。
 * 每處由管理員決定「顯示與否」。
 */
export type CalendarSurface = "login" | "student" | "parent" | "staff" | "admin";
export declare const CALENDAR_SURFACES: CalendarSurface[];
export declare const CALENDAR_SURFACE_LABELS: Record<CalendarSurface, string>;
export declare function isCalendarSurface(value: unknown): value is CalendarSurface;
/**
 * 顯示位置設定：顯示與否＋可翻頁的行程則數（`limit`）。
 * 顯示方式統一：單一行、由最近行程起以上下箭頭逐則翻頁（見 `CalendarSurface`）。
 */
export interface CalendarSurfaceSetting {
    enabled: boolean;
    /** 可翻頁的行程則數（1～20；預設 5——省 Firestore 讀取量） */
    limit: number;
}
export type CalendarSurfaces = Record<CalendarSurface, CalendarSurfaceSetting>;
export declare const CALENDAR_SURFACE_LIMIT_MIN = 1;
export declare const CALENDAR_SURFACE_LIMIT_MAX = 20;
export declare const CALENDAR_SURFACE_LIMIT_DEFAULT = 5;
/** 顯示筆數寬容解析（缺漏／毀損退回預設 5、並夾在 1～20） */
export declare function normalizeCalendarSurfaceLimit(value: unknown): number;
export declare function defaultCalendarSurfaces(): CalendarSurfaces;
/**
 * 行程原則（「規則設定」卡片設定）：
 * `hardDeleteCancelled`＝下架（取消）行程真實刪除——文件連同個人提醒一併刪除，
 * 關閉（預設）＝保留文件、僅不再顯示給任何身分（供來源模組對帳）。
 * `publicPastMonths`＝公開行事曆可回溯月數（0＝僅本月起；預設 1＝本月＋上月；上限 12）。
 */
export interface CalendarPolicies {
    hardDeleteCancelled: boolean;
    publicPastMonths: number;
}
export declare const DEFAULT_CALENDAR_POLICIES: CalendarPolicies;
export declare const PUBLIC_PAST_MONTHS_MIN = 0;
export declare const PUBLIC_PAST_MONTHS_MAX = 12;
/** 寬容解析可回溯月數（非整數／超界一律退回預設 1） */
export declare function normalizePublicPastMonths(value: unknown): number;
/** 公開行事曆最早可瀏覽區間的起點（月初；now 所在月往回 publicPastMonths 個月） */
export declare function computePublicCalendarEarliestFrom(publicPastMonths: number, now?: number): number;
export interface CalendarSettings {
    categories: CalendarCategory[];
    /** 是否啟用個人提醒（「提醒我」按鈕） */
    defaultRemindersEnabled: boolean;
    /** 5 個顯示位置的顯示與否 */
    surfaces: CalendarSurfaces;
    /** 行程原則（下架真實刪除） */
    policies: CalendarPolicies;
}
export declare const DEFAULT_CALENDAR_CATEGORIES: CalendarCategory[];
export declare const DEFAULT_CALENDAR_SETTINGS: CalendarSettings;
/**
 * 後備行事曆類型（不可刪除）：類型被刪除後，既有行程顯示時自動歸入此類型。
 * 見 `types/category.ts` 的刪除機制說明。
 */
export declare const CALENDAR_FALLBACK_CATEGORY_ID = "other";
export declare const CALENDAR_FALLBACK_CATEGORY_NAME = "\u5176\u4ED6";
/** 補齊後備類型用的預設條目（sortOrder 由呼叫端決定） */
export declare function defaultCalendarFallbackCategory(sortOrder: number): CalendarCategory;
export interface CalendarEventRecord {
    id: string;
    title: string;
    description?: string;
    location?: string;
    startAt: number;
    endAt?: number;
    /** "YYYY-MM-DD"；全天事件用（此時 startAt 為當日本地零時） */
    allDayDate?: string;
    important: boolean;
    /** 學校活動層級（衝堂比對用；無活動＝空層級） */
    schoolActivity: CalendarSchoolActivity;
    /** 行事曆分類（settings/calendar 的 categories 之一） */
    categoryId: string;
    sourceModule: string;
    sourceRef?: string;
    audience: CalendarAudience;
    /** 閱讀權限「無」＝公開：不需登入即可查閱（與身分選項互斥，公開時一律全校） */
    isPublic: boolean;
    status: CalendarEventStatus;
    createdBy: {
        uid: string;
        name: string;
        role: UserRole;
    };
    /** 發佈單位（如：教務處）；教職員建立時預帶名冊「單位」，可改 */
    publishUnit?: string;
    academicYear?: number;
    semester?: 1 | 2;
    createdAt: number;
    updatedAt: number;
}
/** 回給使用者端的行程項目（剝除 uid 等個資） */
export interface CalendarEventItem {
    id: string;
    title: string;
    description?: string;
    location?: string;
    startAt: number;
    endAt?: number;
    allDayDate?: string;
    important: boolean;
    categoryId: string;
    categoryName: string;
    sourceModule: string;
    sourceRef?: string;
    /** 學校活動層級（衝堂比對用） */
    schoolActivity?: CalendarSchoolActivity;
    audienceRoles: UserRole[];
    classScoped: boolean;
    classCodes: string[];
    /** 閱讀權限「無」＝公開（不需登入） */
    isPublic: boolean;
    status: CalendarEventStatus;
    createdByName: string;
    createdByRole: UserRole;
    /** 發佈單位（如：教務處） */
    publishUnit?: string;
    academicYear?: number;
    semester?: 1 | 2;
    createdAt: number;
    updatedAt: number;
    /** 使用者是否已設定個人提醒（API 依登入 uid 補上） */
    reminded?: boolean;
}
/** 顯示位置（系統首頁登入表單上方／四種身分功能首頁）回傳的行程項目 */
export interface CalendarSurfaceItem {
    id: string;
    title: string;
    startAt: number;
    endAt?: number;
    allDayDate?: string;
    /** 全天行程（公開行事曆週/日視圖縱軸定位用，選填） */
    allDay?: boolean;
    /** 地點（選填） */
    location?: string;
    important: boolean;
    categoryId: string;
    categoryName: string;
    sourceModule: string;
    publishUnit?: string;
}
/** 個人行程提醒列表項目 */
export interface CalendarReminderItem {
    eventId: string;
    title: string;
    description?: string;
    location?: string;
    startAt: number;
    endAt?: number;
    allDayDate?: string;
    important: boolean;
    categoryName: string;
    classScoped: boolean;
    createdAt: number;
}
/** 管理端清單項目：完整記錄＋行事曆類型名稱（保留巢狀 audience／createdBy 供編輯表單回填） */
export type AdminCalendarEventRow = CalendarEventRecord & {
    categoryName: string;
};
/** 不限班級的受眾 */ export declare function schoolWideAudience(roles: UserRole[]): CalendarAudience;
/** 是否為「不限班級」受眾 */
export declare function isSchoolWideAudience(audience: CalendarAudience): boolean;
export declare function audienceClassScoped(audience: CalendarAudience): boolean;
/** 受眾是否包含該身分 */
export declare function audienceHasRole(audience: CalendarAudience, role: UserRole): boolean;
/** 受眾是否可見於該班級（校級行程恒為 true；班級行程比對 classCode） */
export declare function audienceCoversClass(audience: CalendarAudience, classCode: string | undefined | null): boolean;
/** 行程對「該身分＋該班級」是否可見（管理端清單不受此限） */
export declare function canViewCalendarEvent(audience: CalendarAudience, role: UserRole, classCode: string | undefined | null): boolean;
/**
 * 免登入可讀（公開）行程：閱讀權限「無」（`isPublic`）且不限班級——
 * 與系統首頁顯示位置（`surface=login`）的公開規則一致。
 * 注意：只有明選「無」才公開（勾滿四身分不等於公開）。
 */
export declare function isCalendarEventPublicReadable(record: {
    isPublic?: boolean;
    audience: CalendarAudience;
}): boolean;
/** 本地時區的該日零時（epoch ms）；日期非法回 0 */
export declare function allDayStartMs(date: string): number;
/** 本地時區的今日零時（epoch ms） */
export declare function startOfTodayMs(now?: number): number;
/** 行程的結束時間（無 endAt＝單點事件，以其開始時間計） */
export declare function calendarEventEnd(item: {
    startAt: number;
    endAt?: number;
}): number;
/**
 * 讀取端是否應顯示此行程：非 cancelled，且尚未早於「今日零時」結束
 * （同公告「到期自動隱藏」原則；查詢已下推 `startAt >= 今日零時`，此為記憶體安全網）。
 */
export declare function isCalendarEventActive(item: {
    status: CalendarEventStatus;
    startAt: number;
    endAt?: number;
}, now?: number): boolean;
/** 行程輸入（表單與跨模組 publish 共用） */
export interface CalendarEventInput {
    title: string;
    description?: string;
    location?: string;
    startAt?: number;
    endAt?: number | null;
    /** 全天事件：以 allDayDate 定日，startAt 由其推導 */
    allDay?: boolean;
    allDayDate?: string;
    important?: boolean;
    /** 學校活動層級（衝堂比對用；未提供＝無） */
    schoolActivity?: CalendarSchoolActivity;
    categoryId?: string;
    /** 發佈單位（如：教務處）；缺省＝沿用現值（upsert 時） */
    publishUnit?: string;
    audience: CalendarAudience;
    /** 閱讀權限「無」＝公開（不需登入）；與身分選項互斥 */
    isPublic?: boolean;
    academicYear?: number;
    semester?: 1 | 2;
}
export interface ValidatedCalendarEventInput {
    title: string;
    description?: string;
    location?: string;
    startAt: number;
    endAt?: number;
    allDayDate?: string;
    important: boolean;
    schoolActivity: CalendarSchoolActivity;
    categoryId: string;
    publishUnit?: string;
    audience: CalendarAudience;
    isPublic: boolean;
    academicYear?: number;
    semester?: 1 | 2;
}
export type CalendarValidation = {
    ok: true;
    value: ValidatedCalendarEventInput;
} | {
    ok: false;
    message: string;
};
/**
 * 驗證並正規化行程輸入（建立表單、編輯與跨模組 publish 共用）。
 * 條件：標題非空、時間合法（endAt ≥ startAt）、閱讀權限非空——
 * 「閱讀權限：無」（isPublic）等同公開、免登入，屬合法的「非空」——見規劃書 §4.2 契約條文 1。
 */
export declare function validateCalendarInput(input: CalendarEventInput): CalendarValidation;
/** 教職員建立時：受眾若限定班級，必須包含自己的導師班（防發到別班） */
export declare function staffAudienceAllowed(audience: CalendarAudience, staffClassCode: string | undefined | null): boolean;
/** Firestore 原始文件 → 行程記錄（寬容解析） */
export declare function readCalendarEventRecord(id: string, raw: Record<string, unknown> | null | undefined): CalendarEventRecord | null;
/**
 * 行程記錄 → Firestore 寫入欄位。
 * audience 拉平為 `audienceRoles`／`audienceClassCodes` 以便 array-contains 查詢（比照公告）。
 */
export declare function calendarEventToFirestore(record: Omit<CalendarEventRecord, "id">): Record<string, unknown>;
/** 行程記錄 → 使用者端回傳項目（剝除 uid） */
export declare function calendarEventToItem(record: CalendarEventRecord, categoryName: string): CalendarEventItem;
/** 行事曆類型表寬容讀取（缺漏／毀損退回預設五類） */
export declare function readCalendarSettings(raw: unknown): CalendarSettings;
/** 行事曆類型顯示名稱（查無退回 id 或「其他」） */
export declare function calendarCategoryName(settings: CalendarSettings, categoryId: string): string;
/** 行程權限顯示文字：閱讀權限「無」＝「無（公開）」，否則身分名稱串接 */
export declare function calendarPermissionText(audience: CalendarAudience, isPublic: boolean): string;
/**
 * 請求體的 `audience` → 受眾（寬容解析；非公開且 roles 缺漏回 null 由呼叫端擋下）。
 * `allowEmptyRoles`＝閱讀權限「無」（公開）時放行空 roles（正規化交給 `validateCalendarInput`）。
 * 非法班級代碼一律捨棄，空陣列＝不限班級。
 */
export declare function parseCalendarAudience(raw: unknown, allowEmptyRoles?: boolean): CalendarAudience | null;
/** 行事曆管理子權限（功能模組 calendar 的 managerPermissions；管理員恆全權） */
export type CalendarManagerPermission = "manage" | "import" | "delete" | "settings";
export declare const CALENDAR_MANAGER_PERMISSIONS: {
    value: CalendarManagerPermission;
    label: string;
}[];
/** 目前帳號在行事曆可操作的功能（由被指派的子權限解析） */
export interface CalendarAccess {
    manage: boolean;
    import: boolean;
    delete: boolean;
    settings: boolean;
}
/** 由子權限解析可操作範圍；permissions=null 代表管理員（恆全權） */
export declare function calendarAccessOf(permissions: readonly string[] | null): CalendarAccess;
