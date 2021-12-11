import { Post } from "@src/common/types/post.type";

import Style from "./PostTemplate.style";

export type PostTemplateProps = {
  post: Post;
};

export default function PostTemplate({ post }: PostTemplateProps) {
  const {
    content: {
      meta: { title, date },
      html,
    },
  } = post;

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
          className="post-contents"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Style.Article>
    </Style.Wrapper>
  );
}
