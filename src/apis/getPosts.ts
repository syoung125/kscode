import { useQuery } from "@tanstack/react-query";
import qs from "qs";

import { request } from "@src/helpers/request";
import { Post, PostFilter } from "@src/types/post.type";

export const getPosts = async (filter: PostFilter) => {
  return request<Post[]>({
    method: "get",
    url: `/api/posts?${qs.stringify(filter)}`,
  });
};

export const usePosts = (filter: PostFilter) => {
  return useQuery(["/posts", filter], () => getPosts(filter));
};
