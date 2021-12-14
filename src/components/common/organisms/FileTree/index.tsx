import FileTreeItem from "./FileTreeItem";

import { isFolder, TreeItem, TreeView } from "./classes";

import Style from "./index.style";

export type FileTreeProps = {
  filePaths: string[];
  selectedFilePath?: string | null;
  onFileClick: (path: string) => void;
};

export default function FileTree({
  filePaths,
  selectedFilePath,
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
          isSelected={item.path === selectedFilePath}
          onClick={() => onFileClick(item.path)}
        />
      );
    });

  return <Style.Wrapper>{renderChildren(root.children)}</Style.Wrapper>;
}
