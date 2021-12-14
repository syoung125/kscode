import React, { ElementType } from "react";

import { GRAY_100, WHITE } from "@src/common/constants/palette";

import Style from "./index.style";

export type ActionItemProps = {
  onClick: () => void;
  Icon: ElementType;
  isSelected?: boolean;
};

export default function ActionItem({
  onClick,
  Icon,
  isSelected,
}: ActionItemProps) {
  return (
    <Style.Wrapper onClick={onClick} isSelected={isSelected}>
      <Icon
        style={{ width: "1.4rem", heigth: "1.4rem" }}
        fill={isSelected ? WHITE : GRAY_100}
      />
    </Style.Wrapper>
  );
}
