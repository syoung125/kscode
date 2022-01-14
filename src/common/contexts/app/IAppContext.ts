import { Post } from "@src/common/types/post.type";

export interface IAppContext {
  state: {
    posts: Post[];
    openPosts: Post[];
    currentPostId?: string | null;
  };
  action: {
    selectPost: (id: string) => void;
    closePost: (id: string) => void;
  };
}
