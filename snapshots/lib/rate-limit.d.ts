/** 型別快照：宿主 @/lib/rate-limit（RATE＝內建＋manifest.rateLimits 產生列合併） */
import type { NextRequest, NextResponse } from "next/server";

export interface RateBucket {
  limit: number;
  windowMs: number;
}

export const RATE: Record<string, RateBucket>;

/** 超限回 401 NextResponse（呼叫端直接 return），未超限回 null */
export function enforceRateLimit(
  request: NextRequest,
  key: string,
  limit: number,
  windowMs: number
): NextResponse | null;
export function checkRateLimit(key: string, limit: number, windowMs: number, clientKey: string): boolean;
export function clientKey(request: NextRequest, suffix?: string): string;
