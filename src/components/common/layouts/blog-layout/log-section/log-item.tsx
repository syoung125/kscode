import styled from "styled-components";

import { BLUE } from "@src/common/constants/palette";
import { Post } from "@src/common/types/post.type";

export type LogItemProps = {
  currPost: Pick<Post, "id" | "meta">;
  prevPost: Pick<Post, "id" | "meta"> | null;
};

function LogItem({ currPost, prevPost }: LogItemProps) {
  const currDate = new Date(currPost.meta.date);
  const prevDate = prevPost ? new Date(prevPost.meta.date) : null;

  const showYear = prevDate?.getFullYear() !== currDate.getFullYear();
  const showMonth = prevDate?.getMonth() !== currDate.getMonth();
  const showDate = prevDate?.getDate() !== currDate.getDate();

  const getMonthText = () => {
    return currDate.toLocaleString("default", { month: "short" });
  };

  const renderYear = () => (
    <YearWrapper isFirst={!prevPost}>
      <Year>{currDate.getFullYear()}</Year>
    </YearWrapper>
  );

  return (
    <>
      {showYear && renderYear()}
      <Wrapper className="logItem" data-id={currPost.id}>
        <Month>{showMonth ? getMonthText() : ""}</Month>
        <_Date>{showDate ? currDate.getDate() : ""}</_Date>
        <Pin>
          <Line />
          <Dot />
        </Pin>
        <Title>{currPost.meta.title}</Title>
      </Wrapper>
    </>
  );
}

export default LogItem;

const YearWrapper = styled.li<{ isFirst: boolean }>`
  flex-shrink: 0;

  width: 100%;

  padding: 0 0.8rem;
  margin-bottom: 0.4rem;

  ${({ isFirst }) => !isFirst && `margin-top: 0.8rem;`};
`;

const Year = styled.b`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Wrapper = styled.li`
  flex-shrink: 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 2rem;

  padding: 0 0.8rem;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.scheme.$gray300}`};
  }
`;

const Month = styled.b`
  flex-shrink: 0;
  width: 3rem;

  font-size: 1.2rem;
  font-weight: bold;
`;

const _Date = styled.span`
  flex-shrink: 0;
  width: 1.4rem;

  font-size: 0.8rem;
`;

const Title = styled.span`
  flex: 1;

  margin-left: 0.8rem;

  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Pin = styled.div`
  position: relative;

  flex-shrink: 0;
  width: 1.6rem;
  height: 100%;
`;

const Line = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  width: 0.1rem;
  height: 100%;

  background-color: ${BLUE};
`;

const Dot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;

  background-color: ${BLUE};
`;
