import { useMemo, MouseEvent } from "react";

import { useAppContext } from "@src/contexts/app";
import { Post } from "@src/types/post.type";

import ScrollPagenation from "@src/components/common/scroll-pagenation";

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
    <ScrollPagenation
      data={sortedPosts}
      renderItem={(curr, prev) => (
        <LogItem key={curr.id} currPost={curr} prevPost={prev} />
      )}
      onClick={handleClick}
    />
  );
}

export default LogSection;
