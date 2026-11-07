import type { CalendarSurface as CalendarSurfaceKey } from "@/types/calendar";
/**
 * 行程顯示位置（5 處共用）：
 * 系統首頁登入表單上方、四種身分功能首頁（切換身分下拉選單下方、第一個登出按鈕上方）。
 * 顯示與否與可翻頁則數由「行事曆 › 設定管理 › 顯示位置」逐處設定（筆數預設 5，省流量）。
 *
 * 版面：標題「行事曆」右側＝翻頁箭頭（2 則以上才出現，水平左右排列；
 * 一次只顯示 1 條，標題連到「單筆行程內容頁」`/calendar/[id]`，跳出新頁）
 * ＋「進入行事曆」入口 SVG（＝全站統一行事曆頁 `/calendar`，新視窗）；
 * 翻到盡頭時該方向箭頭停用（不改為連結——入口圖示就在旁邊）。
 * 行動版（<sm）日期｜類型與標題各佔一行，避免標題被截斷；
 * 沒有行程時只顯示入口，不整塊隱藏（API 異常時同樣只顯示入口）。
 */
export default function CalendarSurface({ surface, className, }: {
    surface: CalendarSurfaceKey;
    className?: string;
}): import("react").JSX.Element | null;
