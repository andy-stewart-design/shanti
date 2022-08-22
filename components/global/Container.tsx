type Props = {
  children: JSX.Element;
};

const Wrapper = ({ children }: Props) => {
  return <div className="py-4 px-2 sm:px-4 lg:px-8">{children}</div>;
};

export default Wrapper;
