import styled from "styled-components";

const Wrapper = styled.section<{ width: number }>`
  display: flex;
  flex-direction: column;
  position: relative;

  overflow: hidden;

  width: ${(props) => props.width}px;
  background-color: ${({ theme }) => theme.colors.scheme.$gray400};
`;

const Title = styled.h2`
  height: 2.4rem;
  line-height: 2.4rem;
  font-size: 0.8rem;
  padding: 0 0.8rem;
  font-weight: 400;
  opacity: 0.6;
`;

const ContentWrapper = styled.div`
  height: 100%;
`;

const DraggableLine = styled.div<{ isVisible: boolean }>`
  width: 0.2rem;
  height: 100%;
  position: absolute;
  right: 0;

  background-color: ${({ theme, isVisible }) =>
    isVisible ? theme.colors.scheme.$blue : "transparent"};

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
