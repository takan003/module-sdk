/**
 * 學校單位層級（處室／組別）設定。
 *
 * 屬「學校基本設定」模組（schoolSettings，超級專屬）的子功能 `schoolSettings.org`：
 * 管理人員自行決定學校層級數與每層名稱，並設定每個單位的層級與上級單位。
 *
 * 資料存於獨立文件 `settings/school`（結構性資料、不按學期）：
 * - 刻意不放 `settings/system`：系統設定的 PUT 是整份覆寫（只保留 roleEnabled），
 *   存同文件會在下次儲存系統設定時被清掉。
 * - 欄位：levelCount／levelLabels／units。
 *
 * 本檔不可 import `server-only`（`src/lib/*` 皆為伺服器專用），
 * 前端表單與 API 伺服器端共用這裡的驗證與搬移規則。
 */
/** 單位（處室、組、中心…） */
export interface OrgUnit {
    /** 穩定代碼：新增時產生、改名不變，供日後教職員名冊 `unit` 等欄位引用 */
    code: string;
    /** 單位名稱（同上級單位內不可重複） */
    name: string;
    /** 所在層級 1..levelCount */
    level: number;
    /** 上級單位 code；最上層（level 1）必為 null */
    parent: string | null;
}
export interface OrgStructure {
    /** 學校層級數 1..ORG_MAX_LEVEL */
    levelCount: number;
    /** 每層名稱，長度恆等於 levelCount */
    levelLabels: string[];
    /** 扁平陣列；兄弟順序＝陣列中的相對順序 */
    units: OrgUnit[];
}
export declare const ORG_DOC_ID = "school";
export declare const ORG_MAX_LEVEL = 5;
export declare const ORG_MAX_UNITS = 200;
export declare const ORG_NAME_MAX = 40;
export declare const ORG_LABEL_MAX = 20;
export declare const ORG_CODE_MAX = 64;
/** 未自訂時的預設層級名稱：第一層、第二層… */
export declare function defaultOrgLabel(level: number): string;
export declare function defaultOrgStructure(): OrgStructure;
/** 新單位代碼：時間基底＋亂碼，同毫秒內也不會相撞 */
export declare function newUnitCode(): string;
export type OrgValidation = {
    ok: true;
    value: OrgStructure;
} | {
    ok: false;
    message: string;
};
/**
 * 讀回單位設定（寬容）：只把型別與範圍修到安全值，父子關係交給驗證回報，
 * 避免資料毀損時整份作廢、管理員連看都看不到。
 */
export declare function readOrgStructure(raw: unknown): OrgStructure;
/**
 * 完整驗證（API 與表單共用）。
 * 父代必為高一層，因此環狀引用不可能成立（否則需無限往下）。
 */
export declare function validateOrgStructure(raw: unknown): OrgValidation;
export type OrgPlacementResult = {
    ok: true;
    value: OrgStructure;
} | {
    ok: false;
    message: string;
};
export declare function findUnit(structure: OrgStructure, code: string | null): OrgUnit | null;
/** 某上級之下的直屬單位（維持陣列順序）；parent 為 null 代表最上層 */
export declare function childrenOf(structure: OrgStructure, parent: string | null): OrgUnit[];
export declare function childCountOf(structure: OrgStructure, code: string): number;
/** 全部後代代碼（不含自己；visited 防資料毀損造成無窮迴圈） */
export declare function descendantCodes(structure: OrgStructure, code: string): Set<string>;
/** 含自己在內的最大層級（用來判斷搬移後是否超出層級數） */
export declare function maxSubtreeLevel(structure: OrgStructure, code: string): number;
/** 以樹狀順序攤平（父先於子、兄弟依陣列順序），供表格與分欄檢視共用 */
export declare function flattenOrgTree(structure: OrgStructure): OrgUnit[];
/** 樹狀節點：供視覺化檢視以「母艦」方式巢狀呈現（第 1 層卡片內含第 2 層…） */
export interface OrgNode {
    unit: OrgUnit;
    children: OrgNode[];
}
/**
 * 依上級關係組成樹（兄弟依陣列順序）。
 * 只在「上級恰高一層」時連結，故不可能成環；
 * 上級不存在或層級不符的單位先當最上層，問題交由驗證回報。
 */
export declare function buildOrgTree(structure: OrgStructure): OrgNode[];
/** 設定上級單位（null＝設為最上層）；拖曳與「所屬上級單位」下拉共用 */
export declare function setUnitParent(structure: OrgStructure, code: string, parent: string | null): OrgPlacementResult;
/**
 * 插到指定上級之下的第 index 個位置（index 依「不含自己」的同層順序計算，
 * 即視覺化檢視卡片間空隙所標示的位置）。
 * 先走 applyPlacement 的整棵子樹平移規則，再把單位插進目標位置，
 * 因此跨層搬移與同層換位共用同一套限制。
 */
export declare function placeSibling(structure: OrgStructure, code: string, parent: string | null, index: number): OrgPlacementResult;
/**
 * 直接設定層級（表格的「層級」欄）：
 * 第 1 層＝清空上級；其餘層級若原上級不符新層級則暫留空，
 * 由驗證回報「未指定上級單位」擋住儲存，直到管理員補選。
 */
export declare function setUnitLevel(structure: OrgStructure, code: string, level: number): OrgPlacementResult;
/**
 * 與同層的前一個／後一個兄弟對調（direction：-1 上移、1 下移）。
 * 兄弟順序＝陣列相對順序，第一層順序即全校處室的羅列順位；
 * 對調兩個元素在陣列中的位置，其餘元素位置不動。
 */
export declare function moveSibling(structure: OrgStructure, code: string, direction: -1 | 1): OrgPlacementResult;
/** 新增單位（parent 為 null 代表最上層）；名稱給預設值，改名在表格／卡片上直接編輯 */
export declare function addUnit(structure: OrgStructure, parent: string | null): OrgPlacementResult;
/** 刪除單位（有子單位時拒絕，需先搬移或刪除子單位） */
export declare function removeUnit(structure: OrgStructure, code: string): OrgPlacementResult;
/** 變更學校層級數（縮小時仍有單位在更高層＝拒絕） */
export declare function setLevelCount(structure: OrgStructure, levelCount: number): OrgPlacementResult;
