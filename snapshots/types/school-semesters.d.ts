/** 學年度（民國年）輸入上下限 */
export declare const ACADEMIC_YEAR_MIN = 1;
export declare const ACADEMIC_YEAR_MAX = 999;
/** 起訖日期欄位上限（YYYY-MM-DD 為 10 字） */
export declare const SEMESTER_DATE_MAX = 10;
/** 學期固定兩學期 */
export declare const SEMESTER_OPTIONS: readonly [{
    readonly value: 1;
    readonly label: "第1學期";
}, {
    readonly value: 2;
    readonly label: "第2學期";
}];
/** 本功能寫入 settings/system 的欄位白名單（merge 部分更新只動這些欄位） */
export declare const SEMESTER_SETTINGS_FIELDS: readonly ["academicYear", "semester", "academicYearStart", "academicYearEnd", "semesterStart", "semesterEnd", "classDayStart", "classDayEnd", "winterStart", "winterEnd", "summerStart", "summerEnd"];
export interface SemesterSettings {
    /** 學年度（民國年），如 115 */
    academicYear: number;
    /** 學期：1=第1學期、2=第2學期 */
    semester: number;
    /** 學年度起日（YYYY-MM-DD，可留空） */
    academicYearStart: string;
    /** 學年度訖日（YYYY-MM-DD，可留空） */
    academicYearEnd: string;
    /** 學期起日（YYYY-MM-DD，可留空） */
    semesterStart: string;
    /** 學期訖日（YYYY-MM-DD，可留空） */
    semesterEnd: string;
    /** 上課日起日（YYYY-MM-DD，可留空；實際授课期間，扣假期等） */
    classDayStart: string;
    /** 上課日訖日（YYYY-MM-DD，可留空） */
    classDayEnd: string;
    /** 寒假起日（YYYY-MM-DD，可留空） */
    winterStart: string;
    /** 寒假訖日（YYYY-MM-DD，可留空） */
    winterEnd: string;
    /** 暑假起日（YYYY-MM-DD，可留空） */
    summerStart: string;
    /** 暑假訖日（YYYY-MM-DD，可留空） */
    summerEnd: string;
}
/** 預設值：學年度／學期沿用全站推算，起訖日期留空 */
export declare function defaultSemesterSettings(): SemesterSettings;
/**
 * 讀回學期起訖設定（寬容）：只把型別與範圍修到安全值，
 * 語意問題（起日大於訖日…）交由驗證回報，避免資料毀損時整份作廢。
 */
export declare function readSemesterSettings(raw: unknown): SemesterSettings;
export type SemesterSettingsValidation = {
    ok: true;
    value: SemesterSettings;
} | {
    ok: false;
    message: string;
};
/** 完整驗證（API 與表單共用），任一項目不過即回錯誤訊息 */
export declare function validateSemesterSettings(raw: unknown): SemesterSettingsValidation;
