import "server-only";
import { NextRequest, NextResponse } from "next/server";
/**
 * 同源檢查：mutating API 必須 Origin/Referer 主機 = 請求 host。
 * 搭配 SameSite=Lax cookie，補足 CSRF 防護。
 */
export declare function assertSameOrigin(request: NextRequest): NextResponse | null;
