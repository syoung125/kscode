import { Folder, File } from "./TreeItem.class";

export default class TreeView<TData = unknown> {
  root: Folder<TData> = new Folder<TData>("root");
  private mapFilePath: ((value: TData) => string) | undefined;

  constructor(
    data: string[] | TData[],
    mapFilePath?: (value: TData) => string
  ) {
    this.mapFilePath = mapFilePath;
    this.createTree(data);
  }

  createTree(data: string[] | TData[]) {
    data.map((v: string | TData) =>
      this.mapFilePath
        ? this.addFile(this.mapFilePath(v as TData), v as TData)
        : this.addFile(v as string)
    );
  }

  addFile(path: string, data?: TData) {
    const fileName = path.split("/").reverse()[0];
    this.accessToLeafFolder(path, this.root).add(
      new File<TData>(fileName, path, data)
    );
  }

  accessToLeafFolder(path: string, root: Folder<TData>) {
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

  accessToFolder(
    currFolder: Folder<TData>,
    folderName: string,
    path: string
  ): Folder<TData> {
    const nextFolder = currFolder.find(folderName);
    if (nextFolder !== undefined) {
      return nextFolder as Folder<TData>;
    }
    return currFolder
      .add(new Folder<TData>(folderName, path))
      .find(folderName) as Folder<TData>;
  }
}
