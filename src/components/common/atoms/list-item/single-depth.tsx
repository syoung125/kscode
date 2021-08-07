import { useState } from "react";
import styled from "styled-components";

import { CloseIcon } from "@src/components/common/icons";

export const ListItemHeight = "2rem";

export type SingleDepthListItemProps = {
  emoji?: string;
  id: string;
  slug: string;
  isSelected?: boolean;
  onClick?: (id: string) => void;
  showCloseButton?: boolean;
  onClose?: (id: string) => void;
};

function SingleDepthListItem({
  emoji = "📝",
  id,
  slug,
  isSelected = false,
  onClick = () => null,
  showCloseButton = false,
  onClose = () => null,
}: SingleDepthListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCloseVisible = showCloseButton && (isSelected || isHovered);

  const handleClick = () => {
    onClick(id);
  };

  const handleCloseClick = () => {
    onClose(id);
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Row
      isSelected={isSelected}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <CloseIcon
        style={{
          width: "1rem",
          height: "1rem",
          visibility: isCloseVisible ? "visible" : "hidden",
        }}
        onClick={handleCloseClick}
      />
      <Emoji>{emoji}</Emoji>
      <Slug>{slug}</Slug>
    </Row>
  );
}

export default SingleDepthListItem;

const Row = styled.li<{ isSelected: boolean }>`
  ${({ isSelected, theme }) => `
display: flex;
  flex-direction: Row;
  align-items: center;

  height: ${ListItemHeight};
  padding-left: 2rem;

  ${
    isSelected
      ? `background-color: ${theme.colors.scheme.$gray100};`
      : `&:hover { 
            background-color: ${theme.colors.scheme.$gray200};
         }`
  }
`}
`;

const Emoji = styled.p`
  padding-left: 0.4rem;
`;

const Slug = styled.p`
  padding-left: 0.4rem;
`;
