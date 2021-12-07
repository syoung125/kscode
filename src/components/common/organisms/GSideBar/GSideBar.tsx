import React, { useState } from "react";

import { AccountIcon, SettingsGearIcon } from "../../icons";

import ActionItem from "./ActionItem";
import ExpandedArea from "./ExpandedArea";

import Style from "./GSideBar.style";

import { ACTION_ITEMS } from "./action-items";

function GSideBar() {
  const [selectedActionItem, setSelectedActionItem] = useState<number | null>(
    0
  );

  const handleActionItemClick = (index: number) => () => {
    setSelectedActionItem(index === selectedActionItem ? null : index);
  };

  const renderActionItems = () =>
    ACTION_ITEMS.map(({ label, Icon }, index) => (
      <ActionItem
        key={label}
        Icon={Icon}
        onClick={handleActionItemClick(index)}
        isSelected={index === selectedActionItem}
      />
    ));

  const { label, Content } = ACTION_ITEMS[selectedActionItem ?? 0];
  return (
    <Style.Wrapper>
      <Style.ActivityBar>
        <ul>{renderActionItems()}</ul>
        <ul>
          <ActionItem Icon={AccountIcon} onClick={() => null} />
          <ActionItem Icon={SettingsGearIcon} onClick={() => null} />
        </ul>
      </Style.ActivityBar>
      {selectedActionItem != null && (
        <ExpandedArea
          title={label}
          onSelectedActionItemChange={setSelectedActionItem}
        >
          {Content}
        </ExpandedArea>
      )}
    </Style.Wrapper>
  );
}

export default GSideBar;
