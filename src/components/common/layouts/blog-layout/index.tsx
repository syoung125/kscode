import { ReactNode, useState } from "react";

import ActivityBar, { ACTION_ITEMS } from "./activity-bar";
import SideBar from "./side-bar";

import Style from "./index.style";

export type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  const [currentActionItem, setCurrentActionItem] = useState<number | null>(
    null
  );

  return (
    <Style.Wrapper>
      <Style.Header />
      <Style.Row>
        <ActivityBar
          currentActionItem={currentActionItem}
          onCurrentActionItemChange={setCurrentActionItem}
        />
        {currentActionItem != null && (
          <SideBar
            label={ACTION_ITEMS[currentActionItem].label}
            content={ACTION_ITEMS[currentActionItem].content}
            onClose={() => setCurrentActionItem(null)}
          />
        )}
        <Style.Main>{children}</Style.Main>
      </Style.Row>
      <Style.Footer />
    </Style.Wrapper>
  );
}
