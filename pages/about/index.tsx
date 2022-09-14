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

  const btn = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded((boo) => !boo);
  };

  const navStyles = clsx("visible", isExpanded && "invisible");

  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav id="mainnav" className="absolute w-screen z-50 bg-black">
        <button
          ref={btn}
          onClick={handleClick}
          className="w-10 h-10 rounded-full bg-blue-500"
          aria-expanded={isExpanded}
        ></button>
        {isExpanded ? "true" : "false"}
        <ul className={navStyles}>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about-us" aria-current="page">
              About us
            </a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <main>
        <section className="flex-center size-screen">
          <Container>
            <h1 className="font-black text-6xl">About Me</h1>
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
