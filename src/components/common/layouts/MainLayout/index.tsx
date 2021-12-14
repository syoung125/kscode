import { ReactNode, useState } from "react";

import ActivityBar from "./ActivityBar";
import SideBar from "./SideBar";

import Style from "./index.style";

export type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
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
        <Style.Main>{children}</Style.Main>
      </Style.Row>
      <Style.Footer />
    </Style.Wrapper>
  );
}
