/**
 * 課表作息時間（settings/schoolPeriods）：每日節次的代碼、序號、名稱與起訖時間，
 * 含午休等非授課時段，供課表、行事曆、作息公告等日後引用。
 *
 * 屬「學校基本設定」模組（schoolSettings，超級專屬）的子功能 `schoolSettings.periods`：
 * 頁面層由 `school-settings/layout.tsx` 擋一次，
 * API 端以 `requireAdminModule("schoolSettings")` 再擋一次。
 */
export declare const PERIODS_DOC_ID = "schoolPeriods";
export declare const PERIODS_MAX_ROWS = 50;
export declare const PERIODS_CODE_MAX = 20;
export declare const PERIODS_NAME_MAX = 40;
/** 節次序號下限（0 保留給午休等非授課時段） */
export declare const PERIODS_MIN_NUMBER = 0;
/** 節次序號上限 */
export declare const PERIODS_MAX_NUMBER = 99;
/** 一筆節次：代碼、序號、名稱與起訖時間 */
export type SchoolPeriodRow = {
    /** 主要節次代碼（識別用，全校唯一，如 `P1`、`N`） */
    code: string;
    /** 節次（0～99 整數，全校唯一；0 為非授課時段如午休） */
    period: number;
    /** 節次名稱（顯示用，如「第一節」「午休」） */
    name: string;
    /** 開始時間 `HH:MM` */
    start: string;
    /** 結束時間 `HH:MM` */
    end: string;
};
/** 上課星期（1=週一…7=週日；台灣學校一般為週一至週五） */
export declare const SCHOOL_DAY_LABELS: readonly ["週一", "週二", "週三", "週四", "週五", "週六", "週日"];
/** 預設上課星期：週一至週五 */
export declare const DEFAULT_SCHOOL_DAYS: readonly [1, 2, 3, 4, 5];
export type SchoolPeriodsSetting = {
    /** 上課星期（勾選＝該日為上課日；1=週一…7=週日，至少一天） */
    schoolDays: number[];
    periods: SchoolPeriodRow[];
};
export type PeriodsValidation = {
    ok: true;
    value: SchoolPeriodsSetting;
} | {
    ok: false;
    message: string;
};
/** 內建預設（複製一份，避免外部改動到內建值） */
export declare function defaultSchoolPeriods(): SchoolPeriodsSetting;
/**
 * 逐筆清洗（讀回不驗證、不擋畫面）：去頭尾空白、代碼或名稱留白該筆丟棄、
 * 節次非整數或時間格式不符該筆丟棄；超長丟棄。
 * 文件不存在或 `periods` 不是陣列 → 回內建預設（每日八節＋午休）；
 * 明確給空陣列則尊重（作息表就是空的）。
 */
export declare function readSchoolPeriods(raw: unknown): SchoolPeriodsSetting;
/** 時段是否合法（`HH:MM` 且 24 小時制） */
export declare function isPeriodTime(value: string): boolean;
/**
 * 儲存前驗證：欄位、唯一性、時間先後與時段重疊逐項檢查，
 * 不過即整份不寫入；錯誤訊息帶列序號，可直接對照畫面。
 */
export declare function validateSchoolPeriods(raw: unknown): PeriodsValidation;
