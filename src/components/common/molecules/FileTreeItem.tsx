import { PropsWithChildren, useState, ElementType } from "react";
import styled from "styled-components";

import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@src/components/common/icons";

export type FileTreeItemProps = PropsWithChildren<{
  title: string;
  isSelected?: boolean;
  defaultExpanded?: boolean;
  onClick?: () => void;
}>;

function FileTreeItem({
  title,
  children,
  isSelected,
  defaultExpanded,
  onClick,
}: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultExpanded);

  if (!children) {
    return (
      <Row isSelected={isSelected} onClick={onClick}>
        <div style={{ width: "1rem", height: "1rem" }} />
        <Title>📝 {title}</Title>
      </Row>
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
      <Row onClick={toggleExpand}>
        <ChevronIcon style={{ width: "1rem", height: "1rem" }} />
        <Title>📂 {title}</Title>
      </Row>
      {isExpanded && <StyledDiv>{children}</StyledDiv>}
    </Wrapper>
  );
}

export default FileTreeItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  padding: 0 0.4rem;

  font-size: 0.8rem;
  font-weight: 700;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Row = styled.div<Pick<FileTreeItemProps, "isSelected">>`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.4rem 0.2rem;

  ${({ isSelected, theme }) =>
    isSelected
      ? `background-color: ${theme.colors.scheme.$gray200};`
      : `&:hover { 
            background-color: ${theme.colors.scheme.$gray300};
         }`}
`;

const StyledDiv = styled.div`
  margin-left: 0.6rem;
  ${({ theme }) => `border-left: 0.4px solid ${theme.colors.scheme.$gray200}`};
`;
