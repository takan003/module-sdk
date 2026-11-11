/**
 * 功能入口卡片的名稱處理。
 *
 * 不同作者可能各自寫出同名功能（例如兩個「自主學習計畫」）。
 * 只有一個同名模組時維持乾淨名稱；兩個以上時才加作者名區分。
 * 若同一組內作者也相同，再補上模組代碼，避免兩張卡片仍同名。
 */
export interface ModuleCardLabelSource {
    value: string;
    label: string;
    author?: {
        author?: string;
    };
}
export declare function moduleCardLabels(items: readonly ModuleCardLabelSource[]): string[];
