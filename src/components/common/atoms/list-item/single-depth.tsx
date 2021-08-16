import { useState } from "react";
import styled from "styled-components";

import { CloseIcon } from "@src/components/common/icons";
import P from "../P";

export const ListItemHeight = "2rem";

export type SingleDepthListItemProps = {
  emoji?: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
};

function SingleDepthListItem({
  emoji = "📝",
  title,
  isSelected = false,
  onClick = () => null,
  onClose = () => null,
  showCloseButton = false,
}: SingleDepthListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCloseVisible = showCloseButton && (isSelected || isHovered);

  return (
    <Row
      isSelected={isSelected}
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CloseIcon
        style={{
          width: "1rem",
          height: "1rem",
          visibility: isCloseVisible ? "visible" : "hidden",
        }}
        onClick={onClose}
      />
      <Emoji>{emoji}</Emoji>
      <Title>{title}</Title>
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

const Emoji = styled(P)`
  padding-left: 0.4rem;
`;

const Title = styled(P)`
  padding-left: 0.4rem;
`;
