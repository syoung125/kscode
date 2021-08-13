import { useState } from "react";
import styled from "styled-components";

import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@src/components/common/icons";

export type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  hasLine?: boolean;
  maxHeight?: string;
};

function AccordionItem({
  title,
  children,
  defaultExpanded,
  hasLine,
  maxHeight,
}: AccordionItemProps) {
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
      <Content isExpanded={isExpanded} maxHeight={maxHeight}>
        {children}
      </Content>
    </>
  );
}

export default AccordionItem;

const Header = styled.div<Pick<AccordionItemProps, "hasLine">>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.4rem 0.2rem;
  ${({ hasLine }) =>
    hasLine && "border-top:1px solid rgba(204, 204, 204, 0.2);"}
`;

const Title = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  padding-left: 0.4rem;
`;

const Content = styled.div<{
  isExpanded: boolean;
  maxHeight?: string;
}>`
  overflow: hidden;
  ${({ isExpanded, maxHeight }) =>
    maxHeight
      ? `height:${isExpanded ? maxHeight : 0};`
      : `flex:${isExpanded ? 1 : 0};`}
  transition: all 0.3s ease-out;
`;
