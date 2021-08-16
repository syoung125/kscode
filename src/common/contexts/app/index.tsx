import { useRouter } from "next/dist/client/router";
import { useState, createContext, useContext } from "react";

import { getFileName } from "@src/common/helpers";

import { IAppContext } from "./IAppContext";

const AppContext = createContext<IAppContext>(undefined!);

const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  children: React.ReactNode;
  postPaths: string[];
};

const AppContextProvider = ({
  children,
  postPaths,
}: AppContextProviderProps) => {
  const router = useRouter();

  const [openPostPaths, setOpenPostPaths] = useState<string[]>([]);
  const [currentPostPath, setCurrentPostPath] = useState<string | null>(null);

  const selectPost = (path: string) => {
    setCurrentPostPath(path);
    router.push(`/posts/${path}`);

    if (openPostPaths.find((_path) => _path === path) !== undefined) {
      return;
    }
    setOpenPostPaths([...openPostPaths, path]);
  };

  const closePost = (path: string) => {
    const newOpenPostPaths = openPostPaths.filter((_path) => _path !== path);
    setOpenPostPaths(newOpenPostPaths);
  };

  const appStore: IAppContext = {
    state: {
      postPaths,
      openPostPaths,
      currentPostPath,
    },
    action: {
      selectPost,
      closePost,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
