import { ReactNode, useState } from "react";

import ActivityBar from "./activity-bar";
import SideBar from "./side-bar";

import Style from "./index.style";

export type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
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