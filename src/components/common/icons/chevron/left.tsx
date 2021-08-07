import { useTheme } from "styled-components";

import { IconProps } from "..";

function ChevronLeftIcon({ style, fill }: IconProps) {
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
        d="M5.928 7.976l4.357 4.357-.618.62L5 8.284v-.618L9.667 3l.618.619-4.357 4.357z"
      />
    </svg>
  );
}

export default ChevronLeftIcon;
