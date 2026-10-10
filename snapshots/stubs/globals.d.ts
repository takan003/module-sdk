/** 影子 tsc 全域註解：JSX（寬鬆） */
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
  interface Element {}
  interface ElementClass {}
}
