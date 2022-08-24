import Link from "next/link";
import Container from "components/global/Container";
import MenuItems from "./MenuItems";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useHydrated } from "lib/useHydrated";
import type { NavProps } from "types/nav";

const Nav = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    else setIsMenuOpen(true);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  return (
    <nav className="absolute top-0 left-0 w-screen z-50">
      <Container t="xs">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <a className="relative w-10 z-10 p-0.5">
              <AndyLogo />
            </a>
          </Link>
          <div className="flex gap-x-6">
            <MenuItems isMenuOpen={isMenuOpen} />
          </div>
          <div className="relative flex gap-x-2 h-10 z-10">
            <ThemeSwitch />
            <NavTrigger isMenuOpen={isMenuOpen} callback={toggleMenu} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();

  if (!useHydrated())
    return (
      <button
        aria-label="Toggle Dark Mode Placeholder"
        type="button"
        className="w-10 h-10"
      ></button>
    );

  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-10 h-10 bg-gray-200 bg-opacity-0 dark:bg-gray-800 dark:bg-opacity-0 rounded-lg flex items-center justify-center hover:bg-opacity-100 hover:dark:bg-opacity-100 hover:ring-2 ring-gray-300 dark:ring-gray-600 transition-all"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="w-5"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M10 1c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 16V3c3.86 0 7 3.14 7 7s-3.14 7-7 7z"
          />
        </svg>
      </button>
    </>
  );
};

const NavTrigger = ({ isMenuOpen, callback }: NavProps) => {
  return (
    <button
      aria-label="Open Nav Menu"
      type="button"
      className="w-10 h-10 bg-gray-200 bg-opacity-0 dark:bg-gray-800 dark:bg-opacity-0 rounded-lg flex items-center justify-center hover:bg-opacity-100 hover:dark:bg-opacity-100 hover:ring-2 ring-gray-300 dark:ring-gray-600 transition-all md:hidden"
      onClick={callback}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="w-5"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 20 20"
      >
        {!isMenuOpen ? (
          <path
            fill="currentColor"
            d="M19 4H1V2h18v2zm0 12H1v2h18v-2zm0-7H1v2h18V9zM41.414 10l6.364 6.364-1.414 1.414L40 11.414l-6.364 6.364-1.414-1.414L38.586 10l-6.364-6.364 1.414-1.414L40 8.586l6.364-6.364 1.414 1.414L41.414 10z"
          />
        ) : (
          <path
            fill="currentColor"
            d="m11.414 10 5.657 5.657-1.414 1.414L10 11.414l-5.657 5.657-1.414-1.414L8.586 10 2.929 4.343l1.414-1.414L10 8.586l5.657-5.657 1.414 1.414L11.414 10z"
          />
        )}
      </svg>
    </button>
  );
};

const AndyLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      xmlSpace="preserve"
    >
      <path
        d="M17.837 1.12C9.125 2.082 2.082 9.125 1.12 17.837-.13 29.151 8.565 38.749 19.567 38.995c.275.006.543-.105.738-.3l7.268-7.268c.158-.158.046-.427-.177-.427H10c-.552 0-1-.448-1-1V10c0-.552.448-1 1-1h20c.552 0 1 .448 1 1v28.5c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5V20C39 8.794 29.299-.146 17.837 1.12z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Nav;
