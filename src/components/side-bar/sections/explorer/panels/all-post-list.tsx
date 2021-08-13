import {
  AccordionItem,
  SingleDepthListItem,
} from "@src/components/common/atoms";

import { useAppContext } from "@src/common/contexts/app";

function AllPostListPanel() {
  const {
    state: { postSlugs, currentSlugs },
    action: { handleListItemClick },
  } = useAppContext();

  return (
    <AccordionItem title="KSCODE" defaultExpanded={true} hasLine>
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
    </AccordionItem>
  );
}

export default AllPostListPanel;
