// default theme https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Andy Sans", ...defaultTheme.fontFamily.sans],
      mono: ["Andy mono", ...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      xs: ["0.75rem", "1.2"],
      sm: ["0.875rem", "1.2"],
      base: ["1rem", "1.5"],
      lg: ["1.125rem", "1.5"],
      xl: ["1.25rem", "1.3"],
      "2xl": ["1.5rem", "1.3"],
      "3xl": ["1.875rem", "1.3"],
      "4xl": ["2.25rem", "1.2"],
      "5xl": ["3rem", "1.2"],
      "6xl": ["3.75rem", "1.2"],
      "7xl": ["4.5rem", "1.2"],
      "8xl": ["6rem", "1.2"],
      "9xl": ["8rem", "1.2"],
    },
    scale: {
      0: "0",
      25: ".25",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
      100: "1",
    },
    screens: {
      xs: "440px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1240px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        black: "#111111",
        gray: {
          ...colors.zinc,
          900: "#16181A",
        },
      },
      gridTemplateColumns: {
        "fit-sm": "repeat(auto-fit, minmax(15rem, 1fr))",
        fit: "repeat(auto-fit, minmax(18rem, 1fr))",
        "fit-lg": "repeat(auto-fit, minmax(21rem, 1fr))",
        "fit-xl": "repeat(auto-fit, minmax(24rem, 1fr))",
      },
      opacity: {
        15: ".15",
      },
      spacing: {
        18: "4.5rem",
        34: "7.5rem",
      },
      transitionDelay: {
        0: "0ms",
      },
      transitionProperty: {
        trop: "transform, opacity",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "in-cubic": "cubic-bezier(0.32, 0, 0.67, 0)",
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
