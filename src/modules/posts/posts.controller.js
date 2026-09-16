import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
} from "./posts.service.js";

const postsRouter = Router();

postsRouter.post("/", createPost);
postsRouter.get("/details", getPostsDetails);
postsRouter.get("/comment-count", getPostsCommentCount);
postsRouter.delete("/:postId", deletePost);

export default postsRouter;