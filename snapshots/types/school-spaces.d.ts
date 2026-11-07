/**
 * 樓層空間設定（校園空間的層級分類與空間清單）。
 *
 * 屬「學校基本設定」模組（schoolSettings，超級專屬）的子功能 `schoolSettings.spaces`：
 * 管理人員自行決定空間層級數與每層名稱（如「校區 → 大樓 → 樓層 → 空間」），
 * 並設定每個空間的中英文名稱、隸屬單位、隸屬層級、是否開放借用、容納人數與設備說明。
 *
 * 資料存於獨立文件 `settings/spaces`（結構性資料、不按學期）：
 * - 刻意不放 `settings/system`：系統設定的 PUT 是整份覆寫，混放會在下次儲存系統設定時被清掉。
 * - 欄位：levelCount／levelLabels／units。
 * - `units[].orgUnit` 引用單位層級設定（`settings/school`）的單位 code，API 儲存前會核對存在。
 *
 * 本檔不可 import `server-only`（`src/lib/*` 皆為伺服器專用），
 * 前端表單與 API 伺服器端共用這裡的驗證與搬移規則。
 */
/** 一個空間條目（教室、場地、棟別、樓層等節點） */
export interface SpaceUnit {
    /** 穩定代碼：新增時產生、改名不變，供日後預約單、行事曆地點等欄位引用 */
    code: string;
    /** 中文名稱（同上級空間內不可重複） */
    name: string;
    /** 英文名稱（可空白） */
    nameEn: string;
    /** 空間代碼（展示用，如「R-301」；可空白，填寫時全校唯一） */
    spaceCode: string;
    /** 樓層（如「3F」「B2」；可空白） */
    floor: string;
    /** 所在層級 1..levelCount（＝隸屬空間層級） */
    level: number;
    /** 上級空間 code；最上層（level 1）必為 null */
    parent: string | null;
    /** 隸屬單位 code（settings/school 的單位）；null＝未指定 */
    orgUnit: string | null;
    /** 是否開放借用（預設 true；預約等模組日後以此欄過濾） */
    openForBooking: boolean;
    /** 容納人數；null＝未填寫 */
    capacity: number | null;
    /** 空間設備說明（可空白） */
    notes: string;
}
export interface SpaceStructure {
    /** 空間層級數 1..SPACE_MAX_LEVEL */
    levelCount: number;
    /** 每層名稱，長度恆等於 levelCount */
    levelLabels: string[];
    /** 扁平陣列；兄弟順序＝陣列中的相對順序 */
    units: SpaceUnit[];
}
/** 供表單「隸屬單位」下拉與伺服器驗證共用的單位選項（含層級與上級，供分組顯示） */
export interface SpaceOrgOption {
    code: string;
    name: string;
    level: number;
    parent: string | null;
}
/** 驗證上下文：單位層級設定的單位 code 集合（核對 units[].orgUnit 是否存在） */
export interface SpaceValidationContext {
    orgCodes: ReadonlySet<string>;
}
export declare const SPACES_DOC_ID = "spaces";
export declare const SPACE_MAX_LEVEL = 6;
export declare const SPACE_MAX_UNITS = 500;
export declare const SPACE_NAME_MAX = 40;
export declare const SPACE_NAME_EN_MAX = 60;
export declare const SPACE_REF_MAX = 20;
export declare const SPACE_FLOOR_MAX = 20;
export declare const SPACE_LABEL_MAX = 20;
export declare const SPACE_CODE_MAX = 64;
export declare const SPACE_ORG_UNIT_MAX = 64;
export declare const SPACE_NOTES_MAX = 200;
export declare const SPACE_CAPACITY_MAX = 999;
/** 未自訂時的預設層級名稱：第一層、第二層… */
export declare function defaultSpaceLabel(level: number): string;
/**
 * 未自訂時的預設層級：兩層「樓層 → 空間」，對應一般校園場景
 * （管理人員可再改名或增減層，如「校區 → 大樓 → 樓層 → 空間」）。
 */
export declare function defaultSpaceStructure(): SpaceStructure;
/** 新空間代碼：時間基底＋亂碼，同毫秒內也不會相撞 */
export declare function newSpaceCode(): string;
export type SpaceValidation = {
    ok: true;
    value: SpaceStructure;
} | {
    ok: false;
    message: string;
};
/**
 * 讀回空間設定（寬容）：只把型別與範圍修到安全值，父子關係與隸屬單位交給驗證回報，
 * 避免資料毀損時整份作廢、管理員連看都看不到。
 */
export declare function readSpaceStructure(raw: unknown): SpaceStructure;
/**
 * 完整驗證（API 與表單共用）。
 * 父代必為高一層，因此環狀引用不可能成立（否則需無限往下）。
 * context 省略時不核對 orgUnit 是否存在（純結構檢查）；API 儲存時會傳入單位代碼集合。
 */
export declare function validateSpaceStructure(raw: unknown, context?: SpaceValidationContext): SpaceValidation;
export type SpacePlacementResult = {
    ok: true;
    value: SpaceStructure;
} | {
    ok: false;
    message: string;
};
export declare function findSpace(structure: SpaceStructure, code: string | null): SpaceUnit | null;
/** 某上級之下的直屬空間（維持陣列順序）；parent 為 null 代表最上層 */
export declare function childrenSpacesOf(structure: SpaceStructure, parent: string | null): SpaceUnit[];
export declare function childCountOf(structure: SpaceStructure, code: string): number;
/** 全部後代代碼（不含自己；visited 防資料毀損造成無窮迴圈） */
export declare function descendantCodes(structure: SpaceStructure, code: string): Set<string>;
/** 含自己在內的最大層級（用來判斷搬移後是否超出層級數） */
export declare function maxSubtreeLevel(structure: SpaceStructure, code: string): number;
/** 以樹狀順序攤平（父先於子、兄弟依陣列順序），供表格檢視共用 */
export declare function flattenSpaceTree(structure: SpaceStructure): SpaceUnit[];
/** 樹狀節點：供視覺化檢視以「母艦」方式巢狀呈現（第 1 層卡片內含第 2 層…） */
export interface SpaceNode {
    unit: SpaceUnit;
    children: SpaceNode[];
}
/**
 * 依上級關係組成樹（兄弟依陣列順序）。
 * 只在「上級恰高一層」時連結，故不可能成環；
 * 上級不存在或層級不符的空間先當最上層，問題交由驗證回報。
 */
export declare function buildSpaceTree(structure: SpaceStructure): SpaceNode[];
/** 設定上級空間（null＝設為最上層）；表格「上級空間」下拉共用 */
export declare function setSpaceParent(structure: SpaceStructure, code: string, parent: string | null): SpacePlacementResult;
/**
 * 插到指定上級之下的第 index 個位置（index 依「不含自己」的同層順序計算，
 * 即視覺化檢視卡片間空隙所標示的位置）。
 * 先走 applyPlacement 的整棵子樹平移規則，再把空間插進目標位置，
 * 因此跨層搬移與同層換位共用同一套限制。
 */
export declare function placeSibling(structure: SpaceStructure, code: string, parent: string | null, index: number): SpacePlacementResult;
/**
 * 直接設定層級（表格的「層級」欄）：
 * 第 1 層＝清空上級；其餘層級若原上級不符新層級則暫留空，
 * 由驗證回報「未指定上級空間」擋住儲存，直到管理員補選。
 */
export declare function setSpaceLevel(structure: SpaceStructure, code: string, level: number): SpacePlacementResult;
/**
 * 與同層的前一個／後一個兄弟對調（direction：-1 上移、1 下移）。
 * 兄弟順序＝陣列相對順序，第一層順序即全校空間的羅列順位。
 */
export declare function moveSpaceSibling(structure: SpaceStructure, code: string, direction: -1 | 1): SpacePlacementResult;
/** 新增空間（parent 為 null 代表最上層）；名稱給預設值，其餘欄位在表格上直接編輯 */
export declare function addSpace(structure: SpaceStructure, parent: string | null): SpacePlacementResult;
/** 刪除空間（有子空間時拒絕，需先搬移或刪除子空間） */
export declare function removeSpace(structure: SpaceStructure, code: string): SpacePlacementResult;
/** 變更空間層級數（縮小時仍有空間在更高層＝拒絕） */
export declare function setSpaceLevelCount(structure: SpaceStructure, levelCount: number): SpacePlacementResult;
