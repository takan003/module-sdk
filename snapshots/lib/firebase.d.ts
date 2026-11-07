import { GoogleAuthProvider, Auth } from "firebase/auth";
export declare const auth: Auth | null;
export declare const googleProvider: GoogleAuthProvider;
export declare function ensureSignedOut(): Promise<void>;
