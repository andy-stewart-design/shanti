import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  rootMargin?: string;
  threshold?: number | number[];
}

export type RefNode = Element | null;
export type RefCallback = (node: RefNode) => void;

const useTestHook = ({ threshold = [0], rootMargin = "0px" }: Props = {}) => {
  // const observerRef = useRef<IntersectionObserver | null>(null);
  const nodeRef = useRef<RefNode>(null);
  const setNodeRef = useCallback<RefCallback>((node) => {
    nodeRef.current = node;
  }, []);

  const observe = useCallback(() => {
    const options = { rootMargin, threshold };
    console.log(options);
    return options;
  }, [rootMargin, threshold]);

  useEffect(() => {
    observe();
    console.log("From the use effect");
  }, [observe]);

  return [setNodeRef];
};

export default useTestHook;
