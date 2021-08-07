import Panel from "@src/components/common/molecules/panel";
import { SingleDepthListItem } from "@src/components/common/atoms";

import { useAppContext } from "@src/common/contexts/app";

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
            key={slug.id}
            id={slug.id}
            slug={slug.slug}
            isSelected={currentSlugs?.id === slug.id}
            onClick={handleListItemClick}
          />
        ))}
      </ul>
    </Panel>
  );
}

export default AllPostListPanel;
