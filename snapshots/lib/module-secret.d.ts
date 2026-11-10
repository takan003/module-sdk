import "server-only";
/**
 * 取得模組專屬密鑰。
 *
 * @param moduleValue 模組代碼（camelCase，與 module.json value 相同）
 * @param name 用途名稱（例如 "canva"、"webhook"）；同一模組不同用途會得到不同密鑰
 */
export declare function moduleSecret(moduleValue: string, name?: string): string;
