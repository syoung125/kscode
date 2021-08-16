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
              id={path}
              slug={getFileName(path)}
              isSelected={currentPostPath === path}
              onClick={selectPost}
              showCloseButton
              onClose={closePost}
            />
          ))}
        </ul>
      ),
    },
    {
      title: "KSCODE",
      defaultExpanded: true,
      children: (
        <ul style={{ whiteSpace: "nowrap" }}>
          {postPaths.map((path) => (
            <SingleDepthListItem
              key={path}
              id={path}
              slug={path}
              isSelected={currentPostPath === path}
              onClick={selectPost}
            />
          ))}
        </ul>
      ),
    },
  ];

  return <Accordion items={explorerAccordionData} />;
}

export default ExplorerSection;
