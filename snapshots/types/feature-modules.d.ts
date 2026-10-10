/** 型別快照：宿主 @/types/feature-modules（唯讀：註冊表查詢與可見性判斷） */
import type { UserRole } from "./users";

export type FeatureModuleKind = "builtin" | "optional";
export type FeatureModuleStatus = "planned" | "building" | "live";

export interface FeatureModuleAuthor {
  author: string;
  authorUrl: string;
  version: string;
  releasedAt: string;
}

export interface FeatureModuleMeta {
  value: string;
  label: string;
  kind: FeatureModuleKind;
  status: FeatureModuleStatus;
  description: string;
  href: string;
  author: FeatureModuleAuthor;
  provides: Record<UserRole, boolean>;
}

export type FeatureModuleRolesMap = Record<string, Partial<Record<UserRole, boolean>>>;

export function featureModuleMeta(value: string): FeatureModuleMeta | undefined;
export function featureModulesOfKind(kind: FeatureModuleKind): readonly FeatureModuleMeta[];
export function isFeatureModuleProvided(value: string, role: UserRole): boolean;
export function isFeatureModuleVisible(
  value: string,
  role: UserRole,
  display: Partial<Record<UserRole, boolean>> | undefined,
  options?: { isSuper?: boolean }
): boolean;
export const FEATURE_MODULES: readonly FeatureModuleMeta[];
