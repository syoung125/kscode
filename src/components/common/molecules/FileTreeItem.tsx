import { PropsWithChildren, useState, ElementType } from "react";
import styled from "styled-components";

import { P } from "../atoms";
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
        <Title>📝 {title}</Title>
      </Row>
    );
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [ChevronIcon, emoji]: [ElementType, string] = isExpanded
    ? [ChevronDownIcon, "📂"]
    : [ChevronRightIcon, "📁"];
  return (
    <Wrapper>
      <Row onClick={toggleExpand}>
        <ChevronIcon style={{ width: "1rem", height: "1rem" }} />
        <Title>
          {emoji} {title}
        </Title>
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

const Title = styled(P).attrs({
  size: "small",
  weight: "bold",
})`
  padding-left: 0.4rem;
`;

const Row = styled.div<Pick<FileTreeItemProps, "isSelected">>`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.4rem 0.2rem;

  ${({ isSelected, theme }) =>
    isSelected
      ? `background-color: ${theme.colors.scheme.$gray100};`
      : `&:hover { 
            background-color: ${theme.colors.scheme.$gray200};
         }`}
`;

const StyledDiv = styled.div`
  margin-left: 0.6rem;
  ${({ theme }) => `border-left: 0.4px solid ${theme.colors.scheme.$gray100}`};
`;
