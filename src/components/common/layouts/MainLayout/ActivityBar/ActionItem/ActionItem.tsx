import React, { ElementType } from "react";
import { useTheme } from "styled-components";

import Style from "./ActionItem.style";

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
  const { colors } = useTheme();

  return (
    <Style.Wrapper onClick={onClick} isSelected={isSelected}>
      <Icon
        style={{
          width: "1.4rem",
          heigth: "1.4rem",
          opacity: isSelected ? 1 : 0.4,
        }}
        fill={colors.scheme.$white}
      />
    </Style.Wrapper>
  );
}
