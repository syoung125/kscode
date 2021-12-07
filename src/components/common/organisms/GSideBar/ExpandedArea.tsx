import React, { ReactNode, useState } from "react";

import { useDrag } from "@src/common/hooks";

import Style from "./ExpandedArea.style";

const INITIAL_WIDTH = 240;
const MIN_WIDTH = 80;

export type ExpandedAreaProps = {
  title: string;
  children: ReactNode;
  onSelectedActionItemChange: (index: number | null) => void;
};

export default function ExpandedArea({
  title,
  children,
  onSelectedActionItemChange,
}: ExpandedAreaProps) {
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

  return (
    <Style.Wrapper width={width}>
      <Style.Title>{title}</Style.Title>
      <Style.ContentWrapper>{children}</Style.ContentWrapper>
      <Style.DraggableLine onMouseDown={startDrag} isVisible={isDragging} />
    </Style.Wrapper>
  );
}
