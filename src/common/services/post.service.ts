import matter from "gray-matter";

import { parseMarkdown } from "../helpers";

import { PostMeta, Post } from "../types/post.type";

const getPostPaths = async (): Promise<string[]> => {
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
  const file = matter.read(`src/contents/blog/${id}`);

  return {
    id,
    content: {
      meta: file.data as PostMeta,
      html: parseMarkdown(file.content),
    },
  };
};

const PostService = {
  getPostPaths,
  getPost,
};

export default PostService;
