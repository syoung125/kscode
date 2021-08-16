import { Folder, File } from "./TreeItem.class";

export default class TreeView {
  root: Folder = new Folder("root");
  constructor(filePaths: string[]) {
    this.createTree(filePaths);
  }

  createTree(filePaths: string[]) {
    filePaths.map((filePath) => {
      this.addFileToTree(filePath);
    });
    return [];
  }

  addFileToTree(path: string) {
    const splittedPaths = path.split("/");
    const lastIdx = splittedPaths.length - 1;
    const fileName = splittedPaths[lastIdx];

    splittedPaths
      .slice(0, lastIdx)
      .reduce(
        (acc, currFolderName, i) =>
          this.accessToFolder(
            acc,
            currFolderName,
            splittedPaths.slice(0, i + 1).join("/")
          ),
        this.root
      )
      .add(new File(fileName, path));
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
