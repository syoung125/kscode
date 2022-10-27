import { PropsWithChildren, useState, ElementType } from "react";
import styled from "styled-components";

import { ChevronDownIcon, ChevronRightIcon } from "@src/assets/icons";

export type FileTreeItemProps = PropsWithChildren<{
  title: string;
  isSelected?: boolean;
  defaultExpanded?: boolean;
  onClick?: () => void;
}>;

export default function FileTreeItem({
  title,
  children,
  isSelected,
  defaultExpanded,
  onClick,
}: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultExpanded);

  if (!children) {
    return (
      <Li isSelected={isSelected} onClick={onClick} isFile>
        <Title>📝 {title}</Title>
      </Li>
    );
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const ChevronIcon: ElementType = isExpanded
    ? ChevronDownIcon
    : ChevronRightIcon;
  return (
    <Wrapper>
      <Li onClick={toggleExpand}>
        <ChevronIcon style={{ width: "1rem", height: "1rem" }} />
        <Title>📂 {title}</Title>
      </Li>
      {isExpanded && <Ul>{children}</Ul>}
    </Wrapper>
  );
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
`;

const Li = styled.li<{ isSelected?: boolean; isFile?: boolean }>`
  display: flex;
  align-items: center;

  padding: 0.4rem 0.2rem;
  ${({ isFile }) => (isFile ? "padding-left: 1.4rem;" : "")};

  ${({ theme }) =>
    `&:hover { 
          background-color: ${theme.colors.scheme.$gray300};
       }`}
  ${({ isSelected, theme }) =>
    isSelected ? `background-color: ${theme.colors.scheme.$gray200};` : ``};

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  font-size: 0.8rem;
  font-weight: 700;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Ul = styled.ul`
  margin-left: 0.6rem;
  ${({ theme }) => `border-left: 0.4px solid ${theme.colors.scheme.$gray200}`};
`;
