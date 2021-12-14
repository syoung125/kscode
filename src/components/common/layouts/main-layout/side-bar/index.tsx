import React, { useState } from "react";

import { useDrag } from "@src/common/hooks";

import { ACTION_ITEMS } from "../action-items";

import Style from "./index.style";

const INITIAL_WIDTH = 240;
const MIN_WIDTH = 80;

export type SideBarProps = {
  selectedActionItem: number | null;
  onSelectedActionItemChange: (index: number | null) => void;
};

export default function SideBar({
  selectedActionItem,
  onSelectedActionItemChange,
}: SideBarProps) {
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const { isDragging, startDrag } = useDrag((movement) => {
    const nextWidth = width + movement.x;
    if (nextWidth <= MIN_WIDTH) {
      onSelectedActionItemChange(null);
      setWidth(INITIAL_WIDTH);
      return;
    }
    setWidth(nextWidth);
  });

  if (selectedActionItem == null) {
    return null;
  }

  const { label, Content } = ACTION_ITEMS[selectedActionItem ?? 0];
  return (
    <Style.Wrapper width={width}>
      <Style.Title>{label}</Style.Title>
      <Style.ContentWrapper>{Content}</Style.ContentWrapper>
      <Style.DraggableLine onMouseDown={startDrag} isVisible={isDragging} />
    </Style.Wrapper>
  );
}
