/** 型別快照：宿主 @/lib/dal（對應主程式 0.388；同契約只增不改不刪） */
import type { NextRequest, NextResponse } from "next/server";

export type UserRole = "student" | "parent" | "staff" | "admin";

export interface SessionPayload {
  uid: string;
  role: UserRole;
  name?: string;
  adminAttribute?: string;
  adminModules?: string[];
  [key: string]: unknown;
}

export type VerifiedSession = SessionPayload & { expiresAt?: number };

export type AuthDenial = { status: 401; message: string } | { status: 403; message: string };

export function verifySession(): Promise<VerifiedSession | null>;
export function requireRole(
  role: UserRole
): Promise<{ session: SessionPayload; denial: null } | { session: null; denial: AuthDenial }>;
export function requireAdminModule(
  module: string
): Promise<{ session: SessionPayload; denial: null } | { session: null; denial: AuthDenial }>;
export function isSuperAdmin(session: SessionPayload): Promise<boolean>;
export function toAuthResponse(denial: AuthDenial): NextResponse;
export function hasAdminModule(session: SessionPayload, module: string): Promise<boolean>;

/** 供檔案內其他型別引用 */
export declare const __dalRequest: NextRequest;
