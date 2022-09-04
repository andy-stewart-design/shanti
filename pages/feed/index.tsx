import { readdirSync } from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "components/global/Container";
import NextImage from "next/future/image";
import Wrapper from "components/global/Wrapper";
import { useState } from "react";
import clsx from "clsx";

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

const Feed = ({ images }: FeedProps) => {
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
            {images.map((img) => (
              <div key={img.slug} className="flex flex-col gap-3">
                <FeedCard img={img} />
              </div>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
};

const FeedCard = ({ img }: { img: ImageData }) => {
  const [isInfoActive, setIsInfoActive] = useState<boolean>(false);
  const wrapperClasses = clsx(
    "absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur opacity-0 transition-opacity duration-500 ease-out-expo",
    isInfoActive && "opacity-100"
  );
  const infoClasses = clsx(
    "flex flex-col gap-2 w-full py-4 px-3 transform translate-y-full transition-transform duration-500 delay-200 ease-out-expo",
    isInfoActive && "translate-y-0"
  );
  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <NextImage
        src={`/img/feed/${img.slug}`}
        width="1000"
        height="1000"
        loading="lazy"
        sizes="50vw"
        quality="60"
        alt={img.alt}
      ></NextImage>
      <div className={wrapperClasses}>
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
      </button>
    </div>
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
