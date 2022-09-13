import { Dispatch, SetStateAction } from "react";
import NextImage from "next/future/image";
import Container from "components/global/Container";
import ArrowButton from "components/global/Buttons/ArrowButton";
import useDelayedRender from "use-delayed-render";
import clsx from "clsx";
import type { ImageMetadata } from "types/feed";

interface ModalProps {
  isModalActive: boolean | undefined;
  images: ImageMetadata[];
  activeImage: number;
  setActiveImage: Dispatch<SetStateAction<number>>;
  toggleModal: () => void;
}

const FeedModal = ({
  images,
  activeImage,
  isModalActive,
  setActiveImage,
  toggleModal,
}: ModalProps) => {
  const incActiveImage = () => {
    if (activeImage >= images.length - 1) setActiveImage(0);
    else setActiveImage((index: number) => (index += 1));
  };

  const decActiveImage = () => {
    if (activeImage <= 0) setActiveImage(images.length - 1);
    else setActiveImage((index: number) => (index -= 1));
  };

  const { mounted, rendered } = useDelayedRender(isModalActive, {
    enterDelay: 20,
    exitDelay: 1000,
  });

  const containerStyle = clsx(
    "fixed top-0 left-0 flex flex-col w-screen h-screen bg-gray-300/90 dark:bg-black/90 backdrop-blur-sm opacity-0 transition-trop duration-1000 ease-out-expo z-50",
    rendered && "opacity-100",
    mounted && !isModalActive && "delay-500"
  );
  const imageStyle = clsx(
    "object-contain p-2 opacity-0 scale-110 transition-trop duration-1000 ease-out-expo delay-500",
    rendered && "opacity-100 scale-100",
    mounted && !isModalActive && "delay-[0ms] scale-90"
  );

  if (!mounted) return null;

  return (
    <div className={containerStyle}>
      <Container className="relative flex" t="xs" b="xs">
        <div className="relative flex justify-start items-start gap-x-2 grow md:absolute md:top-0 md:left-0 md:w-full md:h-screen md:justify-between md:items-center md:p-4 lg:px-8">
          <ArrowButton d="l" callback={decActiveImage}></ArrowButton>
          <ArrowButton d="r" callback={incActiveImage}></ArrowButton>
        </div>
        <div className="relative flex justify-end grow">
          <button
            onClick={toggleModal}
            className="flex-center w-10 h-10 border border-white/20 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="w-5"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M11.4,10l6.7,6.7l-1.4,1.4L10,11.4l-6.7,6.7l-1.4-1.4L8.6,10L1.9,3.3l1.4-1.4L10,8.6l6.7-6.7l1.4,1.4L11.4,10z"
              />
            </svg>
          </button>
        </div>
      </Container>
      <div className="relative grow pointer-events-none">
        <NextImage
          src={`/img/feed/${images[activeImage].slug}`}
          className={imageStyle}
          fill={true}
          loading="lazy"
          sizes="100vw, (max-width: 768px) 60vw"
          quality="80"
          alt={images[activeImage].alt}
        ></NextImage>
      </div>
      <div className="relative flex justify-center pt-2 p-8">
        <div className="flex gap-x-6 font-medium">
          <div className="flex flex-col md:flex-row text-center">
            <h4 className="text-sm md:text-base px-1 opacity-50">Client</h4>{" "}
            <h4 className="text-lg md:text-base px-1 ">
              {images[activeImage].client}
            </h4>
          </div>
          <div className="flex flex-col md:flex-row text-center">
            <h4 className="text-sm md:text-base px-1 opacity-50">Type</h4>{" "}
            <h4 className="text-lg md:text-base px-1 ">
              {images[activeImage].project}
            </h4>
          </div>
          <div className="flex flex-col md:flex-row text-center">
            <h4 className="text-sm md:text-base px-1 opacity-50">Year</h4>{" "}
            <h4 className="text-lg md:text-base px-1 ">
              {images[activeImage].year}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedModal;
