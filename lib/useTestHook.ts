import { useCallback, useEffect, useRef } from "react";

export type RefNode = Element | null;
export type RefCallback = (node: RefNode) => void;

const useTestHook = () => {
  const nodeRef = useRef<RefNode>(null);

  const setNodeRef = useCallback<RefCallback>((node) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    const node = nodeRef.current;
    console.log("Hello from the test hook!");
    console.log(node);
  }, [nodeRef]);

  return [setNodeRef];
};

export default useTestHook;
