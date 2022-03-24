import OpenPostTab from "./open-post-tab";

import { useAppContext } from "@src/contexts/app";

import Style from "./index.style";

export default function OpenPostTabs() {
  const {
    state: { openPosts, currentPostId },
    action: { selectPost, closePost },
  } = useAppContext();

  return (
    <Style.Wrapper>
      {openPosts.map(({ id, meta }) => (
        <OpenPostTab
          key={id}
          title={meta.title}
          isSelected={currentPostId === id}
          onClick={() => selectPost(id)}
          onClose={() => closePost(id)}
        />
      ))}
    </Style.Wrapper>
  );
}
