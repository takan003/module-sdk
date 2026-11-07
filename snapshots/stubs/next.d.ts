/**
 * 影子 tsc 樁：next 相關（寬鬆型別；完整驗證以宿主 tsc 為準）
 * NextRequest 刻意 extend DOM Request，避免「傳給 Request 參數」時誤報。
 */
declare module "next/server" {
  export type NextRequest = Request & {
    nextUrl: URL & {
      pathname: string;
      search: string;
      searchParams: URLSearchParams;
      origin: string;
      host: string;
      href: string;
    };
    cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
      has(name: string): boolean;
      set(name: string, value: string, options?: Record<string, unknown>): void;
      delete(name: string): void;
    };
    geo?: Record<string, unknown>;
    ip?: string;
  };

  export class NextResponse extends Response {
    constructor(body?: BodyInit | null, init?: ResponseInit);
    static json(data: unknown, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static next(init?: Record<string, unknown>): NextResponse;
    readonly cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
      has(name: string): boolean;
      set(name: string, value: string, options?: Record<string, unknown>): void;
      delete(name: string): void;
    };
  }
}

declare module "next/navigation" {
  export function useRouter(): {
    push(href: string): void;
    replace(href: string): void;
    refresh(): void;
    back(): void;
    forward(): void;
    prefetch(href: string): void;
  };
  export function useSearchParams(): URLSearchParams;
  export function useParams(): Record<string, string | string[]>;
  export function usePathname(): string;
  export function redirect(url: string): never;
  export function notFound(): never;
}

declare module "next/link" {
  import type { ReactNode } from "react";
  export default function Link(props: {
    href: string;
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
  }): ReactNode;
}

declare module "next/image" {
  import type { ReactNode } from "react";
  export default function Image(props: Record<string, unknown>): ReactNode;
}

declare module "next/script" {
  import type { ReactNode } from "react";
  export default function Script(props: Record<string, unknown>): ReactNode;
}

declare module "next/headers" {
  export function headers(): Promise<Headers>;
  export function cookies(): Promise<{
    get(name: string): { name: string; value: string } | undefined;
    getAll(): Array<{ name: string; value: string }>;
    has(name: string): boolean;
    set(name: string, value: string, options?: Record<string, unknown>): void;
    delete(name: string): void;
  }>;
}

declare module "next/dynamic" {
  export default function dynamic(...args: any[]): any;
}

declare module "server-only" {
  export {};
}
