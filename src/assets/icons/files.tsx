import React from "react";
import { useTheme } from "styled-components";

import { IconProps } from ".";

function FilesIcon({ style, fill }: IconProps) {
  const { colors } = useTheme();

  return (
    <svg
      style={{ width: "1.4rem", height: "1.4rem", ...style }}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill || colors.scheme.$white}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.71 4.29l-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v4h4v8zm-3-9V2l3 3h-3z"
      />
    </svg>
  );
}

export default React.memo(FilesIcon);
