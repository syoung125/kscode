import { AccountIcon, SettingsGearIcon } from "@src/components/common/icons";
import { ThemeSwitcher } from "@src/components/common/molecules";

import { ACTION_ITEMS } from "../action-items";

import ActionItem from "./action-item";

import Style from "./index.style";

export type ActivityBarProps = {
  selectedActionItem: number | null;
  onSelectedActionItemChange: (index: number | null) => void;
};

export default function ActivityBar({
  selectedActionItem,
  onSelectedActionItemChange,
}: ActivityBarProps) {
  const handleActionItemClick = (index: number) => () => {
    onSelectedActionItemChange(index === selectedActionItem ? null : index);
  };

  const renderActionItems = () => {
    return ACTION_ITEMS.map(({ label, Icon }, index) => (
      <ActionItem
        key={label}
        Icon={Icon}
        onClick={handleActionItemClick(index)}
        isSelected={index === selectedActionItem}
      />
    ));
  };

  return (
    <Style.Wrapper>
      <Style.Ul>{renderActionItems()}</Style.Ul>
      <Style.Ul>
        <ThemeSwitcher />
        <ActionItem Icon={AccountIcon} onClick={() => null} />
        <ActionItem Icon={SettingsGearIcon} onClick={() => null} />
      </Style.Ul>
    </Style.Wrapper>
  );
}
