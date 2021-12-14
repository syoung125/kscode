import styled from "styled-components";

import { BLUE } from "@src/common/constants/palette";

const Wrapper = styled.section<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: relative;

  overflow: hidden;

  width: ${(props) => props.width}px;
  background-color: ${({ theme }) => theme.colors.semanticScheme.sideBarBg};
`;

const Title = styled.h2`
  height: 2.4rem;
  line-height: 2.4rem;
  padding: 0 0.8rem;

  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.scheme.$gray100};
`;

const ContentWrapper = styled.div`
  height: 100%;
`;

const DraggableLine = styled.div<{ isVisible: boolean }>`
  width: 0.2rem;
  height: 100%;
  position: absolute;
  right: 0;

  background-color: ${({ isVisible }) => (isVisible ? BLUE : "transparent")};

  &:hover {
    cursor: col-resize;
  }
`;

export default {
  Wrapper,
  Title,
  ContentWrapper,
  DraggableLine,
};
