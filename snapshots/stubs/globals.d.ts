/** 影子 tsc 全域樁：JSX（寬鬆）＋React 命名空間＋Node 常用全域 */
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: {
      [key: string]: any;
      children?: any;
      ref?: any;
      onChange?: (event: any) => void;
      onInput?: (event: any) => void;
      onClick?: (event: any) => void;
      onSubmit?: (event: any) => void;
      onToggle?: (event: any) => void;
      onCancel?: (event: any) => void;
      onClose?: (event: any) => void;
      onConfirm?: (event: any) => void;
      onBlur?: (event: any) => void;
      onFocus?: (event: any) => void;
      onKeyDown?: (event: any) => void;
      onKeyUp?: (event: any) => void;
      onMouseDown?: (event: any) => void;
      onMouseUp?: (event: any) => void;
      onDragOver?: (event: any) => void;
      onDrop?: (event: any) => void;
      onLoad?: (event: any) => void;
      onError?: (event: any) => void;
    };
  }
  interface IntrinsicAttributes {
    key?: string | number;
    ref?: ((element: any) => void) | { current: any };
  }
  interface Element {}
  interface ElementClass {}
}

declare namespace React {
  type ReactNode = any;
  type ReactElement = any;
  type CSSProperties = Record<string, string | number | undefined>;
  type ComponentProps<T = unknown> = any;
  type PropsWithChildren<P = unknown> = P & { children?: ReactNode };
  type Dispatch<A> = (value: A) => void;
  type SetStateAction<S> = S | ((prev: S) => S);
  type RefObject<T> = { current: T | null };
  type MutableRefObject<T> = { current: T };
  type FC<P = Record<string, unknown>> = (props: P) => ReactNode;
  type FunctionComponent<P = Record<string, unknown>> = (props: P) => ReactNode;
  type Context<T> = { Provider: any; Consumer: any };
  type SyntheticEvent<T = any> = {
    preventDefault(): void;
    stopPropagation(): void;
    currentTarget: T;
    target: any;
    nativeEvent: any;
  };
  type FormEvent<T = any> = SyntheticEvent<T>;
  type ChangeEvent<T = any> = SyntheticEvent<T> & { target: T };
  type MouseEvent<T = any> = SyntheticEvent<T>;
  type PointerEvent<T = any> = SyntheticEvent<T>;
  type FocusEvent<T = any> = SyntheticEvent<T>;
  type DragEvent<T = any> = SyntheticEvent<T>;
  type ClipboardEvent<T = any> = SyntheticEvent<T> & { clipboardData: any };
  type KeyboardEvent<T = any> = SyntheticEvent<T> & {
    key: string;
    code: string;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
  };
  type HTMLAttributes<T = any> = Record<string, any>;
  type ButtonHTMLAttributes<T = any> = Record<string, any>;
  type InputHTMLAttributes<T = any> = Record<string, any>;
  type TextareaHTMLAttributes<T = any> = Record<string, any>;
  type SelectHTMLAttributes<T = any> = Record<string, any>;
  type TableHTMLAttributes<T = any> = Record<string, any>;
  type TdHTMLAttributes<T = any> = Record<string, any>;
  type ThHTMLAttributes<T = any> = Record<string, any>;
  type AriaAttributes = Record<string, any>;
}

declare const process: {
  env: Record<string, string | undefined>;
  argv: string[];
  platform: string;
  versions: Record<string, string>;
  cwd(): string;
  exit(code?: number): never;
};

declare type Buffer = any;
declare const Buffer: any;
declare const global: any;
declare const __dirname: string;
declare const __filename: string;

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
  }
}
