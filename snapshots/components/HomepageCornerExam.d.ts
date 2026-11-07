export default function HomepageCornerExam({ hideLauncher, openSignal, launcherTop, }: {
    /** 不顯示左上角浮動按鈕（改由外部卡片開啟） */
    hideLauncher?: boolean;
    /** 外部開啟訊號：數值遞增即開啟遊戲視窗 */
    openSignal?: number;
    /** 浮動按鈕的上緣位置（px）；未指定時沿用預設值 */
    launcherTop?: number;
}): import("react").JSX.Element;
