/** 影子 tsc 全域註解：JSX（寬鬆）＋React 命名空間＋process（伺服器路由用） */
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
  /** JSX 元素通用屬性（自訂元件也適用 key） */
  interface IntrinsicAttributes {
    key?: string | number;
  }
  interface Element {}
  interface ElementClass {}
}

declare namespace React {
  type ReactNode = unknown;
  type CSSProperties = Record<string, string | number | undefined>;
  interface FormEvent<T = unknown> {
    preventDefault(): void;
    currentTarget: T;
    target: unknown;
  }
  interface ChangeEvent<T = unknown> {
    target: T;
  }
}

declare const process: { env: Record<string, string | undefined> };
