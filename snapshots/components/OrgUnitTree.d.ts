import { OrgStructure } from "@/types/org";
/**
 * 單位層級設定的視覺化檢視：以第 1 層單位為「母艦」，第 2 層卡片巢狀放在母艦內，
 * 第 3 層以下依此類推；卡片只顯示單位名稱。
 * 原生 HTML5 拖曳（滑鼠）：
 * - 拖到某張卡片＝設為其下級（整棵子樹一起平移，排到該上級的末尾）；
 * - 拖到卡片之間的空隙＝插到該位置（同層換位，例如把 A 放到 B、C 之間）；
 * - 拖到最外層空白處＝設為最上層。
 * 禁止拖入自己或後代、禁止超出學校層級數。
 * 新增、改名、刪除與上移／下移請用「表格」檢視；行動裝置不支援 HTML5 拖曳亦同。
 */
export default function OrgUnitTree({ value, onChange, }: {
    value: OrgStructure;
    onChange: (next: OrgStructure) => void;
}): import("react").JSX.Element;
