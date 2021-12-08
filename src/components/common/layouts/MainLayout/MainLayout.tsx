import { ReactNode, useState } from "react";

import ActivityBar from "./ActivityBar";
import SideBar from "./SideBar";
import OpenPostTabs from "./OpenPostTabs";

import Style from "./MainLayout.style";

export type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const [selectedActionItem, setSelectedActionItem] = useState<number | null>(
    0
  );

  return (
    <Style.Wrapper>
      <Style.Header />
      <Style.Row>
        <ActivityBar
          selectedActionItem={selectedActionItem}
          onSelectedActionItemChange={setSelectedActionItem}
        />
        <SideBar
          selectedActionItem={selectedActionItem}
          onSelectedActionItemChange={setSelectedActionItem}
        />
        <Style.Main>
          <OpenPostTabs />
          <Style.Article>{children}</Style.Article>
        </Style.Main>
      </Style.Row>
      <Style.Footer />
    </Style.Wrapper>
  );
}

export default MainLayout;
