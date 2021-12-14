import { PropsWithChildren, useState, ElementType } from "react";

import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@src/components/common/icons";

import Style from "./index.style";

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
      <Style.Li isSelected={isSelected} onClick={onClick} isFile>
        <Style.Title>📝 {title}</Style.Title>
      </Style.Li>
    );
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const ChevronIcon: ElementType = isExpanded
    ? ChevronDownIcon
    : ChevronRightIcon;
  return (
    <Style.Wrapper>
      <Style.Li onClick={toggleExpand}>
        <ChevronIcon style={{ width: "1rem", height: "1rem" }} />
        <Style.Title>📂 {title}</Style.Title>
      </Style.Li>
      {isExpanded && <Style.Ul>{children}</Style.Ul>}
    </Style.Wrapper>
  );
}
