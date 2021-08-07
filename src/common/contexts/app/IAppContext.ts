import { PostSlug } from "@src/common/types/post.type";

export interface IAppContext {
  state: {
    selectedActionItem: number;
    postSlugs: PostSlug[];
    openPostSlugs: PostSlug[];
    currentSlugs: PostSlug | null;
  };
  action: {
    setSelectedActionItem: (selectedActionItem: number) => void;
    handleListItemClick: (selectedId: string) => void;
    closePost: (selectedId: string) => void;
  };
}
