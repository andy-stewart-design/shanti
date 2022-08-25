import { readdirSync } from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "components/global/Container";
import NextImage from "next/future/image";

interface Props {
  images: string[];
}

const Feed = ({ images }: Props) => {
  console.log(images);
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
            {images.map((img) => (
              <div key={img} className="bg-black">
                <NextImage
                  src={`/img/feed/${img}`}
                  width="1000"
                  height="1000"
                  sizes="50vw"
                  quality="60"
                  alt="Feed image"
                ></NextImage>
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

  return { props: { images } };
};

export default Feed;
