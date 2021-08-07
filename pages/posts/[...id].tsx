import PostService from "@src/common/services/post.service";
import { Post } from "@src/common/types/post.type";

export type PostDetailProps = {
  post: Post;
};

function PostDetail({ post }: PostDetailProps) {
  if (!post) {
    return null;
  }

  const {
    id,
    content: {
      meta: { title, date },
      markdown,
    },
  } = post;

  return (
    <>
      <p>{id}</p>
      <br />
      <h1>{title}</h1>
      <p>({date})</p>
      <br />
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
    </>
  );
}

export default PostDetail;

export async function getStaticPaths() {
  const paths = await PostService.getPostSlugList();
  return {
    paths: paths.map(({ id }) => ({
      params: { id: id.split("/") },
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
