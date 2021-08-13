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

  const [openPostSlugs, setOpenPostSlugs] = useState<PostSlug[]>([]);
  const [currentSlugs, setCurrentSlugs] = useState<PostSlug | null>(null);

  const getPostSlug = (id: string) => {
    return postSlugs.find((postSlug) => postSlug.id === id) ?? null;
  };

  const closePost = (selectedId: string) => {
    const newOpenPostSlugs = openPostSlugs.filter(
      (slug) => slug.id !== selectedId
    );
    setOpenPostSlugs(newOpenPostSlugs);
  };

  const openPost = (selectedId: string) => {
    if (openPostSlugs.find((slug) => slug.id === selectedId) !== undefined) {
      return;
    }
    setOpenPostSlugs([...openPostSlugs, getPostSlug(selectedId) as PostSlug]);
  };

  const handleListItemClick = (selectedId: string) => {
    setCurrentSlugs(getPostSlug(selectedId));
    openPost(selectedId);
    router.push(`/posts/${selectedId}`);
  };

  const appStore: IAppContext = {
    state: {
      postSlugs,
      openPostSlugs,
      currentSlugs,
    },
    action: {
      handleListItemClick,
      closePost,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
