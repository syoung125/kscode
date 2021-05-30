import matter from "gray-matter";
import marked from "marked";

export type PostSlugType = {
  slug: string;
  title: string;
};

export type PostType = {
  title: string;
  date: string;
  content: string;
};

export const getPostSlugs = async () => {
  const context = require.context("@src/content/posts", false, /\.md$/);
  let posts: PostSlugType[] = [];
  context.keys().forEach(async (key) => {
    const post = key.slice(2);
    const content = await import(`@src/content/posts/${post}`);
    const meta = matter(content.default);

    posts.push({
      slug: post.replace(".md", ""),
      title: meta.data.title,
    });
  });

  return posts;
};

export const getPostBySlug = async (slug: string): Promise<PostType> => {
  const fileContent = await import(`@src/content/posts/${slug}.md`);
  const meta = matter(fileContent.default);
  const content = marked(meta.content);

  return {
    title: meta.data.title,
    date: meta.data.date,
    content: content,
  };
};
