import Link from "next/link";

import Panel from "@src/component/common/molecules/panel";

import { useAppContext } from "@src/contexts/app";

function AllPostListPanel() {
  const {
    state: { postSlugs },
  } = useAppContext();

  return (
    <Panel header="KSCODE" isActivated={true} hasLine>
      <ul style={{ whiteSpace: "nowrap" }}>
        {postSlugs.map((slug) => (
          <Link href={`/posts/${slug}`}>
            <li>{slug}</li>
          </Link>
        ))}
      </ul>
    </Panel>
  );
}

export default AllPostListPanel;
