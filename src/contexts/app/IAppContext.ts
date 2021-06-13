import { PostSlugType } from "@src/api/posts";

export interface IAppContext {
  state: {
    postSlugs: PostSlugType[];
    selectedActionItem: number;
  };
  action: {
    setSelectedActionItem: (selectedActionItem: number) => void;
  };
}
