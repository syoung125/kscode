import {
  AccordionItem,
  SingleDepthListItem,
} from "@src/components/common/atoms";

import { useAppContext } from "@src/common/contexts/app";

import { ListItemHeight } from "@src/components/common/atoms/list-item/single-depth";

function OpenPostListPanel() {
  const {
    state: { openPostSlugs, currentSlugs },
    action: { handleListItemClick, closePost },
  } = useAppContext();

  return (
    <AccordionItem
      title="OPEN POSTS"
      maxHeight={`calc(${ListItemHeight}* ${openPostSlugs.length})`}
    >
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
    </AccordionItem>
  );
}

export default OpenPostListPanel;
