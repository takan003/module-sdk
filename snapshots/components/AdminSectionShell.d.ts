import { ReactNode } from "react";
interface AdminSectionShellProps {
    /** 模組代碼（比對 session.adminModules；超級專屬模組同樣看清單是否含它） */
    moduleKey: string;
    /** 功能標題（頁面區塊大標） */
    title: string;
    /** 標題下的說明文字 */
    description: string;
    /** 權限不足時的說明（顯示於「權限不足」卡片） */
    deniedMessage: string;
    children: ReactNode;
}
/**
 * 管理端子區塊共用外殼（標題、權限閘門、頁尾）：
 * 「統計儀表板」「功能模組管理」「班級管理」「學校基本設定」四個 layout 共用，
 * 權限與設定兩發請求都在此取得：
 * - session 走 fetchSession(force)：與同畫面其他呼叫去重（in-flight 共用），
 *   進區塊仍重取一次，權限變更即時反映；
 * - 設定走 fetchSettings：30 秒模組層快取，跨區塊重進不再重打。
 */
export default function AdminSectionShell({ moduleKey, title, description, deniedMessage, children, }: AdminSectionShellProps): import("react").JSX.Element;
export {};
