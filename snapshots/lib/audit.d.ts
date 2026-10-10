/** 型別快照：宿主 @/lib/audit */
import type { NextRequest } from "next/server";
import type { UserRole } from "./dal";

/** 內建＋模組宣告（manifest.auditActions）合併後的動作代碼；字串以允許模組自訂值 */
export type ActivityAction = string;

export interface ActivityEntry {
  userId: string;
  role: UserRole;
  action: ActivityAction;
  ip?: string | null;
  details?: string;
  targetUid?: string;
}

export function logActivity(entry: ActivityEntry): Promise<void>;
export function getClientIp(request: {
  headers: { get(name: string): string | null };
  ip?: string;
}): string;
