import { Router } from "express";
import {
  signup,
  createOrUpdateUser,
  getUserByEmail,
  getUserById,
} from "./users.service.js";

const usersRouter = Router();

usersRouter.post("/signup", signup);
usersRouter.put("/:id", createOrUpdateUser);
usersRouter.get("/by-email", getUserByEmail);
usersRouter.get("/:id", getUserById);

export default usersRouter;