import { ReactNode } from "react";
interface RevealListCardProps {
    /** 按鈕文字的列表名稱：顯示「{label}列表」 */
    label: string;
    /** 使用者按下按鈕後，由頁面載入列表（省流閘門隨之解除） */
    onReveal: () => void;
    /** 按鈕上方的輕量統計文字（如「目前發布中 N 則」——由頁面以 count 聚合取得） */
    summary?: ReactNode;
}
/**
 * 省流開關啟用時取代列表的「手動顯示列表」內容。
 * 只輸出內文與按鈕，外框沿用呼叫端既有的列表容器
 * （border border-themed rounded-lg bg-card），寬度亦由呼叫端決定。
 */
export default function RevealListCard({ label, onReveal, summary }: RevealListCardProps): import("react").JSX.Element;
export {};
