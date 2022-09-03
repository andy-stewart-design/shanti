// TODO: implement focus trap

// import styles from "./Nav.module.css";
// import Link from "next/link";
// import clsx from "clsx";
// import { useWindowSize } from "lib/useWindowSize";
// import type { MobileMenuProps } from "types/nav";

// const links = [
//   { href: "/", text: "Home" },
//   { href: "/feed", text: "Feed" },
//   { href: "/snippets", text: "Snippets" },
//   { href: "/about", text: "About" },
// ];

// const MenuItems = ({ isMenuMounted, isMenuRendered }: MobileMenuProps) => {
//   const wndw = useWindowSize();

//   return (
//     <>
//       {/* {wndw.width && wndw.width < 769 ? (
//         <MobMenu
//           isMenuMounted={isMenuMounted}
//           isMenuRendered={isMenuRendered}
//         />
//       ) : (
//         <DeskMenu />
//       )} */}
//     </>
//   );
// };

// const MobMenu = ({ isMenuMounted, isMenuRendered }: MobileMenuProps) => {
//   const containerStyle = clsx(
//     "fixed top-0 left-0 flex-center flex-col gap-y-6 w-screen h-screen bg-gray-300/90 dark:bg-gray-800/90 backdrop-blur-sm opacity-0 transition-opacity duration-500",
//     isMenuRendered && "opacity-100"
//   );

//   const linkStyle = clsx(
//     "font-medium text-2xl translate-y-full transition-transform duration-500 ease-in-out-cubic",
//     isMenuRendered && styles.menuItemActive
//   );

//   if (!isMenuMounted) return null;

//   return (
//     <div className={containerStyle}>
//       {links.map((link, index) => (
//         <Link key={link.text} href={link.href}>
//           <a className="flex overflow-hidden">
//             <span
//               className={linkStyle}
//               style={{
//                 transitionDelay: isMenuRendered
//                   ? `${(index + 1) * 100}ms`
//                   : "1000ms",
//               }}
//             >
//               {link.text}
//             </span>
//           </a>
//         </Link>
//       ))}
//     </div>
//   );
// };

// const DeskMenu = () => {
//   return (
//     <div className="relative hidden md:flex gap-6 bg-transparent">
//       {links.map((link) => (
//         <Link href={link.href} key={link.text}>
//           <a className="font-medium">{link.text}</a>
//         </Link>
//       ))}
//     </div>
//   );
// };

const MenuItems = () => {
  return null;
};

export default MenuItems;
