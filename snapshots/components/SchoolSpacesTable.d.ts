import { SpaceOrgOption, SpaceStructure } from "@/types/school-spaces";
/**
 * 樓層空間設定的表格檢視：
 * 每列一個空間，欄位為層級／空間代碼／中文名稱／英文名稱／樓層／上級空間／
 * 隸屬單位／開放借用／容納人數／設備說明／操作。
 * 「上級空間」下拉只列出上一層的空間；改層級若使上級失效則清空上級，
 * 由驗證回報「未指定上級空間」擋住儲存。
 */
export default function SchoolSpacesTable({ value, orgUnits, onChange, }: {
    value: SpaceStructure;
    orgUnits: SpaceOrgOption[];
    onChange: (next: SpaceStructure) => void;
}): import("react").JSX.Element;
