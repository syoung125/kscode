import { useEffect } from "react";

import { BlogLayout } from "@src/components/common/layouts";
import { OpenPostTabs, Breadcrumbs, PostTemplate } from "@src/components/blog";

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
    <BlogLayout>
      <OpenPostTabs />
      <Breadcrumbs path={post.id} />
      <PostTemplate post={post} />
    </BlogLayout>
  );
}

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
