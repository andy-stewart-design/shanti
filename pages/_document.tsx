import { Html, Head, Main, NextScript } from "next/document";
import { ThemeProvider } from "next-themes";
import Nav from "components/global/Nav";

export default function Document() {
  return (
    <Html lang="en" className="antialiased">
      <Head>
        <link
          rel="preload"
          href="/fonts/AeonikPro-Roman-VF.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AeonikFono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      {/* <ThemeProvider attribute="class"> */}
      {/* <Nav></Nav> */}
      <body className="antialiased bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
      {/* </ThemeProvider> */}
    </Html>
  );
}
