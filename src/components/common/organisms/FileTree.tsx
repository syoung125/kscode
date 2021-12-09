import styled from "styled-components";

import { FileTreeItem } from "../molecules";

import { isFolder, TreeItem, TreeView } from "@src/common/classes";

export type FileTreeProps = {
  filePaths: string[];
  selectedFilePath?: string | null;
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

  return <StyledDiv>{renderChildren(root.children)}</StyledDiv>;
}

export default FileTree;

const StyledDiv = styled.div`
  margin-left: 0.6rem;
  ${({ theme }) => `border-left: 0.4px solid ${theme.colors.scheme.$gray100}`};
`;
