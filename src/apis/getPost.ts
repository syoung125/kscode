import { useQuery } from "@tanstack/react-query";
import { request } from "@src/helpers/request";
import { Post } from "@src/types/post.type";

export const getPost = async (id: string) => {
  return request<Post>({
    method: "get",
    url: `/api/posts/${id}`,
  });
};

export const usePost = (id: string) => {
  return useQuery(["/post", id], () => getPost(id));
};
