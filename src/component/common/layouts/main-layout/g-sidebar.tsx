import { PostSlugType } from "@src/api/posts";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

export type GSideBarProps = {
  postSlugs: PostSlugType[];
};

function GSideBar({ postSlugs }: GSideBarProps) {
  return (
    <Wrapper>
      {postSlugs?.map(({ slug }) => (
        <li key={slug}>
          <Link href={`/posts/${slug}`}>{slug}</Link>
        </li>
      ))}
    </Wrapper>
  );
}

export default GSideBar;

const Wrapper = styled.div`
  width: 20rem;
  background-color: rgb(37, 37, 38);
  color: white;
`;
