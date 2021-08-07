import Panel from "@src/components/common/molecules/panel";
import { SingleDepthListItem } from "@src/components/common/atoms";

import { useAppContext } from "@src/contexts/app";

import { ListItemHeight } from "@src/components/common/atoms/list-item/single-depth";

function OpenPostListPanel() {
  const {
    state: { openPostSlugs, currentSlugs },
    action: { handleListItemClick, closePost },
  } = useAppContext();

  return (
    <Panel
      header="OPEN POSTS"
      maxHeight={`calc(${ListItemHeight}* ${openPostSlugs.length})`}
    >
      <ul style={{ whiteSpace: "nowrap" }}>
        {openPostSlugs.map((slug) => (
          <SingleDepthListItem
            key={slug}
            slug={slug}
            isSelected={currentSlugs === slug}
            onClick={handleListItemClick}
            showCloseButton
            onClose={closePost}
          />
        ))}
      </ul>
    </Panel>
  );
}

export default OpenPostListPanel;
