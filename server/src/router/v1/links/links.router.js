import express from "express";
import {
  httpGetAllLinks,
  httpCreateLink,
  httpUpdateLink,
  httpDeleteLink,
  httpGetLinkById,
  httpGetLinksByTag,
  httpAddTagsToLink,
  httpRemoveTagsFromLink,
} from "./links.controller.js";
import { authenticateUser } from "../../../middlewares/auth.middleware.js";

const linksRouter = express.Router();

// Apply authentication middleware to all routes except GET
linksRouter.use((req, res, next) => {
  if (req.method !== "GET") {
    authenticateUser(req, res, next);
  } else {
    next();
  }
});

linksRouter.get("/", async (req, res) => {
  await httpGetAllLinks(req, res);
});

linksRouter.post("/", async (req, res) => {
  await httpCreateLink(req, res);
});

linksRouter.put("/", async (req, res) => {
  await httpUpdateLink(req, res);
});

linksRouter.delete("/:id", async (req, res) => {
  await httpDeleteLink(req, res);
});

linksRouter.get("/:id", async (req, res) => {
  await httpGetLinkById(req, res);
});

linksRouter.get("/tags/:tag", async (req, res) => {
  await httpGetLinksByTag(req, res);
});

linksRouter.post("/tags/add", async (req, res) => {
  await httpAddTagsToLink(req, res);
});

linksRouter.post("/tags/remove", async (req, res) => {
  await httpRemoveTagsFromLink(req, res);
});

export default linksRouter;
