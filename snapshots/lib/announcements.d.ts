import "server-only";
import { AnnouncementAudience, AnnouncementCategory, AnnouncementRecord, AnnouncementPolicies, AnnouncementReminderItem, AnnouncementSettings, AnnouncementSurface, AnnouncementSurfaceItem, AnnouncementArchiveItem, AnnouncementSurfaces, type AnnouncementInboxItem } from "@/types/announcements";
import { UserRole } from "@/types/users";
/** 讀取公告模組設定（settings/announcements，30 秒快取） */
export declare function getAnnouncementSettings(): Promise<AnnouncementSettings>;
/** 公告變更後：清收件匣／顯示位置／公告專頁快取＋管理端清單（epoch） */
export declare function invalidateAnnouncementsCache(): void;
export interface PublishFromModuleInput {
    sourceModule: string;
    sourceRef?: string;
    title: string;
    body: string;
    authorUid: string;
    authorName: string;
    authorRole: UserRole;
    audience: AnnouncementAudience;
    /** 閱讀權限＝「無」（公開，不需登入可見） */
    isPublic?: boolean;
    categoryId?: string;
    publishAt?: number;
    expireAt?: number | null;
    pinned?: boolean;
}
/**
 * 跨模組發佈公告：其他功能模組（補修、行事曆…）在伺服器端直接呼叫。
 * 校驗失敗拋錯；成功回傳新公告 id。
 */
export declare function publishFromModule(input: PublishFromModuleInput): Promise<{
    id: string;
}>;
export interface CreateAnnouncementInput extends PublishFromModuleInput {
    /** 管理端可覆寫狀態；教職員發佈固定 published */
    status?: "published" | "archived";
}
/** 管理端／教職員建立公告（內部共用） */
export declare function createAnnouncement(input: CreateAnnouncementInput): Promise<{
    id: string;
}>;
/** 更新公告（僅改可編輯欄位；id 固定）。回傳 `deleted=true` 表示因下架原則被真實刪除 */
export declare function updateAnnouncement(id: string, patch: {
    title?: string;
    body?: string;
    categoryId?: string;
    audience?: AnnouncementAudience;
    isPublic?: boolean;
    publishAt?: number;
    expireAt?: number | null;
    pinned?: boolean;
    status?: "published" | "archived";
}): Promise<{
    deleted: boolean;
}>;
/** 封存公告。回傳 `deleted=true` 表示因下架原則被真實刪除 */
export declare function archiveAnnouncement(id: string): Promise<{
    deleted: boolean;
}>;
export interface UpdateFromModuleInput {
    sourceModule: string;
    sourceRef: string;
    title?: string;
    body?: string;
    categoryId?: string;
    audience?: AnnouncementAudience;
    isPublic?: boolean;
    publishAt?: number;
    expireAt?: number | null;
    pinned?: boolean;
    /** archived ＝ 撤回（下架但保留文件供對帳）；published ＝ （重新）上架 */
    status?: "published" | "archived";
}
/**
 * P5 跨模組更新／撤回公告：以 sourceModule+sourceRef 定位並更新。
 * 查無對應公告時回 { updated: 0 }（未發佈過是合法狀態，不拋錯——
 * 讓來源端可在「可能從未發佈」時安全呼叫）。
 * status: "archived" 即撤回語意；若系統「下架即真實刪除」原則開啟，
 * 由 updateAnnouncement 內建轉為硬刪除（含個人提醒）。
 */
export declare function updateFromModule(input: UpdateFromModuleInput): Promise<{
    updated: number;
}>;
/**
 * 無條件真實刪除單則公告及其所有個人提醒文件（管理端「刪除」鈕）。
 * 不看「下架公告真實刪除」原則，一律硬刪除（不可恢復）。
 */
export declare function deleteAnnouncementHard(id: string): Promise<void>;
/**
 * 批次封存（管理端勾選後批次作業）。
 * 原則「下架公告真實刪除」開啟時改為連同個人提醒硬刪除。
 * 回傳實際封存與真實刪除的筆數（查無者略過）。
 */
export declare function batchArchiveAnnouncements(ids: string[]): Promise<{
    archived: number;
    deleted: number;
}>;
/**
 * 無條件批次真實刪除公告及其所有個人提醒文件（管理端批次「刪除」）。
 * 不看「下架公告真實刪除」原則；刪除不存在的文件為無害空操作。
 */
export declare function batchDeleteAnnouncementsHard(ids: string[]): Promise<number>;
/**
 * 公告原則「下架公告真實刪除」的批次清除：
 * 掃描封存與已到期的公告，連同個人提醒一併刪除。
 * 皆為單欄位等值／範圍查詢（status、expireAt），不需複合索引；
 * 由管理端清單載入時呼叫（settings.policies.hardDeleteExpired=true 才會執行）。
 */
export declare function purgeDownAnnouncements(): Promise<number>;
export interface AdminAnnouncementRow extends AnnouncementRecord {
    categoryName: string;
}
/** 管理端清單（含封存；不做受眾過濾） */
export declare function listAdminAnnouncements(options?: {
    includeArchived?: boolean;
}): Promise<AdminAnnouncementRow[]>;
/**
 * 公告狀態統計（省流模式的輕量數據）：使用 Firestore count 聚合查詢——
 * 每個計數僅計 1 次讀取（不載入任何文件內容），遠比載入整份清單省流。
 * 回傳「發布中（未下架）」與「已封存」兩筆；其他狀態（草稿等）不計。
 */
export declare function countAnnouncementsByStatus(): Promise<{
    published: number;
    archived: number;
}>;
export interface InboxQuery {
    role: UserRole;
    classCode?: string | null;
}
/**
 * 角色收件匣：僅下推 `publishAt` 單欄位排序（**免複合索引**，與行事曆同策略——
 * 舊版 status＋audienceRoles 需複合索引，開發專案缺索引時整頁 500）；
 * 狀態／受眾／班級／到期於記憶體過濾（量級以 INBOX_LIMIT 有界，鐵律 3）。
 */
export declare function listInboxAnnouncements(query: InboxQuery): Promise<AnnouncementInboxItem[]>;
/** 讀取單則公告（管理端編輯用） */
export interface SurfaceQuery {
    surface: AnnouncementSurface;
    /** null＝未登入（僅 `login` 顯示位置允許；只取閱讀權限＝「無」的公告） */
    role: UserRole | null;
    classCode?: string | null;
}
/**
 * 顯示位置（系統首頁登入表單上方／四種身分功能首頁）的公告。
 *
 * 查詢策略：僅下推 `publishAt` 單欄位排序（**免複合索引**）；
 * 公開判定／受眾（含管理員豁免）／班級／到期於記憶體過濾（量級有界，鐵律 3）；
 * 15 秒 cachedRead，寫入後由 `invalidateAnnouncementsCache()` 清前綴失效。
 */
export declare function listSurfaceAnnouncements(query: SurfaceQuery, limit: number): Promise<AnnouncementSurfaceItem[]>;
/** 讀取單則公告（管理端編輯用） */
export interface ArchiveQuery {
    /** null＝未登入（只取閱讀權限＝「無」的公開公告） */
    role: UserRole | null;
    classCode?: string | null;
}
/**
 * 公告專頁（`/announcements`）：5 處顯示位置共用的「全部公告」清單。
 *
 * 查詢策略：僅下推 `publishAt` 單欄位排序（**免複合索引**）；
 * 公開判定／受眾（含管理員豁免）／班級／到期於記憶體過濾；單次 `limit(ARCHIVE_LIMIT)`
 * 為有界查詢（鐵律 3），前端以共用分頁元件切片，翻頁不增加任何 Firestore 讀取；
 * 15 秒 cachedRead，寫入後由 `invalidateAnnouncementsCache()` 清前綴失效。
 */
export declare function listArchiveAnnouncements(query: ArchiveQuery): Promise<AnnouncementArchiveItem[]>;
/** 讀取單則公告（管理端編輯用） */
export declare function getAnnouncement(id: string): Promise<AnnouncementRecord | null>;
/** 儲存模組設定（管理端；整份覆寫 settings/announcements） */
export declare function saveAnnouncementSettings(input: {
    categories?: AnnouncementCategory[];
    defaultRemindersEnabled?: boolean;
    surfaces?: Partial<AnnouncementSurfaces>;
    policies?: Partial<AnnouncementPolicies>;
}): Promise<AnnouncementSettings>;
/**
 * 切換個人公告提醒：已設定則取消，未設定則建立。
 * 回傳 `reminded=true` 表示目前為「已設定」。
 */
export declare function toggleAnnouncementReminder(uid: string, announcementId: string): Promise<{
    reminded: boolean;
}>;
/** 使用者已設定提醒的公告 id 清單（不做跨請求快取：提醒變動頻繁） */
export declare function listMyReminderIds(uid: string): Promise<string[]>;
/**
 * 個人提醒列表（首頁鈴鐺／提醒區）：
 * 讀提醒文件 → 批次讀公告（getAll）→ 確認仍可閱讀（發布中、未過期、受眾涵蓋身分＋班級）。
 */
export declare function listMyReminders(uid: string, role: UserRole, classCode?: string | null): Promise<AnnouncementReminderItem[]>;
