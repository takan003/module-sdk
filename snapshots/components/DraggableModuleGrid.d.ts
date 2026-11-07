import { type ReactNode } from "react";
export interface ModuleCardItem {
    /** 穩定識別碼：用於排序與 localStorage，日後改標籤也不會打亂已記住的版面 */
    id: string;
    icon: ReactNode;
    label: string;
    href: string;
    /** 點擊卡片時改為執行此動作（如開啟遊戲視窗），不導頁；有提供時優先於 href */
    onClick?: () => void;
}
/**
 * 功能首頁的入口卡片網格：卡片分成「行」保存、可再分成數個「分類」群組，
 * 分類框以 flex-wrap 並排（寬度不足自動換行），行內超出框寬就自動往下折。
 * 可拖曳調整順序（含跨分類搬移）、拖到行與行的間隙另起一行，版面存入 localStorage（每張卡片以 data-card-id 識別）。
 * 另可給 `anchorAfter` 排版規則（如「行事曆」緊接「系統公告」）：只在使用者尚未自行拖曳該卡片時套用。
 *
 * 分類編輯（說明文字列右端的鉛筆圖示切換）：
 * - 只有一個分類時不顯示標題列（畫面與無分類時完全相同）；新增第 2 個分類或進入編輯模式才顯示。
 * - 分類標題列為原生 `<details>`／`<summary>`＋DisclosureArrow：顯示名稱、卡片數、收合箭頭；
 *   收合狀態記住到下次造訪，「預設收合」開關決定首次（與重設後）的狀態。
 * - 編輯模式可就地改名、設每行最多張數、切換預設收合、刪除分類（未分類不可刪除，刪除後卡片退回未分類）、新增分類。
 * - 每行最多張數（1..6）：分類框寬度上限＝N 張卡（窄螢幕自動減少），每行顯示 1~N 張、超過框寬自動折行；
 *   斷行仍由拖曳決定（拖到行間隙另起一行）；「自由」＝吃滿整行。卡片維持 286px 固定寬不變形。
 * - 拖到收合中（或空白）分類的標題列上＝放進該分類末尾，不會自動展開（手機資料夾規則）。
 *
 * 分類拖曳（標題列握把，比照卡片常駐）：
 * - 拖到分類框左/右半＝插到該分類前/後；拖到分類列間隙＝移到下一列首個分類前；全部下方＝排到最後。
 * - 卡片落點先判定「指標所在的分類框」，行/間隙判定限定在該框內（並排後上下相鄰不可靠）；
 *   框外取水平重疊且垂直最近的分類框（列間隙、框下方仍可放置），左右溝槽則不放置。
 *
 * 實作要點：
 * - 版面模型是分類→二維 string[][]（rows）：斷行一律由拖曳決定；每行張數設定只影響框寬與折行上限。
 * - 全程使用 Pointer Events，滑鼠與手指（觸控）走同一套邏輯；不依賴 HTML5 拖曳 API（其不支援觸控）。
 * - 指標捕捉掛在「不會被搬動」的網格容器上，拖曳中 React 重排子節點也不會中斷事件。
 * - 每次 pointermove 都重新量測：跨行、跨分類搬移都會改變列高，
 *   所以結構真的改變時用 flushSync 同步重繪，確保下一次 pointermove 量到的是最新版面。
 * - 卡片區寬度固定用 .content-width（80vw，與首頁其他區塊同寬），卡片本身寫死 286px 不隨視窗縮放；
 *   行內用 flex-wrap 自動折行，畫面越寬每條橫列放得下越多張；小螢幕每行只剩 1 張時左右置中。
 * - 全部使用主題類別（border-themed／bg-hover／text-t1~t3／opacity），未寫死色票。
 */
export default function DraggableModuleGrid({ items, storageKey, hint, gridClassName, anchorAfter, defaultCategoryName, alwaysShowHeadings, defaultCategoryNote, itemsReady, }: {
    items: ModuleCardItem[];
    storageKey: string;
    hint?: string;
    gridClassName?: string;
    /**
     * 排版規則：`{ 子卡片 id: 錨點卡片 id }`，子卡片緊接在錨點卡片之後
     * （如管理員首頁的「行事曆」排在「系統公告」下方），兩張卡同分類時才套用。
     * 只在使用者尚未自行拖曳該卡片時套用——一旦拖過就以拖曳結果為準並記住。
     */
    anchorAfter?: Record<string, string>;
    /** 預設分類（不可刪除的退回容器）名稱；未指定時沿用「未分類」 */
    defaultCategoryName?: string;
    /** 分類標題列一律顯示（即使只有一個分類、或該分類目前沒有卡片） */
    alwaysShowHeadings?: boolean;
    /** 預設分類標題下方的簡要說明（可放不同主題色的文字片段） */
    defaultCategoryNote?: ReactNode;
    /**
     * items 是否已是完整清單：外掛卡片非同步載入時先傳 false，
     * 避免以「暫時缺少外掛卡」的清單對齊版面而把已記住的位置清掉。
     */
    itemsReady?: boolean;
}): import("react").JSX.Element;
