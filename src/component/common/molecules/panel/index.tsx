import { useState } from "react";
import styled from "styled-components";

import { ChevronDownIcon, ChevronRightIcon } from "@src/asset/icons";

export type PanelProps = {
  header: string;
  children: React.ReactNode;
  isActivated?: boolean;
  hasLine?: boolean;
};

function Panel({ header, children, isActivated, hasLine }: PanelProps) {
  const [isOpen, setIsOpen] = useState<boolean>(!!isActivated);

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  const LeftIcon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <>
      <Header onClick={handleHeaderClick} hasLine={hasLine}>
        <LeftIcon style={{ width: "1rem", height: "1rem" }} />
        <Title>{header}</Title>
      </Header>
      <Body isOpen={isOpen}>{children}</Body>
    </>
  );
}

export default Panel;

const Header = styled.div<{
  hasLine?: boolean;
}>`
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

const Body = styled.div<{
  isOpen: boolean;
}>`
  overflow-y: ${({ isOpen }) => (isOpen ? "auto" : "hidden")};
  height: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  transition: all 0.3s ease-out;
`;
