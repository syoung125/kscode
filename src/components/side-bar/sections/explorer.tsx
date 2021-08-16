import { FileTree } from "@src/components/common/organisms";
import { Accordion, AccordionDataType } from "@src/components/common/molecules";
import {
  SingleDepthListItem,
  ListItemHeight,
} from "@src/components/common/atoms";

import { useAppContext } from "@src/common/contexts/app";
import { getFileName } from "@src/common/helpers";

function ExplorerSection() {
  const {
    state: { openPostPaths, postPaths, currentPostPath },
    action: { selectPost, closePost },
  } = useAppContext();

  const explorerAccordionData: AccordionDataType[] = [
    {
      title: "OPEN POSTS",
      maxHeight: `calc(${ListItemHeight}* ${openPostPaths.length})`,
      children: (
        <ul style={{ whiteSpace: "nowrap" }}>
          {openPostPaths.map((path) => (
            <SingleDepthListItem
              key={path}
              title={getFileName(path)}
              isSelected={currentPostPath === path}
              onClick={() => selectPost(path)}
              onClose={() => closePost(path)}
              showCloseButton
            />
          ))}
        </ul>
      ),
    },
    {
      title: "KSCODE",
      defaultExpanded: true,
      children: (
        <FileTree
          filePaths={postPaths}
          selectedFilePath={currentPostPath}
          onFileClick={selectPost}
        />
      ),
    },
  ];

  return <Accordion items={explorerAccordionData} />;
}

export default ExplorerSection;
