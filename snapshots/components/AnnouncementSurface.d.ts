import type { AnnouncementSurface as AnnouncementSurfaceKey } from "@/types/announcements";
/**
 * 系統公告顯示位置（5 處共用）：
 * 系統首頁登入表單上方、四種身分功能首頁（切換身分下拉選單下方、第一個登出按鈕上方）。
 * 顯示與否／方式（清單／「清單，置頂公告橫幅」／橫幅）／筆數由「系統公告」逐處設定。
 * 清單＝單行（日期｜分類｜標題 25 字內；小螢幕僅 m/d｜標題）；
 * 「清單，置頂公告橫幅」＝置頂三行卡片＋其餘單行；橫幅＝全部三行卡片。
 * 字級由使用者以標題旁「小／中／大」切換，存 localStorage。
 * 標題右側「全部公告 ›」連到公告專頁 `/announcements`（不分設定筆數，附通用分頁）。
 */
export default function AnnouncementSurface({ surface, className, }: {
    surface: AnnouncementSurfaceKey;
    className?: string;
}): import("react").JSX.Element | null;
