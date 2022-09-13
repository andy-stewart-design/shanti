import { MouseEventHandler } from "react";
import clsx from "clsx";

type Direction = "l" | "r" | "u" | "d";

type Props = {
  d: Direction;
  callback: MouseEventHandler<HTMLButtonElement>;
};

const ArrowButton = ({ d, callback }: Props) => {
  let points;
  if (d === "l") {
    points =
      "m1.3 8.7 6 6 1.4-1.4L4.4 9H15V7H4.4l4.3-4.3-1.4-1.4-6 6c-.4.4-.4 1 0 1.4z";
  } else {
    points =
      "m14.707 7.293-6-6-1.414 1.414L11.586 7H1v2h10.586l-4.293 4.293 1.414 1.414 6-6c.391-.391.391-1.023 0-1.414z";
  }
  return (
    <button
      onClick={callback}
      className="relative flex-center border border-gray-100/20 w-10 h-10 rounded-full transition-colors duration-300 ease-out-cubic hover:border-gray-100/80"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
        width="16"
        height="16"
      >
        <path d={points} fill="currentColor" />
      </svg>
    </button>
  );
};

export default ArrowButton;
