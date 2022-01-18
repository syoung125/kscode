import matter from "gray-matter";

import { parseMarkdown } from "../helpers";

import { Post, PostMeta } from "../types/post.type";

const getPosts = async (): Promise<Post[]> => {
  // request only markdown files which is ending with .md
  const context = require.context("src/contents/blog", true);

  let posts: Post[] = [];
  await Promise.all(
    context.keys().map(async (key) => {
      const path = key.slice(2); // 맨 앞 './' 문자열 제거
      const post = await getPost(path);
      posts.push(post);
    })
  );
  return posts;
};

const getPost = async (id: string): Promise<Post> => {
  const { default: markdown } = await import(`src/contents/blog/${id}`);
  const { data, content } = matter(markdown);

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
