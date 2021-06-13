import { useEffect, useState } from "react";

import { getPostSlugs } from "@src/api/posts";

export const usePostSlugList = () => {
  const [postSlugList, setPostSlugList] = useState<string[]>([]);

  useEffect(() => {
    getPostSlugs().then((data) => {
      setPostSlugList(data);
    });
  }, []);

  return postSlugList;
};
