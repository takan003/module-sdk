import { UserRole } from "@/types/users";
export interface UserSession {
    uid: string;
    email: string;
    account: string;
    displayName: string;
    role: UserRole;
    /** 本次登入可用的身分（多身分切換選單用；單一時僅含目前身分） */
    roles?: UserRole[];
    /** 管理員可用的功能模組（管理員恆全權＝全部；首頁卡片顯示用） */
    adminModules?: string[];
    /** 非管理員身分被指定管理的模組（導覽入口顯示用；政策修改書 G3） */
    delegatedModules?: Array<{
        module: string;
        permissions: string[];
    }>;
    /** 首次登入須先修改密碼（管理員代設的預設密碼）：全螢幕強制改密碼遮罩用 */
    mustChangePassword?: boolean;
}
/** session 快取的訂閱者（強制改密碼遮罩等元件用來即時反應登入／改密後的旗標） */
type SessionListener = () => void;
export declare function subscribeSession(listener: SessionListener): () => void;
export declare function getCachedSession(): UserSession | null;
export declare function fetchSession(force?: boolean): Promise<UserSession | null>;
export declare function setCachedSession(user: UserSession): void;
export declare function clearSession(): void;
export declare function logout(): Promise<void>;
export declare function getHomePath(role: UserRole): string;
export {};
