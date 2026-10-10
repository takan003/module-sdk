/** 型別快照：宿主 @/types/announcements（唯讀型別與共用 helper；契約增補 0.392） */
import type { UserRole } from "./users";
import type { AnnouncementAudience } from "../lib/announcements";

export type { AnnouncementAudience } from "../lib/announcements";

/** 全校公告對象（roles 為空時的慣用構造） */
export function schoolWideAudience(roles: UserRole[]): AnnouncementAudience;
export function isSchoolWideAudience(audience: AnnouncementAudience): boolean;
