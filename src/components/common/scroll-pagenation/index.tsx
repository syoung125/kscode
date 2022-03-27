import { ReactElement, useState, MouseEvent, useEffect, useRef } from "react";
import styled from "styled-components";

const DEFAULT_PAGE_SIZE = 20;

type ScrollPagenationProps<TData = any> = {
  data: TData[];
  pageSize?: number;
  renderItem: (curr: TData, prev?: TData) => ReactElement<HTMLLIElement>;
  onClick?: (e: MouseEvent) => void;
};

function ScrollPagenation({
  data: initialData,
  pageSize = DEFAULT_PAGE_SIZE,
  renderItem,
  onClick,
}: ScrollPagenationProps) {
  const wrapperRef = useRef<HTMLUListElement>(null);

  const [data, setData] = useState(initialData.slice(0, pageSize));
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setData(initialData.slice(0, pageSize));
  }, [initialData, pageSize]);

  const handleScroll = () => {
    if (!wrapperRef.current) {
      return;
    }
    const { scrollTop, clientHeight, scrollHeight } = wrapperRef.current;
    const scrollBottom = scrollTop + clientHeight;
    // 모든 스크롤을 내렸을 때
    if (scrollBottom >= scrollHeight) {
      loadMore();
    }
  };

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    wrapperRef.current.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef]);

  const getNextData = ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => {
    return initialData.slice(offset, offset + limit);
  };

  const loadMore = () => {
    if (hasMore) {
      setData((prevData) => {
        const nextData = getNextData({
          offset: prevData.length,
          limit: pageSize,
        });
        if (nextData.length < pageSize) {
          setHasMore(false);
          wrapperRef.current?.removeEventListener("scroll", handleScroll);
        }

        return [...prevData, ...nextData];
      });
    }
  };

  return (
    <Wrapper ref={wrapperRef} onClick={onClick}>
      {data.map((item, i) => renderItem(item, i === 0 ? null : data[i - 1]))}
    </Wrapper>
  );
}

export default ScrollPagenation;

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow-y: auto;
`;

const More = styled.div`
  width: 100%;
  height: 2rem;
  background-color: black;
`;
