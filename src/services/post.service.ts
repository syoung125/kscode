import matter from "gray-matter";

import { Post, PostMeta } from "@src/types/post.type";
import { parseMarkdown } from "@src/helpers/markdown.helper";
import { removeOrderNumber } from "@src/helpers/regex";

type PostFilter = {
  tag?: string;
};

const filterPosts = (posts: Post[], filter: PostFilter): Post[] => {
  if (!filter) {
    return posts;
  }

  const { tag } = filter;

  let filteredPosts = posts;

  if (tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.meta.tags?.includes(tag)
    );
  }

  return filteredPosts;
};

const getPosts = async (filter?: PostFilter): Promise<Post[]> => {
  // request only markdown files which is ending with .md
  const context = require.context("contents/blog", true);

  let posts: Post[] = [];
  await Promise.all(
    context.keys().map(async (key) => {
      const path = key.slice(2); // 맨 앞 './' 문자열 제거
      const post = await getPost(path);
      posts.push(post);
    })
  );

  const publicPosts = posts.filter((post) => !post.meta.isPrivate);

  return filter ? filterPosts(publicPosts, filter) : publicPosts;
};

const getDisplayPath = (path: string) => {
  const paths = path.split("/");
  return paths.map((v) => removeOrderNumber(v)).join("/");
};

const getPost = async (id: string): Promise<Post> => {
  const { default: markdown } = await import(`contents/blog/${id}`);
  const { data, content } = matter(markdown);

  return {
    id,
    displayPath: getDisplayPath(id),
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
