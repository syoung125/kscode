import { getPostBySlug, getPostSlugs, PostType } from "@src/api/posts";

export type PostDetailProps = {
  post: PostType;
};

function PostDetail({ post }: PostDetailProps) {
  if (!post) {
    return null;
  }

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
    paths: paths.map((slug) => ({
      params: { slug: slug.split("/") },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string[] } }) {
  const post: PostType = await getPostBySlug(context.params.slug.join("/"));
  return {
    props: {
      post,
    },
  };
}
