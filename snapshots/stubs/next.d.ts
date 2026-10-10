/** 影子 tsc 樁：next 相關（寬鬆型別；完整驗證以宿主 tsc 為準） */
declare module "next/server" {
  export type NextRequest = {
    nextUrl: { pathname: string; searchParams: URLSearchParams };
    url: string;
    method: string;
    headers: Headers;
    cookies: { get(name: string): { value: string } | undefined };
    json(): Promise<unknown>;
    text(): Promise<string>;
  };
  export class NextResponse {
    static json(data: unknown, init?: { status?: number; headers?: Record<string, string> }): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
    status: number;
    headers: Headers;
  }
}

declare module "next/navigation" {
  export function useRouter(): {
    push(href: string): void;
    replace(href: string): void;
    refresh(): void;
    back(): void;
  };
  export function useSearchParams(): URLSearchParams;
  export function useParams(): Record<string, string | string[]>;
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

declare module "server-only" {
  export {};
}
