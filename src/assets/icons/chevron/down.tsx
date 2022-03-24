import { useTheme } from "styled-components";

import { IconProps } from "..";

function ChevronDownIcon({ style, fill }: IconProps) {
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
        d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"
      />
    </svg>
  );
}

export default ChevronDownIcon;
