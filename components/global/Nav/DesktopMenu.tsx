import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { MobileMenuProps } from "types/nav";

const DesktopMenu = ({ links }: MobileMenuProps) => {
  return (
    <div className="flex justify-end grow">
      <div className="relative flex justify-center items-center gap-6 grow h-full bg-transparent">
        {links.map((link) => (
          <Link href={link.href} key={link.text}>
            <a className="font-medium">{link.text}</a>
          </Link>
        ))}
      </div>
      <div className="flex gap-2 z-10">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default DesktopMenu;
