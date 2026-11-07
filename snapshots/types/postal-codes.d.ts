export interface PostalCodeOption {
    code: string;
    district: string;
}
export declare const POSTAL_CODES_DOC_ID = "postalCodes";
export declare const POSTAL_CODE_OPTIONS_MAX = 1000;
export declare const POSTAL_CODE_MAX_LENGTH = 3;
export declare const POSTAL_DISTRICT_MAX_LENGTH = 80;
export declare const DEFAULT_POSTAL_CODE_OPTIONS: PostalCodeOption[];
export declare function readPostalCodeOptions(raw: unknown): PostalCodeOption[];
