import React, { useState } from "react";

import { ActionItem } from "../../atoms";

import { useDrag } from "@src/common/hooks";

import { ACTION_ITEMS } from "@src/components/layouts/main-layout";

import Style from "./GSideBar.styles";

const INITIAL_WIDTH = 240;
const MIN_WIDTH = 80;

function GSideBar() {
  const [currentActionItem, setCurrentActionItem] = useState<number | null>(0);

  const [width, setWidth] = useState(INITIAL_WIDTH);
  const { isDragging, startDrag } = useDrag((movement) => {
    const nextWidth = width + movement.x;
    if (nextWidth <= MIN_WIDTH) {
      setCurrentActionItem(null);
      setWidth(INITIAL_WIDTH);
      return;
    }
    setWidth(nextWidth);
  });

  const handleActionItemClick = (index: number) => () => {
    setCurrentActionItem(index === currentActionItem ? null : index);
  };

  const renderUpperActionItems = () =>
    ACTION_ITEMS.slice(0, 5).map(({ label, Icon }, index) => (
      <ActionItem
        key={label}
        Icon={Icon}
        onClick={handleActionItemClick(index)}
        isSelected={index === currentActionItem}
      />
    ));

  const renderLowerActionItems = () =>
    ACTION_ITEMS.slice(5).map(({ label, Icon }) => (
      <ActionItem key={label} Icon={Icon} onClick={() => null} />
    ));

  const isExpanded =
    currentActionItem !== undefined && currentActionItem !== null;
  const { label, Content } = ACTION_ITEMS[currentActionItem ?? 0];
  return (
    <>
      <Style.ActivityBar>
        <ul>{renderUpperActionItems()}</ul>
        <ul>{renderLowerActionItems()}</ul>
      </Style.ActivityBar>
      {isExpanded && (
        <Style.ExpandedArea width={width}>
          <Style.Title>{label}</Style.Title>
          <Style.ContentWrapper>{Content}</Style.ContentWrapper>
          <Style.DraggableLine onMouseDown={startDrag} isVisible={isDragging} />
        </Style.ExpandedArea>
      )}
    </>
  );
}

export default GSideBar;
