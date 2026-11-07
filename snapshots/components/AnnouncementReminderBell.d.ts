/**
 * 首頁公告提醒鈴鐺（期 C）：
 * 讀取個人仍有效的提醒，有內容時顯示數量徽章；點擊進入公告頁。
 * 非系統推播——使用者打開首頁時才會更新。
 * 管理員於「規則設定」關閉個人提醒時不渲染（待設定回應後才顯示，避免閃現）。
 */
export default function AnnouncementReminderBell({ role, href, }: {
    role: string;
    href: string;
}): import("react").JSX.Element | null;
