/**
 * 年段班級設定（年段＝年級、學制與班級）。
 *
 * 屬「學校基本設定」模組（schoolSettings，超級專屬）的子功能 `schoolSettings.classes`：
 * 登記本校的年段（**一個年段＝一個年級**，如「高一」）與其代碼、名稱，
 * 以及每年級的班級清單（代碼＋名稱，高級中等學校學制另有群別與科別），
 * 供日後名冊的年級／班級欄位引用。
 * 所屬學制不另存欄位：由年級編號在校務基本資料年制總和中的位置推導（`stageOfGrade`）。
 * 早先的 `segments`（年段包年級）結構由 `collectRawGrades` 讀入時自動攤平，不需遷移。
 *
 * 資料存於獨立文件 `settings/schoolClasses`（結構性資料、不按學期、全校一份）：
 * - 不放 `settings/system`：系統設定的 PUT 是整份覆寫（只保留 roleEnabled），
 *   存同文件會在下次儲存系統設定時被清掉。
 * - 不放 `settings/school`（單位層級設定）：其 PUT 同樣是整份 set() 覆寫，會互相清掉。
 * - 不放 `settings/schoolProfile`（校務基本資料）：同上。
 *   但**上限取自校務基本資料**：驗證需帶 `SchoolClassesContext`（學制與年制），
 *   由 API 讀 `settings/schoolProfile` 組成、前端由 GET 回傳取得。
 *
 * 本檔不可 import `server-only`（`src/lib/*` 皆為伺服器專用），
 * 前端表單與 API 伺服器端共用這裡的驗證。
 */
import { StageValue } from "@/types/school-profile";
/** 群別／科別（僅高級中等學校學制的班級可填寫） */
export interface VocField {
    code: string;
    name: string;
}
/** 一個班級 */
export interface ClassRow {
    /** 穩定代碼：新增時產生、改名不變，供日後引用 */
    id: string;
    /** 班級代碼（日後對應名冊 `classCode`），全校不可重複 */
    code: string;
    /** 班級名稱（日後對應名冊 `className`），同年級內不可重複 */
    name: string;
    /** 群別（僅高級中等學校學制；其餘學制一律 null） */
    group: VocField | null;
    /** 科別（僅高級中等學校學制；其餘學制一律 null） */
    department: VocField | null;
}
/**
 * 一個年段＝一個年級（**年段就是年級**，例如高中的高一／高二／高三各是一個年段），
 * 連同該年級的班級清單。所屬學制不另存欄位，由 `grade` 編號配合校務基本資料推導。
 */
export interface GradeRow {
    /** 穩定代碼：新增時產生、改名不變，供日後引用 */
    id: string;
    /** 年級編號（＝年段編號）：1～年制總和、全校唯一、升冪；決定所屬學制與編號範圍 */
    grade: number;
    /** 年級代碼（預設＝年級編號），全校不可重複 */
    code: string;
    /** 年級名稱（預設依 nameStyle：學制內序號或全域編號），同學制內不可重複 */
    name: string;
    /** 該年級的班級；**兄弟順序＝班級順位**（有意義，見文件） */
    classes: ClassRow[];
}
/**
 * 年級名稱的預設命名慣例（只影響之後新建年級的預設名稱，既有名稱不動）。
 * `local`＝學制內序號（國中 1～3 年級）、`global`＝全域編號（國中 7～9 年級）。
 * 兩種說法在現場都常見，故開放切換；年級代碼一律預設為年級編號，不受此設定影響。
 */
export type GradeNameStyle = "local" | "global";
export interface SchoolClassesSetting {
    /** 年段（＝年級），升冪排列；畫面上依所屬學制分區顯示 */
    grades: GradeRow[];
    /** 年級名稱的預設慣例（缺省視為 local） */
    nameStyle: GradeNameStyle;
}
/** 驗證上下文：取自校務基本資料（`settings/schoolProfile`）的教育階段與年制 */
export interface SchoolClassesContext {
    stages: {
        stage: StageValue;
        years: number;
    }[];
}
/** 高級中等學校：唯一可填寫群別／科別的學制 */
export declare const SENIOR_HIGH_STAGE: StageValue;
export declare const CLASSES_DOC_ID = "schoolClasses";
export declare const CLASSES_MIN_GRADE = 1;
/**
 * 年級編號的結構上限（read 用的寬容範圍）；
 * 語意上限由校務基本資料的年制總和決定（年段＝年級，故年段數上限亦同）。
 */
export declare const CLASSES_MAX_GRADE = 24;
export declare const CLASSES_MAX_CLASSES_PER_GRADE = 30;
export declare const CLASSES_MAX_CLASSES = 300;
export declare const CLASSES_GRADE_CODE_MAX = 10;
export declare const CLASSES_GRADE_NAME_MAX = 20;
export declare const CLASSES_CODE_MAX = 20;
export declare const CLASSES_NAME_MAX = 40;
export declare const CLASSES_VOC_CODE_MAX = 20;
export declare const CLASSES_VOC_NAME_MAX = 40;
export declare function emptyContext(): SchoolClassesContext;
/** 各學制年數總和（年級編號總量的上限） */
export declare function contextYearsSum(context: SchoolClassesContext): number;
/** 教育階段的顯示名稱（未綁定時傳回空字串） */
export declare function stageName(stage: StageValue | null): string;
/**
 * 該學制在全校的年級編號範圍（依校務基本資料的學制順序展開）。
 * 例如國民小學 6 年制排第一 → 1～6、國民中學 3 年制 → 7～9。
 * 校務基本資料未勾選該學制時回 null。
 */
export declare function gradeRangeOf(context: SchoolClassesContext, stage: StageValue | null): {
    start: number;
    end: number;
} | null;
/**
 * 年級編號所屬的學制：由編號落在校務基本資料的哪一段範圍推導。
 * 例如國小 6 年＋國中 3 年 → 編號 7 屬國民中學；超出年制總和回 null。
 */
export declare function stageOfGrade(context: SchoolClassesContext, grade: number): StageValue | null;
/** 該學制尚未被占用的年級編號（由小到大）；未勾選該學制時回空陣列 */
export declare function freeGradeNumbers(setting: Pick<SchoolClassesSetting, "grades">, context: SchoolClassesContext, stage: StageValue | null): number[];
/**
 * 年級名稱預設值。`local`＝該學制內的第 N 年級（國中編號 7 →「1 年級」）、
 * `global`＝年級編號本身（國中編號 7 →「7 年級」）。
 */
export declare function defaultGradeName(grade: number, range: {
    start: number;
} | null, style?: GradeNameStyle): string;
/** 年級代碼預設值：年級編號（全校唯一） */
export declare function defaultGradeCode(grade: number): string;
/** 新年級代碼：時間基底＋亂碼，同毫秒內也不會相撞 */
export declare function newGradeId(): string;
/** 新班級代碼：時間基底＋亂碼，同毫秒內也不會相撞 */
export declare function newClassId(): string;
/**
 * 末段數字 +1（保留前導零：`"009"`→`"010"`、`"09"`→`"10"`）。
 * 「末段數字」＝字串中最後一段連續數字（`"1 年 1 班"` 取到末尾前的 `1` → `"1 年 2 班"`），
 * 因此代碼（`101`→`102`）與名稱（`1 年 1 班`→`1 年 2 班`）都適用。
 * 沒有數字、數字過大失去精度、或 +1 後超過 `maxLength` 回 `null`，由呼叫端決定退回策略。
 */
export declare function incrementLastNumber(value: string, maxLength: number): string | null;
/**
 * 「複製年級＋1」用：值以原年級編號開頭時，把該前綴換成新年級編號——
 * `101`→`201`、`102`→`202`、`1 年 1 班`→`2 年 1 班`。
 * 沒有該前綴回 `null`，由呼叫端決定退回策略。
 */
export declare function swapGradePrefix(value: string, fromGrade: number, toGrade: number): string | null;
/** 產生不與 `used` 撞車的文字：`base`、`base-2`、`base-3`…（全撞或超長則回 base） */
export declare function uniqueText(base: string, used: Set<string>, maxLength: number, separator: string): string;
/**
 * 依命名慣例推下一個班級代碼：末段數字 +1（保留前導零，`101`→`102`），
 * 撞到 `used`（全校既有代碼）就繼續 +1；推不出來（沒有數字／超過長度）回空字串。
 */
export declare function nextClassCode(template: string, used: Set<string>): string;
/**
 * 「新增班級」的班級名稱：末段數字 +1（`1 年 1 班`→`1 年 2 班`），
 * 撞到 `used`（該年級既有名稱）就繼續 +1；名稱沒有數字時回空字串讓使用者填。
 */
export declare function nextClassName(template: string, used: Set<string>): string;
/**
 * 「複製年級＋1」的班級代碼：年級前綴換成新年級編號（`101`→`201`）；
 * 值不是以原年級編號開頭、或換出來撞到 `used`（全校既有代碼）時，
 * 退回「末段數字 +1」一直找到不重複值，推不出來回空字串。
 */
export declare function copiedClassCode(template: string, fromGrade: number, toGrade: number, used: Set<string>): string;
/**
 * 「複製年級＋1」的班級名稱：年級前綴換成新年級編號（`1 年 1 班`→`2 年 1 班`）；
 * 值不是以原年級編號開頭、或換出來撞到 `used`（新年級內）時，
 * 退回「末段數字 +1」，推不出不重複值就回空字串讓使用者填。
 */
export declare function copiedClassName(template: string, fromGrade: number, toGrade: number, used: Set<string>): string;
export declare function defaultSchoolClasses(): SchoolClassesSetting;
/** 年段（＝年級）總數 */
export declare function totalGradeCount(setting: Pick<SchoolClassesSetting, "grades">): number;
/** 班級總數 */
export declare function totalClassCount(setting: Pick<SchoolClassesSetting, "grades">): number;
/**
 * 讀回年段班級設定（寬容）：只把型別與範圍修到安全值
 * （補 id、補年級代碼與名稱預設值、去重、依年級編號排序、非高中職學制丟棄群別科別），
 * 語意問題（編號超出年制總和、代碼重複、空白名稱…）交由驗證回報，
 * 避免資料毀損時整份作廢。舊版 `segments` 結構會自動攤平為 `grades`。
 * `context` 缺省時以空上下文讀（推不出學制，預設值退化為年級編號）。
 */
export declare function readSchoolClasses(raw: unknown, context?: SchoolClassesContext): SchoolClassesSetting;
export type ClassesValidation = {
    ok: true;
    value: SchoolClassesSetting;
} | {
    ok: false;
    message: string;
};
/**
 * 完整驗證（API 與表單共用），任一項目不過即回錯誤訊息。
 * `context` 為校務基本資料的教育階段與年制：年級編號範圍與年段（＝年級）數量上限
 * （＝年制總和）由此決定；所屬學制由編號推導，決定班級可否填寫群別科別。
 */
export declare function validateSchoolClasses(raw: unknown, context?: SchoolClassesContext): ClassesValidation;
