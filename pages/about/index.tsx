import Head from "next/head";
import Container from "components/global/Container";
import { useRef, useEffect, MouseEvent, useState } from "react";
import clsx from "clsx";

interface ioOptions {
  root: Element | null;
  rootMargin: string;
  threshold: number;
}

const About = () => {
  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="flex-center size-screen">
          <Container className="flex flex-col items-center">
            <h1 className="font-black text-6xl">About Me</h1>
          </Container>
        </section>
      </main>
    </>
  );
};

// const useVideoAutoPlayback = (options: ioOptions) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const cb = (entries: IntersectionObserverEntry[]) => {
//     const [entry] = entries;
//     if (entry.isIntersecting) {
//       videoRef.current!.play();
//       videoRef.current!.style.border = "4px solid blue";
//     } else {
//       videoRef.current!.pause();
//       videoRef.current!.style.border = "4px solid red";
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(cb, options);
//     const vid = videoRef.current;
//     if (vid) observer.observe(vid);
//     return () => {
//       if (vid) observer.unobserve(vid);
//     };
//   }, [videoRef, options]);
//   return [videoRef];
// };

export default About;
