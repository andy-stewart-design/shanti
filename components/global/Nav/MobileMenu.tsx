// TODO: implement focus trap

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import useDelayedRender from "use-delayed-render";
import NavTrigger from "components/global/Nav/NavTrigger";
import ThemeSwitch from "components/global/Nav/ThemeSwitch";
import type { MobileMenuProps, MobileMenuOverlayProps } from "types/nav";
import styles from "./Nav.module.css";

const MobileMenu = ({ links }: MobileMenuProps) => {
  const navContainer = useRef<HTMLDivElement>(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    if (isMenuActive) {
      setIsMenuActive(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuActive(true);
      document.body.style.overflow = "hidden";
    }
  };

  const { mounted, rendered } = useDelayedRender(isMenuActive, {
    enterDelay: 20,
    exitDelay: 500,
  });

  useEffect(() => {
    setIsMenuActive(false);
    document.body.style.overflow = "";
  }, [router.pathname]);

  useEffect(() => {
    if (!mounted) return;
    const focusableEls = navContainer.current?.querySelectorAll("a, button");
    let firstEl, lastEl;
    if (focusableEls) {
      firstEl = focusableEls[0];
      lastEl = focusableEls[focusableEls.length - 1];
    } else throw new Error("No focusable elements found");
    console.log(router.pathname);
  }, [mounted, router.pathname]);

  return (
    <div ref={navContainer} className="flex justify-end grow">
      <MobileMenuOverlay
        links={links}
        isMenuMounted={mounted}
        isMenuRendered={rendered}
      />
      <div className="flex gap-2 z-10">
        <ThemeSwitch />
        <NavTrigger isMenuActive={isMenuActive} callback={toggleMenu} />
      </div>
    </div>
  );
};

const MobileMenuOverlay = ({
  isMenuMounted,
  isMenuRendered,
  links,
}: MobileMenuOverlayProps) => {
  const containerStyle = clsx(
    "fixed top-0 left-0 flex-center flex-col gap-y-6 w-screen h-screen bg-gray-300/90 dark:bg-gray-800/90 backdrop-blur-sm opacity-0 transition-opacity duration-500",
    isMenuRendered && "opacity-100"
  );

  const linkStyle = clsx(
    "font-medium text-2xl translate-y-full transition-transform duration-500 ease-in-out-cubic",
    isMenuRendered && styles.menuItemActive
  );

  if (!isMenuMounted) return null;

  return (
    <div className={containerStyle}>
      {links.map((link, index) => (
        <Link key={link.text} href={link.href}>
          <a className="flex overflow-hidden">
            <span
              className={linkStyle}
              style={{
                transitionDelay: isMenuRendered
                  ? `${(index + 1) * 100}ms`
                  : "1000ms",
              }}
            >
              {link.text}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
