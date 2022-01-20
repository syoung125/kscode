import FileTreeItem from "./file-tree-item";

import { Post } from "@src/common/types/post.type";

import { isFolder, TreeItem, TreeView } from "./classes";

import Style from "./index.style";

export type FileTreeProps = {
  posts: Post[];
  currentPostId?: string | null;
  selectPost: (id: string) => void;
};

export default function FileTree({
  posts,
  currentPostId = null,
  selectPost,
}: FileTreeProps) {
  const root = new TreeView<Post>(posts, (post) => post.id).root;

  const renderChildren = (children: TreeItem<Post>[]) =>
    children.map((item) => {
      if (isFolder(item)) {
        return (
          <FileTreeItem key={item.name} title={item.name}>
            {renderChildren(item.children as TreeItem<Post>[])}
          </FileTreeItem>
        );
      }

      return (
        <FileTreeItem
          key={item.name}
          title={item.data?.meta.title ?? ""}
          isSelected={item.path === currentPostId}
          onClick={() => selectPost(item.path)}
        />
      );
    });

  return <Style.Wrapper>{renderChildren(root.children)}</Style.Wrapper>;
}
