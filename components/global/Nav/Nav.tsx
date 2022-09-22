// TODO: Abstract focus trap into custom hook
// TODO: prevent links from working if pathname of page === pathname of URL
// ↘ https://nextjs.org/docs/api-reference/next/router#userouter
// ↘ https://developer.mozilla.org/en-US/docs/Web/API/URL/URL

import Container from "components/global/Container";
import AndyLogo from "components/global/Nav/AndyLogo";
import MobileMenu from "components/global/Nav/MobileMenu";
import type { NavLinks } from "types/nav";
import useIntersectionObserver from "lib/useIntersectionObserver";

const Nav = () => {
  const [scrollObserverRef, { entry }] = useIntersectionObserver();
  console.log("nav rendered");

  const links: NavLinks[] = [
    { href: "/feed", text: "Feed" },
    { href: "/snippets", text: "Snippets" },
    { href: "/about", text: "About" },
  ];

  return (
    <>
      <div
        ref={scrollObserverRef}
        className="absolute top-0 left-0 w-screen h-96 invisible opacity-0 pointer-events-none"
      ></div>
      <nav className="absolute top-0 left-0 w-screen z-50">
        <Container t="xs" b="xs">
          <div className="flex w-full">
            <AndyLogo />
            <MobileMenu
              links={links}
              hasScrolled={
                entry?.intersectionRatio! <= 0 && !entry?.isIntersecting
              }
            />
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Nav;
