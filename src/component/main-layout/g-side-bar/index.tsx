import React from "react";
import styled from "styled-components";

import { useAppContext } from "@src/contexts/app";

import { ACTION_ITEMS } from "../g-activity-bar";

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
  background-color: rgb(37, 37, 38);
  color: white;
`;

const Title = styled.h2`
  font-size: 0.8rem;
  padding: 0.8rem;
  font-weight: 400;
  opacity: 0.6;
`;

const ContentWrapper = styled.div`
  height: 100%;
`;
