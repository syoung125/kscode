import { Folder, File } from "./TreeItem.class";

export default class TreeView {
  root: Folder = new Folder("root");
  constructor(filePaths: string[]) {
    this.createTree(filePaths);
  }

  createTree(filePaths: string[]) {
    filePaths.map((filePath) => {
      this.addFile(filePath);
    });
    return [];
  }

  addFile(path: string) {
    const fileName = path.split("/").reverse()[0];
    this.accessToLeafFolder(path, this.root).add(new File(fileName, path));
  }

  accessToLeafFolder(path: string, root: Folder) {
    const splittedPaths = path.split("/");
    return splittedPaths
      .slice(0, splittedPaths.length - 1)
      .reduce(
        (acc, currFolderName, i) =>
          this.accessToFolder(
            acc,
            currFolderName,
            splittedPaths.slice(0, i + 1).join("/")
          ),
        root
      );
  }

  accessToFolder(currFolder: Folder, folderName: string, path: string): Folder {
    const nextFolder = currFolder.find(folderName);
    if (nextFolder !== undefined) {
      return nextFolder as Folder;
    }
    return currFolder
      .add(new Folder(folderName, path))
      .find(folderName) as Folder;
  }
}
