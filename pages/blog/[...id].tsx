import { useEffect } from "react";

import PostService from "@src/common/services/post.service";
import { Post } from "@src/common/types/post.type";
import { useAppContext } from "@src/common/contexts/app";

export type PostDetailProps = {
  post: Post;
};

function PostDetail({ post }: PostDetailProps) {
  const {
    action: { selectPost },
  } = useAppContext();

  useEffect(() => {
    selectPost(post?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) {
    return null;
  }

  const {
    content: {
      meta: { title, date },
      markdown,
    },
  } = post;

  return (
    <>
      <h1>
        {title} ({date})
      </h1>
      <br />
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
    </>
  );
}

export default PostDetail;

export async function getStaticPaths() {
  const paths = await PostService.getPostPaths();
  return {
    paths: paths.map((path) => ({
      params: { id: path.split("/") },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { id: string[] } }) {
  const post: Post = await PostService.getPost(context.params.id.join("/"));
  return {
    props: {
      post,
    },
  };
}
