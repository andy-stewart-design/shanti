// Observer types
export type RefNode = Element | null;
export type RefCallback = (node: RefNode) => void;
export type RootNode = Element | Document | null;
export type RootCallback = (node: RootNode) => void;

// useResizeObserver + useWindowSize
export interface Size {
  width: number | undefined;
  height: number | undefined;
}
