import "server-only";
import { NextRequest, NextResponse } from "next/server";
export interface RateLimitResult {
    ok: boolean;
    remaining: number;
    retryAfterSec: number;
}
export declare function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult;
export declare function clientKey(request: NextRequest, suffix?: string): string;
export declare function tooManyRequests(retryAfterSec: number): NextResponse;
/**
 * 檢查限流：先跑進程內，再視設定跑 Upstash。
 * 任一來源判定超限即拒絕；Upstash 失敗時只採用進程內結果。
 */
export declare function checkRateLimitAsync(key: string, limit: number, windowMs: number): Promise<RateLimitResult>;
/**
 * 進程內限流（同步）。保留給既有呼叫端與外部模組使用。
 * 宿主路由應改用 `enforceRateLimitShared` 以取得跨實例保護。
 */
export declare function enforceRateLimit(request: NextRequest, bucketName: string, limit: number, windowMs: number, suffix?: string): NextResponse | null;
/** 跨實例版：先跑進程內，再視設定跑 Upstash。 */
export declare function enforceRateLimitShared(request: NextRequest, bucketName: string, limit: number, windowMs: number, suffix?: string): Promise<NextResponse | null>;
/**
 * 帳號維度限流（同步，進程內）。
 * 保留給既有呼叫端與外部模組使用；宿主路由改用 `enforceAccountRateLimitShared`。
 */
export declare function enforceAccountRateLimit(bucketName: string, role: string, account: string, limit: number, windowMs: number): NextResponse | null;
/** 帳號維度限流（跨實例版）。 */
export declare function enforceAccountRateLimitShared(bucketName: string, role: string, account: string, limit: number, windowMs: number): Promise<NextResponse | null>;
/** 限流桶表：內建手刻列＋選用模組 manifest（rateLimits）自動併入【期 0 批次 2】 */
export declare const RATE: {
    EXAM_REGISTRATION_LIST: {
        readonly limit: 120;
        readonly windowMs: 60000;
    };
    EXAM_REGISTRATION_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    EXAM_REGISTRATION_ADMIN: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    EXAM_REGISTRATION_STAFF: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    IDENTITY_TAX_INQUIRY_LIST: {
        readonly limit: 120;
        readonly windowMs: 60000;
    };
    IDENTITY_TAX_INQUIRY_STUDENT: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    IDENTITY_TAX_INQUIRY_STAFF: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    IDENTITY_TAX_INQUIRY_ADMIN: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SELF_DIRECTED_LEARNING_CANVA: {
        readonly limit: 90;
        readonly windowMs: 60000;
    };
    SELF_DIRECTED_LEARNING_LIST: {
        readonly limit: 120;
        readonly windowMs: 60000;
    };
    SELF_DIRECTED_LEARNING_STUDENT: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    SELF_DIRECTED_LEARNING_STAFF: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SELF_DIRECTED_LEARNING_ADMIN: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    LOGIN: {
        readonly limit: 10;
        readonly windowMs: 60000;
    };
    LOGIN_ACCOUNT: {
        readonly limit: 30;
        readonly windowMs: number;
    };
    GOOGLE: {
        readonly limit: 10;
        readonly windowMs: 60000;
    };
    CHANGE_PASSWORD: {
        readonly limit: 10;
        readonly windowMs: 60000;
    };
    FORGOT_PASSWORD: {
        readonly limit: 5;
        readonly windowMs: 60000;
    };
    FORGOT_PASSWORD_EMAIL: {
        readonly limit: 3;
        readonly windowMs: number;
    };
    RESET_PASSWORD: {
        readonly limit: 10;
        readonly windowMs: 60000;
    };
    RESET_PASSWORD_FAIL: {
        readonly limit: 10;
        readonly windowMs: number;
    };
    KEEPALIVE: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    LOGOUT: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    SETTINGS_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ADMIN_CREATE: {
        readonly limit: 5;
        readonly windowMs: number;
    };
    ADMIN_CREATE_STATUS: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    ADMIN_LIST: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ADMIN_MUTATE: {
        readonly limit: 10;
        readonly windowMs: number;
    };
    ADMIN_ACTIVITY: {
        readonly limit: 120;
        readonly windowMs: 60000;
    };
    LEADERBOARD_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    LEADERBOARD_POST: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    TWO_FA_RESEND: {
        readonly limit: 5;
        readonly windowMs: number;
    };
    TWO_FA_VERIFY: {
        readonly limit: 20;
        readonly windowMs: number;
    };
    TWO_FA_STATUS: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ROLE_CHOICE: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    SWITCH_ROLE: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    ACCOUNT_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ACCOUNT_CHECK: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ACCOUNT_UPDATE: {
        readonly limit: 10;
        readonly windowMs: 60000;
    };
    TWO_FACTOR_SET: {
        readonly limit: 10;
        readonly windowMs: 60000;
    };
    ACCOUNTS_LIST: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ACCOUNTS_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    ACCOUNTS_BATCH: {
        readonly limit: 60;
        readonly windowMs: number;
    };
    ROSTER_LIST: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ROSTER_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    ROSTER_BATCH: {
        readonly limit: 10;
        readonly windowMs: number;
    };
    ROLE_SETTINGS_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ROLE_SETTINGS_MUTATE: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    SCHOOL_ORG_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SCHOOL_ORG_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    SCHOOL_PROFILE_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SCHOOL_PROFILE_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    SCHOOL_SEMESTERS_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SCHOOL_SEMESTERS_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    SCHOOL_CLASSES_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SCHOOL_CLASSES_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    SCHOOL_CODES_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SCHOOL_CODES_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    SCHOOL_SPACES_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SCHOOL_SPACES_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    SCHOOL_PERIODS_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    SCHOOL_PERIODS_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    CLASSES_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    FEATURE_MODULES_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    FEATURE_MODULES_MUTATE: {
        readonly limit: 120;
        readonly windowMs: 60000;
    };
    THEME_MARKET_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    THEME_MARKET_MUTATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    MARKET_THEME_GET: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    ME_THEME_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ME_THEME_MUTATE: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    THEME_MARKET_PUBLISH: {
        readonly limit: 10;
        readonly windowMs: 60000;
    };
    THEME_MARKET_SUBMIT: {
        readonly limit: 5;
        readonly windowMs: number;
    };
    ADMIN_USAGE_GET: {
        readonly limit: 30;
        readonly windowMs: 60000;
    };
    ANNOUNCEMENTS_ADMIN_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ANNOUNCEMENTS_ADMIN_MUTATE: {
        readonly limit: 40;
        readonly windowMs: 60000;
    };
    ANNOUNCEMENTS_INBOX: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    ANNOUNCEMENTS_STAFF_POST: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    CALENDAR_ADMIN_GET: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    CALENDAR_ADMIN_MUTATE: {
        readonly limit: 40;
        readonly windowMs: 60000;
    };
    CALENDAR_BATCH: {
        readonly limit: 12;
        readonly windowMs: number;
    };
    CALENDAR_LIST: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
    CALENDAR_STAFF_CREATE: {
        readonly limit: 20;
        readonly windowMs: 60000;
    };
    CALENDAR_SURFACE: {
        readonly limit: 60;
        readonly windowMs: 60000;
    };
};
