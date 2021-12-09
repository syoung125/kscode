export interface IAppContext {
  state: {
    postPaths: string[];
    openPostPaths: string[];
    currentPostPath?: string | null;
  };
  action: {
    selectPost: (path: string) => void;
    closePost: (path: string) => void;
  };
}
