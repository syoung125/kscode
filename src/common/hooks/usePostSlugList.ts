import { useEffect, useState } from "react";

import { getPostSlugs } from "@src/lib/apis/posts";

export const usePostSlugList = () => {
  const [postSlugList, setPostSlugList] = useState<string[]>([]);

  useEffect(() => {
    getPostSlugs().then((data) => {
      setPostSlugList(data);
    });
  }, []);

  return postSlugList;
};
