import Link from "next/link";
import clsx from "clsx";
import type { MobileMenuOverlayProps } from "types/nav";

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

export default MenuOverlay;
