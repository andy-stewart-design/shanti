// Hook with Ref Example: https://gist.github.com/thebuilder/fb07c989093d4a82811625de361884e7

import { useCallback, useEffect, useRef, useState } from "react";
import { RefNode, RefCallback, RootNode, RootCallback } from "types/hooks";

type Props = {
  rootMargin?: string;
  threshold?: number | number[];
};

export type ReturnValue = [
  RefCallback,
  {
    entry: IntersectionObserverEntry | undefined;
    setRoot: RootCallback;
  }
];

function useIntersectionObserver({
  rootMargin = "0px",
  threshold = [0],
}: Props = {}): ReturnValue {
  const nodeRef = useRef<RefNode>(null);
  const rootRef = useRef<RootNode>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const setRef = useCallback<RefCallback>((node) => {
    nodeRef.current = node;
  }, []);

  const setRoot = useCallback<RootCallback>((rootNode) => {
    rootRef.current = rootNode;
  }, []);

  const observe = useCallback(() => {
    const node = nodeRef.current;
    if (node) {
      const root = rootRef.current;
      const rootMargin = "0px";
      const threshold = [0];
      const options = { root, rootMargin, threshold };

      const observer = new IntersectionObserver(([newEntry]) => {
        setEntry(newEntry);
      }, options);
      observer.observe(node);
      observerRef.current = observer;
    }
  }, []);

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

  return [setRef, { entry, setRoot }];
}

export default useIntersectionObserver;
