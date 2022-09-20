import { useEffect } from "react";
import useIntersectionObserver from "lib/useIntersectionObserver";

interface VideoProps {
  src: string;
  className?: string;
  width?: string;
  height?: string;
}

const Video = ({
  src,
  className = "",
  width = "1920",
  height = "1080",
}: VideoProps) => {
  const [scrollObserverRef, { entry }] = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!entry) return;
    const video = entry.target as HTMLVideoElement;
    console.log(entry.target);
    if (entry.isIntersecting) video.play();
    else video.pause();
  }, [entry]);

  return (
    <video
      ref={scrollObserverRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      width={width}
      height={height}
    >
      <source src={src} type="video/mp4" />
      Sorry, your browser doesn&apos;t support embedded videos.
    </video>
  );
};

export default Video;
