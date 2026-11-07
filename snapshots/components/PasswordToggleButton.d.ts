/** 顯示／隱藏密碼切換鈕（SVG 圖示，配色跟隨主題的 --t3 / --t1） */
export default function PasswordToggleButton({ visible, onToggle, label, }: {
    visible: boolean;
    onToggle: () => void;
    label: string;
}): import("react").JSX.Element;
