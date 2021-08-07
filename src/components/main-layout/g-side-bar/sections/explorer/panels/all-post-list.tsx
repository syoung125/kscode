import Panel from "@src/components/common/molecules/panel";
import { SingleDepthListItem } from "@src/components/common/atom";

import { useAppContext } from "@src/contexts/app";

function AllPostListPanel() {
  const {
    state: { postSlugs, currentSlugs },
    action: { handleListItemClick },
  } = useAppContext();

  return (
    <Panel header="KSCODE" isActivated={true} hasLine>
      <ul style={{ whiteSpace: "nowrap" }}>
        {postSlugs.map((slug) => (
          <SingleDepthListItem
            key={slug}
            slug={slug}
            isSelected={currentSlugs === slug}
            onClick={handleListItemClick}
          />
        ))}
      </ul>
    </Panel>
  );
}

export default AllPostListPanel;
