/**
 * 身分名冊（四張表：學生、家長、教職員、管理員）共用定義：
 * 分頁、表單欄位、匯入檔案欄位、清單欄位。
 *
 * 名冊以學年度、學期為小週期；共同欄位（狀態、電子郵件、姓名、學年度、學期）
 * 定義於 RosterEntry，各表專屬欄位定義於 ROSTER_ENTRY_FIELDS。
 */
import { AccountStatus, UserRole } from "@/types/users";
/** 名冊分頁＝四種身分（與帳號身分一致） */
export type RosterRole = UserRole;
export declare const ROSTER_ROLES: {
    value: RosterRole;
    label: string;
    tab: string;
}[];
export declare function isRosterRole(value: unknown): value is RosterRole;
export declare function rosterRoleLabel(value: unknown): string;
/** 四張身分名冊的集合（每張＝一種身分，每「帳號 × 學年度 × 學期」最多一筆） */
export declare const ROSTER_COLLECTIONS: Record<UserRole, string>;
export declare function rosterCollection(role: UserRole): string;
/** 屬於「使用者帳號」的表單欄位（無學年度學期，寫入 users） */
export type AccountFieldKey = "email" | "account" | "name";
export declare const ACCOUNT_FIELD_KEYS: readonly AccountFieldKey[];
/** 各表專屬的名冊欄位鍵 */
export type EntryFieldKey = "studentId" | "grade" | "studentName" | "parentName" | "classCode" | "className" | "seatNo" | "rollNo" | "studentEmail" | "relation" | "appellation" | "attribute" | "unit" | "title" | "modules";
/** 家長與學生的關係選項（名冊表單用下拉選單） */
export declare const PARENT_RELATION_OPTIONS: readonly ["法定代理人", "監護人", "其他"];
/** 稱謂的常用建議（表單提供 datalist，仍可自行輸入） */
export declare const PARENT_APPELLATION_SUGGESTIONS: readonly ["爸爸", "媽媽", "祖父", "祖母", "外公", "外婆", "其他"];
/** 表單／匯入／清單共用的欄位鍵（帳號欄位屬使用者帳號層，名冊只存電子郵件與姓名的展示副本） */
export type RosterFieldKey = AccountFieldKey | EntryFieldKey;
/** 各身分在名冊的專屬欄位（順序即表單與清單顯示順序） */
export declare const ROSTER_ENTRY_FIELDS: Record<UserRole, EntryFieldKey[]>;
/**
 * 非管理員身分被指定管理的功能模組與子權限（政策修改書 §6）。
 * 存於學生／家長／教職員名冊條目 `managedModules`；管理員條目不使用（恆全權）。
 */
export interface ManagedModuleGrant {
    /** 權限單位代碼（同 ModuleMeta.value，如 "examRegistration"） */
    module: string;
    /** 子權限碼陣列（來源模組 manifest 之 managerPermissions；空陣列＝僅入口無操作） */
    permissions: string[];
}
/** 查詢用輔助鍵（Firestore array-contains）：managedModules 各項的 module 代碼去重 */
export declare function managedModuleKeys(grants: ManagedModuleGrant[] | undefined): string[];
/**
 * 身分名冊一條（四張表共用的文件形狀）。
 * doc id = `${uid}_${學年度}_${學期}`，關聯欄位 uid 連回使用者帳號。
 */
export interface RosterEntry {
    /** 連回使用者帳號文件（users 的 doc id） */
    uid: string;
    /** 狀態：有效／無效（擋該身分能否使用） */
    status: AccountStatus;
    /** 電子郵件地址（該期該身分的信箱，展示／搜尋） */
    email: string;
    /** 帳號名（留存辨識鍵；帳號已刪除的孤兒條目用來銜接回重建的帳號） */
    account?: string;
    /** 姓名（該期該身分的姓名，顯示以此為準） */
    name: string;
    /** 學年度（民國年） */
    academicYear: number;
    /** 學期：1=第1學期、2=第2學期 */
    semester: number;
    /** 學生姓名（家長表專屬：其子女姓名） */
    studentName?: string;
    /** 家長姓名（家長表專屬：家長本人姓名，可與帳號姓名不同） */
    parentName?: string;
    studentEmail?: string;
    studentId?: string;
    grade?: string;
    classCode?: string;
    className?: string;
    seatNo?: string;
    rollNo?: string;
    relation?: string;
    /** 稱謂（家長表專屬，例如爸爸、媽媽） */
    appellation?: string;
    attribute?: string;
    unit?: string;
    title?: string;
    modules?: string[];
    /**
     * 被指定管理的功能模組（僅學生／家長／教職員條目使用；管理員恆全權不用此欄）。
     * 學期綁定＝條目所屬學期；人被移出名冊或學期結束即自動失效。
     */
    managedModules?: ManagedModuleGrant[];
    /** managedModules 各項 module 代碼的查詢用輔助陣列（Firestore array-contains） */
    managedModuleKeys?: string[];
    createdAt?: number;
    updatedAt?: number;
}
export interface RosterFieldDef {
    key: RosterFieldKey;
    label: string;
    /** 表單單一欄位必填（姓名、學號等）；電子郵件與帳號是辨識鍵，兩者至少填一個 */
    required?: boolean;
    /** 匯入檔案（.xlsx）標題列的別名，比對時忽略大小寫與前後空白 */
    aliases: string[];
}
/** 各身分的表單欄位，順序即表單與匯入比對的順序（前四項為帳號欄位） */
export declare const ROSTER_FIELDS: Record<RosterRole, RosterFieldDef[]>;
/** 資訊卡（帳號與安全頁）顯示的名冊欄位：依身分裁剪，與名冊表單欄位不完全相同 */
export interface RoleInfoField {
    key: RosterFieldKey;
    label: string;
    /** 有值才顯示（教職員班級名稱）；預設空值顯示破折號 */
    showOnlyWhenFilled?: boolean;
}
export declare const ROLE_INFO_FIELDS: Record<UserRole, RoleInfoField[]>;
/** 帳號清單的表格欄位鍵（帳號／名冊欄位＋慣用身分） */
export type RosterColumnKey = RosterFieldKey | "preferredRole";
/**
 * 名冊清單的「身分專屬」欄位（不含密碼）。
 * 表格前三欄固定為「狀態」「姓名」「對應使用者（電子郵件地址／帳號）」，最後為「操作」。
 */
export declare const ROSTER_COLUMNS: Record<RosterRole, {
    key: RosterColumnKey;
    label: string;
}[]>;
/** 匯入時每一列的原始輸入（欄位值一律是字串，空白代表未填） */
export type RosterInput = Partial<Record<RosterFieldKey, string>>;
/**
 * 「使用者帳號管理」的輸入：帳號欄位＋密碼。
 * 密碼只屬於帳號層，名冊欄位與名冊匯入（RosterInput）一律不含密碼。
 */
export type AccountInput = Partial<Record<RosterFieldKey | "password", string>>;
/** 帳號清單一列（API 回傳格式，帳號欄位平鋪、不含密碼；名冊欄位為目前學年度學期） */
export interface RosterMember {
    uid: string;
    email: string;
    account: string;
    name: string;
    /** 帳號狀態：有效／無效（擋整個帳號能否登入） */
    status: AccountStatus;
    /** 名冊狀態：有效／無效（擋本期該身分能否使用） */
    rosterStatus: AccountStatus;
    /** true＝查無對應使用者帳號（帳號已刪除、名冊條目保留的孤兒列），可銜接回帳號 */
    orphan?: boolean;
    /** 慣用身分：多身分共用帳號時登入預設進入的身分（未設定則登入時詢問） */
    preferredRole?: UserRole;
    /** 最後登入（由登入紀錄推導） */
    lastLogin?: number;
    loginCount?: number;
    studentName?: string;
    studentEmail?: string;
    studentId?: string;
    grade?: string;
    classCode?: string;
    className?: string;
    seatNo?: string;
    rollNo?: string;
    relation?: string;
    attribute?: string;
    unit?: string;
    title?: string;
    modules?: string[];
    /** 被指定管理的功能模組（僅非管理員身分；管理員恆全權） */
    managedModules?: ManagedModuleGrant[];
}
/** 可匯入 Excel 的身分（家長只提供表單建立，不提供檔案匯入） */
export declare const IMPORTABLE_ROLES: RosterRole[];
export declare function isImportableRole(role: RosterRole): boolean;
/** 管理員「指定功能模組」選項文字（用於清單顯示與匯入比對） */
export declare function adminModuleLabels(values: unknown): string;
/**
 * 匯入檔案（Excel／CSV）可辨識的欄位：電子郵件地址、帳號、姓名＋該身分的名冊專屬欄位。
 * 電子郵件與帳號是「辨識鍵」（兩者至少填一個）；密碼屬「使用者帳號」，不出現在匯入欄位。
 */
export declare function rosterImportFields(role: RosterRole): RosterFieldDef[];
/**
 * 該身分的「名冊專屬欄位」定義（順序同 ROSTER_ENTRY_FIELDS，不含帳號三欄）。
 * 表單動態欄位、批次檔標題列共用。
 */
export declare function rosterEntryFieldDefs(role: RosterRole): RosterFieldDef[];
/**
 * 名冊專屬欄位跨四種身分的標題別名（同鍵欄位的別名合併去重）。
 * 「使用者帳號管理」的批次檔不分身分、單一工作表，故需一份跨身分的欄位表。
 */
export declare function rosterEntryHeaderAliases(key: EntryFieldKey): string[];
/** 名冊專屬欄位的鍵（四種身分合併、去重，順序 ALL_ROLES） */
export declare const ROSTER_ENTRY_FIELD_KEYS: EntryFieldKey[];
/** 辨識鍵說明：電子郵件地址與帳號至少填一個（登入識別），兩者都填須指向同一帳號 */
export declare const ROSTER_IDENTITY_LABEL = "\u96FB\u5B50\u90F5\u4EF6\u5730\u5740\u6216\u5E33\u865F\uFF08\u81F3\u5C11\u586B\u4E00\u500B\uFF09";
/** 匯入檔案的格式說明（匯入失敗時列出所有可辨識的標題列） */
export declare function rosterImportHint(role: RosterRole): string;
/**
 * 批次新增提示用：辨識鍵、必填與可選欄位名稱。
 * 電子郵件與帳號為辨識鍵（至少填一個）；姓名必填（未填＝該列略過，不沿用既有帳號姓名）。
 * 管理員條目已無「屬性／指定功能模組」欄位（管理員恆全權）。
 */
export declare function rosterBatchFieldHints(role: RosterRole): {
    identify: string;
    required: string;
    optional: string;
};
/** 「身分名冊管理」批次作業的三種模式（上傳試算表） */
export type RosterBatchMode = "create" | "update" | "delete";
export declare const ROSTER_BATCH_MODES: {
    value: RosterBatchMode;
    label: string;
}[];
export declare const ROSTER_BATCH_MODE_LABELS: Record<RosterBatchMode, string>;
/**
 * 「新增」模式的寫入策略。
 * append（追加，預設）＝在同一學期既有名冊之上繼續增加，已存在者略過；
 * replace（覆蓋）＝先刪除同一學期既有的該身分名冊，再依檔案新增（檔案即完整名單）。
 */
export type RosterBatchStrategy = "append" | "replace";
export declare const ROSTER_BATCH_STRATEGIES: {
    value: RosterBatchStrategy;
    label: string;
    hint: string;
}[];
export declare function isRosterBatchStrategy(value: unknown): value is RosterBatchStrategy;
/** 預覽中單一欄位的變更內容（顯示用） */
export interface RosterBatchChange {
    label: string;
    from: string;
    to: string;
}
export interface RosterBatchRow {
    /** 工作表實際列號（第 1 列為標題） */
    row: number;
    /** 該列的辨識鍵（電子郵件地址或帳號） */
    key: string;
    action: "create" | "update" | "delete" | "skip";
    /** 僅 skip 有值 */
    reason?: string;
    /** 僅 update 有值 */
    changes?: RosterBatchChange[];
}
export interface RosterBatchPreview {
    mode: RosterBatchMode;
    /** 寫入策略（僅新增模式有值，其餘模式固定 append） */
    strategy: RosterBatchStrategy;
    /** 覆蓋模式先行刪除的同一學期既有筆數（追加模式固定 0） */
    cleared: number;
    total: number;
    created: number;
    updated: number;
    deleted: number;
    skipped: number;
    rows: RosterBatchRow[];
}
export interface RosterBatchResult {
    /** 覆蓋模式先行刪除的同一學期既有筆數（追加模式固定 0） */
    cleared: number;
    created: number;
    updated: number;
    deleted: number;
    skipped: {
        row: number;
        reason: string;
    }[];
}
/** 一列完全空白時視為空列，匯入時直接略過不回報錯誤 */
export declare function isEmptyRosterInput(input: RosterInput): boolean;
/** 新建立的名冊條目預設狀態 */
export declare const ENTRY_DEFAULT_STATUS: AccountStatus;
