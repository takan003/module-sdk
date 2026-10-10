/** 型別快照：宿主 @/lib/calendar —— 模組僅允許 publishScheduleFromModule（掛勾 B，upsert） */
import type { UserRole } from "./dal";

export type CalendarAudience =
  | { kind: "all" }
  | { kind: "roles"; roles: UserRole[] }
  | Record<string, unknown>;

export type CalendarEventStatus = "active" | "cancelled" | string;

export interface PublishScheduleFromModuleInput {
  /** 必填：來源模組代碼 */
  sourceModule: string;
  /** 強烈建議：來源資料 id——同值再次呼叫＝覆蓋更新（改期／取消靠它定位） */
  sourceRef?: string;
  title?: string;
  description?: string;
  location?: string;
  startAt?: number;
  endAt?: number | null;
  allDay?: boolean;
  allDayDate?: string;
  important?: boolean;
  categoryId?: string;
  publishUnit?: string;
  audience?: CalendarAudience;
  isPublic?: boolean;
  status?: CalendarEventStatus;
  createdBy?: { uid: string; name: string; role: UserRole };
  academicYear?: number;
  semester?: 1 | 2;
}

export function publishScheduleFromModule(
  input: PublishScheduleFromModuleInput
): Promise<{ id: string }>;
