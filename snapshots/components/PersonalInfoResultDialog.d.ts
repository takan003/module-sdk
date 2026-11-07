export default function PersonalInfoResultDialog({ message, kind, onClose, }: {
    message: string | null;
    kind: "success" | "error";
    onClose: () => void;
}): import("react").JSX.Element | null;
