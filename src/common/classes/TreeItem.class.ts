export class TreeItem {
  constructor(private _name: string, private _path: string = "") {
    this._name = _name;
    this._path = _path;
  }

  get name(): string {
    return this._name;
  }

  get path(): string {
    return this._path;
  }
}

export class File extends TreeItem {
  constructor(name: string, path: string = "") {
    super(name, path);
  }
}

export class Folder extends TreeItem {
  private _children: Array<TreeItem> = [];

  constructor(name: string, path: string = "") {
    super(name, path);
  }

  add(treeItem: TreeItem): Folder {
    this._children.push(treeItem);
    return this;
  }

  find(folderName: string): TreeItem | undefined {
    return this._children.find((v) => v.name === folderName);
  }

  get children(): Array<TreeItem> {
    return this._children;
  }
}

export const isFolder = (item: TreeItem): item is Folder => {
  return (item as Folder).children !== undefined;
};
