/** 純前端切片：回目前頁次的資料（不增加任何資料庫讀取） */
export declare function paginate<T>(items: T[], page: number, pageSize: number): T[];
/** 依總筆數與每頁筆數算總頁數（至少 1 頁） */
export declare function totalPagesOf(total: number, pageSize: number): number;
/**
 * 通用分頁列（受控元件）：每頁筆數選擇＋第一頁／上一頁／頁次／下一頁／最後一頁。
 * 外觀比照帳號／名冊清單的分頁列；`total === 0` 或只剩一頁時不渲染頁次控制。
 * 用法：資料在呼叫端自行切片（`paginate`），翻頁不增加任何 Firestore 讀取。
 */
export default function ListPagination({ total, page, pageSize, onPageChange, onPageSizeChange, pageSizes, idPrefix, className, }: {
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    pageSizes?: number[];
    idPrefix?: string;
    className?: string;
}): import("react").JSX.Element | null;
