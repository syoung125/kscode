import { useEffect } from "react";

import {
  OpenPostTabs,
  Breadcrumbs,
  PostTemplate,
} from "@src/components/blog-detail";

import PostService from "@src/common/services/post.service";
import { Post } from "@src/common/types/post.type";
import { useAppContext } from "@src/common/contexts/app";

export type PostDetailPageProps = {
  post: Post;
};

export default function PostDetailPage({ post }: PostDetailPageProps) {
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

  return (
    <>
      <OpenPostTabs />
      <Breadcrumbs path={post.id} />
      <PostTemplate post={post} />
    </>
  );
}

export async function getStaticPaths() {
  const posts = await PostService.getPosts();
  return {
    paths: posts.map((post) => ({ params: { id: post.id.split("/") } })),
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
