export default function RoleLayout({ children, role, }: {
    children: React.ReactNode;
    role: "student" | "parent" | "staff";
}): import("react").JSX.Element;
