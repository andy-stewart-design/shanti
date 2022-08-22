import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Nav from "/components/global/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Nav></Nav>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
