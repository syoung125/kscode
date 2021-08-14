import { PostSlug } from "@src/common/types/post.type";

export interface IAppContext {
  state: {
    postSlugs: PostSlug[];
    openPostSlugs: PostSlug[];
    currentSlugs: PostSlug | null;
  };
  action: {
    handleListItemClick: (id: string) => void;
    closePost: (id: string) => void;
  };
}
