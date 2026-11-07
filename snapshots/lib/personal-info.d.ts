import "server-only";
import { type StudentPersonalInfoSettings, type StudentPersonalInfoEntry, type StudentPersonalIdentityFields, type StudentPersonalInfoTermFields, type StudentPersonalInfoRecord, type StudentPersonalPhotoKind, type StudentPersonalPhotoMetadata, type StudentPersonalInfoTargetOptions } from "@/types/personal-info";
import { type SchoolPeriod, type StudentPersonalPhotoStorage } from "@/types/settings";
export declare function getStudentPersonalInfoSettings(period: SchoolPeriod): Promise<StudentPersonalInfoSettings>;
export declare function saveStudentPersonalInfoSettings(period: SchoolPeriod, settings: StudentPersonalInfoSettings): Promise<void>;
export declare function getStudentPersonalInfoTargetOptions(): Promise<StudentPersonalInfoTargetOptions>;
/** 管理端列表的一列（僅回必要欄位；不回個資內容，避免整班資料外洩到列表） */
export interface StudentPersonalInfoListRow {
    uid: string;
    studentId: string;
    name: string;
    classCode: string;
    /** none＝本期尚無文件；incomplete＝有文件但學期欄位未填妥；complete＝學期欄位全填 */
    status: "none" | "incomplete" | "complete";
    /** 本期文件的最後更新時間（epoch ms；無文件為 null） */
    updatedAt: number | null;
}
/**
 * 統計本期已建立個人資料文件的數量（省流模式的輕量總數）。
 * 使用 Firestore count 聚合：每個計數僅 1 次讀取、不載入任何文件內容。
 */
export declare function countStudentPersonalInfoByTerm(period: SchoolPeriod): Promise<number>;
/**
 * 依班級代碼載入本期學生個人資料列表（管理端用）。
 *
 * 讀取範圍嚴格限定於該班（鐵律 2 過濾下推）：名冊以
 * academicYear＋semester＋classCode 三個等值條件下推，回傳筆數≈該班人數而非全校；
 * 個人資料文件以本班 uid 逐一點查（點查不存在＝0 讀），200 筆／批（鐵律 4）。
 * 回傳前依學號排序；不含聯絡方式等個資內容，僅回填寫狀態與更新時間。
 */
export declare function loadStudentPersonalInfoClassList(period: SchoolPeriod, classCode: string): Promise<StudentPersonalInfoListRow[]>;
export declare function getStudentPersonalInfo(uid: string, period: SchoolPeriod): Promise<StudentPersonalInfoRecord>;
/** 依登入者 uid 取得已填寫的各學期個人資料（有界於單一使用者，不載入全校資料）。 */
export declare function getStudentPersonalInfoEntries(uid: string): Promise<StudentPersonalInfoEntry[]>;
/** 身分識別資料以 uid 為鍵跨學期保存；缺少新文件時從最新舊期名冊資料相容讀取。 */
export declare function getStudentPersonalIdentity(uid: string, legacyEntries: StudentPersonalInfoEntry[]): Promise<StudentPersonalIdentityFields>;
export declare function legacyStudentPersonalIdentity(legacyEntries: {
    legacyIdentity: StudentPersonalIdentityFields;
}[]): StudentPersonalIdentityFields;
export declare function saveStudentPersonalIdentity(uid: string, fields: StudentPersonalIdentityFields): Promise<void>;
export declare function saveStudentPersonalInfo(uid: string, period: SchoolPeriod, fields: StudentPersonalInfoTermFields): Promise<void>;
/** 讀取系統設定的「證件照儲存後端」；讀不到時回免費方案可用的 Firestore。 */
export declare function getStudentPersonalPhotoStorage(): Promise<StudentPersonalPhotoStorage>;
/** 各後端的實存上限：Firestore 受單一文件 1 MiB 限制，Storage 沿用 5 MB。 */
export declare function studentPersonalPhotoBackendLimit(backend: StudentPersonalPhotoStorage): number;
export declare function studentPersonalInfoPhotoObjectPathPrefix(uid: string, period: SchoolPeriod, kind: StudentPersonalPhotoKind): string;
/** 讀取照片本體，後端依 metadata.backend 決定（舊照片仍讀得到）。 */
export declare function readStudentPersonalPhotoBytes(metadata: StudentPersonalPhotoMetadata): Promise<Buffer>;
export declare function saveStudentPersonalPhoto(uid: string, period: SchoolPeriod, kind: StudentPersonalPhotoKind, bytes: Buffer, contentType: StudentPersonalPhotoMetadata["contentType"]): Promise<StudentPersonalPhotoMetadata>;
export declare function personalPhotoObjectPathsForRecord(uid: string, period: SchoolPeriod, raw: unknown): string[];
export declare function deleteStudentPersonalPhotoObjects(objectPaths: string[]): Promise<void>;
export declare function taipeiDateString(now?: Date): string;
export declare function taipeiDateTimeString(now?: Date): string;
export declare function isStudentPersonalInfoOpen(settings: StudentPersonalInfoSettings, now?: string): boolean;
export declare function studentPersonalInfoAvailabilityMessage(settings: StudentPersonalInfoSettings, now?: string): string;
