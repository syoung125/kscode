import { useState, createContext, useContext } from "react";

import { IAppContext } from "./IAppContext";

const AppContext = createContext<IAppContext>(undefined!);

const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [selectedActionItem, setSelectedActionItem] = useState<number>(0);

  const appStore: IAppContext = {
    state: {
      selectedActionItem,
    },
    action: {
      setSelectedActionItem,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
