import { type UserRole } from "@/types/users";
/** 各身分公告頁（學生／家長／教職員共用；教職員另可發佈） */
export default function AnnouncementsInbox({ role, canPublish, }: {
    role: UserRole;
    canPublish?: boolean;
}): import("react").JSX.Element;
