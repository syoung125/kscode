import { useEffect, useState } from "react";

import { getPostSlugs, PostSlugType } from "@src/api/posts";

export const usePostSlugList = () => {
  const [postSlugList, setPostSlugList] = useState<PostSlugType[]>([]);

  useEffect(() => {
    getPostSlugs().then((data) => {
      setPostSlugList(data);
    });
  }, []);

  return postSlugList;
};
