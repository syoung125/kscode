import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { ACTION_ITEMS } from "./g-activity-bar";
import { PostSlugType } from "@src/api/posts";
import { useAppContext } from "@src/contexts/app";

export type GSideBarProps = {
  postSlugs: PostSlugType[];
};

function GSideBar({ postSlugs }: GSideBarProps) {
  const {
    state: { selectedActionItem },
  } = useAppContext();

  return (
    <Wrapper>
      <Title>{ACTION_ITEMS[selectedActionItem].label}</Title>
      {postSlugs?.map(({ slug }) => (
        <li key={slug}>
          <Link href={`/posts/${slug}`}>{slug}</Link>
        </li>
      ))}
    </Wrapper>
  );
}

export default GSideBar;

const Wrapper = styled.section`
  width: 20rem;
  background-color: rgb(37, 37, 38);
  color: white;
`;

const Title = styled.h2`
  font-size: 0.8rem;
  padding: 0 0.8rem;
  font-weight: 400;
  opacity: 0.6;
`;
