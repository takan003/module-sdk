import "server-only";
/**
 * 讀取模組 lock（P1-10）。
 *
 * - `module.lock.json`：正式安裝（市集）用，會 commit 進 repo。
 * - `module.lock.local.json`：本機 `module:link`／`module:install` 用，不進 repo。
 *
 * 兩者合併後才是「目前這台機器已安裝的模組」。同名時以 local 為準，
 * 避免學校本機測試的版本被 repo 內的市集版本蓋掉。
 */
export interface ModuleLockEntry {
    value: string;
    version?: string;
    contractVersion?: number;
    minHostVersion?: string;
    sha256?: string;
    treeSha256?: string;
    source?: string;
    installedAt?: string;
    signature?: string;
    publicKey?: string;
}
export declare const MARKET_LOCK_FILE = "module.lock.json";
export declare const LOCAL_LOCK_FILE = "module.lock.local.json";
/** 合併正式與本機 lock；同名以本機為準。 */
export declare function readInstalledModuleEntries(): ModuleLockEntry[];
/** value → 版本（供市集列表顯示已安裝版本）。 */
export declare function readInstalledModules(): Record<string, string>;
export declare function readInstalledModuleValues(): Set<string>;
