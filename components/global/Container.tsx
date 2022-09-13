import clsx from "clsx";
import { calculateSpacing } from "lib/calculateSpacing";

type sizes = "none" | "xs" | "sm" | "base" | "lg" | "xl";

type Props = {
  children: JSX.Element | JSX.Element[];
  t?: sizes;
  b?: sizes;
  className?: string;
};

const Container = ({
  children,
  t = "base",
  b = "base",
  className = "",
}: Props) => {
  const spacingY = calculateSpacing(t, b);
  const styles = clsx(spacingY, "px-2 sm:px-4 lg:px-8", className);

  return <div className={styles}>{children}</div>;
};

export default Container;
