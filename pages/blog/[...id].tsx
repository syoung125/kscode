import { useEffect } from "react";
import styled from "styled-components";

import {
  OpenPostTabs,
  Breadcrumbs,
  PostTemplate,
} from "@src/components/blog-detail";

import { Post } from "@src/types/post.type";
import { useAppContext } from "@src/contexts/app";
import SEO, { getBlogJSONLD } from "@src/components/common/seo";
import { GetStaticProps } from "next";
import { stringifyPostIdParam } from "@src/helpers/post";
import { getPost } from "@src/apis/getPost";
import { getPosts } from "@src/apis/getPosts";

export type PostDetailPageProps = {
  post: Post;
};

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const {
    action: { selectPost },
  } = useAppContext();

  const postId = post.id;

  useEffect(() => {
    selectPost(postId);
  }, []);

  const path = `/blog/${postId}`;
  const { title, description, thumbnail, date } = post.meta;

  const blogJSONLD = getBlogJSONLD({
    path,
    title,
    description,
    imageUrl: thumbnail,
    datePublished: date,
  });

  return (
    <>
      <SEO
        canonicalPath={path}
        title={title}
        description={description}
        imageUrl={thumbnail}
        type="article"
        jsonld={blogJSONLD}
      />
      <Wrapper>
        <OpenPostTabs />
        <Breadcrumbs path={post.id} title={title} />
        <PostTemplate post={post} />
      </Wrapper>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts({ metaOnly: true });
  const paths = posts.map((post) => ({ params: { id: post.id.split("/") } }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  PostDetailPageProps,
  { id: string | string[] }
> = async (context) => {
  if (!context.params?.id) {
    return {
      notFound: true,
    };
  }

  const postId = stringifyPostIdParam(context.params.id);
  const post: Post = await getPost(postId);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
