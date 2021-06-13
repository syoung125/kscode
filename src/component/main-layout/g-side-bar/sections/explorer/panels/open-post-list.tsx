import Link from "next/link";

import Panel from "@src/component/common/molecules/panel";

import { useAppContext } from "@src/contexts/app";

function OpenPostListPanel() {
  const {
    state: { openPostSlugs },
  } = useAppContext();

  return (
    <Panel header="OPEN POSTS">
      <ul style={{ whiteSpace: "nowrap" }}>
        {openPostSlugs.map((slug) => (
          <Link href={`/posts/${slug}`}>
            <li>{slug}</li>
          </Link>
        ))}
      </ul>
    </Panel>
  );
}

export default OpenPostListPanel;
