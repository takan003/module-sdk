export declare const CODES_DOC_ID = "schoolCodes";
export declare const CODES_VOC_CODE_MAX = 20;
export declare const CODES_VOC_NAME_MAX = 40;
export declare const CODES_MAX_SCHOOL_TYPES = 50;
export declare const CODES_MAX_GROUPS = 200;
export declare const CODES_MAX_DEPARTMENTS = 1000;
/** 一筆代碼：代碼（識別用）＋名稱（顯示用） */
export type VocCodeRow = {
    code: string;
    name: string;
};
/** 各式代碼表設定（三份清單結構相同，只是用途不同） */
export type SchoolCodesSetting = {
    schoolTypes: VocCodeRow[];
    groups: VocCodeRow[];
    departments: VocCodeRow[];
};
export type CodesValidation = {
    ok: true;
    value: SchoolCodesSetting;
} | {
    ok: false;
    message: string;
};
/** 內建預設＝官方代碼表（文件不存在時回這裡） */
export declare function defaultSchoolCodes(): SchoolCodesSetting;
/**
 * 讀回代碼表：文件不存在回內建官方清單；存在則逐筆清洗（讀回不驗證、不擋畫面）。
 * 舊文件缺少某一欄（如加設 `schoolTypes` 之前存的）→ 該欄補內建官方清單；
 * 明確給空陣列則尊重（該清單就是空的）。
 */
export declare function readSchoolCodes(raw: unknown): SchoolCodesSetting;
/** 儲存前驗證：三份清單逐筆檢查，不過即整份不寫入 */
export declare function validateSchoolCodes(raw: unknown): CodesValidation;
