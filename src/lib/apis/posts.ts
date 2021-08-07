import matter from "gray-matter";
import marked from "marked";

export type PostType = {
  title: string;
  date: string;
  content: string;
};

export const getPostSlugs = async () => {
  // eslint-disable-next-line no-undef
  const context = require.context("@src/contents/posts", true);
  let posts: string[] = [];
  await context.keys().forEach(async (key) => {
    const post = key.slice(2); // 맨 앞 './' 문자열 제거
    posts.push(post);
  });
  return posts;
};

export const getPostBySlug = async (slug: string): Promise<PostType> => {
  const fileContent = await import(`@src/contents/posts/${slug}`);
  const meta = matter(fileContent.default);
  const content = marked(meta.content);

  return {
    title: meta.data.title,
    date: meta.data.date,
    content: content,
  };
};
