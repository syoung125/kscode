import matter from "gray-matter";
import fs from "fs";

import { parseMarkdown } from "../../helpers";

import { Post, PostFilter, PostMeta } from "../../types/post.type";

const filterPosts = (
  posts: Post[],
  filter?: Omit<PostFilter, "metaOnly">
): Post[] => {
  let filteredPosts = posts;

  // 공개 post만 필터링
  filteredPosts = posts.filter((post) => !post.meta.isPrivate);

  if (filter?.tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.meta.tags?.includes(filter.tag!)
    );
  }

  return filteredPosts;
};

const getPosts = async (filter: PostFilter = {}): Promise<Post[]> => {
  const { metaOnly = false } = filter;

  // request only markdown files which is ending with .md
  const context = require.context("contents/blog", true);

  let posts: Post[] = [];
  await Promise.all(
    context.keys().map(async (key) => {
      const path = key.slice(2); // 맨 앞 './' 문자열 제거
      const post = await getPost(path, { metaOnly });
      posts.push(post);
    })
  );

  return filterPosts(posts, filter);
};

const generatePostPath = (id: string) => {
  return `contents/blog/${id}`;
};

const getDefaultDescription = (content: string) => {
  return content.split("\n").slice(0, 4).join(" ");
};

type GetPostOptions = {
  metaOnly?: boolean;
};

const getPost = async (
  id: string,
  options: GetPostOptions = {}
): Promise<Post> => {
  const { metaOnly = false } = options;

  const markdown: string = fs.readFileSync(generatePostPath(id), {
    encoding: "utf8",
  });
  const { data, content } = matter(markdown);
  const meta = data as PostMeta;

  return {
    id,
    meta: {
      ...meta,
      description: meta.description ?? getDefaultDescription(content),
    },
    html: metaOnly ? "" : parseMarkdown(content),
  };
};

const PostService = {
  getPosts,
  getPost,
};

export default PostService;
