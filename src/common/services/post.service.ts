import matter from "gray-matter";
import marked from "marked";

import { PostMeta, Post } from "../types/post.type";

const getPostPaths = async () => {
  // request only markdown files which is ending with .md
  const context = require.context("src/contents/blog", true);

  let result: string[] = [];
  await context.keys().forEach(async (key) => {
    const path = key.slice(2); // 맨 앞 './' 문자열 제거
    result.push(path);
  });
  return result;
};

const getPost = async (id: string): Promise<Post> => {
  const fileContent = await import(`@src/contents/blog/${id}`);
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
  getPostPaths,
  getPost,
};

export default PostService;
