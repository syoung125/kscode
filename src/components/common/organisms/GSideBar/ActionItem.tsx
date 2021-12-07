import React from "react";
import { useTheme } from "styled-components";

import { ActionItemType } from ".";

import Style from "./ActionItem.style";

export type ActionItemProps = Pick<ActionItemType, "Icon"> & {
  onClick: () => void;
  isSelected?: boolean;
};

function ActionItem({ onClick, Icon, isSelected }: ActionItemProps) {
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

export default ActionItem;
