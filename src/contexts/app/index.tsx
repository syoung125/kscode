import { useState, createContext, useContext } from "react";

import { IAppContext } from "./IAppContext";

const AppContext = createContext<IAppContext>(undefined!);

const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  children: React.ReactNode;
  postSlugs: string[];
};

const AppContextProvider = ({
  children,
  postSlugs,
}: AppContextProviderProps) => {
  const [openPostSlugs, setOpenPostSlugs] = useState<string[]>([]);
  const [selectedActionItem, setSelectedActionItem] = useState<number>(0);

  const appStore: IAppContext = {
    state: {
      postSlugs,
      openPostSlugs,
      selectedActionItem,
    },
    action: {
      setSelectedActionItem,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
