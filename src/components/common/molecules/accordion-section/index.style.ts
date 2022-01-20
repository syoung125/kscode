import styled from "styled-components";

import { AccordionSectionProps } from ".";

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
  height?: string;
  maxHeight?: string;
}>`
  overflow-x: hidden;
  overflow-y: auto;

  ${({ isExpanded, height }) =>
    height
      ? `height:${isExpanded ? height : 0};`
      : `flex:${isExpanded ? 1 : 0};`}
  ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight};` : "")};

  transition: all 0.3s ease-out;
`;

export default {
  Header,
  Title,
  Content,
};
