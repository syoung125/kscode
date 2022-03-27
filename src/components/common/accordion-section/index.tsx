import { useState } from "react";
import styled, { css } from "styled-components";

import { ChevronDownIcon, ChevronRightIcon } from "@src/assets/icons";

export type AccordionSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  hasLine?: boolean;
  height?: string;
  maxHeight?: string;
};

export default function AccordionSection({
  title,
  children,
  defaultExpanded,
  hasLine,
  height,
  maxHeight,
}: AccordionSectionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultExpanded);

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  const ChevronIcon = isExpanded ? ChevronDownIcon : ChevronRightIcon;

  return (
    <>
      <Header onClick={handleHeaderClick} hasLine={hasLine}>
        <ChevronIcon style={{ width: "1rem", height: "1rem" }} />
        <Title>{title}</Title>
      </Header>
      <Content isExpanded={isExpanded} height={height} maxHeight={maxHeight}>
        {children}
      </Content>
    </>
  );
}

const Header = styled.div<Pick<AccordionSectionProps, "hasLine">>`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.4rem 0.2rem;
  ${({ hasLine }) =>
    hasLine && "border-top:1px solid rgba(204, 204, 204, 0.2);"}
`;

const Title = styled.b`
  font-size: 0.8rem;
  font-weight: 700;

  padding-left: 0.4rem;
`;

const hideScrollbar = css`
  &::-webkit-scrollbar {
    /* Chrome, Safari and Opera */
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Content = styled.div<{
  isExpanded: boolean;
  height?: string;
  maxHeight?: string;
}>`
  overflow-x: hidden;
  overflow-y: auto;

  ${({ isExpanded, height }) =>
    height
      ? `height:${isExpanded ? height : 0};`
      : `flex:${isExpanded ? 1 : 0};`}
  ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight};` : "")};

  transition: all 0.3s ease-out;

  ${hideScrollbar}
`;
