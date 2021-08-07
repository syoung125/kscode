import { useState } from "react";
import styled from "styled-components";

import { CloseIcon } from "@src/components/common/icons";

export type OpenPostListTabItemProps = {
  emoji?: string;
  id: string;
  slug: string;
  isSelected?: boolean;
  onClick?: (slug: string) => void;
  showCloseButton?: boolean;
  onClose?: (slug: string) => void;
};

function OpenPostListTabItem({
  emoji = "📝",
  id,
  slug,
  isSelected = false,
  onClick = (slug: string) => null,
  showCloseButton = false,
  onClose = (slug: string) => null,
}: OpenPostListTabItemProps) {
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
    <Wrapper
      isSelected={isSelected}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <p>{emoji}</p>
      <Slug>{slug}</Slug>
      <CloseIcon
        style={{
          width: "1rem",
          height: "1rem",
          visibility: isCloseVisible ? "visible" : "hidden",
        }}
        onClick={handleCloseClick}
      />
    </Wrapper>
  );
}

export default OpenPostListTabItem;

const Wrapper = styled.li<{ isSelected: boolean }>`
  ${({ isSelected, theme }) => `
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 2.4rem;
  padding: 0 0.8rem;
  background-color:
    ${isSelected ? theme.colors.scheme.$gray500 : theme.colors.scheme.$gray300};
  color: ${theme.colors.scheme.$white};
  opacity: ${isSelected ? 1 : 0.4};
`}
`;

const Slug = styled.p`
  padding: 0 0.4rem;
  width: 8rem;

  text-overflow: ellipsis;
  overflow: hidden;
`;
