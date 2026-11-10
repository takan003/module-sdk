import type { ReactNode } from "react";
/** 模組頁面被 server-side 閘門擋下時的簡易頁面（不依賴模組程式碼） */
export default function ModulePageDenied({ message }: {
    message: string;
}): ReactNode;
