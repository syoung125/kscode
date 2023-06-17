import { stringifyPostIdParam } from "@src/helpers/post";
import PostService from "@src/server/services/PostService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  if (!id) {
    res.status(400).end(`Bad Request. The 'id' is not provided.`);
    return;
  }

  if (req.method === "GET") {
    const post = await PostService.getPost(stringifyPostIdParam(id));
    res.status(200).json(post);
  }
}
