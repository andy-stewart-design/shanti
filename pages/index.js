import Head from "next/head";
import NextImage from "next/future/image";
import Container from "/components/global/Container";
import image from "/public/img/fpo-02.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="flex-center size-screen">
          <Container>
            <h1 className="font-black text-6xl">Foo Bar</h1>
          </Container>
        </section>
      </main>
    </>
  );
}
