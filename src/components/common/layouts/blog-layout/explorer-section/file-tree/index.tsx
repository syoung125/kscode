import FileTreeItem from "./file-tree-item";

import { isFolder, TreeItem, TreeView } from "./classes";

import Style from "./index.style";

export type FileTreeProps = {
  filePaths: string[];
  currentFilePath?: string | null;
  onFileClick: (path: string) => void;
};

export default function FileTree({
  filePaths,
  currentFilePath,
  onFileClick,
}: FileTreeProps) {
  const root = new TreeView(filePaths).root;

  const renderChildren = (children: TreeItem[]) =>
    children.map((item) => {
      if (isFolder(item)) {
        return (
          <FileTreeItem key={item.name} title={item.name}>
            {renderChildren(item.children)}
          </FileTreeItem>
        );
      }

      return (
        <FileTreeItem
          key={item.name}
          title={item.name}
          isSelected={item.path === currentFilePath}
          onClick={() => onFileClick(item.path)}
        />
      );
    });

  return <Style.Wrapper>{renderChildren(root.children)}</Style.Wrapper>;
}
