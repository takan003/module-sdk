/** 型別快照：宿主 @/lib/csrf */
import type { NextRequest, NextResponse } from "next/server";

/** mutating API 同源檢查；失敗回 NextResponse（403），通過回 null */
export function assertSameOrigin(request: NextRequest): NextResponse | null;
