import { ReactNode, useState } from "react";

import { Breadcrumbs } from "@src/components/blog";

import { useAppContext } from "@src/common/contexts/app";

import ActivityBar from "./ActivityBar";
import SideBar from "./SideBar";
import OpenPostTabs from "./OpenPostTabs";

import Style from "./MainLayout.style";

export type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const {
    state: { currentPostPath },
  } = useAppContext();

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
          <Breadcrumbs path={currentPostPath ?? ""} />
          <Style.Article>{children}</Style.Article>
        </Style.Main>
      </Style.Row>
      <Style.Footer />
    </Style.Wrapper>
  );
}

export default MainLayout;
