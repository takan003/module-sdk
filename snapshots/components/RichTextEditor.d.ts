export interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
    ariaLabel?: string;
    /** 額外 class（套用至編輯器容器） */
    className?: string;
    /** 額外樣式（套用至編輯器容器） */
    style?: React.CSSProperties;
    /** 精簡工具列與高度（表格內逐週意見等狹窄欄位用） */
    compact?: boolean;
}
/**
 * 零依賴所見即所得編輯器：以 contentEditable＋document.execCommand 實作，
 * 變更一律先經 `sanitizeRichHtml` 白名單淨化再回傳。
 */
export declare function RichTextEditor({ value, onChange, disabled, placeholder, maxLength, ariaLabel, className, style, compact, }: RichTextEditorProps): import("react").JSX.Element;
export interface RichTextContentProps {
    html: string;
    className?: string;
    emptyText?: string;
}
/**
 * 唯讀富文本：先淨化再渲染；舊版純文字若不含 HTML 標籤則保留換行顯示。
 * 清單／引用以行內樣式補回 Tailwind reset 清掉的符號、縮排與左邊框。
 */
export declare function RichTextContent({ html, className, emptyText, }: RichTextContentProps): import("react").JSX.Element;
