/**
 * 遊戲快捷區（各身分功能首頁左上角浮動按鈕）的順序來源：
 * 讀取 /recreation「快捷區」分類在本瀏覽器記住的卡片順序（localStorage）。
 * 快捷區可為空（不顯示任何遊戲），最多 3 個；未設定過則預設顯示全部 3 個既有遊戲。
 */
export declare const GAME_SHORTCUT_STORAGE_KEY = "campusCardOrder.recreation";
/** /recreation 分類版面的預設分類 id（不可刪除的「快捷區」） */
export declare const GAME_SHORTCUT_CATEGORY_ID = "uncategorized";
export declare const GAME_SHORTCUT_CATEGORY_NAME = "\u5FEB\u6377\u5340";
export declare const GAME_SHORTCUT_MAX = 3;
export type GameKey = "wrench" | "changE" | "exam";
/** 既有 3 個遊戲（順序＝遊戲發表順序，作為尚未設定快捷區時的預設值） */
export declare const GAME_KEYS: readonly GameKey[];
export declare function isGameKey(value: string): value is GameKey;
/** 讀取快捷區內的遊戲順序；未設定或無法解析時回傳全部遊戲 */
export declare function readGameShortcutOrder(): GameKey[];
