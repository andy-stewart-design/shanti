import Head from "next/head";
import Container from "components/global/Container";
import Wrapper from "components/global/Wrapper";

export default function Home() {
  return (
    <>
      <Head>
        <title>Andy Stewart: Design and Code</title>
        <meta name="description" content="Andy Stewart's Design Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="">
          <section className="w-screen h-screen">
            <Container t="base">
              <div className="w-full h-px bg-white/20"></div>
              <Wrapper t="base" b="none">
                <h1 className="font-medium text-3xl sm:text-5xl lg:text-6xl">
                  Andy Stewart designs future-focused visual systems — often for
                  screens, sometimes not. He is currently the Digital Creative
                  Director at Turnstyle.
                </h1>
              </Wrapper>
            </Container>
          </section>
          <Container>
            <div className="grid grid-cols-fit-sm sm:grid-cols-fit xl:grid-cols-fit-lg gap-4">
              <div className="bg-gray-800 p-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                in voluptas perferendis commodi iste.
              </div>
              <div className="bg-gray-800 p-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                in voluptas perferendis commodi iste, numquam amet maxime
                consequuntur. Tenetur fugit autem, laboriosam inventore ducimus
                rerum earum sit. Minima, sequi quod.
              </div>
              <div className="bg-gray-800 p-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                in voluptas perferendis commodi iste, numquam amet maxime
                consequuntur.
              </div>
              <div className="bg-gray-800 p-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                in voluptas perferendis commodi iste, numquam amet maxime
                consequuntur. Tenetur fugit autem, laboriosam inventore ducimus
                rerum earum.
              </div>
              <div className="bg-gray-800 p-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                in voluptas perferendis commodi iste.
              </div>
              <div className="bg-gray-800 p-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                in voluptas perferendis commodi iste, numquam amet maxime
                consequuntur. Tenetur fugit autem, laboriosam inventore ducimus
                rerum earum sit. Minima, sequi quod.
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
