import Head from "next/head";
import Container from "components/global/Container";
// import { MouseEventHandler, useState } from "react";
// import useDelayedRender from "use-delayed-render";
// import clsx from "clsx";

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

// const TestButton = ({
//   callback,
// }: {
//   callback: MouseEventHandler<HTMLButtonElement>;
// }) => {
//   console.log("The button was rendered");

//   return (
//     <button onClick={callback} className="py-2 px-3 bg-blue-600">
//       Open Modal
//     </button>
//   );
// };

// const TestModal = ({
//   callback,
//   isModalActive,
// }: {
//   callback: MouseEventHandler<HTMLDivElement>;
//   isModalActive: boolean;
// }) => {
//   console.log("The modal was rendered");

//   const { mounted, rendered } = useDelayedRender(isModalActive, {
//     enterDelay: 500,
//     exitDelay: 1000,
//   });

//   const testStyles = clsx(
//     "w-10 h-10 bg-green-600",
//     rendered && "bg-yellow-600",
//     mounted && !isModalActive && "bg-purple-600"
//   );

//   if (!mounted) return null;

//   return (
//     <div
//       onClick={callback}
//       className="fixed top-0 left-0 w-screen h-screen z-50 bg-blue-800/80"
//     >
//       <p>{`isModalActive: ${isModalActive ? "true" : false}`}</p>
//       <p>{`mounted: ${mounted ? "true" : false}`}</p>
//       <p>{`rendered: ${rendered ? "true" : false}`}</p>
//       <div className={testStyles}></div>
//     </div>
//   );
// };

export default About;
