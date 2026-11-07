/**
 * 身分功能頁共用外殼：系統名稱／校名／學年度學期頁首 ＋ 內容 ＋ 廣告區 ＋ 版權區。
 * 與 RoleHome／RoleSettings／AccountSecurity 的頁面框架一致，
 * 供行事曆、公告等「直接渲染內容元件」的頁面補上標準 chrome。
 */
export default function RolePageShell({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
