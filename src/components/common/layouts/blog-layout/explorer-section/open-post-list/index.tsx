import { getFileName } from "@src/common/helpers";
import { Post } from "@src/common/types/post.type";

import OpenPostListItem from "./open-post-list-item";

export type OpenPostListProps = {
  openPosts: Post[];
  currentPostId?: string | null;
  selectPost: (id: string) => void;
  closePost: (id: string) => void;
};

export default function OpenPostList(props: OpenPostListProps) {
  const { openPosts, currentPostId, selectPost, closePost } = props;

  return (
    <ul style={{ whiteSpace: "nowrap" }}>
      {openPosts.map(({ id }) => (
        <OpenPostListItem
          key={id}
          title={getFileName(id)}
          isSelected={currentPostId === id}
          onClick={() => selectPost(id)}
          onClose={() => closePost(id)}
          showCloseButton
        />
      ))}
    </ul>
  );
}
