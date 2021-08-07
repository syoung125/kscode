import { useTheme } from "styled-components";

import { IconProps } from "..";

function ChevronUpIcon({ style, fill }: IconProps) {
  const { colors } = useTheme();

  return (
    <svg
      style={{ width: "1.6rem", height: "1.6rem", ...style }}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill || colors.scheme.$white}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"
      />
    </svg>
  );
}

export default ChevronUpIcon;
