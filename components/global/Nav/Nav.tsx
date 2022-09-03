// TODO: prevent links from working if pathname of page === pathname of URL
// https://developer.mozilla.org/en-US/docs/Web/API/URL/URL

import Link from "next/link";
import Container from "components/global/Container";
import MobileMenu from "components/global/Nav/MobileMenu";
import { useWindowSize } from "lib/useWindowSize";
import { NavLinks } from "types/nav";
import DesktopMenu from "components/global/Nav/DesktopMenu";

const Nav = () => {
  const links: NavLinks[] = [
    { href: "/feed", text: "Feed" },
    { href: "/snippets", text: "Snippets" },
    { href: "/about", text: "About" },
  ];

  const wndw = useWindowSize();

  return (
    <nav className="fixed top-0 left-0 w-screen z-50">
      <Container t="xs">
        <div className="flex w-full">
          <AndyLogo />
          {wndw.width && wndw.width < 769 ? (
            <MobileMenu links={links} />
          ) : (
            <DesktopMenu links={links} />
          )}
        </div>
      </Container>
    </nav>
  );
};

const AndyLogo = () => {
  return (
    <Link href="/">
      <a className="relative z-10">
        <div className="relative w-10 p-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            xmlSpace="preserve"
            className=""
          >
            <path
              d="M17.837 1.12C9.125 2.082 2.082 9.125 1.12 17.837-.13 29.151 8.565 38.749 19.567 38.995c.275.006.543-.105.738-.3l7.268-7.268c.158-.158.046-.427-.177-.427H10c-.552 0-1-.448-1-1V10c0-.552.448-1 1-1h20c.552 0 1 .448 1 1v28.5c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5V20C39 8.794 29.299-.146 17.837 1.12z"
              fill="currentColor"
            />
          </svg>
        </div>
      </a>
    </Link>
  );
};

export default Nav;
