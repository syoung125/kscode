export interface IAppContext {
  state: {
    selectedActionItem: number;
  };
  action: {
    setSelectedActionItem: (selectedActionItem: number) => void;
  };
}
