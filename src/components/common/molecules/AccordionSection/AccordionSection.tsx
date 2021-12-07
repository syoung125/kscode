import { useState } from "react";

import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@src/components/common/icons";

import Style from "./AccordionSection.style";

export type AccordionSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  hasLine?: boolean;
  maxHeight?: string;
};

export default function AccordionSection({
  title,
  children,
  defaultExpanded,
  hasLine,
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
      <Style.Content isExpanded={isExpanded} maxHeight={maxHeight}>
        {children}
      </Style.Content>
    </>
  );
}
