import { getPostBySlug, getPostSlugs, PostType } from "@src/api/posts";

function PostDetail({ post }: { post: PostType }) {
  const { title, date, content } = post;

  return (
    <>
      {title} ({date})
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
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
