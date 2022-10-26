import { useState, MouseEvent } from "react";
import styled from "styled-components";

import { CloseIcon } from "@src/assets/icons";

export const OPEN_POST_LIST_ITEM_HEIGHT = "2rem";

export type OpenPostListItemProps = {
  emoji?: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
};

export default function OpenPostListItem({
  emoji = "📝",
  title,
  isSelected = false,
  onClick = () => null,
  onClose = () => null,
  showCloseButton = false,
}: OpenPostListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCloseVisible = showCloseButton && (isSelected || isHovered);

  const handleCloseClick = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    onClose();
  };

  return (
    <Wrapper
      height={OPEN_POST_LIST_ITEM_HEIGHT}
      isSelected={isSelected}
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CloseIcon
        style={{
          minWidth: "1rem",
          width: "1rem",
          height: "1rem",
          visibility: isCloseVisible ? "visible" : "hidden",
        }}
        onClick={handleCloseClick}
      />
      <Title>
        {emoji} {title}
      </Title>
    </Wrapper>
  );
}

const Wrapper = styled.li<{ isSelected: boolean; height: string }>`
  ${({ height, isSelected, theme }) => `
    display: flex;
    flex-direction: Row;
    align-items: center;

    height: ${height};
    padding: 0 1.2rem;

    ${
      isSelected
        ? `background-color: ${theme.colors.scheme.$gray200};`
        : `&:hover { 
              background-color: ${theme.colors.scheme.$gray300};
          }`
    }
  `}
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  padding-left: 0.4rem;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
