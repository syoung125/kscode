import { useEffect } from "react";
import styled from "styled-components";

import {
  OpenPostTabs,
  Breadcrumbs,
  PostTemplate,
} from "@src/components/blog-detail";

import PostService from "@src/services/post.service";
import { Post } from "@src/types/post.type";
import { useAppContext } from "@src/contexts/app";
import SEO, { getBlogJSONLD } from "@src/components/common/seo";

export type PostDetailPageProps = {
  id: string;
  post: Post;
};

export default function PostDetailPage({ id, post }: PostDetailPageProps) {
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

  const path = `/blog/${id}`;
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
  const posts = await PostService.getPosts();
  const paths = posts.map((post) => ({ params: { id: post.id.split("/") } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { id: string[] } }) {
  const id = context.params.id.join("/");
  const post: Post = await PostService.getPost(id);
  return {
    props: {
      id,
      post,
    },
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
