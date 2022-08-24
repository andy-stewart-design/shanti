import fs from "fs";
import { join } from "path";
import Head from "next/head";
import Container from "components/global/Container";
import NextImage from "next/future/image";

const Feed = ({ images }) => {
  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container t="xl">
          {images.map((img) => (
            <p key={img}>{img}</p>
          ))}
          <div className="grid grid-cols-fit-sm sm:grid-cols-fit xl:grid-cols-fit-lg gap-4">
            <NextImage
              src="/img/feed/feed-0.jpeg"
              width="1920"
              height="1080"
              sizes="50vw"
              quality="60"
              alt="Feed image"
            ></NextImage>
            <NextImage
              src="/img/feed/feed-1.jpeg"
              width="1920"
              height="1080"
              sizes="50vw"
              quality="60"
              alt="Feed image"
            ></NextImage>
            <NextImage
              src="/img/feed/feed-2.jpeg"
              width="1920"
              height="1080"
              sizes="50vw"
              quality="60"
              alt="Feed image"
            ></NextImage>
            <NextImage
              src="/img/feed/feed-3.jpeg"
              width="1920"
              height="1080"
              sizes="50vw"
              quality="60"
              alt="Feed image"
            ></NextImage>
            <NextImage
              src="/img/feed/feed-4.jpeg"
              width="1920"
              height="1080"
              sizes="50vw"
              quality="60"
              alt="Feed image"
            ></NextImage>
            <NextImage
              src="/img/feed/feed-5.jpeg"
              width="1920"
              height="1080"
              sizes="50vw"
              quality="60"
              alt="Feed image"
            ></NextImage>
          </div>
        </Container>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const postsDir = join(process.cwd(), "public/img/feed");
  const images = fs.readdirSync(postsDir);
  console.log(images);

  return { props: { images } };
}

export default Feed;
