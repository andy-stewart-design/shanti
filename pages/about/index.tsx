// @ts-nocheck

import Head from "next/head";
import Container from "components/global/Container";
import { useRef, useEffect, MouseEvent } from "react";

const About = () => {
  const controlPlayback = (e: MouseEvent) => {
    let video = e.target as HTMLVideoElement;
    if (video.paused) video.play();
    else video.pause();
  };

  const [containerRef, videoRef] = useVideoAutoPlayback({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="flex-center size-screen">
          <Container>
            <h1 className="font-black text-6xl">About Me</h1>
          </Container>
        </section>
        <section className="flex-center size-screen">
          <Container>
            <div ref={containerRef}>
              <video
                ref={videoRef}
                onClick={controlPlayback}
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src="/img/Wildtype-Chopsticks-min.mp4"
                  type="video/mp4"
                />
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

const useVideoAutoPlayback = (options) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const cb = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      videoRef.current.play();
      videoRef.current.style.border = "4px solid blue";
    } else {
      videoRef.current.pause();
      videoRef.current.style.border = "4px solid red";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(cb, options);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);
  return [containerRef, videoRef];
};

export default About;
