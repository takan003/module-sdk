/**
 * Google Identity Services（GIS）前端輔助：不開彈出視窗取得 Google ID token。
 *
 * 為什麼不用 signInWithPopup：Firebase 的 popup 流程不論是否授權過，每次都會開一個視窗；
 * GIS 則在原頁以瀏覽器內建帳號選擇（FedCM）或自動登入（auto_select）完成，
 * 已授權過的使用者通常「不會看到任何視窗」，行為與一般 PHP 網站的 Google 登入一致。
 *
 * 流程：requestGoogleIdToken() 取得 Google ID token → 呼叫端以
 * `signInWithCredential(auth, GoogleAuthProvider.credential(token))` 換成 Firebase ID token，
 * 其後與原本一致送 /api/auth/google（伺服端驗證不變）。
 *
 * 需要設定 `NEXT_PUBLIC_GOOGLE_CLIENT_ID`（Firebase 的 Google 登入用的 Web client ID），
 * 且該 OAuth 用戶端的「已授權的 JavaScript 來源」須包含網站網域。未設定或 GIS 不可用時回
 * `unavailable`，呼叫端應退回 signInWithPopup。
 */
interface GsiNotification {
    isNotDisplayed(): boolean;
    isSkippedMoment(): boolean;
    isDismissedMoment(): boolean;
    getDismissedReason?(): string;
}
interface GsiCredentialResponse {
    credential?: string;
}
interface GsiId {
    initialize(config: {
        client_id: string;
        callback: (response: GsiCredentialResponse) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
        use_fedcm_for_prompt?: boolean;
    }): void;
    prompt(listener?: (notification: GsiNotification) => void): void;
    cancel(): void;
}
declare global {
    interface Window {
        google?: {
            accounts?: {
                id?: GsiId;
            };
        };
    }
}
export type GoogleIdentityResult = {
    status: "ok";
    idToken: string;
}
/** 使用者主動關閉帳號選擇：不應再退回彈窗 */
 | {
    status: "cancelled";
}
/** GIS 無法使用（未設定、載入失敗、被冷卻／封鎖）：呼叫端退回彈窗登入 */
 | {
    status: "unavailable";
};
export declare function requestGoogleIdToken(clientId: string): Promise<GoogleIdentityResult>;
export {};
