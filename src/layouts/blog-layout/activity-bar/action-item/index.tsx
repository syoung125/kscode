import React, { ElementType, KeyboardEvent, ForwardedRef } from "react";

import { GRAY_100, WHITE } from "@src/constants/palette";

import Style from "./index.style";

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
      <Style.Wrapper
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
      </Style.Wrapper>
    );
  }
);

export default ActionItem;
