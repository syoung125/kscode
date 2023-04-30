export type PostMeta = {
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
  tags?: string[];
  isPrivate?: boolean;
};

export type Post = {
  /** id is post file path */
  id: string;
  meta: PostMeta;
  html: string;
};
