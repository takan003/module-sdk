import "server-only";
/**
 * 模組套件簽章的信任根（P0-6）。
 *
 * - 公鑰來源：環境變數 `MODULE_MARKET_TRUSTED_KEYS`（JSON：moduleId -> base64 SPKI 公鑰或公鑰陣列）。
 * - `publicKey` 由安裝請求／市集提供時，必須先比對釘選清單；不是信任清單內的 key 一律拒絕。
 * - 未提供簽章時：預設放行（v1 相容）；`MODULE_MARKET_REQUIRE_SIGNATURE=1` 時拒絕。
 * - 簽章格式：ed25519，對 zip 的 sha256（hex 解碼後 bytes）簽章，與 `scripts/module-sign.mjs` 一致。
 */
export interface ModuleSignatureInput {
    moduleId: string;
    /** 套件 sha256（64 碼小寫 hex） */
    sha256: string;
    signature?: string;
    publicKey?: string;
}
export interface ModuleSignatureResult {
    ok: boolean;
    signed: boolean;
    reason?: string;
}
/** 是否要求所有套件都必須有簽章（預設 false，兼容既有未簽章套件） */
export declare function isModuleSignatureRequired(): boolean;
/** 讀取釘選公鑰：moduleId -> base64 SPKI 公鑰清單 */
export declare function readTrustedModuleKeys(): Map<string, string[]>;
/** 驗證套件簽章；publicKey 必須是釘選清單內的 key */
export declare function verifyModuleArchiveSignature(input: ModuleSignatureInput): ModuleSignatureResult;
