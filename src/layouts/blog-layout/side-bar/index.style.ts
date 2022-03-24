import styled from "styled-components";

import { breakpoints } from "@src/styles/theme";
import { CloseIcon as _CloseIcon } from "@src/assets/icons";

import { BLUE } from "@src/constants/palette";

import { ACTIVITY_BAR_WIDTH } from "../activity-bar/index.style";

const Wrapper = styled.section<{ width: number }>`
  position: relative;

  flex-shrink: 0;

  display: flex;
  flex-direction: column;

  width: ${(props) => props.width}px;
  background-color: ${({ theme }) => theme.colors.semanticScheme.sideBarBg};

  ${breakpoints.small} {
    width: calc(100% - ${ACTIVITY_BAR_WIDTH});
    z-index: 1;
  }
`;

const TitleWrapper = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 2.4rem;
  padding: 0 0.8rem;
`;

const Title = styled.h2`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.scheme.$gray100};
`;

const CloseIcon = styled(_CloseIcon).attrs({
  style: { width: "1.2rem", height: "1.2rem" },
})`
  display: none;

  ${breakpoints.small} {
    display: block;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;

  overflow: hidden;
`;

const DraggableLine = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  width: 0.2rem;
  height: 100%;

  background-color: ${({ isVisible }) => (isVisible ? BLUE : "transparent")};

  &:hover {
    cursor: col-resize;
  }
`;

export default {
  Wrapper,
  TitleWrapper,
  Title,
  CloseIcon,
  ContentWrapper,
  DraggableLine,
};
