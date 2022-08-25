// TODO: Fix Typescript

import { readdirSync } from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "components/global/Container";
import NextImage from "next/future/image";

interface Images {
  slug: string;
  client: string | undefined;
  project: string | undefined;
}

interface FeedProps {
  images: Images;
}

const Feed = ({ images }: any) => {
  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container t="xl">
          <div className="grid grid-cols-fit-sm sm:grid-cols-fit xl:grid-cols-fit-lg gap-4">
            {images.map((img: Images) => (
              <div
                key={img.slug}
                className="relative bg-black rounded-xl overflow-hidden"
              >
                <NextImage
                  src={`/img/feed/${img.slug}`}
                  width="1000"
                  height="1000"
                  sizes="50vw"
                  quality="60"
                  alt="Feed image"
                ></NextImage>
                <div className="absolute bottom-0 left-0 grid grid-cols-2 w-full py-2 px-3 bg-gradient-to-t from-black/50 to-black/0">
                  <p>{img.client}</p>
                  <p>{img.project}</p>
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
  const images = readdirSync(postsDir);

  const getImageInfo = (array: string[]) => {
    return array.map((slug) => {
      const client = slug.match(/(?<=\().+?(?=\))/g);
      const projectType = slug.match(/(?<=\[).+?(?=\])/g);

      return {
        slug,
        project: projectType?.toString().replace("-", " "),
        client: client?.toString().replace("-", " "),
      };
    });
  };

  return { props: { images: getImageInfo(images) } };
};

export default Feed;
