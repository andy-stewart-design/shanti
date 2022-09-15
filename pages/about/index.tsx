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
  const controlPlayback = (e: MouseEvent) => {
    let video = e.target as HTMLVideoElement;
    if (video.paused) video.play();
    else video.pause();
  };

  const [videoRef] = useVideoAutoPlayback({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const modalStyles = clsx(
    "invisible fixed flex flex-col top-0 opacity-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-sm z-50 pointer-events-none transition-all duration-500 delay-500 ease-out-cubic",
    isExpanded && "visible-in opacity-100 pointer-events-auto delay-[0ms]"
  );
  const modalUiStyles = clsx(
    "flex justify-end -translate-y-full transition-transform duration-500 delay-0 ease-out-cubic",
    isExpanded && "-translate-y-0 delay-[300ms]"
  );
  const imgStyles = clsx(
    "w-[75vw] h-[75vw] bg-blue-500 scale-110 opacity-0 transform transition-all duration-500 delay-0 ease-out-cubic",
    isExpanded && "scale-to-100 opacity-100 delay-[300ms]"
  );

  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={modalStyles}>
        <div className={modalUiStyles}>
          <Container t="xs" b="xs">
            <button
              onClick={() => setIsExpanded(false)}
              className="w-10 h-10 rounded-full bg-blue-500"
              aria-expanded={isExpanded}
            ></button>
          </Container>
        </div>
        <div className="flex-center grow">
          <div className={imgStyles}></div>
        </div>
      </div>
      <main>
        <section className="flex-center size-screen">
          <Container className="flex flex-col items-center">
            <h1 className="font-black text-6xl">About Me</h1>
            <button
              onClick={() => setIsExpanded(true)}
              className="rounded-full bg-blue-500 p-6 py-3"
              aria-expanded={isExpanded}
            >
              {" "}
              Open Modal
            </button>
          </Container>
        </section>
        <section className="flex-center size-screen">
          <Container>
            <div>
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
                Sorry, your browser doesn&apos;t support embedded videos.
              </video>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

const useVideoAutoPlayback = (options: ioOptions) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const cb = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      videoRef.current!.play();
      videoRef.current!.style.border = "4px solid blue";
    } else {
      videoRef.current!.pause();
      videoRef.current!.style.border = "4px solid red";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(cb, options);
    const vid = videoRef.current;
    if (vid) observer.observe(vid);
    return () => {
      if (vid) observer.unobserve(vid);
    };
  }, [videoRef, options]);
  return [videoRef];
};

export default About;
