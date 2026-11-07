export declare function hashPassword(plainPassword: string, costFactor?: number): Promise<string>;
export declare function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
