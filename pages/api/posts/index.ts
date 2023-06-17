import PostService from "@src/server/services/PostService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const filter = {
      tag: req.query.tag?.toString(),
      metaOnly: Boolean(req.query.metaOnly),
    };
    const post = await PostService.getPosts(filter);
    res.status(200).json(post);
  }
}
