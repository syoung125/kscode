import { MouseEventHandler, useState } from "react";

import { CloseIcon } from "@src/assets/icons";

import Style from "./index.style";

export type OpenPostTabProps = {
  emoji?: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
  onClose?: () => void;
};

export default function OpenPostTab({
  emoji = "📝",
  title,
  isSelected = false,
  onClick = () => null,
  onClose = () => null,
}: OpenPostTabProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCloseVisible = isSelected || isHovered;

  const handleClose: MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Style.Wrapper
      isSelected={isSelected}
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Style.Title>
        {emoji} {title}
      </Style.Title>
      <CloseIcon
        onClick={handleClose}
        style={{
          width: "1rem",
          height: "1rem",
          visibility: isCloseVisible ? "visible" : "hidden",
        }}
      />
    </Style.Wrapper>
  );
}
