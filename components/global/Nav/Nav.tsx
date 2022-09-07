// TODO: prevent links from working if pathname of page === pathname of URL
// https://developer.mozilla.org/en-US/docs/Web/API/URL/URL

import { useRef } from "react";
import Container from "components/global/Container";
import AndyLogo from "components/global/Nav/AndyLogo";
import MobileMenu from "components/global/Nav/MobileMenu";
import DesktopMenu from "components/global/Nav/DesktopMenu";
import { useWindowSize } from "lib/useWindowSize";
import type { NavLinks } from "types/nav";
import useIntersectionObserver from "lib/useIntersectionObserver";
import clsx from "clsx";

const Nav = () => {
  const window = useWindowSize();
  const [scrollObserverRef, { entry }] = useIntersectionObserver({});
  const FPO = useRef(null);

  const links: NavLinks[] = [
    { href: "/feed", text: "Feed" },
    { href: "/snippets", text: "Snippets" },
    { href: "/about", text: "About" },
  ];
  const bgStyles = clsx(
    "fixed top-0 left-0 w-full h-18 bg-gray-900/80 border-b border-gray-100/20 opacity-0 z-50 backdrop-blur-sm transition-opacity  duration-200",
    !entry?.isIntersecting && "opacity-100"
  );

  return (
    <>
      <div
        ref={scrollObserverRef}
        className="absolute top-0 left-0 w-screen h-24 invisible opacity-0 pointer-events-none"
      ></div>
      <div className={bgStyles}></div>
      <nav className="fixed top-0 left-0 w-screen z-50">
        <Container t="xs" b="xs">
          <div ref={FPO} className="flex w-full">
            <AndyLogo />
            {window.width && window.width < 769 && <MobileMenu links={links} />}
            {window.width && window.width >= 769 && (
              <DesktopMenu links={links} />
            )}
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Nav;
