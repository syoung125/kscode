const postMetaTypes = ["title", "date", "description"] as const;
export type PostMetaType = typeof postMetaTypes[number];
export type PostMeta = Record<PostMetaType, string>;

export type PostContent = {
  meta: PostMeta;
  html: string;
};

export type Post = {
  /** id is post file path */
  id: string;
  content: PostContent;
};
