import clsx from "clsx";
import type { NavTriggerProps } from "types/nav";

const NavTrigger = ({
  isMenuActive,
  callback,
  disabled = false,
  className = "",
}: NavTriggerProps) => {
  const buttonStyles = clsx(
    "w-10 h-10 bg-gray-200 bg-opacity-0 dark:bg-gray-800 dark:bg-opacity-0 rounded-lg flex items-center justify-center hover:bg-opacity-100 hover:dark:bg-opacity-100 hover:ring-2 ring-gray-300 dark:ring-gray-600 transition-all",
    className
  );
  const sharedStyles =
    "transform scale-25 opacity-0 origin-center transition-all duration-700 ease-out-expo";
  const burger = clsx(sharedStyles, !isMenuActive && "opacity-100 scale-[1]");
  const close = clsx(sharedStyles, isMenuActive && "opacity-100 scale-[1]");
  return (
    <button
      aria-label="Open Nav Menu"
      type="button"
      className={buttonStyles}
      onClick={callback}
      disabled={disabled}
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
          className={burger}
          fill="currentColor"
          d="M19,4H1V2h18V4z M19,16H1v2h18V16z M19,9H1v2h18V9z"
        />
        <path
          className={close}
          fill="currentColor"
          d="M11.4,10l6.7,6.7l-1.4,1.4L10,11.4l-6.7,6.7l-1.4-1.4L8.6,10L1.9,3.3l1.4-1.4L10,8.6l6.7-6.7l1.4,1.4L11.4,10z"
        />
      </svg>
    </button>
  );
};

export default NavTrigger;
