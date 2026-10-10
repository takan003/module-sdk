/** 型別快照：宿主 @/lib/module-gate（P4：選用模組 API 攔截，0.390 起） */
import type { NextResponse } from "next/server";
import type { SessionPayload } from "./dal";

/**
 * optional 模組未啟用→403（fail-safe 關閉）；超級管理員 bypass；builtin 恒放行。
 * 用法（API 路由，鑑權之後）：const gate = await requireFeatureModuleEnabled(value, session); if (gate) return gate;
 */
export function requireFeatureModuleEnabled(
  value: string,
  session?: SessionPayload | null
): Promise<NextResponse | null>;

/** 讀取啟用狀態（builtin／未註冊代碼恒 true） */
export function isFeatureModuleEnabled(value: string): Promise<boolean>;
