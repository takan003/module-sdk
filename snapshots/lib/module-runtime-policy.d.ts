/**
 * 模組 API runtime wrapper 的純政策（P0-8）。
 * 零依賴，供 `module-runtime.ts` 與測試共用。
 */
export type RuntimeRole = "student" | "parent" | "staff" | "admin";
/** 由頁面路徑前綴推導必要角色；無前綴回 null（僅要求登入） */
export declare function roleFromPagePath(pathname: string): RuntimeRole | null;
/** 由 API 路徑前綴推導必要角色；無前綴回 null（僅要求登入） */
export declare function roleFromApiPath(pathname: string): RuntimeRole | null;
/** 是否套用「功能模組啟用」閘門（與 build-time 規則一致：student／parent／staff） */
export declare function needsModuleGate(pathname: string): boolean;
/** 寫入方法需要 CSRF 同源檢查 */
export declare function isMutatingMethod(method: string): boolean;
/** 宿主層安全上限（每分鐘、每個模組×路由×IP）；模組自己的限流通常更嚴 */
export declare function runtimeRateLimit(method: string): number;
/** 未知角色字串轉為 RuntimeRole（避免把任意字串當角色） */
export declare function isRuntimeRole(value: unknown): value is RuntimeRole;
