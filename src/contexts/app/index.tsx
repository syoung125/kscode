import { useRouter } from "next/dist/client/router";
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
  const router = useRouter();

  const [selectedActionItem, setSelectedActionItem] = useState<number>(0);
  const [openPostSlugs, setOpenPostSlugs] = useState<string[]>([]);
  const [currentSlugs, setCurrentSlugs] = useState<string>("");

  const closePost = (selectedSlug: string) => {
    const newOpenPostSlugs = openPostSlugs.filter(
      (slug) => slug !== selectedSlug
    );
    setOpenPostSlugs(newOpenPostSlugs);
  };

  const openPost = (selectedSlug: string) => {
    if (openPostSlugs.find((slug) => slug === selectedSlug) !== undefined) {
      return;
    }
    setOpenPostSlugs([...openPostSlugs, selectedSlug]);
  };

  const handleListItemClick = (slug: string) => {
    setCurrentSlugs(slug);
    openPost(slug);
    router.push(`/posts/${slug}`);
  };

  const appStore: IAppContext = {
    state: {
      selectedActionItem,
      postSlugs,
      openPostSlugs,
      currentSlugs,
    },
    action: {
      setSelectedActionItem,
      handleListItemClick,
      closePost,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
