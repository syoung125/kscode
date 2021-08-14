import { Accordion, AccordionDataType } from "@src/components/common/molecules";
import {
  SingleDepthListItem,
  ListItemHeight,
} from "@src/components/common/atoms";

import { useAppContext } from "@src/common/contexts/app";

function ExplorerSection() {
  const {
    state: { openPostSlugs, postSlugs, currentSlugs },
    action: { handleListItemClick, closePost },
  } = useAppContext();

  const explorerAccordionData: AccordionDataType[] = [
    {
      title: "OPEN POSTS",
      maxHeight: `calc(${ListItemHeight}* ${openPostSlugs.length})`,
      children: (
        <ul style={{ whiteSpace: "nowrap" }}>
          {openPostSlugs.map(({ id, slug }) => (
            <SingleDepthListItem
              key={id}
              id={id}
              slug={slug}
              isSelected={currentSlugs?.id === id}
              onClick={handleListItemClick}
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
          {postSlugs.map(({ id, slug }) => (
            <SingleDepthListItem
              key={id}
              id={id}
              slug={slug}
              isSelected={currentSlugs?.id === id}
              onClick={handleListItemClick}
            />
          ))}
        </ul>
      ),
    },
  ];

  return <Accordion items={explorerAccordionData} />;
}

export default ExplorerSection;
