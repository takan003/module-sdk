import { OrgStructure } from "@/types/org";
/**
 * 單位層級設定的表格檢視（傳統方式）：
 * 每列一個單位，欄位為層級／單位名稱／所屬上級單位／子單位數／操作。
 * 「所屬上級單位」下拉只列出上一層的單位；改層級若使上級失效則清空上級，
 * 由驗證回報「未指定上級單位」擋住儲存。
 */
export default function OrgUnitTable({ value, onChange, }: {
    value: OrgStructure;
    onChange: (next: OrgStructure) => void;
}): import("react").JSX.Element;
