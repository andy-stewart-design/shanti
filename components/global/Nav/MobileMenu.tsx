import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import NavTrigger from "components/global/Nav/NavTrigger";
import ThemeSwitch from "components/global/Nav/ThemeSwitch";
import type { MobileMenuProps, MobileMenuOverlayProps } from "types/nav";

const MobileMenu = ({ links, hasScrolled }: MobileMenuProps) => {
  const navContainer = useRef<HTMLDivElement>(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    if (isMenuActive) {
      setIsMenuActive(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuActive(true);
      document.body.style.overflow = "hidden";
    }
  }, [isMenuActive]);

  const scrollMenuStyles = clsx(
    "invisible fixed top-[13px] right-[5px] flex py-0.5 px-1 z-10 bg-black/80 border border-gray-100/20 rounded-full backdrop-blur-sm -mt-18 transition-transform duration-500 ease-out-cubic sm:right-[11px] lg:right-[27px]",
    hasScrolled && "visible-in translate-y-18"
  );

  useEffect(() => {
    setIsMenuActive(false);
    document.body.style.overflow = "";
  }, [router.pathname]);

  useEffect(() => {
    if (!isMenuActive || !navContainer.current) return;

    const navEl = navContainer.current;
    const focusableEls: NodeListOf<HTMLElement> = navEl.querySelectorAll(
      "a:not(.hidden), button:not([disabled])"
    );
    let firstFocusableEl: HTMLElement, lastFocusableEl: HTMLElement;

    if (focusableEls) {
      firstFocusableEl = focusableEls[0];
      lastFocusableEl = focusableEls[focusableEls.length - 1];
    } else throw new Error("No focusable elements found");

    const handleClick = (e: KeyboardEvent) => {
      if (e.key !== "Tab" && e.key !== "Escape") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else if (e.key === "Escape") {
        toggleMenu();
      } else if (document.activeElement === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    };

    navEl.addEventListener("keydown", handleClick);

    return () => navEl.removeEventListener("keydown", handleClick);
  }, [isMenuActive, toggleMenu]);

  return (
    <div ref={navContainer} className="flex justify-end grow">
      <div className="relative hidden md:flex justify-center items-center gap-6 grow h-full bg-transparent">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.text}
            className="font-medium hidden md:block"
          >
            {link.text}
          </Link>
        ))}
      </div>
      <MenuOverlay links={links} isMenuActive={isMenuActive} />
      <div className="flex z-10">
        <ThemeSwitch disabled={hasScrolled} />
        <NavTrigger
          isMenuActive={isMenuActive}
          callback={toggleMenu}
          className="md:hidden"
          disabled={hasScrolled}
        />
      </div>
      <div className={scrollMenuStyles}>
        <ThemeSwitch disabled={!hasScrolled} />
        <NavTrigger
          isMenuActive={isMenuActive}
          callback={toggleMenu}
          disabled={!hasScrolled}
        />
      </div>
    </div>
  );
};

const MenuOverlay = ({ isMenuActive, links }: MobileMenuOverlayProps) => {
  const containerStyle = clsx(
    "invisible fixed top-0 left-0 flex-center flex-col gap-y-6 w-screen h-screen bg-gray-300/90 dark:bg-black/80 backdrop-blur opacity-0 transition-visop duration-500 delay-200 ease-out-cubic pointer-events-none",
    isMenuActive && "visible-in opacity-to-100 pointer-events-auto delay-to-0"
  );

  const linkStyle = clsx(
    "font-medium text-2xl translate-y-full transition-transform duration-500 ease-in-out-cubic",
    isMenuActive && "translate-y-[0px]"
  );

  return (
    <div className={containerStyle}>
      {links.map((link, index) => (
        <Link key={link.text} href={link.href} className="flex overflow-hidden">
          <span
            className={linkStyle}
            style={{
              transitionDelay: isMenuActive ? `${(index + 1) * 100}ms` : "0ms",
            }}
          >
            {link.text}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
