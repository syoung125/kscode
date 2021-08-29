import { useRouter } from "next/dist/client/router";
import { useState, createContext, useContext, useEffect } from "react";

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

  useEffect(() => {
    if (!currentPostPath) {
      return;
    }

    router.push(`/posts/${currentPostPath}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPostPath]);

  useEffect(() => {
    if (openPostPaths.length === 0 && currentPostPath !== null) {
      setCurrentPostPath(null);
      router.push(`/`);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPostPaths.length]);

  const selectPost = (path: string) => {
    setCurrentPostPath(path);

    if (openPostPaths.find((_path) => _path === path) !== undefined) {
      return;
    }
    setOpenPostPaths([...openPostPaths, path]);
  };

  const closePost = (path: string) => {
    const newOpenPostPaths = openPostPaths.filter((_path) => _path !== path);
    setOpenPostPaths(newOpenPostPaths);

    if (path === currentPostPath && newOpenPostPaths.length !== 0) {
      const nextCurrPostPath = newOpenPostPaths[newOpenPostPaths.length - 1];
      selectPost(nextCurrPostPath);
    }
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
