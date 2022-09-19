import { useEffect } from "react";
import useIntersectionObserver from "lib/useIntersectionObserver";

interface VideoProps {
  src: string;
}

const Video = ({ src }: VideoProps) => {
  const [scrollObserverRef, { entry }] = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!entry) return;
    console.log(entry.target);

    const video = entry.target as HTMLVideoElement;
    console.log(entry.target);
    if (entry.isIntersecting) video.play();
    else video.pause();
  }, [entry]);

  return (
    <video
      ref={scrollObserverRef}
      autoPlay
      muted
      loop
      playsInline
      width="1080"
      height="1080"
    >
      <source src={src} type="video/mp4" />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  );
};

export default Video;
