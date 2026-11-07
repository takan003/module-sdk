import { UserRole } from "@/types/users";
/**
 * 身分切換下拉選單：顯示在各身分功能首頁問候語下方。
 * 僅在本次登入偵測到多個身分時出現；切換不需重新驗證（兩階段驗證屬帳號層級、於登入時完成）。
 */
export default function RoleSwitcher({ role }: {
    role: UserRole;
}): import("react").JSX.Element | null;
