import { useState, MouseEvent } from "react";

import { CloseIcon } from "@src/assets/icons";

import Style from "./index.style";

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
    <Style.Wrapper
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
      <Style.Title>
        {emoji} {title}
      </Style.Title>
    </Style.Wrapper>
  );
}
