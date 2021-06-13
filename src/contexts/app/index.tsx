import { useState, createContext, useContext } from "react";

import { PostSlugType } from "@src/api/posts";
import { IAppContext } from "./IAppContext";

const AppContext = createContext<IAppContext>(undefined!);

const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  children: React.ReactNode;
  postSlugs: PostSlugType[];
};

const AppContextProvider = ({
  children,
  postSlugs,
}: AppContextProviderProps) => {
  const [selectedActionItem, setSelectedActionItem] = useState<number>(0);

  const appStore: IAppContext = {
    state: {
      postSlugs,
      selectedActionItem,
    },
    action: {
      setSelectedActionItem,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
