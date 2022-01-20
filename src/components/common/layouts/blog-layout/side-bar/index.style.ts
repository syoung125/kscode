import styled from "styled-components";

import { breakpoints } from "@src/common/styles/theme";
import { CloseIcon as _CloseIcon } from "@src/components/common/icons";

import { BLUE } from "@src/common/constants/palette";

import { ACTIVITY_BAR_WIDTH } from "../activity-bar/index.style";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../index.style";

const TITLE_WRAPPER_HEIGHT = "2.4rem";

const Wrapper = styled.section<{ width: number }>`
  position: relative;

  width: ${(props) => props.width}px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.semanticScheme.sideBarBg};

  overflow: hidden;

  ${breakpoints.small} {
    position: absolute;
    left: 3rem;

    width: calc(100% - ${ACTIVITY_BAR_WIDTH});
    height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});

    z-index: 1;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: ${TITLE_WRAPPER_HEIGHT};
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
  height: calc(100% - ${TITLE_WRAPPER_HEIGHT});
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
  TitleWrapper,
  Title,
  CloseIcon,
  ContentWrapper,
  DraggableLine,
};
