import { type SchoolPeriod, type StudentPersonalPhotoStorage } from "@/types/settings";
export declare const PERSONAL_INFO_COLLECTION = "studentPersonalInfo";
export declare const STUDENT_PERSONAL_IDENTITY_COLLECTION = "studentPersonalIdentity";
/** 證件照獨立文件（Firestore 後端）：照片本體存這裡，避免主文件變肥 */
export declare const STUDENT_PERSONAL_PHOTO_COLLECTION = "studentPersonalPhoto";
/**
 * 可接受的「原始檔」上限：學生可能直接選照相館原檔（2 MB 以上很常見），
 * 瀏覽器會先縮圖再送出，這裡只是擋掉明顯不合理的巨檔。
 */
export declare const STUDENT_PERSONAL_PHOTO_SOURCE_MAX_BYTES: number;
/** 縮圖後的實存上限：Firestore 單一文件上限為 1 MiB，預留空間取 900 KB */
export declare const STUDENT_PERSONAL_PHOTO_STORED_MAX_BYTES: number;
/** Firebase Storage 後端的實存上限 */
export declare const STUDENT_PERSONAL_PHOTO_STORAGE_MAX_BYTES: number;
/** Firestore 後端的指標前綴，其後接原本的 object path */
export declare const STUDENT_PERSONAL_PHOTO_FIRESTORE_PREFIX = "firestore:";
export type StudentPersonalPhotoKind = "admission" | "graduation";
export declare function isStudentPersonalPhotoKind(value: unknown): value is StudentPersonalPhotoKind;
export interface StudentPersonalPhotoMetadata {
    /** 不透明指標：Firebase Storage 物件路徑，或 `firestore:` 開頭的 Firestore 指標 */
    objectPath: string;
    /** 這張照片實際存在哪個後端；舊資料沒這欄位，一律視為 Firebase Storage */
    backend: StudentPersonalPhotoStorage;
    contentType: "image/jpeg";
    updatedAt: number;
}
export interface StudentPersonalInfoRecord {
    fields: StudentPersonalInfoFields;
    /** 照片本體存於 Firestore 或 Firebase Storage，此處僅保存伺服端指標與 metadata */
    photos: Record<StudentPersonalPhotoKind, StudentPersonalPhotoMetadata | null>;
}
export interface StudentPersonalInfoEntry {
    academicYear: number;
    semester: number;
    fields: StudentPersonalInfoTermFields;
    photos: Record<StudentPersonalPhotoKind, StudentPersonalPhotoMetadata | null>;
    /** 舊期文件遷移到獨立身分文件前的欄位，僅伺服器端用來補資料 */
    legacyIdentity: StudentPersonalIdentityFields;
}
export interface StudentPersonalIdTypeOption {
    value: string;
    label: string;
}
/** 證件類型：國民身分證（有戶籍國民）或居留證（外來人口統一證號）。 */
export declare const STUDENT_PERSONAL_ID_TYPE_OPTIONS: readonly StudentPersonalIdTypeOption[];
export declare const STUDENT_PERSONAL_GENDER_OPTIONS: readonly StudentPersonalIdTypeOption[];
export declare function studentPersonalIdTypeLabel(value: string): string;
export interface StudentPersonalIdValidation {
    ok: boolean;
    message: string;
}
/**
 * 依證件類型驗證編號：
 * - 國民身分證：1 碼英文＋9 碼數字，第 2 碼性別碼 1（男）／2（女），第 10 碼為檢查碼。
 * - 居留證（新式外來人口統一證號，110-01-02 起）：同格式，第 2 碼性別碼 8（男）／9（女），
 *   檢查碼規則同國民身分證。
 */
export declare function validateStudentPersonalId(idType: string, raw: string): StudentPersonalIdValidation;
export interface StudentPersonalIdentityFields {
    gender: string;
    birthday: string;
    /** 必填：studentPersonalIdTypeLabel() 的 value，空值表示尚未擇一。 */
    idType: string;
    nationalId: string;
}
export interface StudentPersonalInfoTermFields {
    householdPostalCode: string;
    householdAddress: string;
    mailingPostalCode: string;
    mailingAddress: string;
    contactPhone: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
}
export interface StudentPersonalInfoFields extends StudentPersonalIdentityFields, StudentPersonalInfoTermFields {
}
export type StudentPersonalInfoFieldKey = keyof StudentPersonalInfoFields;
export interface StudentPersonalInfoFieldDefinition<K extends StudentPersonalInfoFieldKey = StudentPersonalInfoFieldKey> {
    key: K;
    label: string;
    type: "text" | "date" | "tel" | "select";
    maxLength: number;
    options?: readonly StudentPersonalIdTypeOption[];
    /** 表單中佔滿整列 */
    wide?: boolean;
    placeholder?: string;
    /** 選單存值為代碼時，唯讀檢視用來顯示名稱 */
    display?: (value: string) => string;
}
export declare const STUDENT_PERSONAL_INFO_FIELD_DEFS: StudentPersonalInfoFieldDefinition[];
export declare const STUDENT_PERSONAL_IDENTITY_KEYS: readonly ["gender", "birthday", "idType", "nationalId"];
export declare const STUDENT_PERSONAL_IDENTITY_FIELD_DEFS: StudentPersonalInfoFieldDefinition<keyof StudentPersonalIdentityFields>[];
export declare const STUDENT_PERSONAL_INFO_TERM_FIELD_DEFS: StudentPersonalInfoFieldDefinition<keyof StudentPersonalInfoTermFields>[];
/** 學期欄位是否全部填妥（學生表單與管理端列表共用判定；任一為空即未完成） */
export declare function isStudentPersonalInfoTermComplete(fields: StudentPersonalInfoTermFields): boolean;
export declare const EMPTY_STUDENT_PERSONAL_IDENTITY: StudentPersonalIdentityFields;
export declare const EMPTY_STUDENT_PERSONAL_INFO_TERM: StudentPersonalInfoTermFields;
export declare const EMPTY_STUDENT_PERSONAL_INFO: StudentPersonalInfoFields;
export declare const EMPTY_STUDENT_PERSONAL_INFO_PHOTOS: StudentPersonalInfoRecord["photos"];
export interface StudentPersonalInfoSettings {
    enabled: boolean;
    startDate: string;
    endDate: string;
    target: StudentPersonalInfoTarget;
    allowAdmissionPhotoReplacement: boolean;
    allowGraduationPhotoUpload: boolean;
}
export type StudentPersonalInfoTargetMode = "all" | "grades" | "classes";
export interface StudentPersonalInfoTarget {
    mode: StudentPersonalInfoTargetMode;
    /** 名冊 grade 欄位儲存的年級編號字串，例如 "1" */
    grades: string[];
    /** 名冊 classCode 欄位儲存的班級代碼 */
    classes: string[];
}
export interface StudentPersonalInfoTargetOptions {
    grades: {
        value: string;
        label: string;
        classes: {
            value: string;
            label: string;
        }[];
    }[];
}
export declare const DEFAULT_STUDENT_PERSONAL_INFO_TARGET: StudentPersonalInfoTarget;
export declare const DEFAULT_STUDENT_PERSONAL_INFO_SETTINGS: StudentPersonalInfoSettings;
export declare function personalInfoSettingsDocId(period: SchoolPeriod): string;
export declare function studentPersonalInfoDocId(uid: string, period: SchoolPeriod): string;
export declare function readStudentPersonalInfoSettings(raw: unknown): StudentPersonalInfoSettings;
export declare function isStudentPersonalInfoTargetEligible(target: StudentPersonalInfoTarget, grade: unknown, classCode: unknown): boolean;
export declare function readStudentPersonalInfoFields(raw: unknown): StudentPersonalInfoFields;
export declare function readStudentPersonalIdentityFields(raw: unknown): StudentPersonalIdentityFields;
export declare function readStudentPersonalInfoTermFields(raw: unknown): StudentPersonalInfoTermFields;
export declare function readStudentPersonalPhotoMetadata(raw: unknown): StudentPersonalPhotoMetadata | null;
/** 判斷指標是否屬於指定前綴（Firestore 後端的指標會多一層 `firestore:` 前綴）。 */
export declare function personalPhotoPointerMatches(objectPath: string, prefix: string): boolean;
/** 取出指標的 storage 物件路徑；Firestore 後端會剝掉 `firestore:` 前綴。 */
export declare function personalPhotoStorageObjectPath(objectPath: string): string;
export declare function readStudentPersonalInfoRecord(raw: unknown): StudentPersonalInfoRecord;
export declare function isIsoDate(value: string): boolean;
export declare function isIsoDateTime(value: string): boolean;
/** 舊設定只有日期：起始日轉為 00:00，結束日轉為 23:59，避免縮短原開放期間。 */
export declare function normalizePersonalInfoDateTime(value: string, edge: "start" | "end"): string;
