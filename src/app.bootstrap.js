import express from "express";
import { connectDB, syncDB } from "./DB/connectionDB.js";
import "./models/associations.js";
import usersRouter from "./modules/users/users.controller.js";
import postsRouter from "./modules/posts/posts.controller.js";
import commentsRouter from "./modules/comments/comments.controller.js";

const app = express();
const port = 3852;

const bootstrap = async () => {
  app.use(express.json());

  await connectDB();
  await syncDB();

  app.use("/users", usersRouter);
  app.use("/user", usersRouter);
  app.use("/posts", postsRouter);
  app.use("/comments", commentsRouter);

  app.use("{/*demo}", (req, res, next) => {
    res.status(404).json({ message: "not found" });
  });

  app.listen(port, () => {
    console.log("running successfully");
  });
};

export default bootstrap;