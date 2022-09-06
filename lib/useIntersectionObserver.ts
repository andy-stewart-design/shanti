import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_ROOT_MARGIN = "0px";
const DEFAULT_THRESHOLD = [0];

export type Props = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};
export type RefNode = Element | null;
export type RefCallback = (node: RefNode) => void;
export type RootNode = Props["root"];
export type RootCallback = (node: RootNode) => void;
export type ReturnValue = [
  RefCallback,
  {
    entry: IntersectionObserverEntry | undefined;
    rootRef: RootCallback;
  }
];

function useIntersectionObserver(props?: Props): ReturnValue {
  const rootMargin = props?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const threshold = props?.threshold ?? DEFAULT_THRESHOLD;

  const nodeRef = useRef<RefNode>(null);
  const rootRef = useRef<RootNode>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const refCallback = useCallback<RefCallback>((node) => {
    nodeRef.current = node;
  }, []);

  const rootCallback = useCallback<RootCallback>((rootNode) => {
    rootRef.current = rootNode;
  }, []);

  const observe = useCallback(() => {
    const node = nodeRef.current;
    if (node) {
      const root = rootRef.current;
      const options = { root, rootMargin, threshold };

      const observer = new IntersectionObserver(([newEntry]) => {
        setEntry(newEntry);
      }, options);
      observer.observe(node);
      observerRef.current = observer;
    }
  }, [rootMargin, threshold]);

  const unobserve = useCallback(() => {
    const currentObserver = observerRef.current;
    currentObserver?.disconnect();
    observerRef.current = null;
  }, []);

  useEffect(() => {
    unobserve();
    observe();
    return () => {
      unobserve();
    };
  }, [observe, unobserve]);

  return [refCallback, { entry, rootRef: rootCallback }];
}

export default useIntersectionObserver;
