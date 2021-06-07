import styled from "styled-components";

import { ActivityBar, TRANSPARENT } from "../../../atom/colors";

import { ActionItemType } from ".";

export type ActionItemProps = Pick<ActionItemType, "Icon"> & {
  onClick: () => void;
  isSelected?: boolean;
};

function ActionItem({ onClick, Icon, isSelected }: ActionItemProps) {
  return (
    <Wrapper
      onClick={onClick}
      style={{
        borderLeft: `0.16rem solid ${
          isSelected ? ActivityBar.foreground : TRANSPARENT
        }`,
      }}
    >
      <Icon
        style={{ width: "1.4rem", heigth: "1.4rem" }}
        fill={
          isSelected ? ActivityBar.foreground : ActivityBar.inactiveForeground
        }
      />
    </Wrapper>
  );
}

export default ActionItem;

const Wrapper = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  margin-bottom: 0.4rem;
`;
