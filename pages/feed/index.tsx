import { readdirSync } from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "components/global/Container";
import Wrapper from "components/global/Wrapper";
import { useCallback, useState } from "react";
import FeedCard from "components/Feed/FeedCard";
import FeedModal from "components/Feed/FeedModal";
import type { ImageMetadata } from "types/feed";

interface FeedProps {
  images: ImageMetadata[];
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

  const updateActiveImage = (index: number) => {
    setActiveImage(index);
    toggleModal();
  };

  const incActiveImage = useCallback(() => {
    if (activeImage >= images.length - 1) setActiveImage(0);
    else setActiveImage((index: number) => (index += 1));
  }, [activeImage, images, setActiveImage]);

  const decActiveImage = useCallback(() => {
    if (activeImage <= 0) setActiveImage(images.length - 1);
    else setActiveImage((index: number) => (index -= 1));
  }, [activeImage, images, setActiveImage]);

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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit, autem molestias dolorem consequatur necessitatibus
                dignissimos laborum illo eius alias, libero commodi soluta!
                Aliquid tenetur vero aliquam corrupti ipsum laudantium animi?
              </p>
            </div>
          </Wrapper>
          <div className="grid grid-cols-fit-sm xs:grid-cols-fit md:grid-cols-fit-lg lg:grid-cols-fit-xl gap-4">
            {images.map((img, index) => (
              <FeedCard
                key={img.slug}
                img={img}
                index={index}
                toggleModal={() => updateActiveImage(index)}
              />
            ))}
          </div>
        </Container>
      </main>
      <FeedModal
        images={images}
        activeImage={activeImage}
        isModalActive={isModalActive}
        incActiveImage={incActiveImage}
        decActiveImage={decActiveImage}
        toggleModal={toggleModal}
      />
    </>
  );
};

export const getStaticProps = async () => {
  const postsDir = join(process.cwd(), "public/img/feed");
  const imageFiles = readdirSync(postsDir);

  const filteredImageFiles = filterByFileType(imageFiles);

  return { props: { images: getMediaData(filteredImageFiles) } };
};

const getMediaData = (array: string[]) => {
  const mediaData = array.map((slug) => {
    const projectInfo = slug.replace(/\..*$/, "").split("_"); //regex removes everything after .
    const metaArray = projectInfo.map((info, index) => {
      const metaTags = ["project", "client", "date"];
      let projectInfoFormatted: string;
      if (index <= 1)
        projectInfoFormatted = info.replace("-", " ").replace("'", "???");
      else projectInfoFormatted = info;
      return [metaTags[index], projectInfoFormatted];
    });
    const filetype = slug.split(".").pop();
    const metadata = Object.fromEntries(metaArray);
    const article = checkProjectType(metadata.project) ? "An" : "A";
    const alt = `${article} ${metadata.project} for ${metadata.client}`;
    const year = metadata.date.split("-").shift();
    return { slug, filetype, ...metadata, year, alt };
  });

  const mediaDataSorted = mediaData.sort(function (a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
  });
  return mediaDataSorted;
};

const filterByFileType = (files: string[]) => {
  return files.filter((file) => {
    const fileType = file.toLocaleLowerCase();
    const doesMatch =
      fileType.includes("jpg".toLocaleLowerCase()) ||
      fileType.includes("webp".toLocaleLowerCase()) ||
      fileType.includes("mp4".toLocaleLowerCase()) ||
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
