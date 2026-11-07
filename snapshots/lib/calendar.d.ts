import "server-only";
import { AdminCalendarEventRow, CalendarAudience, CalendarCategory, CalendarEventItem, CalendarEventRecord, CalendarEventStatus, CalendarGradeOption, CalendarPolicies, CalendarReminderItem, CalendarSchoolActivity, CalendarSettings, CalendarSurface, CalendarSurfaceItem, CalendarSurfaces } from "@/types/calendar";
import type { UserRole } from "@/types/users";
import { type SchoolPeriodRow } from "@/types/school-periods";
/** 讀取行事曆模組設定（settings/calendar，30 秒快取） */
export declare function getCalendarSettings(): Promise<CalendarSettings>;
/** 讀取學校課表作息（settings/schoolPeriods，30 秒快取）；行事曆表單與批次匯入共用 */
export declare function getSchoolPeriods(): Promise<SchoolPeriodRow[]>;
/** 年級／班級候選（學校活動層級用） */
export declare function getSchoolClassOptions(): Promise<CalendarGradeOption[]>;
/** 行程／設定變更後：清 `calendar:` 前綴讀快取（含設定文件的 `setting-doc:calendar`） */
export declare function invalidateCalendarCache(): void;
export interface PublishScheduleFromModuleInput {
    /** 必填：來源模組代碼（行事曆自己建＝"calendar"） */
    sourceModule: string;
    /** 強烈建議填：來源資料 id，改期／取消靠它定位（同值再次呼叫＝覆寫更新） */
    sourceRef?: string;
    title?: string;
    description?: string;
    location?: string;
    startAt?: number;
    endAt?: number | null;
    allDay?: boolean;
    allDayDate?: string;
    important?: boolean;
    /** 學校活動層級（衝堂比對用；未提供＝沿用現值） */
    schoolActivity?: CalendarSchoolActivity;
    categoryId?: string;
    /** 發佈單位（如：教務處）；缺省＝沿用現值 */
    publishUnit?: string;
    audience?: CalendarAudience;
    /** 閱讀權限「無」＝公開（不需登入）；與身分選項互斥 */
    isPublic?: boolean;
    /** 取消時傳 "cancelled"（保留文件）；預設 "active" */
    status?: CalendarEventStatus;
    createdBy?: {
        uid: string;
        name: string;
        role: UserRole;
    };
    academicYear?: number;
    semester?: 1 | 2;
}
/**
 * 跨模組發佈行程：其他功能模組（空間預約、報名…）在伺服器端直接呼叫。
 * 有 `sourceRef` 時以 `sourceModule+sourceRef` 定位（存在＝覆寫更新）。
 * 校驗失敗拋錯；成功回傳 `{ id, updated }`。
 */
export declare function publishScheduleFromModule(input: PublishScheduleFromModuleInput): Promise<{
    id: string;
    updated: boolean;
}>;
export interface CreateCalendarEventInput extends Omit<PublishScheduleFromModuleInput, "sourceModule" | "audience" | "title"> {
    sourceModule?: string;
    audience: CalendarAudience;
    title: string;
}
/** 管理端／教職員建立行程（無 sourceRef 時每次皆新建） */
export declare function createCalendarEvent(input: CreateCalendarEventInput): Promise<{
    id: string;
    updated: boolean;
}>;
/**
 * 更新行程（僅改可編輯欄位；id、來源與建立者固定）。回傳 `deleted=true` 表示因下架原則被真實刪除。
 * `allowHardDelete=false` 時即使「下架行程真實刪除」開啟也只做軟取消（供只有行程管理權、
 * 沒有刪除權的被指派者使用，避免以取消名義永久刪除）。
 */
export declare function updateCalendarEvent(id: string, patch: PublishScheduleFromModuleInput, options?: {
    allowHardDelete?: boolean;
}): Promise<{
    deleted: boolean;
}>;
/** 取消行程。回傳 `deleted=true` 表示因下架原則被真實刪除 */
export declare function cancelCalendarEvent(id: string, options?: {
    allowHardDelete?: boolean;
}): Promise<{
    deleted: boolean;
}>;
/**
 * 無條件真實刪除單則行程及其所有個人提醒文件（管理端「刪除」鈕）。
 * 不看「下架行程真實刪除」原則，一律硬刪除（不可恢復）。
 */
export declare function deleteCalendarEventHard(id: string): Promise<void>;
/**
 * 批次取消（管理端勾選後批次作業）。
 * 原則「下架行程真實刪除」開啟時改為連同個人提醒硬刪除。
 * 回傳實際取消與真實刪除的筆數（查無者略過）。
 */
export declare function batchCancelCalendarEvents(ids: string[], options?: {
    allowHardDelete?: boolean;
}): Promise<{
    cancelled: number;
    deleted: number;
}>;
/**
 * 無條件批次真實刪除行程及其所有個人提醒文件（管理端批次「刪除」）。
 * 不看「下架行程真實刪除」原則；刪除不存在的文件為無害空操作。
 */
export declare function batchDeleteCalendarEventsHard(ids: string[]): Promise<number>;
/**
 * 行程原則「下架行程真實刪除」的批次清除：
 * 掃描已取消的行程，連同個人提醒一併刪除。
 * 單欄位等值查詢＋`limit`（鐵律 2、3），個人提醒以 `in` 30 值／批（鐵律 4）；
 * 由管理端清單載入時呼叫（policies.hardDeleteCancelled=true 才會執行）。
 */
export declare function purgeDownCalendarEvents(): Promise<number>;
/** 是否可由該身分編輯：管理員＝全部；教職員＝僅自己建立的 */
export declare function canEditCalendarEvent(record: CalendarEventRecord, session: {
    uid: string;
    role: UserRole;
}): boolean;
/** 讀取單則行程（管理端編輯用） */
export declare function getCalendarEvent(id: string): Promise<CalendarEventRecord | null>;
/**
 * 管理端清單（含已取消；不做受眾過濾）。
 * `orderBy("startAt","desc")` 為單欄位排序，走自動索引、不需複合索引。
 */
export declare function listAdminCalendarEvents(): Promise<AdminCalendarEventRow[]>;
/**
 * 行程狀態統計（省流模式的輕量數據）：Firestore count 聚合——
 * 每個計數僅 1 次讀取（不載入文件內容），比載入整份清單省流。
 * 回傳「顯示中（active，未取消）」與「已取消」兩筆。
 */
export declare function countCalendarEventsByStatus(): Promise<{
    active: number;
    cancelled: number;
}>;
export interface CalendarListQuery {
    /** null＝未登入公開模式（只回閱讀權限「無」且不限班級的公開行程） */
    role: UserRole | null;
    classCode?: string | null;
    /** 顯示起點（epoch ms）；預設今日零時 */
    from?: number;
}
/**
 * 各身分行程列表：僅下推 `startAt` 單欄位（**免複合索引**，與顯示區／管理端清單
 * 同策略——舊版下推 status＋audienceRoles 需複合索引，開發專案缺索引時整頁 500）；
 * status／受眾與班級於記憶體過濾（量級以 LIST_LIMIT 有界，鐵律 3）。
 * `role: null`＝未登入公開模式：只回 `isCalendarEventPublicReadable` 的行程。
 * 15 秒 cachedRead，寫入後由 `invalidateCalendarCache()` 清前綴失效。
 */
export declare function listCalendarEvents(query: CalendarListQuery): Promise<CalendarEventItem[]>;
export interface CalendarSurfaceQuery {
    surface: CalendarSurface;
    /** null＝未登入（僅 `login` 顯示位置允許；只取閱讀權限「無」的公開行程） */
    role: UserRole | null;
    classCode?: string | null;
}
/**
 * 顯示位置（系統首頁登入表單上方／四種身分功能首頁）的行程：
 * 尚未結束的行程中，依開始時間取最近的前 `limit` 則（該位置「顯示筆數」設定，
 * 預設 5；前端以上下箭頭逐則翻頁）。
 *
 * 查詢策略（與管理端清單一致）：僅下推 `startAt` 單欄位（走自動索引、**免複合索引**，
 * 任何 Firestore 專案開箱即用——曾因開發專案缺複合索引導致四個顯示區全掛）；
 * status／尚未結束／受眾（含管理員豁免、未登入公開判定）全在記憶體過濾，
 * 量級以 SURFACE_FETCH_LIMIT 有界（鐵律 3），15 秒 `cachedRead` 摊平讀取成本
 * （寫入後由 `invalidateCalendarCache()` 清 `calendar:` 前綴失效）。
 * 管理員比照提醒列表與管理端清單：不受受眾限制（校務視角）。
 */
export declare function listSurfaceCalendarEvents(query: CalendarSurfaceQuery, limit?: number): Promise<CalendarSurfaceItem[]>;
/**
 * 公開行事曆頁（未登入可瀏覽）：僅以 startAt 單欄位查詢（免複合索引），
 * 狀態與公開性記憶體過濾（量級以 SURFACE_FETCH_LIMIT 有界，鐵律 3）。
 * 15 秒 cachedRead，寫入後由 invalidateCalendarCache() 清前綴失效。
 */
export declare function listPublicCalendarEvents(limit?: number): Promise<CalendarSurfaceItem[]>;
/**
 * 公開行事曆專頁：區間查詢（startAt 單欄位範圍，免複合索引）。
 * 狀態＝active，於記憶體過濾；`viewerIsAdmin`＝檢視者為管理員時放行全部行程
 * （比照管理端視角——管理員在檢視頁也應看得到僅限管理員的行程），否則只回公開行程。
 * 取量以 limit 有界（≤200，鐵律 3）。同日同區間 cachedRead（15 秒），
 * 寫入後由 invalidateCalendarCache() 清前綴失效。
 */
export declare function listPublicCalendarEventsInRange(fromMs: number, toMs: number, limit?: number, viewerIsAdmin?: boolean): Promise<CalendarSurfaceItem[]>;
/**
 * 儲存模組設定（管理端；整份覆寫 settings/calendar） */
export declare function saveCalendarSettings(input: {
    categories?: CalendarCategory[];
    defaultRemindersEnabled?: boolean;
    surfaces?: Partial<CalendarSurfaces>;
    policies?: Partial<CalendarPolicies>;
}): Promise<CalendarSettings>;
/**
 * 切換個人行程提醒：已設定則取消，未設定則建立。
 * 回傳 `reminded=true` 表示目前為「已設定」（非推播，開啟頁面才更新）。
 */
export declare function toggleCalendarReminder(uid: string, eventId: string): Promise<{
    reminded: boolean;
}>;
/** 使用者已設定提醒的行程 id 清單（不做跨請求快取：提醒變動頻繁） */
export declare function listMyCalendarReminderIds(uid: string): Promise<string[]>;
/**
 * 個人提醒列表（鈴鐺／提醒區）：
 * 讀提醒文件 → 分塊批次讀行程（200／批，鐵律 4）→ 確認仍 active 且受眾涵蓋身分＋班級。
 */
export declare function listMyCalendarReminders(uid: string, role: UserRole, classCode?: string | null): Promise<CalendarReminderItem[]>;
