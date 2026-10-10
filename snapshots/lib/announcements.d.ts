/** 型別快照：宿主 @/lib/announcements —— 模組僅允許 publishFromModule（掛勾 A） */
import type { UserRole } from "./dal";

/** 閱讀對象（寬鬆型別；合法值以宿主驗證為準） */
export type AnnouncementAudience =
  | { kind: "all" }
  | { kind: "roles"; roles: UserRole[] }
  | { kind: "classes"; classIds: string[] }
  | { kind: "students"; uids: string[] }
  | { kind: "parents"; uids: string[] }
  | { kind: "staff" }
  | Record<string, unknown>;

export interface PublishFromModuleInput {
  /** 必填：來源模組代碼（= manifest.value） */
  sourceModule: string;
  /** 強烈建議：來源資料 id（同值再呼叫＝同筆關聯） */
  sourceRef?: string;
  title: string;
  body: string;
  authorUid: string;
  authorName: string;
  authorRole: UserRole;
  audience: AnnouncementAudience;
  isPublic?: boolean;
  categoryId?: string;
  publishAt?: number;
  expireAt?: number | null;
  pinned?: boolean;
}

/** 跨模組發佈公告；校驗失敗拋錯，成功回新公告 id */
export function publishFromModule(input: PublishFromModuleInput): Promise<{ id: string }>;
