import { UserRole } from "@/types/users";
export default function RoleHome({ role }: {
    role: Exclude<UserRole, "admin">;
}): import("react").JSX.Element;
