import { getFileName } from "@src/common/helpers";

import OpenPostListItem from "./open-post-list-item";

export type OpenPostListProps = {
  openPostPaths: string[];
  currentPostPath?: string | null;
  selectPost: (path: string) => void;
  closePost: (path: string) => void;
};

export default function OpenPostList(props: OpenPostListProps) {
  const { openPostPaths, currentPostPath, selectPost, closePost } = props;

  return (
    <ul style={{ whiteSpace: "nowrap" }}>
      {openPostPaths.map((path) => (
        <OpenPostListItem
          key={path}
          title={getFileName(path)}
          isSelected={currentPostPath === path}
          onClick={() => selectPost(path)}
          onClose={() => closePost(path)}
          showCloseButton
        />
      ))}
    </ul>
  );
}
