import Panel from "@src/component/common/molecules/panel";
import { SingleDepthListItem } from "@src/component/common/atom";

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
