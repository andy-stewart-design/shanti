import { RefObject, useCallback, useEffect, useRef, useState } from "react";

interface Props {}

export type RefNode = Element | null;
export type RefCallback = (node: RefNode) => void;

export interface ContentRect {
  width: number;
  height: number;
}

export type ReturnValue = [RefCallback, ContentRect];

const useResizeObserver = (
  target: RefObject<HTMLElement>,
  callback: Function | null = null
): ReturnValue => {
  const [contentRect, setContentRect] = useState<ContentRect>({
    width: 0,
    height: 0,
  });
  const observer = useRef<ResizeObserver | null>(null);

  const nodeRef = useRef<RefNode>(null);
  const refCallback = useCallback<RefCallback>((node) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    console.log(nodeRef.current);

    if (target.current) {
      observer.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setContentRect({ width, height });
        if (callback) callback();
      });
      observer.current.observe(target.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [target, callback]);

  return [refCallback, contentRect];
};

export default useResizeObserver;
