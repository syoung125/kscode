import styled from "styled-components";

import { Post } from "@src/types/post.type";

import FileTreeItem from "./file-tree-item";
import { isFolder, TreeItem, TreeView } from "./classes";

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

  const sortChildren = (children: TreeItem<Post>[]) => {
    return children.sort((a, b) => (isFolder(a) && !isFolder(b) ? -1 : 0));
  };

  const renderChildren = (children: TreeItem<Post>[]) =>
    sortChildren(children).map((item) => {
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

  return <Wrapper>{renderChildren(root.children)}</Wrapper>;
}

const Wrapper = styled.div`
  margin-left: 0.6rem;
  ${({ theme }) => `border-left: 0.4px solid ${theme.colors.scheme.$gray200}`};
`;
