import styled from "styled-components";

import { AccordionSectionProps } from "./AccordionSection";

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

export default {
  Header,
  Title,
  Content,
};
