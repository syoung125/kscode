import { useEffect } from "react";
import styled from "styled-components";
import prismjs from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import { breakpoints } from "@src/styles/theme";
import { Post } from "@src/types/post.type";
import Tag from "@src/components/common/tag";

import { postContentsStyles } from "./post-contents.style";

export type PostTemplateProps = {
  post: Post;
};

export default function PostTemplate({ post }: PostTemplateProps) {
  const {
    meta: { title, date, tags },
    html,
  } = post;

  useEffect(() => {
    prismjs.highlightAll();
  }, []);

  return (
    <Wrapper>
      <Article>
        <Header>
          <Title>{title}</Title>
          <Bio>
            <Avatar src="/images/avatar.png" />
            <Author>Seoyoung Ko</Author>
            <Date>{date}</Date>
          </Bio>
        </Header>
        {!!tags && (
          <Tags>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        )}
        <PostContents
          className="postContents"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Article>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;

  overflow-x: hidden;
  overflow-y: auto;
`;

const Article = styled.article`
  padding: 1.6rem 1.4rem;
  max-width: 700px;

  margin: 0 auto;

  ${breakpoints.medium} {
    padding: 1.4rem 1.2rem;
    max-width: 100%;
  }
`;

const Header = styled.header`
  padding-bottom: 1.2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.scheme.$gray400};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;

  letter-spacing: -0.004em;
  line-height: 1.5;

  white-space: break-spaces;

  margin-bottom: 1.6rem;

  ${breakpoints.medium} {
    font-size: 2.2rem;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.img`
  width: 1.8rem;
  height: 1.8rem;

  border-radius: 50%;
`;

const Author = styled.b`
  font-size: 1.2rem;
  font-weight: 500;

  margin-left: 0.4rem;
`;

const Date = styled.p`
  font-size: 1.2rem;
  font-weight: 300;

  padding-left: 0.4rem;
  margin-left: 0.4rem;
  border-left: 1px solid ${({ theme }) => theme.colors.scheme.$gray100};
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: 1.2rem;
`;

const PostContents = styled.div`
  margin-top: 2rem;

  ${postContentsStyles}
`;
