const postMetaTypes = ["title", "date", "thumbnail"] as const;
export type PostMetaType = typeof postMetaTypes[number];
export type PostMeta = Record<PostMetaType, string>;

export type Post = {
  /** id is post file path */
  id: string;
  meta: PostMeta;
  html: string;
};
