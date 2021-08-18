import { MouseEventHandler, useState } from "react";
import styled from "styled-components";

import { P } from ".";
import { CloseIcon } from "@src/components/common/icons";

export type TabItemProps = {
  emoji?: string;
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
  onClose?: () => void;
};

function TabItem({
  emoji = "📝",
  title,
  isSelected = false,
  onClick = () => null,
  onClose = () => null,
}: TabItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCloseVisible = isSelected || isHovered;

  const handleClose: MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <Wrapper
      isSelected={isSelected}
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Emoji>{emoji}</Emoji>
      <Title>{title}</Title>
      <CloseIcon
        onClick={handleClose}
        style={{
          width: "1rem",
          height: "1rem",
          visibility: isCloseVisible ? "visible" : "hidden",
        }}
      />
    </Wrapper>
  );
}

export default TabItem;

const Wrapper = styled.li<{ isSelected: boolean }>`
  ${({ isSelected, theme }) => `
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 2.4rem;
  padding: 0 0.8rem;
  margin-right: 0.1rem;

  background-color:
    ${isSelected ? theme.colors.scheme.$gray500 : theme.colors.scheme.$gray300};
  color: ${theme.colors.scheme.$white};
  opacity: ${isSelected ? 1 : 0.4};
`}
`;

const Emoji = styled(P).attrs({})`
  margin-right: 0.8rem;
`;

const Title = styled(P).attrs({
  ellipsis: true,
  preWrap: true,
})`
  margin-right: 0.8rem;
  width: 8rem;
`;
