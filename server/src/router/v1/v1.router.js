import express from "express";

const v1Router = express.Router();
import linksRouter from "./links/links.router.js";
import authRouter from "../v1/auth/auth.router.js";

v1Router.use("/links", linksRouter);
v1Router.use("/auth", authRouter);

export default v1Router;
