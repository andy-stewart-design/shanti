import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "components/global/Nav";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Nav></Nav>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
