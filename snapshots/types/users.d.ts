/** 型別快照：宿主 @/types/users（身分基本型別；唯讀） */
export type UserRole = "student" | "parent" | "staff" | "admin";
export const ALL_ROLES: readonly UserRole[];
export const ROLE_LABELS: Record<UserRole, string>;
export function isUserRole(value: unknown): value is UserRole;
