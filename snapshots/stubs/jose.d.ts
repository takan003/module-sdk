/** 影子 tsc 樁：jose（只涵蓋模組常用 API；完整型別以宿主 node_modules 為準） */
declare module "jose" {
  export class EncryptJWT {
    constructor(payload?: Record<string, unknown>);
    setProtectedHeader(header: Record<string, unknown>): this;
    setIssuedAt(issuedAt?: number): this;
    setExpirationTime(expirationTime: number | string): this;
    setSubject(subject: string): this;
    setIssuer(issuer: string): this;
    setAudience(audience: string | string[]): this;
    setJti(jti: string): this;
    encrypt(key: unknown): Promise<string>;
  }

  export class SignJWT {
    constructor(payload?: Record<string, unknown>);
    setProtectedHeader(header: Record<string, unknown>): this;
    setIssuedAt(issuedAt?: number): this;
    setExpirationTime(expirationTime: number | string): this;
    setSubject(subject: string): this;
    setIssuer(issuer: string): this;
    setAudience(audience: string | string[]): this;
    setJti(jti: string): this;
    sign(key: unknown): Promise<string>;
  }

  export function jwtDecrypt(...args: any[]): Promise<any>;
  export function jwtVerify(...args: any[]): Promise<any>;
  export function compactDecrypt(...args: any[]): Promise<any>;
  export function compactEncrypt(...args: any[]): Promise<any>;

  export const errors: {
    JOSEError: new (...args: any[]) => Error;
    JWTExpired: new (...args: any[]) => Error;
    JWSSignatureVerificationFailed: new (...args: any[]) => Error;
    JWTClaimValidationFailed: new (...args: any[]) => Error;
    [key: string]: any;
  };
}
