import { SpaceStructure } from "@/types/school-spaces";
/**
 * 樓層空間設定的視覺化檢視：以第 1 層空間為「母艦」，第 2 層卡片巢狀放在母艦內，
 * 第 3 層以下依此類推；卡片顯示中文名稱（有空間代碼時一併顯示）。
 * 原生 HTML5 拖曳（滑鼠）：
 * - 拖到某張卡片＝設為其下級（整棵子樹一起平移，排到該上級的末尾）；
 * - 拖到卡片之間的空隙＝插到該位置（同層換位，例如把 A 放到 B、C 之間）；
 * - 拖到最外層空白處＝設為最上層。
 * 禁止拖入自己或後代、禁止超出空間層級數。
 * 新增、改名、屬性編輯、刪除與上移／下移請用「表格」檢視；行動裝置不支援 HTML5 拖曳亦同。
 */
export default function SpaceTree({ value, onChange, }: {
    value: SpaceStructure;
    onChange: (next: SpaceStructure) => void;
}): import("react").JSX.Element;
