import NextImage from "next/future/image";
import Video from "components/global/Video";
import type { ImageMetadata } from "types/feed";

interface CardProps {
  img: ImageMetadata;
  index: number;
  toggleModal: () => void;
}

const FeedCard = ({ img, index, toggleModal }: CardProps) => {
  return (
    <button
      onClick={toggleModal}
      className="group relative bg-black rounded-xl overflow-hidden"
    >
      {img.filetype === "mp4" ? (
        <Video
          src={`/img/feed/${img.slug}`}
          className="aspect-square"
          width="1080"
        />
      ) : (
        <NextImage
          src={`/img/feed/${img.slug}`}
          width="1000"
          height="1000"
          priority={index === 0 ? true : false}
          loading={index <= 2 ? "eager" : "lazy"}
          sizes="100vw, (max-width: 768px) 60vw"
          quality="80"
          alt={img.alt}
        />
      )}
      <div className="absolute bottom-2 right-2 flex-center w-10 h-10 bg-black/70 opacity-0 backdrop-blur-sm rounded-lg transition-opacity duration-300 ease-out-cubic group-hover:opacity-100 group-focus-visible:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          xmlSpace="preserve"
          className="w-5"
        >
          <path
            d="M18.7 2v6h-1.5V3.8l-4.7 4.7-1.1-1.1 4.7-4.7H12V1.2h6c.4 0 .7.4.7.8zM7.5 11.5l-4.7 4.7V12H1.2v6c0 .4.3.8.8.8h6v-1.5H3.8l4.7-4.7-1-1.1z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
};

export default FeedCard;
