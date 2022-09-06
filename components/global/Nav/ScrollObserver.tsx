import useIntersectionObserver from "lib/useIntersectionObserver";
import { useEffect } from "react";

const ScrollObserver = () => {
  const [ref, { entry }] = useIntersectionObserver({});

  useEffect(() => {
    console.log(entry?.isIntersecting);
  }, [entry]);

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 w-screen h-24 bg-blue-600"
    ></div>
  );
};

export default ScrollObserver;
