export interface IAppContext {
  state: {
    selectedActionItem: number;
    postSlugs: string[];
    openPostSlugs: string[];
    currentSlugs: string;
  };
  action: {
    setSelectedActionItem: (selectedActionItem: number) => void;
    handleListItemClick: (selectedSlug: string) => void;
    closePost: (selectedSlug: string) => void;
  };
}
