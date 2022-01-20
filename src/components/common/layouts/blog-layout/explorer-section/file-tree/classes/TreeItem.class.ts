export class TreeItem<TData = unknown> {
  constructor(
    private _name: string,
    private _path: string = "",
    private _data?: TData
  ) {
    this._name = _name;
    this._path = _path;
    this._data = _data;
  }

  get name(): string {
    return this._name;
  }

  get path(): string {
    return this._path;
  }

  get data(): TData | undefined {
    return this._data;
  }
}

export class File<TData = unknown> extends TreeItem<TData> {}

export class Folder<TData = unknown> extends TreeItem<TData> {
  private _children: Array<TreeItem<TData>> = [];

  add(treeItem: TreeItem<TData>): Folder<TData> {
    this._children.push(treeItem);
    return this;
  }

  find(folderName: string): TreeItem<TData> | undefined {
    return this._children.find((v) => v.name === folderName);
  }

  get children(): Array<TreeItem<TData>> {
    return this._children;
  }
}

export const isFolder = (item: TreeItem): item is Folder => {
  return (item as Folder).children !== undefined;
};
