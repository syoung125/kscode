import styled from "styled-components";

import { media } from "@src/common/styles/media";
import { CloseIcon as _CloseIcon } from "@src/components/common/icons";

import { BLUE } from "@src/common/constants/palette";

import { ACTIVITY_BAR_WIDTH } from "../activity-bar/index.style";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../index.style";

const Wrapper = styled.section<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: relative;

  overflow: hidden;

  width: ${(props) => props.width}px;
  background-color: ${({ theme }) => theme.colors.semanticScheme.sideBarBg};

  ${media.phone`
    position: absolute;
    left: 3rem;

    width: calc(100% - ${ACTIVITY_BAR_WIDTH});
    height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});
    
    z-index: 1;
  `}
`;

const TitleWrapper = styled.div`
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

  ${media.phone`
    display:block;
  `}
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
  TitleWrapper,
  Title,
  CloseIcon,
  ContentWrapper,
  DraggableLine,
};
