import { Folder, File, TreeItem, TreeView } from ".";

describe("TreeView", () => {
  it("createTree", () => {
    const treeView = new TreeView([
      "chapter1/hi.md",
      "chapter2/aaa/111.md",
      "chapter2/222.md",
      "hello.md",
    ]);

    const result: TreeItem[] = [
      new Folder("chapter1").add(new File("chapter1/hi.md")),
      new Folder("chapter2")
        .add(new Folder("chapter2/aaa").add(new File("chapter2/aaa/111.md")))
        .add(new File("chapter2/222.md")),
      new File("hello.md"),
    ];

    expect(treeView.root.children).toStrictEqual(result);
  });
});
