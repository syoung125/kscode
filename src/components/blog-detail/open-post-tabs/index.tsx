import OpenPostTab from "./open-post-tab";

import { useAppContext } from "@src/common/contexts/app";
import { getFileName } from "@src/common/helpers";

import Style from "./index.style";

export default function OpenPostTabs() {
  const {
    state: { openPosts, currentPostId },
    action: { selectPost, closePost },
  } = useAppContext();

  return (
    <Style.Wrapper>
      {openPosts.map(({ id }) => (
        <OpenPostTab
          key={id}
          title={getFileName(id)}
          isSelected={currentPostId === id}
          onClick={() => selectPost(id)}
          onClose={() => closePost(id)}
        />
      ))}
    </Style.Wrapper>
  );
}
