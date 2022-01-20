import { useState } from "react";

import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@src/components/common/icons";

import Style from "./index.style";

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
      <Style.Header onClick={handleHeaderClick} hasLine={hasLine}>
        <ChevronIcon style={{ width: "1rem", height: "1rem" }} />
        <Style.Title>{title}</Style.Title>
      </Style.Header>
      <Style.Content
        isExpanded={isExpanded}
        height={height}
        maxHeight={maxHeight}
      >
        {children}
      </Style.Content>
    </>
  );
}
