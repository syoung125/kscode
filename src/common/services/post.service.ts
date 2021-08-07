import matter from "gray-matter";
import marked from "marked";

import { PostMeta, PostSlug, Post } from "../types/post.type";

const getPostSlugList = async () => {
  // request only markdown files which is ending with .md
  // eslint-disable-next-line no-undef
  const context = require.context("src/contents/posts", true);

  let result: PostSlug[] = [];
  await context.keys().forEach(async (key) => {
    const path = key.slice(2); // 맨 앞 './' 문자열 제거
    const splittedPaths: string[] = path.split("/");
    const slug = splittedPaths[splittedPaths.length - 1];

    result.push({ id: path, slug });
  });
  return result;
};

const getPost = async (id: string): Promise<Post> => {
  const fileContent = await import(`@src/contents/posts/${id}`);
  const meta = matter(fileContent.default);
  const markdown = marked(meta.content);

  return {
    id,
    content: {
      meta: meta.data as PostMeta,
      markdown,
    },
  };
};

const PostService = {
  getPostSlugList,
  getPost,
};

export default PostService;
