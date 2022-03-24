import React, { ElementType, KeyboardEvent, ForwardedRef } from "react";
import styled from "styled-components";

import { GRAY_100, WHITE } from "@src/constants/palette";

export type ActionItemProps = {
  Icon: ElementType;
  isSelected?: boolean;
  onClick: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
};

const ActionItem = React.forwardRef(
  (
    {
      Icon,
      isSelected = false,
      onClick,
      onKeyDown = () => null,
    }: ActionItemProps,
    ref: ForwardedRef<HTMLLIElement>
  ) => {
    return (
      <Wrapper
        ref={ref}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        isSelected={isSelected}
      >
        <Icon
          style={{ width: "1.4rem", heigth: "1.4rem" }}
          fill={isSelected ? WHITE : GRAY_100}
        />
      </Wrapper>
    );
  }
);

export default ActionItem;

const Wrapper = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;
  ${({ isSelected }) =>
    `border-left: 0.16rem solid ${isSelected ? WHITE : "transparent"}`};
`;
