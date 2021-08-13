import { PostSlug } from "@src/common/types/post.type";

export interface IAppContext {
  state: {
    postSlugs: PostSlug[];
    openPostSlugs: PostSlug[];
    currentSlugs: PostSlug | null;
  };
  action: {
    handleListItemClick: (selectedId: string) => void;
    closePost: (selectedId: string) => void;
  };
}
