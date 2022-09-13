import { readdirSync } from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "components/global/Container";
import NextImage from "next/future/image";
import Wrapper from "components/global/Wrapper";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import clsx from "clsx";
import useDelayedRender from "use-delayed-render";
import ArrowButton from "components/global/Buttons/ArrowButton";

interface ImageData {
  slug: string;
  client: string | undefined;
  project: string | undefined;
  date: string | undefined;
  year: string | undefined;
  alt: string | undefined;
}

interface FeedProps {
  images: ImageData[];
}

interface ModalProps {
  isModalActive: boolean | undefined;
  images: ImageData[];
  activeImage: number;
  setActiveImage: Dispatch<SetStateAction<number>>;
  toggleModal: () => void;
}

const Feed = ({ images }: FeedProps) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = useCallback(() => {
    if (isModalActive) {
      setIsModalActive(false);
      document.body.style.overflow = "";
    } else {
      setIsModalActive(true);
      document.body.style.overflow = "hidden";
    }
  }, [isModalActive]);

  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container t="base">
          <div className="w-full h-px bg-gray-900/20 dark:bg-white/20"></div>
          <Wrapper t="lg" b="base">
            <div className="grid md:grid-cols-2 gap-4">
              <h1 className="font-medium text-6xl leading-none tracking-wide uppercase">
                Design
                <span className="inline-block md:hidden">&nbsp;</span>
                <br className="hidden md:block" />
                Feed
              </h1>
              <p className="lg:text-lg leading-relaxed max-w-2xl">
                The active image is {activeImage}. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Suscipit, autem molestias dolorem
                consequatur necessitatibus dignissimos laborum illo eius alias,
                libero commodi soluta! Aliquid tenetur vero aliquam corrupti
                ipsum laudantium animi?
              </p>
            </div>
          </Wrapper>
          <div className="grid grid-cols-fit-sm xs:grid-cols-fit md:grid-cols-fit-lg lg:grid-cols-fit-xl gap-4">
            {images.map((img, index) => (
              // <div
              //   onClick={() => {
              //     setActiveImage(index);
              //     toggleModal();
              //   }}
              // >
              <FeedCard
                key={img.slug}
                img={img}
                index={index}
                toggleModal={() => {
                  setActiveImage(index);
                  toggleModal();
                }}
              />
              // </div>
            ))}
          </div>
        </Container>
      </main>
      <FeedModal
        images={images}
        activeImage={activeImage}
        isModalActive={isModalActive}
        setActiveImage={setActiveImage}
        toggleModal={toggleModal}
      />
    </>
  );
};

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

const FeedCard = ({
  img,
  index,
  toggleModal,
}: {
  img: ImageData;
  index: number;
  toggleModal: () => void;
}) => {
  console.log(`Feed card ${index} rendered`);

  // const [isInfoActive, setIsInfoActive] = useState<boolean>(false);
  // const wrapperClasses = clsx(
  //   "absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur opacity-0 transition-opacity duration-500 ease-out-expo",
  //   isInfoActive && "opacity-100"
  // );
  // const infoClasses = clsx(
  //   "flex flex-col gap-2 w-full py-4 px-3 transform translate-y-full transition-transform duration-500 delay-200 ease-out-expo",
  //   isInfoActive && "translate-y-0"
  // );
  return (
    <button
      onClick={toggleModal}
      className="relative bg-black rounded-xl overflow-hidden"
    >
      <NextImage
        src={`/img/feed/${img.slug}`}
        width="1000"
        height="1000"
        priority={index === 0 ? true : false}
        loading={index <= 2 ? "eager" : "lazy"}
        sizes="100vw, (max-width: 768px) 60vw"
        quality="80"
        alt={img.alt}
      ></NextImage>
      {/* <div className={wrapperClasses}>
        <div className={infoClasses}>
          <p className="font-mono text-sm text-white">
            <span className="text-white/70">Client:</span> {img.client}
          </p>
          <p className="font-mono text-sm text-white">
            <span className="text-white/70">Type:</span> {img.project}
          </p>
          <p className="font-mono text-sm text-white">
            <span className="text-white/70">Year:</span> {img.year}
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsInfoActive(!isInfoActive)}
        className="absolute bottom-0 right-0 p-2"
      >
        <div className=" bg-black/40 text-white/80 hover:text-yellow-300 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              d="M12,0C5.4,0,0,5.4,0,12c0,6.6,5.4,12,12,12c6.6,0,12-5.4,12-12C24,5.4,18.6,0,12,0z M12,22C6.5,22,2,17.5,2,12
              C2,6.5,6.5,2,12,2c5.5,0,10,4.5,10,10C22,17.5,17.5,22,12,22z M13,16h2v2H9v-2h2v-4H9v-2h3c0.6,0,1,0.4,1,1V16z M10.5,7.5
              C10.5,6.7,11.2,6,12,6s1.5,0.7,1.5,1.5S12.8,9,12,9S10.5,8.3,10.5,7.5z"
            />
          </svg>
        </div>
      </button> */}
    </button>
  );
};

export const getStaticProps = async () => {
  const postsDir = join(process.cwd(), "public/img/feed");
  const imageFiles = readdirSync(postsDir);

  const filteredImageFiles = filterByFileType(imageFiles);

  return { props: { images: getImageInfo(filteredImageFiles) } };
};

const getImageInfo = (array: string[]) => {
  const imageData = array.map((slug) => {
    const projectInfo = slug.replace(/\..*$/, "").split("_"); //regex remves everything after .
    const metaArray = projectInfo.map((info, index) => {
      const metaTags = ["project", "client", "date"];
      let projectInfoFormatted: string;
      if (index <= 1)
        projectInfoFormatted = info.replace("-", " ").replace("'", "’");
      else projectInfoFormatted = info;
      return [metaTags[index], projectInfoFormatted];
    });
    const metadata = Object.fromEntries(metaArray);
    const article = checkProjectType(metadata.project) ? "An" : "A";
    const alt = `${article} ${metadata.project} for ${metadata.client}`;
    const year = metadata.date.split("-").shift();
    return { slug, ...metadata, year, alt };
  });

  const imageDataSorted = imageData.sort(function (a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
  });
  return imageDataSorted;
};

const filterByFileType = (files: string[]) => {
  return files.filter((file) => {
    const fileType = file.toLocaleLowerCase();
    const doesMatch =
      fileType.includes("jpg".toLocaleLowerCase()) ||
      fileType.includes("webp".toLocaleLowerCase()) ||
      fileType.includes("png".toLocaleLowerCase());
    if (doesMatch) return true;
  });
};

const checkProjectType = (projectType: string) => {
  if (
    projectType === "Identity" ||
    projectType === "Illustration" ||
    projectType === "Animation" ||
    projectType === "Icon Set"
  )
    return true;
};

export default Feed;
