import { UserRole } from "@/types/users";
/**
 * 各身分的「系統設定」功能頁（學生／家長／教職員）。
 * 版型比照「帳號、身分與安全管理」（AccountSecurity）：標題區 → 頁首按鈕組 → 分隔線
 * → 功能卡 → 分隔線 → 底部按鈕組 → 廣告區 → 版權宣告。
 * 目前是尚未開放任何設定項目的空頁面，日後新增設定項目時於功能卡內擴充即可。
 */
export default function RoleSettings({ role, }: {
    role: Exclude<UserRole, "admin">;
}): import("react").JSX.Element;
