import React, { ReactNode, useState, forwardRef, ForwardedRef } from "react";

import { useDrag } from "@src/hooks";

import Style from "./index.style";

const INITIAL_WIDTH = 320;
const MIN_WIDTH = 80;

export type SideBarProps = {
  label: string;
  content: ReactNode;
  onClose: () => void;
};

const SideBar = forwardRef(
  (
    { label, content, onClose }: SideBarProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [width, setWidth] = useState(INITIAL_WIDTH);
    const { isDragging, startDrag } = useDrag((movement) => {
      const nextWidth = width + movement.x;
      if (nextWidth <= MIN_WIDTH) {
        onClose();
        setWidth(INITIAL_WIDTH);
        return;
      }
      setWidth(nextWidth);
    });

    return (
      <Style.Wrapper ref={ref} tabIndex={0} width={width}>
        <Style.TitleWrapper>
          <Style.Title>{label}</Style.Title>
          <Style.CloseIcon onClick={onClose} />
        </Style.TitleWrapper>
        <Style.ContentWrapper>{content}</Style.ContentWrapper>
        <Style.DraggableLine onMouseDown={startDrag} isVisible={isDragging} />
      </Style.Wrapper>
    );
  }
);

export default SideBar;
