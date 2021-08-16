import { FileTreeItem } from "../molecules";

import { isFolder, TreeItem, TreeView } from "@src/common/classes";

export type FileTreeProps = {
  filePaths: string[];
  selectedFilePath: string | null;
  onFileClick: (path: string) => void;
};

function FileTree({ filePaths, selectedFilePath, onFileClick }: FileTreeProps) {
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

  return <>{renderChildren(root.children)}</>;
}

export default FileTree;
