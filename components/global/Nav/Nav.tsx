// TODO: fade in bg behind nav on scroll
// TODO: prevent links from working if pathname of page === pathname of URL
// https://developer.mozilla.org/en-US/docs/Web/API/URL/URL

import Container from "components/global/Container";
import AndyLogo from "components/global/Nav/AndyLogo";
import MobileMenu from "components/global/Nav/MobileMenu";
import DesktopMenu from "components/global/Nav/DesktopMenu";
import { useWindowSize } from "lib/useWindowSize";
import type { NavLinks } from "types/nav";

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
          {wndw.width && wndw.width < 769 && <MobileMenu links={links} />}
          {wndw.width && wndw.width >= 769 && <DesktopMenu links={links} />}
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
