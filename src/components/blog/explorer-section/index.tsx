import { AccordionSection } from "@src/components/blog";

import { useAppContext } from "@src/common/contexts/app";

import { OPEN_POST_LIST_ITEM_HEIGHT } from "./open-post-list/open-post-list-item";

import OpenPostList from "./open-post-list";
import FileTree from "./file-tree";

import Style from "./index.style";

export default function ExplorerSection() {
  const {
    state: { openPostPaths, postPaths, currentPostPath },
    action: { selectPost, closePost },
  } = useAppContext();

  return (
    <Style.Wrapper>
      <AccordionSection
        title="OPEN POSTS"
        maxHeight={`calc(${OPEN_POST_LIST_ITEM_HEIGHT}* ${openPostPaths.length})`}
        defaultExpanded
      >
        <OpenPostList
          openPostPaths={openPostPaths}
          currentPostPath={currentPostPath}
          selectPost={selectPost}
          closePost={closePost}
        />
      </AccordionSection>
      <AccordionSection title="KSCODE" defaultExpanded>
        <FileTree
          filePaths={postPaths}
          selectedFilePath={currentPostPath}
          onFileClick={selectPost}
        />
      </AccordionSection>
    </Style.Wrapper>
  );
}
