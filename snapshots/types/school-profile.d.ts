/**
 * 校務基本資料（教育階段、學校年制、校長、副校長、校區、官網）。
 *
 * 屬「學校基本設定」模組（schoolSettings，超級專屬）的子功能 `schoolSettings.profile`：
 * 登記學校最基礎的對外資料，供日後各功能取用（首頁抬頭、對外頁面、表單預設值…）。
 *
 * 資料存於獨立文件 `settings/schoolProfile`（結構性資料、不按學期）：
 * - 不放 `settings/system`：系統設定的 PUT 是整份覆寫（只保留 roleEnabled），
 *   存同文件會在下次儲存系統設定時被清掉。
 * - 不放 `settings/school`：單位層級設定的 PUT 同樣是整份 set() 覆寫，會互相清掉。
 *
 * 本檔不可 import `server-only`（`src/lib/*` 皆為伺服器專用），
 * 前端表單與 API 伺服器端共用這裡的驗證。
 */
import { type VocCodeRow } from "@/types/school-codes";
/** 教育階段（固定選單；新增階段時在此加一列即可，舊資料以 stage 值對照） */
export declare const EDUCATION_STAGES: readonly [{
    readonly value: "primary";
    readonly label: "國民小學";
}, {
    readonly value: "juniorHigh";
    readonly label: "國民中學";
}, {
    readonly value: "seniorHigh";
    readonly label: "高級中等學校";
}, {
    readonly value: "university";
    readonly label: "大專院校";
}];
export type StageValue = (typeof EDUCATION_STAGES)[number]["value"];
/** 一個教育階段及其學制年數（例如國民小學 6 年制） */
export interface StageSetting {
    stage: StageValue;
    /** 學校年制（該階段修業年數），1..PROFILE_MAX_YEARS */
    years: number;
}
/** 一個校區 */
export interface Campus {
    /** 穩定代碼：新增時產生、改名不變，供日後引用 */
    id: string;
    /** 校區名稱（如「本部」「鳳山校區」） */
    name: string;
    /** 學校地址 */
    address: string;
    /** 學校電話 */
    phone: string;
}
export interface SchoolProfile {
    /** 教育部學校代碼（如 150302；可留空） */
    schoolCode: string;
    /** 教育階段＋年制；未勾選的階段不出現在陣列中 */
    stages: StageSetting[];
    /**
     * 高級中等學校辦理的類型（複選，取自各式代碼表的類型清單）。
     * 只描述學校辦理哪些類型學制，**與年制無關**；
     * 未勾選高級中等學校時介面隱藏，但資料保留（重新勾選即恢復顯示）。
     */
    seniorHighTypes: VocCodeRow[];
    /** 現任校長（可留空） */
    principal: string;
    /** 現任副校長（可多位，可為空陣列） */
    vicePrincipals: string[];
    /** 校區（至少 1 筆；1 筆即單一校區） */
    campuses: Campus[];
    /** 學校官網地址（可留空；填寫時須為 http/https URL） */
    website: string;
}
export declare const PROFILE_DOC_ID = "schoolProfile";
export declare const PROFILE_MAX_YEARS = 12;
export declare const PROFILE_MAX_VICE_PRINCIPALS = 10;
export declare const PROFILE_MIN_CAMPUSES = 1;
export declare const PROFILE_MAX_CAMPUSES = 10;
export declare const PROFILE_NAME_MAX = 40;
export declare const PROFILE_SCHOOL_CODE_MAX = 20;
export declare const PROFILE_CAMPUS_NAME_MAX = 30;
export declare const PROFILE_ADDRESS_MAX = 120;
export declare const PROFILE_PHONE_MAX = 30;
export declare const PROFILE_WEBSITE_MAX = 200;
/** 教育階段的顯示名稱（未知值原樣返回，交由驗證回報） */
export declare function stageLabel(value: string): string;
/** 勾選教育階段時的預設年制（依一般學制） */
export declare function defaultYearsFor(stage: StageValue): number;
/** 新校區代碼：時間基底＋亂碼，同毫秒內也不會相撞 */
export declare function newCampusId(): string;
export declare function defaultSchoolProfile(): SchoolProfile;
/**
 * 讀回校務基本資料（寬容）：只把型別與範圍修到安全值，
 * 語意問題（重複階段、校區數不足…）交由驗證回報，避免資料毀損時整份作廢。
 */
export declare function readSchoolProfile(raw: unknown): SchoolProfile;
export type ProfileValidation = {
    ok: true;
    value: SchoolProfile;
} | {
    ok: false;
    message: string;
};
/** 完整驗證（API 與表單共用），任一項目不過即回錯誤訊息 */
export declare function validateSchoolProfile(raw: unknown): ProfileValidation;
