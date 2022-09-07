import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { RefNode, RefCallback, Size } from "types/hooks";

export type ReturnValue = [RefCallback, Size];

const useResizeObserver = (callback: Function | null = null): ReturnValue => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const nodeRef = useRef<RefNode>(null);
  const refCallback = useCallback<RefCallback>((node) => {
    nodeRef.current = node;
  }, []);
  const [contentRect, setContentRect] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (nodeRef.current) {
      observerRef.current = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setContentRect({ width, height });
        if (callback) callback();
      });
      observerRef.current.observe(nodeRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [callback]);

  return [refCallback, contentRect];
};

export default useResizeObserver;
