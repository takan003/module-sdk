/** 型別快照：宿主 @/components/AdminSectionShell（管理端子區塊外殼＋權限閘門） */
import type { ReactNode } from "react";

export interface AdminSectionShellProps {
  /** 模組代碼（比對 session.adminModules；超級管理員全開） */
  moduleKey: string;
  /** 功能標題（頁面區塊大標） */
  title: string;
  /** 標題下的說明文字 */
  description: string;
  /** 權限不足時的說明 */
  deniedMessage: string;
  children: ReactNode;
}

export default function AdminSectionShell(props: AdminSectionShellProps): JSX.Element;
