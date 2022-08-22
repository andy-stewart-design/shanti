import Link from "next/link";
import clsx from "clsx";
import useDelayedRender from "use-delayed-render";
import { useWindowSize } from "lib/useWindowSize";
import type { NavProps } from "types/nav";

const links = [
  { href: "/", text: "Home" },
  { href: "/snippets", text: "Snippets" },
  { href: "/about", text: "About" },
];

const MenuItems = ({ isMenuOpen }: NavProps) => {
  const wndw = useWindowSize();

  return (
    <>
      {wndw.width && wndw.width < 769 ? (
        <MobileMenu isMenuOpen={isMenuOpen} />
      ) : (
        <DesktopMenu />
      )}
    </>
  );
};

const MobileMenu = ({ isMenuOpen }: NavProps) => {
  const { mounted, rendered } = useDelayedRender(isMenuOpen, {
    exitDelay: 500,
  });

  const containerStyle = clsx(
    "fixed top-0 left-0 flex-center flex-col gap-y-6 w-screen h-screen bg-gray-300/90 dark:bg-gray-800/90 backdrop-blur-sm opacity-0 transition-opacity duration-500",
    rendered && "opacity-100"
  );

  const linkStyle = clsx(
    "font-medium text-xl translate-y-full transition-transform duration-500 ease-in-out-cubic",
    rendered && "translate-none"
  );

  if (!mounted) return null;

  return (
    <div className={containerStyle}>
      {links.map((link, index) => (
        <div className="flex overflow-hidden" key={link.text}>
          <Link href={link.href}>
            <a
              className={linkStyle}
              style={{
                transitionDelay: rendered ? `${(index + 1) * 100}ms` : "1000ms",
              }}
            >
              {link.text}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

const DesktopMenu = () => {
  return (
    <div className="relative hidden md:flex gap-6 bg-transparent">
      {links.map((link) => (
        <Link href={link.href} key={link.text}>
          <a className="font-medium">{link.text}</a>
        </Link>
      ))}
    </div>
  );
};

export default MenuItems;
