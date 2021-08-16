import { useRouter } from "next/dist/client/router";
import { useState, createContext, useContext } from "react";

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
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  const selectPost = (path: string) => {
    setCurrentPath(path);
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

  const getPostSlug = (path: string) => {
    const splittedPath = path.split("/");
    return splittedPath[splittedPath.length - 1];
  };

  const appStore: IAppContext = {
    state: {
      postSlugs: postPaths.map((path) => ({
        id: path,
        slug: getPostSlug(path),
      })),
      openPostSlugs: postPaths
        .filter((path) => openPostPaths.includes(path))
        .map((path) => ({
          id: path,
          slug: getPostSlug(path),
        })),
      currentSlugs: currentPath
        ? { id: currentPath, slug: getPostSlug(currentPath) }
        : null,
    },
    action: {
      selectPost,
      closePost,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
