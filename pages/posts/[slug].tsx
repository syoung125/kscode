import MainLayout from "@src/component/common/layouts/main-layout";

import { getPostBySlug, getPostSlugs, PostType } from "@src/api/posts";

function PostDetail({ post }: { post: PostType }) {
  const { title, content } = post;

  return (
    <MainLayout>
      {title}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </MainLayout>
  );
}

export default PostDetail;

export async function getStaticPaths() {
  const paths = await getPostSlugs();
  return {
    paths: paths.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const post: PostType = await getPostBySlug(context.params.slug);
  return {
    props: {
      post,
    },
  };
}
