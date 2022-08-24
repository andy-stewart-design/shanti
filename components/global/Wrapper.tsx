import { calculateSpacing } from "lib/calculateSpacing";

type sizes = "none" | "xs" | "sm" | "base" | "lg" | "xl";

type Props = {
  children: JSX.Element | JSX.Element[];
  t?: sizes;
  b?: sizes;
};

const Wrapper = ({ children, t = "base", b = "base" }: Props) => {
  const styles = calculateSpacing(t, b);

  return <div className={styles}>{children}</div>;
};

export default Wrapper;
