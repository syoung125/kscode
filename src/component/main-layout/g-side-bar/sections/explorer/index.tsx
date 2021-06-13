import styled from "styled-components";

import OpenPostListPanel from "./panels/open-post-list";
import AllPostListPanel from "./panels/all-post-list";

function ExplorerSection() {
  return (
    <Wrapper>
      <OpenPostListPanel />
      <AllPostListPanel />
    </Wrapper>
  );
}

export default ExplorerSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
