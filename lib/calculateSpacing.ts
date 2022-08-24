import clsx from "clsx";

type sizes = "none" | "xs" | "sm" | "base" | "lg" | "xl";

export const calculateSpacing = (t: sizes, b: sizes) => {
  return clsx(
    t === "none" && "",
    t === "xs" && "pt-4",
    t === "sm" && "pt-9",
    t === "base" && "pt-18",
    t === "lg" && "pt-24",
    t === "xl" && "pt-34",
    b === "none" && "",
    b === "xs" && "pb-4",
    b === "sm" && "pb-9",
    b === "base" && "pb-18",
    b === "lg" && "pb-24",
    b === "xl" && "pb-34"
  );
};
