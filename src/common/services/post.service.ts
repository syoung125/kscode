import matter from "gray-matter";

import { parseMarkdown } from "../helpers";

import { Post, PostMeta } from "../types/post.type";

const getPosts = async (): Promise<Post[]> => {
  // request only markdown files which is ending with .md
  const context = require.context("src/contents/blog", true);

  let posts: Post[] = [];
  await context.keys().forEach(async (key) => {
    const path = key.slice(2); // 맨 앞 './' 문자열 제거
    const post = await getPost(path);
    posts.push(post);
  });
  return posts;
};

const getPost = async (id: string): Promise<Post> => {
  const { data, content } = matter.read(`src/contents/blog/${id}`);

  return {
    id,
    meta: {
      ...(data as PostMeta),
      description:
        data.description ?? content.split("\n").slice(0, 4).join(" "),
    },
    html: parseMarkdown(content),
  };
};

const PostService = {
  getPosts,
  getPost,
};

export default PostService;
