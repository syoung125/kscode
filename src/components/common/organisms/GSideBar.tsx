import React from "react";
import styled from "styled-components";

import { useAppContext } from "@src/common/contexts/app";

import { ACTION_ITEMS } from "@src/components/layouts/main-layout";

function GSideBar() {
  const {
    state: { selectedActionItem },
  } = useAppContext();

  const { Content } = ACTION_ITEMS[selectedActionItem];

  return (
    <Wrapper>
      <Title>{ACTION_ITEMS[selectedActionItem].label}</Title>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </Wrapper>
  );
}

export default GSideBar;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 20rem;
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
