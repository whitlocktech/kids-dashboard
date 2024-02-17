import {
  getAllLinks,
  createLink,
  updateLink,
  deleteLink,
  getLinkById,
  getLinksByTag,
  addTagsToLink,
  removeTagsFromLink,
} from "../../../model/links/links.model.js";

async function httpGetAllLinks(req, res) {
  const links = await getAllLinks();
  return res.status(200).json(links);
}

async function httpCreateLink(req, res) {
  const link = req.body;

  if (!link.title || !link.url) {
    return res.status(400).json({ message: "Title and URL are required" });
  }

  const newLink = await createLink(link);
  return res.status(201).json(newLink);
}

async function httpUpdateLink(req, res) {
  const link = req.body;

  if (!link._id) {
    return res.status(400).json({ message: "_id is required" });
  }

  const updatedLink = await updateLink(link);
  return res.status(200).json(updatedLink);
}

async function httpDeleteLink(req, res) {
  const _id = req.params._id;

  if (!_id) {
    return res.status(400).json({ message: "ID is required" });
  }

  await deleteLink(id);
  return res.status(204).end();
}

async function httpGetLinkById(req, res) {
  const _id = req.params._id;

  if (!_id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const link = await getLinkById(_id);
  return res.status(200).json(link);
}

async function httpGetLinksByTag(req, res) {
  const tag = req.params.tag;

  if (!tag) {
    return res.status(400).json({ message: "Tag is required" });
  }

  const links = await getLinksByTag(tag);
  return res.status(200).json(links);
}

async function httpAddTagsToLink(req, res) {
  const { _id, tags } = req.body;

  if (!_id || !tags) {
    return res.status(400).json({ message: "ID and tags are required" });
  }

  const updatedLink = await addTagsToLink(_id, tags);
  return res.status(200).json(updatedLink);
}

async function httpRemoveTagsFromLink(req, res) {
  const { _id, tags } = req.body;

  if (!_id || !tags) {
    return res.status(400).json({ message: "ID and tags are required" });
  }

  const updatedLink = await removeTagsFromLink(_id, tags);
  return res.status(200).json(updatedLink);
}

export {
  httpGetAllLinks,
  httpCreateLink,
  httpUpdateLink,
  httpDeleteLink,
  httpGetLinkById,
  httpGetLinksByTag,
  httpAddTagsToLink,
  httpRemoveTagsFromLink,
};
