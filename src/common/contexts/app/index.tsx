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

  const [openPostSlugIds, setOpenPostSlugIds] = useState<string[]>([]);
  const [currentSlugId, setCurrentSlugId] = useState<string | null>(null);

  const openPost = (id: string) => {
    if (openPostSlugIds.find((_id) => _id === id) !== undefined) {
      return;
    }
    setOpenPostSlugIds([...openPostSlugIds, id]);
  };

  const closePost = (id: string) => {
    const newOpenPostSlugs = openPostSlugIds.filter((_id) => _id !== id);
    setOpenPostSlugIds(newOpenPostSlugs);
  };

  const handleListItemClick = (id: string) => {
    setCurrentSlugId(id);
    openPost(id);
    router.push(`/posts/${id}`);
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
        .filter((path) => openPostSlugIds.includes(path))
        .map((path) => ({
          id: path,
          slug: getPostSlug(path),
        })),
      currentSlugs: currentSlugId
        ? { id: currentSlugId, slug: getPostSlug(currentSlugId) }
        : null,
    },
    action: {
      handleListItemClick,
      closePost,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
