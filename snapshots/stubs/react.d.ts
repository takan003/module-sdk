/**
 * 影子 tsc 樁：react（市集端無 node_modules；宿主端 lint 才是型別最終判定）
 * 原則是「抓得到用錯公開面（import 名、props 缺漏），而不是完整型別驗證」。
 */
declare module "react" {
  export type ReactNode = any;
  export type ReactElement<P = any, T = any> = any;
  export type CSSProperties = Record<string, string | number | undefined>;
  export type ComponentProps<T> = any;
  export type PropsWithChildren<P = unknown> = P & { children?: ReactNode };
  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prev: S) => S);
  export type RefObject<T> = { current: T | null };
  export type MutableRefObject<T> = { current: T };
  export type FC<P = Record<string, unknown>> = (props: P) => ReactNode;
  export type FunctionComponent<P = Record<string, unknown>> = (props: P) => ReactNode;
  export type Context<T> = { Provider: any; Consumer: any };
  export type SyntheticEvent<T = any> = {
    preventDefault(): void;
    stopPropagation(): void;
    currentTarget: T;
    target: any;
    nativeEvent: any;
  };
  export type FormEvent<T = any> = SyntheticEvent<T>;
  export type ChangeEvent<T = any> = SyntheticEvent<T> & { target: T };
  export type MouseEvent<T = any> = SyntheticEvent<T>;
  export type PointerEvent<T = any> = SyntheticEvent<T>;
  export type FocusEvent<T = any> = SyntheticEvent<T>;
  export type DragEvent<T = any> = SyntheticEvent<T>;
  export type ClipboardEvent<T = any> = SyntheticEvent<T> & { clipboardData: any };
  export type KeyboardEvent<T = any> = SyntheticEvent<T> & {
    key: string;
    code: string;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
  };
  export type HTMLAttributes<T = any> = Record<string, any>;
  export type ButtonHTMLAttributes<T = any> = Record<string, any>;
  export type InputHTMLAttributes<T = any> = Record<string, any>;
  export type TextareaHTMLAttributes<T = any> = Record<string, any>;
  export type SelectHTMLAttributes<T = any> = Record<string, any>;
  export type TableHTMLAttributes<T = any> = Record<string, any>;
  export type TdHTMLAttributes<T = any> = Record<string, any>;
  export type ThHTMLAttributes<T = any> = Record<string, any>;
  export type AriaAttributes = Record<string, any>;

  export function useState<T>(initial: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
  export function useState<T = undefined>(): [T | undefined, Dispatch<SetStateAction<T | undefined>>];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useLayoutEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps?: readonly unknown[]): T;
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps?: readonly unknown[]): T;
  export function useRef<T>(initial: T): MutableRefObject<T>;
  export function useRef<T>(initial: T | null): RefObject<T>;
  export function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  export function useContext<T>(context: Context<T>): T;
  export function useReducer<S, A>(
    reducer: (state: S, action: A) => S,
    initial: S
  ): [S, Dispatch<A>];
  export function useId(): string;
  export function useTransition(): [boolean, (fn: () => void) => void];
  export function useDeferredValue<T>(value: T): T;
  export function useSyncExternalStore<T>(
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => T,
    getServerSnapshot?: () => T
  ): T;
  export function useOptimistic<S>(state: S, update?: (state: S, action: S) => S): [S, (action: S) => void];
  export function startTransition(fn: () => void): void;
  export function createContext<T>(defaultValue: T): Context<T>;
  export function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: any) => ReactNode
  ): any;
  export function memo<T>(component: T, propsAreEqual?: (prev: any, next: any) => boolean): T;
  export function lazy<T>(factory: () => Promise<{ default: T }>): T;
  export function createElement(...args: any[]): any;

  export const Suspense: any;
  export const Fragment: any;
  export const StrictMode: any;
  export const Children: any;

  const React: any;
  export default React;
}

declare module "react/jsx-runtime" {
  export function jsx(...args: unknown[]): unknown;
  export function jsxs(...args: unknown[]): unknown;
  export const Fragment: unknown;
}

declare module "react/jsx-dev-runtime" {
  export function jsxDEV(...args: unknown[]): unknown;
  export const Fragment: unknown;
}

declare module "react-dom" {
  export function createPortal(...args: any[]): any;
  export function flushSync<T>(fn: () => T): T;
  const ReactDOM: any;
  export default ReactDOM;
}
