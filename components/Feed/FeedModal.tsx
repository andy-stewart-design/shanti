import { useEffect, useRef, useState } from "react";
import NextImage from "next/future/image";
import Container from "components/global/Container";
import Video from "components/global/Video";
import ArrowButton from "components/global/Buttons/ArrowButton";
import clsx from "clsx";
import type { ImageMetadata } from "types/feed";

interface ModalProps {
  images: ImageMetadata[];
  activeImage: number;
  isModalActive: boolean | undefined;
  toggleModal: () => void;
  incActiveImage: () => void;
  decActiveImage: () => void;
}

const FeedModal = ({
  images,
  activeImage,
  isModalActive,
  toggleModal,
  incActiveImage,
  decActiveImage,
}: ModalProps) => {
  const modalContainer = useRef<HTMLDivElement>(null);

  const containerStyle = clsx(
    "invisible fixed top-0 left-0 flex flex-col w-screen h-screen bg-gray-300/90 dark:bg-black/90 backdrop-blur-sm opacity-0  transition-visop duration-500 delay-500 ease-out-cubic z-50 pointer-events-none",
    isModalActive && "visible-in opacity-to-100 pointer-events-auto delay-to-0"
  );
  const imageStyle = clsx(
    "relative grow pointer-events-none opacity-0 scale-110 transition-trop duration-500 delay-0 ease-out-cubic",
    isModalActive && "scale-to-100 opacity-to-100 delay-to-400"
  );

  useEffect(() => {
    if (!isModalActive || !modalContainer.current) return;

    const modalEl = modalContainer.current;
    const focusableEls: NodeListOf<HTMLElement> =
      modalEl.querySelectorAll("button");
    let firstFocusableEl: HTMLElement, lastFocusableEl: HTMLElement;

    if (focusableEls) {
      firstFocusableEl = focusableEls[0];
      lastFocusableEl = focusableEls[focusableEls.length - 1];
      lastFocusableEl.focus();
    } else throw new Error("No focusable elements found");

    const handleClick = (e: KeyboardEvent) => {
      console.log(focusableEls);
      if (
        e.key !== "Tab" &&
        e.key !== "Escape" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight"
      )
        return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else if (e.key === "Escape") {
        toggleModal();
      } else if (e.key === "ArrowLeft") {
        decActiveImage();
      } else if (e.key === "ArrowRight") {
        incActiveImage();
      } else {
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    };

    modalEl.addEventListener("keydown", handleClick);

    return () => modalEl.removeEventListener("keydown", handleClick);
  }, [isModalActive, toggleModal, incActiveImage, decActiveImage]);

  return (
    <>
      <div ref={modalContainer} className={containerStyle}>
        <Container className="relative flex z-10" t="xs" b="xs">
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
        <div className={imageStyle}>
          {images[activeImage].filetype === "mp4" ? (
            <Video
              src={`/img/feed/${images[activeImage].slug}`}
              className="absolute top-0 left-0 w-full h-full object-contain p-2"
              width="1080"
            />
          ) : (
            <NextImage
              src={`/img/feed/${images[activeImage].slug}`}
              className="object-contain p-2"
              fill={true}
              sizes="100vw, (max-width: 768px) 60vw"
              quality="80"
              alt={images[activeImage].alt}
            ></NextImage>
          )}
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
    </>
  );
};

export default FeedModal;
