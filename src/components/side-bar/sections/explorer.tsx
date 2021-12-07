import styled from "styled-components";

import { FileTree } from "@src/components/common/organisms";
import { AccordionSection } from "@src/components/common/molecules";
import {
  SingleDepthListItem,
  ListItemHeight,
} from "@src/components/common/atoms";

import { useAppContext } from "@src/common/contexts/app";
import { getFileName } from "@src/common/helpers";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default function ExplorerSection() {
  const {
    state: { openPostPaths, postPaths, currentPostPath },
    action: { selectPost, closePost },
  } = useAppContext();

  return (
    <Wrapper>
      <AccordionSection
        title="OPEN POSTS"
        maxHeight={`calc(${ListItemHeight}* ${openPostPaths.length})`}
      >
        <ul style={{ whiteSpace: "nowrap" }}>
          {openPostPaths.map((path) => (
            <SingleDepthListItem
              key={path}
              title={getFileName(path)}
              isSelected={currentPostPath === path}
              onClick={() => selectPost(path)}
              onClose={() => closePost(path)}
              showCloseButton
            />
          ))}
        </ul>
      </AccordionSection>
      <AccordionSection title="KSCODE" defaultExpanded>
        <FileTree
          filePaths={postPaths}
          selectedFilePath={currentPostPath}
          onFileClick={selectPost}
        />
      </AccordionSection>
    </Wrapper>
  );
}
