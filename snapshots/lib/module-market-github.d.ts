export interface ModuleMarketGithubConfig {
    token: string;
    repo: string;
}
/** 【E13/5b】查詢分支最新 commit 的部署狀態（GitHub combined status；Vercel webhook 建立） */
export declare function getBranchDeployStatus(branch: string): Promise<{
    state: "pending" | "success" | "failure" | "unknown";
    description: string;
    targetUrl?: string;
}>;
export interface CommitMarketplaceInstallInput {
    moduleId: string;
    moduleDir: string;
    sourceRef: string;
    archiveSha256: string;
    manifestVersion: string;
    contractVersion: number;
    minHostVersion: string;
    signature?: string;
    publicKey?: string;
}
export interface CommitMarketplaceUninstallInput {
    moduleId: string;
}
interface CommitMarketplaceInstallResult {
    alreadyInstalled: boolean;
    updated: boolean;
    branch: string;
    commitUrl?: string;
    commitSha?: string;
}
export declare function resolveModuleMarketGithubConfig(): ModuleMarketGithubConfig | null;
export declare function commitMarketplaceModuleInstall(input: CommitMarketplaceInstallInput): Promise<CommitMarketplaceInstallResult>;
export declare function commitMarketplaceModuleUninstall(input: CommitMarketplaceUninstallInput): Promise<{
    alreadyUninstalled: boolean;
    branch: string;
    commitUrl?: string;
    commitSha?: string;
}>;
export {};
