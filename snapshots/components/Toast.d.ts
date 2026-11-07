export type ToastKind = "success" | "error";
export interface ToastMessage {
    kind: ToastKind;
    text: string;
}
export default function Toast({ message, onClose, durationMs, }: {
    message: ToastMessage | null;
    onClose: () => void;
    durationMs?: number;
}): import("react").JSX.Element | null;
