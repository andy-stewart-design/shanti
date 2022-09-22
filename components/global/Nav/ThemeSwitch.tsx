import { useHydrated } from "lib/useHydrated";
import { useTheme } from "next-themes";

const ThemeSwitch = ({ disabled = false }) => {
  const { resolvedTheme, setTheme } = useTheme();

  if (!useHydrated()) {
    return (
      <button
        aria-label="Toggle Dark Mode Placeholder"
        type="button"
        className="w-10 h-10"
      ></button>
    );
  }

  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-10 h-10 bg-gray-200 bg-opacity-0 dark:bg-gray-800 dark:bg-opacity-0 rounded-lg flex items-center justify-center hover:bg-opacity-100 hover:dark:bg-opacity-100 hover:ring-2 ring-gray-300 dark:ring-gray-600 transition-all"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
            fill="currentColor"
            d="M10 1c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 16V3c3.86 0 7 3.14 7 7s-3.14 7-7 7z"
          />
        </svg>
      </button>
    </>
  );
};

export default ThemeSwitch;
