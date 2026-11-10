import "server-only";
type PageComponent = (props: any) => any;
/**
 * 模組頁面的 server-side 閘門（P0-8）。
 *
 * 由 `scripts/build-module-registry.mjs` 產生的 page／layout 轉接檔包住：
 * 1. 先做完整 session 驗證（不是只靠 client-side AdminSectionShell）
 * 2. 依路徑前綴檢查角色（/admin、/student、/parent、/staff）
 * 3. 非管理端頁面檢查功能模組是否已啟用
 *
 * 通過後才呼叫原本的 page／layout，因此 server component 的資料讀取
 * 不會在 client gate 之前發生。
 */
export declare function withModulePage<T extends PageComponent>(moduleValue: string, pathname: string, Page: T): T;
export {};
