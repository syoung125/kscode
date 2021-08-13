import styled from "styled-components";

import AccordionItem, { AccordionItemProps } from "../atoms/AccordionItem";

export type AccordionDataType = Pick<
  AccordionItemProps,
  "title" | "children" | "defaultExpanded" | "maxHeight" | "hasLine"
>;

export type AccordionProps = {
  items: AccordionDataType[];
};

function Accordion({ items }: AccordionProps) {
  return (
    <Wrapper>
      {items.map((item, index) => (
        <AccordionItem key={item.title} {...item} hasLine={index !== 0} />
      ))}
    </Wrapper>
  );
}

export default Accordion;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
