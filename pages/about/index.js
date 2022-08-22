import Head from "next/head";
import Container from "/components/global/Container";

const About = () => {
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
            <h1 className="font-black text-6xl">About Me</h1>
          </Container>
        </section>
      </main>
    </>
  );
};

export default About;
