import OpenPostTab from "./OpenPostTab";

import { useAppContext } from "@src/common/contexts/app";
import { getFileName } from "@src/common/helpers";

import Style from "./index.style";

export default function OpenPostTabs() {
  const {
    state: { openPostPaths, currentPostPath },
    action: { selectPost, closePost },
  } = useAppContext();

  return (
    <Style.Wrapper>
      {openPostPaths.map((path) => (
        <OpenPostTab
          key={path}
          title={getFileName(path)}
          isSelected={currentPostPath === path}
          onClick={() => selectPost(path)}
          onClose={() => closePost(path)}
        />
      ))}
    </Style.Wrapper>
  );
}
