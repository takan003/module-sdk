/** 影子 tsc 樁：xlsx（SheetJS；只涵蓋匯出／讀取常用 API） */
declare module "xlsx" {
  export const utils: {
    book_new(): any;
    aoa_to_sheet(data: unknown[][], options?: Record<string, unknown>): any;
    json_to_sheet(data: unknown[], options?: Record<string, unknown>): any;
    book_append_sheet(workbook: any, worksheet: any, name?: string): void;
    sheet_to_json<T = unknown>(worksheet: any, options?: Record<string, unknown>): T[];
    [key: string]: any;
  };
  export function write(workbook: any, options?: Record<string, unknown>): any;
  export function writeFile(workbook: any, filename: string, options?: Record<string, unknown>): void;
  export function read(data: unknown, options?: Record<string, unknown>): any;
  export function readFile(filename: string, options?: Record<string, unknown>): any;
}
