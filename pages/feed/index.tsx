import { readdirSync } from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "components/global/Container";
import NextImage from "next/future/image";
import Wrapper from "components/global/Wrapper";

interface ImageData {
  slug: string;
  client: string | undefined;
  project: string | undefined;
  date: string | undefined;
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
          <Wrapper t="base" b="sm">
            <div className="grid md:grid-cols-2 gap-4">
              <h1 className="font-medium text-6xl leading-none tracking-wide uppercase">
                Design&nbsp;
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
          <div className="grid grid-cols-fit-sm xs:grid-cols-fit md:grid-cols-fit-lg lg:grid-cols-fit-xl gap-x-4 gap-y-8">
            {images.map((img) => (
              <div key={img.slug} className="flex flex-col gap-3">
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <NextImage
                    src={`/img/feed/${img.slug}`}
                    width="1000"
                    height="1000"
                    sizes="50vw"
                    quality="60"
                    alt="Feed image"
                  ></NextImage>
                  {/* <div className="absolute bottom-0 left-0 grid grid-cols-2 w-full py-2 px-3 bg-black/60">
                  <p className="font-mono text-sm text-white">{img.client}</p>
                  <p className="font-mono text-sm text-white">{img.project}</p>
                </div> */}
                </div>
                <div className="grid grid-cols-2 w-full">
                  <p className="font-mono text-sm text-white/70">
                    {img.client}
                  </p>
                  <p className="font-mono text-sm text-white/70">
                    {img.project}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const postsDir = join(process.cwd(), "public/img/feed");
  const imageFiles = readdirSync(postsDir);

  const getImageInfo = (array: string[]) => {
    const imageData = array.map((slug) => {
      const projectInfo = slug.replace(".jpg", "").split("_");
      const metaArray = projectInfo.map((info, index) => {
        const metaTags = ["project", "client", "date"];
        let projectFormatted: string;
        if (index <= 1)
          projectFormatted = info.replace("-", " ").replace("'", "’");
        else projectFormatted = info;
        return [metaTags[index], projectFormatted];
      });
      const metadata = Object.fromEntries(metaArray);

      return { slug, ...metadata };
    });
    const imageDataSorted = imageData.sort(function (a, b) {
      return Date.parse(b.date) - Date.parse(a.date);
    });
    return imageDataSorted;
  };

  return { props: { images: getImageInfo(imageFiles) } };
};

export default Feed;
