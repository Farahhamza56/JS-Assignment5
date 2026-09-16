import { Router } from "express";
import {
  createComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentDetails,
} from "./comments.service.js";

const commentsRouter = Router();

commentsRouter.post("/", createComments);
commentsRouter.post("/find-or-create", findOrCreateComment);
commentsRouter.get("/search", searchComments);
commentsRouter.get("/newest/:postId", getNewestComments);
commentsRouter.get("/details/:id", getCommentDetails);
commentsRouter.patch("/:commentId", updateComment);

export default commentsRouter;