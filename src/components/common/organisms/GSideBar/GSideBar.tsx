import React, { useState } from "react";
import styled from "styled-components";

import { ActionItem } from "../../atoms";

import { useDrag } from "@src/common/hooks";

import { ACTION_ITEMS } from "@src/components/layouts/main-layout";

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
      <ActivityBar>
        <ul>{renderUpperActionItems()}</ul>
        <ul>{renderLowerActionItems()}</ul>
      </ActivityBar>
      {isExpanded && (
        <ExpandedArea width={width}>
          <Title>{label}</Title>
          <ContentWrapper>{Content}</ContentWrapper>
          <DraggableLine onMouseDown={startDrag} isVisible={isDragging} />
        </ExpandedArea>
      )}
    </>
  );
}

export default GSideBar;

const ActivityBar = styled.nav`
  min-width: 3rem;
  background-color: ${({ theme }) => theme.colors.semanticScheme.activityBarBg};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ExpandedArea = styled.section<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: relative;

  overflow: hidden;

  width: ${(props) => props.width}px;
  background-color: ${({ theme }) => theme.colors.scheme.$gray400};
`;

const Title = styled.h2`
  height: 2.4rem;
  line-height: 2.4rem;
  font-size: 0.8rem;
  padding: 0 0.8rem;
  font-weight: 400;
  opacity: 0.6;
`;

const ContentWrapper = styled.div`
  height: 100%;
`;

const DraggableLine = styled.div<{ isVisible: boolean }>`
  width: 0.2rem;
  height: 100%;
  position: absolute;
  right: 0;

  background-color: ${({ theme, isVisible }) =>
    isVisible ? theme.colors.scheme.$blue : "transparent"};

  &:hover {
    cursor: col-resize;
  }
`;
