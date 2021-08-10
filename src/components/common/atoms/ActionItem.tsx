import React from "react";
import styled, { useTheme } from "styled-components";

import { ActionItemType } from "../organisms/GActivityBar";

export type ActionItemProps = Pick<ActionItemType, "Icon"> & {
  onClick: () => void;
  isSelected?: boolean;
};

function ActionItem({ onClick, Icon, isSelected }: ActionItemProps) {
  const { colors } = useTheme();

  return (
    <Wrapper onClick={onClick} isSelected={isSelected}>
      <Icon
        style={{
          width: "1.4rem",
          heigth: "1.4rem",
          opacity: isSelected ? 1 : 0.4,
        }}
        fill={colors.scheme.$white}
      />
    </Wrapper>
  );
}

export default React.memo(ActionItem);

const Wrapper = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  margin-bottom: 0.4rem;
  ${({ isSelected, theme }) =>
    `border-left: 0.16rem solid ${
      isSelected ? theme.colors.scheme.$white : "transparent"
    }`};
`;
