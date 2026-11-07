import "server-only";
import { AccountRecord, AccountStatus, AdminModule, UserRole } from "@/types/users";
import { SchoolPeriod } from "@/types/settings";
import { AccountInput, ManagedModuleGrant, RosterEntry, RosterFieldKey, RosterInput, RosterMember, RosterRole } from "@/types/roster";
export type { RosterMember };
/** 使用者帳號的欄位（無學年度學期） */
export interface AccountFields {
    email: string;
    account: string;
    name: string;
}
/** 名冊專屬欄位（隨學年度、學期變動），鍵見 ROSTER_ENTRY_FIELDS */
export type RosterData = Partial<Record<RosterFieldKey, string | string[]>>;
export type RosterValidation = {
    ok: true;
    account: AccountFields;
    roster: RosterData;
} | {
    ok: false;
    message: string;
};
/** 名冊文件 id：每「帳號 × 學年度 × 學期」唯一，方便直接更新與讀取 */
export declare function rosterEntryId(uid: string, period: SchoolPeriod): string;
/**
 * 驗證並正規化一列資料，拆成「使用者帳號」與「名冊專屬欄位」兩段。
 * 帳號規則：電子郵件與帳號至少填一個（登入識別，另一欄可留空）、姓名必填；
 * 密碼與帳號管理屬「使用者帳號管理」，名冊不處理。
 * 名冊規則：學生學號必填；管理員條目無屬性／模組欄位（管理員恆全權）。
 */
export declare function validateRosterInput(role: RosterRole, input: RosterInput): RosterValidation;
export type AccountValidation = {
    ok: true;
    account: AccountFields;
    password: string | null;
} | {
    ok: false;
    message: string;
};
/**
 * 驗證「使用者帳號管理」工作表的帳號輸入（無名冊欄位）。
 * 建立時密碼必填；更新時密碼留空代表不變更。
 * skipPasswordRule＝略過密碼命名規則（僅驗證非空白與長度上限），批次匯入使用。
 */
export declare function validateAccountInput(input: AccountInput, options: {
    requirePassword: boolean;
    skipPasswordRule?: boolean;
}): AccountValidation;
/** 查重索引：email/account 依使用者帳號；學號依「當期」的該身分名冊 */
export interface RosterIndex {
    emails: Map<string, string>;
    accounts: Map<string, string>;
    studentIds: Map<string, string>;
}
/**
 * 以電子郵件或帳號找出現有使用者帳號（綁定既有帳號用）；查無回 null。
 */
export declare function findAccountByKey(key: string): Promise<{
    uid: string;
    email: string;
    account: string;
    name: string;
    status: AccountStatus;
} | null>;
/** 回傳衝突訊息（無衝突回 null） */
export declare function checkRosterConflict(account: AccountFields, roster: RosterData, index: RosterIndex): string | null;
/**
 * 單筆查重（鐵律 3：查詢回傳幾筆＝幾次讀取）：以電子郵件／帳號／學號精準查詢，
 * 查無只收空查詢的最低 1 讀；取代整表掃描建索引（批次匯入也只對本批列的
 * 辨識鍵做 `where in` 查詢，不再整表掃）。
 * `excludeUid`＝忽略此帳號（更新自己時 email/account 學號不算衝突）；
 * `role`＋`period`＝學號檢查範圍（同身分、同學期；孤兒條目不佔學號）。
 * 回傳衝突訊息，無衝突回 null。檢查順序與 checkRosterConflict 一致：email → account → 學號。
 */
export declare function checkAccountConflictDirect(account: AccountFields, roster: RosterData, options?: {
    role?: RosterRole;
    period?: SchoolPeriod;
    excludeUid?: string;
}): Promise<string | null>;
/** 組出「使用者帳號」文件：四種身分共用同一張 users 表（名冊欄位於名冊四表） */
export declare function buildAccountRecord(account: AccountFields, passwordHash: string, preferredRole?: UserRole | ""): AccountRecord;
/**
 * 組出一條名冊資料（寫入前呼叫）：
 * 共同欄位（狀態、電子郵件、帳號名、姓名、學年度、學期）＋該身分的專屬欄位。
 * 帳號名一併留存，孤兒條目（帳號已刪除）才能用「電子郵件或帳號」銜接回重建的帳號。
 */
export declare function buildRosterEntry(uid: string, role: RosterRole, period: SchoolPeriod, roster: RosterData, identity: {
    email: string;
    name: string;
    account?: string;
    status?: AccountStatus;
}): RosterEntry;
/** 讀取某帳號在指定學年度學期的身分名冊條目（無則回 null） */
export declare function getRosterEntry(uid: string, role: RosterRole, period: SchoolPeriod): Promise<Record<string, unknown> | null>;
/** 讀取指定身分在指定學年度學期的名冊，以 uid 為鍵 */
export declare function loadPeriodEntries(period: SchoolPeriod, role: RosterRole): Promise<Map<string, Record<string, unknown>>>;
/** 條目是否可用（狀態＝有效；缺 status 視為有效） */
export declare function isActiveEntry(entry: Record<string, unknown> | null | undefined): boolean;
/** 名冊條目的狀態（有效／無效；缺 status 視為有效） */
export declare function entryStatus(entry: Record<string, unknown> | null | undefined): AccountStatus;
/**
 * 該帳號在當期可用（有效）的身分清單，順序固定 ALL_ROLES。
 * 登入候選、慣用身分可選範圍都由此決定。
 */
export declare function getActiveRoles(uid: string, period: SchoolPeriod, roles: readonly UserRole[]): Promise<UserRole[]>;
/**
 * 稱謂：名冊姓名（該期該身分）＞帳號姓名＞電子郵件。
 * 登入、切換身分時都以此決定 session 的 displayName。
 */
export declare function resolveDisplayName(account: Record<string, unknown> | null | undefined, entry: Record<string, unknown> | null | undefined): string;
/**
 * 更新帳號識別欄位時，同步當期各名冊條目的電子郵件／帳號名／姓名（展示與銜接用）。
 * 只更新確實存在的條目，歷史學期不受影響。
 */
export declare function syncEntryIdentity(uid: string, period: SchoolPeriod, patch: {
    email?: string;
    account?: string;
    name?: string;
}): Promise<void>;
/**
 * `create()` 撞到已存在文件（ALREADY_EXISTS）的判定。
 * gRPC 狀態碼為數字 6（`@grpc/grpc-js` Status），部分執行環境／REST fallback
 * 回字串別名，三者都認，避免「已存在＝跳過」的分支被漏接而拋錯。
 */
export declare function isAlreadyExistsError(error: unknown): boolean;
/**
 * 把 fromUid 的名冊條目（四張名冊、所有學年度學期）改掛到 toUid：
 * 改寫 uid 欄位與 doc id（`toUid_學年度_學期`）；toUid 已有的條目跳過（不覆寫）。
 * `allowSuper＝false` 時跳過「超級」管理員條目（銜接＝授予超級，非超級操作者不得為之）。
 * toUid 查無使用者文件時不動作（`options.assumeTargetExists` 可跳過該點查，
 * 供批量銜接使用——呼叫端已保證目標存在）。回傳成功改掛的條目數。
 */
export declare function moveEntriesUid(fromUid: string, toUid: string, allowSuper: boolean, options?: {
    assumeTargetExists?: boolean;
}): Promise<number>;
/**
 * 自動銜接：建立／更新帳號時，把「孤兒名冊條目」（uid 已查無使用者文件）
 * 且辨識鍵（電子郵件地址或帳號）相符者，整批改掛回此帳號。
 * `allowSuper＝false` 時不接「超級」管理員條目（見 moveEntriesUid）。
 * 仍屬活著帳號的條目一律不動。回傳銜接的條目數（無相符回 0）。
 */
export declare function linkOrphanEntries(target: {
    uid: string;
    email: string;
    account: string;
}, allowSuper: boolean): Promise<number>;
/** 批量銜接的目標帳號（批次建立／更新帳號時彙整） */
export interface LinkTarget {
    uid: string;
    email: string;
    account: string;
}
/**
 * 批量版 linkOrphanEntries：一次把多個目標帳號的孤兒條目銜接回來。
 * 省讀取的三個手段（批次建立 120 列時，逐列執行＝每列 8 條查詢＋各自的孤兒點查）：
 * 1) 辨識鍵查詢以 `in` 分塊（30 值一塊）合併：每角色每欄位 ⌈鍵數/30⌉ 條查詢；
 * 2) 孤兒判定跨目標去重後共用同一輪 getAll；
 * 3) 改掛時跳過目標使用者文件的存在性點查（呼叫端剛建立／既有的帳號，保證存在）。
 * 語意與單筆版一致：仍屬活著帳號的條目不動、超級條目依 allowSuper 決定、
 * 目標已有條目不覆寫（moveEntriesUid 的 create）。
 * 回傳全部目標成功銜接的條目數總和。
 */
export declare function linkOrphanEntriesBatch(targets: LinkTarget[], allowSuper: boolean): Promise<number>;
/** 使用者帳號＋當期名冊條目 → 帳號清單一列（不含密碼；名冊欄位取自目前學年度學期）
 *  參數同時接受 Firestore 回傳的 DocumentData 與型別化的 AccountRecord／RosterEntry
 *（回應即真相：mutation 路由用寫入前的快照直接組列，免再點查）。 */
export declare function toRosterMember(role: RosterRole, uid: string, account: AccountRecord | Record<string, unknown> | null, entry: RosterEntry | Record<string, unknown> | null): RosterMember;
/** 密碼雜湊（匯入／表單共用；costFactor 固定 12，不接受外部指定） */
export declare function hashRosterPassword(plain: string): Promise<string>;
/** 表單／匯入的帳號欄位判定（無學年度學期的欄位寫入 users） */
export declare function isAccountFieldKey(key: RosterFieldKey): boolean;
/**
 * 管理員守門上下文：整批作業只讀一次「當期管理員名冊＋其使用者帳號」，
 * 之後每列的守門判定全是純計算（docs/資料庫讀取規範.md 鐵律 4：禁止 N+1）。
 * 原本批次每列各查一次管理員名冊＋getAll，400 列即可放大成數千次讀取。
 */
export interface AdminGuardContext {
    period: SchoolPeriod;
    /** 當期管理員條目（uid → entry，含有效與無效） */
    entries: Map<string, Record<string, unknown>>;
    /** 條目有效 ＋ 使用者帳號有效 的管理員 uid */
    activeAdminUids: Set<string>;
    /** 上者之中屬性＝超級者 */
    activeSuperUids: Set<string>;
}
/** 載入管理員守門上下文（讀 1 次當期管理員名冊＋分塊 getAll 使用者帳號） */
export declare function loadAdminGuardContext(): Promise<AdminGuardContext>;
/** 除本人外的有效管理員數（由上下文純計算） */
export declare function countOtherActiveAdminsFrom(ctx: AdminGuardContext, excludeUid: string): number;
/** 【已退役】除本人外的有效超級管理員數——超級概念已取消，固定回 0 */
export declare function countOtherActiveSupersFrom(_ctx: AdminGuardContext, _excludeUid: string): number;
/**
 * 【已退役】最後一位超級守門——超級概念已取消，固定放行（null）。
 * 「最後一位管理員不可停用」由 accountStatusGuardFrom 保留。
 */
export declare function lastSuperGuardFrom(_ctx: AdminGuardContext, _uid: string): string | null;
/** 【已退役】同 lastSuperGuardFrom（整批上下文版）；保留供批次路徑相容 */
export declare function lastSuperGuard(_uid: string): Promise<string | null>;
/** 狀態變更／刪除守門（由上下文純計算；訊息與 accountStatusGuard 一致） */
export declare function accountStatusGuardFrom(ctx: AdminGuardContext, uid: string, sessionUid: string): string | null;
/**
 * 狀態變更／刪除的守門：本人、以及「仍是有效管理員且只剩他一位」。
 * 回傳擋下訊息，null＝放行（訊息用語由呼叫端依情境調整）。
 * 單筆操作可用本函式；批次作業請改用 loadAdminGuardContext＋accountStatusGuardFrom。
 */
export declare function accountStatusGuard(uid: string, sessionUid: string): Promise<string | null>;
/**
 * 【已退役】超級管理員條目判定——管理員屬性已取消（政策修改書決議二）：
 * 全體管理員平等，不再有「超級」特殊條目。固定回 false，舊呼叫點自然失效。
 */
export declare function isSuperEntry(_entry: Record<string, unknown> | null | undefined): boolean;
/**
 * 【已退役】管理員屬性層級守門——屬性已取消，固定放行（null）。
 * 保留函式相容既有呼叫點；「最後一位管理員不可停用」另由 accountStatusGuard 守門。
 */
export declare function adminAttributeGuard(_options: {
    isSuper: boolean;
    nextAttribute?: string | null;
    currentAttribute?: string | null;
}): string | null;
/**
 * 名冊條目「實際存的」功能模組代碼（僅舊資料相容顯示用；
 * 新政策下管理員恆全權，本函式不再參與授予判定）。
 */
export declare function storedAdminModules(entry: Record<string, unknown> | null | undefined): AdminModule[];
/**
 * 管理員可用的功能模組權限（政策修改書決議二）：
 * 有當期管理員名冊條目＝全體模組全開（含原 superOnly）；無條目＝無權限。
 * 「屬性／指定功能模組」欄位已退役，不再逐模組判定。
 */
export declare function adminModulesOf(entry: Record<string, unknown> | null | undefined): AdminModule[];
/**
 * 非管理員身分條目被指定管理的功能模組（政策修改書 §6）。
 * 無條目或無欄位＝空陣列（未被指定）。
 */
export declare function managedModulesOf(entry: Record<string, unknown> | null | undefined): ManagedModuleGrant[];
/**
 * 守門判定用：該條目對模組是否被指定管理，及是否含指定子權限。
 * - `permission` 省略＝只要被指定（不論子權限）即為 true；
 * - `permission` 有值＝permissions 需含該碼；被指定但 permissions 為空陣列＝false。
 */
export declare function hasManagedModule(entry: Record<string, unknown> | null | undefined, module: string, permission?: string): boolean;
