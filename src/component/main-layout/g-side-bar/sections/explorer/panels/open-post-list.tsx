import Panel from "@src/component/common/molecules/panel";
import { SingleDepthListItem } from "@src/component/common/atom";

import { useAppContext } from "@src/contexts/app";

import { ListItemHeight } from "@src/component/common/atom/list-item/single-depth";

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
