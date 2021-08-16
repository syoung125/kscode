import { PostSlug } from "@src/common/types/post.type";

export interface IAppContext {
  state: {
    postSlugs: PostSlug[];
    openPostSlugs: PostSlug[];
    currentSlugs: PostSlug | null;
  };
  action: {
    selectPost: (path: string) => void;
    closePost: (path: string) => void;
  };
}
