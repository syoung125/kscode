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
          {openPostSlugs.map((slug) => (
            <SingleDepthListItem
              key={slug.id}
              id={slug.id}
              slug={slug.slug}
              isSelected={currentSlugs?.id === slug.id}
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
          {postSlugs.map((slug) => (
            <SingleDepthListItem
              key={slug.id}
              id={slug.id}
              slug={slug.slug}
              isSelected={currentSlugs?.id === slug.id}
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
