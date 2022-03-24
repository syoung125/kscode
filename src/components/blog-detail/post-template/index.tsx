import { useEffect } from "react";
import prismjs from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import { Post } from "@src/types/post.type";

import Style from "./index.style";

export type PostTemplateProps = {
  post: Post;
};

export default function PostTemplate({ post }: PostTemplateProps) {
  const {
    meta: { title, date },
    html,
  } = post;

  useEffect(() => {
    prismjs.highlightAll();
  }, []);

  return (
    <Style.Wrapper>
      <Style.Article>
        <Style.Header>
          <Style.Title>{title}</Style.Title>
          <Style.Row>
            <Style.Avatar src="/images/avatar.png" />
            <Style.Author>Seoyoung Ko</Style.Author>
            <Style.Date>{date}</Style.Date>
          </Style.Row>
        </Style.Header>
        <Style.PostContents
          className="postContents"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Style.Article>
    </Style.Wrapper>
  );
}
