import { Post } from "@src/types/post.type";

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
      {openPosts.map(({ id, meta }) => (
        <OpenPostListItem
          key={id}
          title={meta.title}
          isSelected={currentPostId === id}
          onClick={() => selectPost(id)}
          onClose={() => closePost(id)}
          showCloseButton
        />
      ))}
    </ul>
  );
}
