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

  private splitPath(path: string) {
    return path.split("/").filter((v) => !!v);
  }

  addFile(path: string, data?: TData) {
    const paths = this.splitPath(path);
    const leafFolderPath = paths.slice(0, paths.length - 1).join("/");
    this.accessToFolder(leafFolderPath).add(new File<TData>(path, data));
    return this;
  }

  accessToFolder(path: string) {
    if (!path || path === "/") {
      return this.root;
    }

    const paths = this.splitPath(path);
    return paths.reduce((currentRoot, _, i) => {
      const currentPath = paths.slice(0, i + 1).join("/");
      const currentFoler = currentRoot.find(currentPath);
      return currentFoler == null
        ? (currentRoot
            .add(new Folder<TData>(currentPath))
            .find(currentPath) as Folder<TData>)
        : (currentFoler as Folder<TData>);
    }, this.root);
  }
}
