import "server-only";
import { NextResponse } from "next/server";
import { SessionPayload } from "@/lib/server-session";
import { AdminModule, UserRole } from "@/types/users";
import { ManagedModuleGrant } from "@/types/roster";
/**
 * verifySession 回傳的 session 會掛上「同請求內已讀取」的資料：
 * `__user`＝使用者文件、`__entry`＝當期身分名冊條目。
 * 同請求後續的權限判定（hasAdminModule／isSuperAdmin）與端點（/api/auth/me 等）
 * 一律優先復用，避免重複讀取同一文件（見 docs/資料庫讀取規範.md 鐵律 5）。
 * 這兩個欄位只存在於伺服器記憶體：signSessionToken 只取固定欄位（不會進 JWT），
 * 且回傳給前端前必須一併剝除（含 passwordHash 等敏感欄位）。
 */
export type VerifiedSession = SessionPayload & {
    __user?: Record<string, unknown> | null;
    __entry?: Record<string, unknown> | null;
};
export declare function verifySession(): Promise<VerifiedSession | null>;
/**
 * 續期（keepalive）用的輕量驗證——鐵律 1「先自問真的需要讀嗎」：
 * 續期只要確認 ①token 簽章與絕對／閒置時限有效 ②jti 未被撤銷 ③系統未停用，
 * 三者都不必重讀使用者文件與名冊條目（合計 **0 次讀取**；jti 點查不存在＝0 讀、
 * 設定走 readSystemDoc 快取）。
 *
 * 帳號被停用、名冊條目被移除、tokenVersion 變更等**權限層變更，
 * 仍會由下一次完整 verifySession（任何實際請求）擋下**——續期不授予任何權限，
 * 只滑動更新 JWT 的 lastActivityAt，故省下的 2 讀不影響安全性。
 * 對應每次 keepalive 約省 2 讀（≈240 讀/小時/在線使用者）。
 */
export declare function verifySessionForRenewal(): Promise<SessionPayload | null>;
export declare function verifyRole(role: UserRole): Promise<SessionPayload | null>;
export type AuthDenial = {
    status: 401;
    message: string;
} | {
    status: 403;
    message: string;
};
export declare function toAuthResponse(denial: AuthDenial): NextResponse;
export declare function requireRole(role: UserRole): Promise<{
    session: SessionPayload;
    denial: null;
} | {
    session: null;
    denial: AuthDenial;
}>;
/**
 * 管理功能模組權限（政策修改書決議二）：
 * 有當期管理員名冊條目＝全體模組全開；無條目或非管理員＝無權限。
 */
export declare function hasAdminModule(session: SessionPayload, module: AdminModule): Promise<boolean>;
export declare function requireAdminModule(module: AdminModule): Promise<{
    session: SessionPayload;
    denial: null;
} | {
    session: null;
    denial: AuthDenial;
}>;
/**
 * 模組安裝／卸載的指定管理員清單（`MODULE_MARKET_INSTALL_ADMINS`，選填）。
 * 未設定＝所有具 `modules` 權限的管理員皆可（維持「全體管理員平等」政策）。
 */
export declare function moduleInstallAdminAllowlist(): string[];
/**
 * 安裝／卸載模組的守門（P0-7）：
 * 先要求 `modules` 權限，再用選填的 allowlist 限縮高風險操作。
 * 未設定 allowlist 時與 requireAdminModule("modules") 相同。
 */
export declare function requireModuleInstallAdmin(): Promise<{
    session: SessionPayload;
    denial: null;
} | {
    session: null;
    denial: AuthDenial;
}>;
/**
 * 「完整管理員」判定（政策修改書決議二）：屬性已退役，全體管理員平等。
 * 有當期管理員名冊條目即為 true。保留函式名稱相容既有呼叫點。
 */
export declare function isSuperAdmin(session: SessionPayload): Promise<boolean>;
/** 【語意已變更】全體管理員皆可執行（屬性已退役）；保留名稱相容既有呼叫點 */
export declare function requireSuperAdmin(_message?: string): Promise<{
    session: SessionPayload;
    denial: null;
} | {
    session: null;
    denial: AuthDenial;
}>;
/**
 * 「系統設定」的可設定判定（政策修改書決議二）：全體管理員皆可
 * （屬性已退役；「系統設定」原為每位管理員的基本入口，現讀寫一併開放）。
 */
export declare function hasSettingsManage(session: SessionPayload): Promise<boolean>;
/**
 * 【已退役】管理員名冊的屬性寫入守門——屬性已取消，固定放行。
 * 「最後一位管理員不可停用」由 accountStatusGuard 守門。
 */
export declare function checkAdminAttribute(_session: SessionPayload, _nextAttribute: string | null, _currentAttribute: string | null): Promise<AuthDenial | null>;
export declare function requireSettingsManage(): Promise<{
    session: SessionPayload;
    denial: null;
} | {
    session: null;
    denial: AuthDenial;
}>;
/** requireModulePermission 回傳的權限上下文 */
export type ModulePermissionContext = {
    kind: "admin";
    session: SessionPayload;
} | {
    kind: "delegated";
    session: SessionPayload;
    permissions: string[];
};
/**
 * 模組管理權守門（政策修改書決議一／G3）：
 * 1. `role === "admin"` → 管理員恆全權（kind: "admin"）；
 * 2. 否則查當期身分名冊條目 `managedModules`：
 *    - 指定 `permission` 時需含該子權限碼；
 *    - 未指定任何模組或子權限不符 → 403。
 * 模組端 API 以本函式取代 requireAdminModule（可帶子權限逐動作把關）。
 */
export declare function requireModulePermission(module: string, permission?: string): Promise<{
    context: ModulePermissionContext;
    denial: null;
} | {
    context: null;
    denial: AuthDenial;
}>;
/**
 * 非管理員身分的被指派模組清單（session 顯示用；管理員回空陣列——管理員恆全權，
 * 首頁卡片走 adminModules）。優先復用 `__entry`，不另發讀取。
 */
export declare function delegatedModuleGrants(session: SessionPayload): Promise<ManagedModuleGrant[]>;
