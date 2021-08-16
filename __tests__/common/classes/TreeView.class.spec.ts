import { Folder, File, TreeItem, TreeView } from "../../../src/common/classes";

describe("TreeView", () => {
  it("createTree", () => {
    const treeView = new TreeView([
      "chapter1/hi.md",
      "chapter2/aaa/111.md",
      "chapter2/222.md",
      "hello.md",
    ]);

    const result: TreeItem[] = [
      new Folder("chapter1", "chapter1").add(
        new File("hi.md", "chapter1/hi.md")
      ),
      new Folder("chapter2", "chapter2")
        .add(
          new Folder("aaa", "chapter2/aaa").add(
            new File("111.md", "chapter2/aaa/111.md")
          )
        )
        .add(new File("222.md", "chapter2/222.md")),
      new File("hello.md", "hello.md"),
    ];

    expect(treeView.root.children).toStrictEqual(result);
  });
});
