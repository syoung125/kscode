import { IconProps } from ".";
import { WHITE } from "../../../constants/colors";

function EllipsisIcon({ style, fill = WHITE }: IconProps) {
  return (
    <svg
      style={{ width: "1.6rem", height: "1.6rem", ...style }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
  );
}

export default EllipsisIcon;
