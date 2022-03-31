import styled, { css } from "styled-components";
import Link from "next/link";

import Tag from "@src/components/common/tag";
import { Post } from "@src/types/post.type";

type PostListItemProps = Post & {
  className?: string;
};

const DefaultImg = () => {
  return (
    <DefaultImgWrapper>
      <img src="/images/memo.png" alt="" />
    </DefaultImgWrapper>
  );
};

export default function PostListItem({
  className,
  id,
  meta,
}: PostListItemProps) {
  const visibleTagCount = 3;
  const extraTagCount = meta.tags ? meta.tags.length - visibleTagCount : 0;

  return (
    <Link href={`blog/${id}`} passHref>
      <Wrapper className={className}>
        <Row>
          {meta.thumbnail ? (
            <Img src={meta.thumbnail} alt="" />
          ) : (
            <DefaultImg />
          )}
          <Info>
            <b>{meta.title}</b>
            <p>{meta.description}</p>
          </Info>
        </Row>
        <Tags>
          {meta.tags?.slice(0, visibleTagCount).map((tag) => (
            <Tag key={tag} clickable={false}>
              {tag}
            </Tag>
          ))}
          {extraTagCount > 0 && (
            <Tag clickable={false}>{`+${extraTagCount}`}</Tag>
          )}
        </Tags>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.a`
  padding: 1rem;
  padding-bottom: 0.2rem;
  border-radius: 1rem;
  margin-bottom: 1.2rem;

  background-color: ${({ theme }) => theme.colors.scheme.$gray400};
  transform: scale(0.96);

  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.scheme.$gray500};
    transform: scale(1);
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Info = styled.div`
  margin-left: 0.8rem;

  overflow: hidden;
  text-overflow: ellipsis;

  > b {
    font-size: 1.3rem;

    white-space: nowrap;
    overflow: hidden;
  }

  > p {
    margin-top: 0.4rem;

    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const imgStyles = css`
  width: 6rem;
  height: 6rem;

  flex-shrink: 0;
`;

const Img = styled.img`
  ${imgStyles}

  object-fit: cover;
`;

const DefaultImgWrapper = styled.div`
  ${imgStyles}

  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.scheme.$gray200};

  > img {
    width: 40%;
    height: 40%;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.8rem;
`;
