/** 影子 tsc 樁：react（市集端無 node_modules；宿主端 lint 才是型別最終判定） */
declare module "react" {
  export type ReactNode = unknown;
  export type CSSProperties = Record<string, string | number | undefined>;
  export type FormEvent<T = unknown> = { preventDefault(): void; currentTarget: T; target: unknown };
  export type ChangeEvent<T = unknown> = { target: T };
  export function useState<T>(initial: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps?: unknown[]): T;
  export function useCallback<T extends (...args: never[]) => unknown>(fn: T, deps?: unknown[]): T;
  export function useRef<T>(initial: T | null): { current: T | null };
  const React: { createElement: (...args: unknown[]) => unknown };
  export default React;
}

declare module "react/jsx-runtime" {
  export function jsx(...args: unknown[]): unknown;
  export function jsxs(...args: unknown[]): unknown;
  export const Fragment: unknown;
}

declare module "react-dom" {
  const x: unknown;
  export default x;
}
