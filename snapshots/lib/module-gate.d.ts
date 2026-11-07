import "server-only";
import { NextResponse } from "next/server";
import type { SessionPayload } from "@/lib/server-session";
/**
 * P4：選用模組 API 攔截（主程式 §3.4 P4，0.390 落地）。
 *
 * - **僅 optional 模組有意義**：builtin 恒放行（既有原則「不因顯示關閉而額外阻擋 API」不變）；
 * - **fail-safe 關閉**：啟用狀態讀不到／毀損＝未啟用（readFeatureModulesEnabled 的內建語意）；
 * - **超級管理員 bypass**：維運與除錯永遠可用；
 * - 未註冊代碼放行（建置期由掃描器把關，執行期不必重複擋）。
 *
 * 用法（API 路由，建議放在鑑權之後、業務邏輯之前）：
 * ```ts
 * const gate = await requireFeatureModuleEnabled("examRegistration", session);
 * if (gate) return gate;
 * ```
 * 規格：docs/主程式模組與功能模組.md §3.4 P4。
 */
export declare function requireFeatureModuleEnabled(value: string, session?: SessionPayload | null): Promise<NextResponse | null>;
/** 讀取選用模組啟用狀態（builtin 恒 true；未註冊代碼回 true——建置期已把關） */
export declare function isFeatureModuleEnabled(value: string): Promise<boolean>;
