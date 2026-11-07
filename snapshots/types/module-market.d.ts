export type ModuleMarketStatus = "official" | "reviewed" | "experimental";
export interface ModuleMarketEntry {
    id: string;
    name: string;
    description: string;
    status?: ModuleMarketStatus;
    version: string;
    latestVersion?: string;
    minHostVersion?: string;
    repoUrl?: string;
    downloadUrl?: string;
    checksumSha256?: string;
    /** 選填：ed25519 簽章（base64）與作者公鑰（base64 SPKI）；主程式會比對釘選信任清單 */
    signature?: string;
    publicKey?: string;
    category?: string;
    tags?: string[];
    releaseNotes?: string[];
}
export interface ModuleMarketIndex {
    generatedAt?: string;
    marketplaceVersion?: string;
    modules: ModuleMarketEntry[];
}
export declare function parseModuleMarketEntry(value: unknown): ModuleMarketEntry | null;
export declare function parseModuleMarketIndex(value: unknown): ModuleMarketIndex | null;
