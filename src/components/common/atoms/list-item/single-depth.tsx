import { useState } from "react";
import styled from "styled-components";

import { CloseIcon } from "@src/components/common/icons";
import { List } from "@src/asset/colors";

export const ListItemHeight = "2rem";

export type SingleDepthListItemProps = {
  emoji?: string;
  slug: string;
  isSelected?: boolean;
  onClick?: (slug: string) => void;
  showCloseButton?: boolean;
  onClose?: (slug: string) => void;
};

function SingleDepthListItem({
  emoji = "📝",
  slug,
  isSelected = false,
  onClick = (slug: string) => null,
  showCloseButton = false,
  onClose = (slug: string) => null,
}: SingleDepthListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCloseVisible = showCloseButton && (isSelected || isHovered);

  const handleClick = () => {
    onClick(slug);
  };

  const handleCloseClick = () => {
    onClose(slug);
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
  display: flex;
  flex-direction: Row;
  align-items: center;

  height: ${ListItemHeight};
  padding-left: 2rem;

  ${({ isSelected }) =>
    isSelected && `background-color: ${List.focusBackground};`}
  ${({ isSelected }) =>
    !isSelected &&
    `&:hover {
      background-color: ${List.hoverBackground};
    }`}
`;

const Emoji = styled.p`
  padding-left: 0.4rem;
`;

const Slug = styled.p`
  padding-left: 0.4rem;
`;
