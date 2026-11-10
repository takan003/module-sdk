import "server-only";
import { NextRequest } from "next/server";
import { currentModuleContext, currentModuleValue, runWithModuleContext } from "@/lib/module-context";
import type { ModuleRuntimeContext } from "@/lib/module-context";
export { currentModuleContext, currentModuleValue, runWithModuleContext };
export type { ModuleRuntimeContext };
/**
 * 模組 API 的宿主 runtime wrapper（P0-8）。
 *
 * 由 `scripts/build-module-registry.mjs` 產生的薄轉接檔自動包住每個 HTTP handler，
 * 不論模組程式碼有沒有寫齊，宿主都會在執行期強制：
 *
 * 1. 宿主層 rate limit（每模組×路由×IP 的安全上限）
 * 2. 請求 body 大小上限（JSON 1 MiB／檔案 25 MiB，依 Content-Type 判斷）
 * 3. 寫入方法的 CSRF 同源檢查（POST／PUT／PATCH／DELETE）
 * 4. 登入驗證（`verifySession`：jti、tokenVersion、名冊、角色開關、閒置逾時）
 * 5. 路徑角色（`/api/admin/*`→admin、`/api/student/*`→student…）
 * 6. 非管理端（student／parent／staff）的「功能模組已啟用」閘門
 *
 * 模組自己的 `requireRole`／`assertSameOrigin`／`enforceRateLimitShared` 仍會執行，
 * 這裡是第二道防線；同時提供 `AsyncLocalStorage` 的模組上下文供後續功能使用。
 */
type RouteHandler = (request: NextRequest, context?: unknown) => Promise<Response> | Response;
/**
 * 包裝單一 HTTP handler。
 * @param moduleValue 模組代碼（寫入 runtime context 與限流桶）
 * @param handler 模組原本的 handler
 */
export declare function withModuleRuntime<T extends RouteHandler>(moduleValue: string, handler: T): T;
