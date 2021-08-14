import { useRouter } from "next/dist/client/router";
import { useState, createContext, useContext } from "react";

import { IAppContext } from "./IAppContext";
import { PostSlug } from "@src/common/types/post.type";

const AppContext = createContext<IAppContext>(undefined!);

const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  children: React.ReactNode;
  postSlugs: PostSlug[];
};

const AppContextProvider = ({
  children,
  postSlugs,
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

  const appStore: IAppContext = {
    state: {
      postSlugs,
      openPostSlugs: postSlugs.filter(({ id }) => openPostSlugIds.includes(id)),
      currentSlugs: postSlugs.find(({ id }) => id === currentSlugId) ?? null,
    },
    action: {
      handleListItemClick,
      closePost,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
