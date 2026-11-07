/**
 * 富文本白名單淨化（前端與伺服器共用；**不可** import server-only）。
 *
 * 公告內容與行事曆說明改為所見即所得編輯後，輸入端與顯示端都必須經過同一套
 * 白名單：只保留粗體、斜體、底線、刪除線、顏色／底色／字級、段落、清單、引用等
 * 安全標籤；事件屬性、script／iframe、javascript: 與 url() 一律移除。
 * 純文字輸入會被跳脫，因此可安全地以 `dangerouslySetInnerHTML` 呈現。
 */
/**
 * 富文本白名單淨化：只留安全標籤（粗體、斜體、底線、刪除線、顏色／底色／字級、
 * 段落、清單、引用等）與安全屬性；移除 script／iframe／事件屬性／javascript:／url()。
 * 純文字輸入會被跳脫，因此可安全地以 `dangerouslySetInnerHTML` 呈現。
 */
export declare function sanitizeRichHtml(input: string): string;
/**
 * 取得富文本的可見純文字：`<br>`、`</p>`、`</div>`、`</li>` 視為換行，
 * 其餘標籤剝除，並還原常見實體（`&nbsp;`、`&amp;`、`&lt;`、`&gt;`）。
 * 用於必填判空、字數計算與舊版純文字內容顯示。
 */
export declare function stripHtmlToText(input: string): string;
/** 依長度上限截斷富文本：切在最後一個完整標籤邊界，避免留下破損標籤 */
export declare function capRichHtmlLength(html: string, maxLength: number): string;
/**
 * 多行富文本欄位的正規化：先白名單淨化，再限制 HTML 長度。
 * 純文字（舊資料或跨模組寫入）保持原樣，由顯示端以換行呈現。
 */
export declare function normalizeRichHtmlField(value: unknown, maxHtml: number): string;
