export interface IAppContext {
  state: {
    postSlugs: string[];
    openPostSlugs: string[];
    selectedActionItem: number;
  };
  action: {
    setSelectedActionItem: (selectedActionItem: number) => void;
  };
}
