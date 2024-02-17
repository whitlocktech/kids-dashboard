import express from "express";
import { login, logout } from "./auth.controller.js";
import { authenticateUser } from "../../../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", authenticateUser, logout);

export default authRouter;
