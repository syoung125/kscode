import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Post } from "@src/types/post.type";

import { IAppContext } from "./IAppContext";

const AppContext = createContext<IAppContext>(undefined!);

const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  children: React.ReactNode;
  posts: Post[];
};

const AppContextProvider = ({ children, posts }: AppContextProviderProps) => {
  const router = useRouter();

  const [openPosts, setOpenPosts] = useState<Post[]>([]);
  const [currentPostId, setCurrentPostId] = useState<string | null>();

  useEffect(() => {
    if (currentPostId === undefined) {
      return;
    }
    router.push(currentPostId ? `/blog/${currentPostId}` : "/blog");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPostId]);

  const selectPost = (id: string) => {
    setCurrentPostId(id);

    if (openPosts.find((post) => post.id === id) !== undefined) {
      return;
    }

    const targetPost = posts.find((post) => post.id === id);
    targetPost && setOpenPosts([...openPosts, targetPost]);
  };

  const closePost = (id: string) => {
    const newOpenPosts = openPosts.filter((post) => post.id !== id);
    setOpenPosts(newOpenPosts);

    if (newOpenPosts.length === 0) {
      setCurrentPostId(null);
      return;
    }

    if (id === currentPostId) {
      setCurrentPostId(newOpenPosts[newOpenPosts.length - 1].id);
    }
  };

  const appStore: IAppContext = {
    state: {
      posts,
      openPosts,
      currentPostId,
    },
    action: {
      selectPost,
      closePost,
    },
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
};

export { AppContextProvider, useAppContext };
