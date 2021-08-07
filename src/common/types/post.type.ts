export type PostSlug = {
  /** id is post file path */
  id: string;
  /** fileName without extension */
  slug: string;
};

const postMetaTypes = ["title", "date", "description"] as const;
export type PostMetaType = typeof postMetaTypes[number];
export type PostMeta = Record<PostMetaType, string>;

export type PostContent = {
  meta: PostMeta;
  markdown: string;
};

export type Post = {
  /** id is post file path */
  id: string;
  content: PostContent;
};
