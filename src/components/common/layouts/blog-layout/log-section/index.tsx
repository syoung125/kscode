import { useMemo, MouseEvent } from "react";
import styled from "styled-components";

import { useAppContext } from "@src/common/contexts/app";
import { Post } from "@src/common/types/post.type";

import LogItem from "./log-item";

function LogSection() {
  const {
    state: { posts },
    action: { selectPost },
  } = useAppContext();

  const sortedPosts: Post[] = useMemo(() => {
    // 최신순 정렬
    return [...posts].sort((a, b) => b.meta.date.localeCompare(a.meta.date));
  }, [posts]);

  const handleClick = (e: MouseEvent) => {
    const itemElem: HTMLElement | null = (e.target as HTMLElement).closest(
      ".logItem"
    );
    if (itemElem && itemElem.dataset.id) {
      selectPost(itemElem.dataset.id);
    }
  };

  return (
    <Wrapper onClick={handleClick}>
      {sortedPosts.map((post, i) => (
        <LogItem
          key={post.id}
          currPost={post}
          prevPost={i === 0 ? null : sortedPosts[i - 1]}
        />
      ))}
    </Wrapper>
  );
}

export default LogSection;

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow-y: auto;
`;
