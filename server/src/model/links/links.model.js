import Link from "./links.mongo.js";

const getAllLinks = async () => {
  try {
    const links = await Link.find({});
    return links;
  } catch (error) {
    console.error("Error in getAllLinks:", error);
    throw new Error("Failed to fetch all links");
  }
};

const saveLink = async (link) => {
  try {
    return await Link.findOneAndUpdate({ _id: link._id }, link, {
      upsert: true,
      new: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const createLink = async (link) => {
  try {
    const newLink = new Link(link);
    return await newLink.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateLink = async (link) => {
  try {
    // Omit tag changes and only update other fields
    const { tags, ...updatedFields } = link;
    return await saveLink(updatedFields);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteLink = async (id) => {
  try {
    return await Link.findOneAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error);
  }
};

const getLinkById = async (id) => {
  try {
    return await Link.findOne({ _id: id });
  } catch (error) {
    throw new Error(error);
  }
};

const getLinksByTag = async (tag) => {
  try {
    return await Link.find({ tags: tag });
  } catch (error) {
    throw new Error(error);
  }
};

const addTagsToLink = async (linkId, newTags) => {
  try {
    // Find the existing link
    const existingLink = await getLinkById(linkId);
    if (!existingLink) {
      throw new Error("Link not found");
    }

    // Add new tags to the existing tags array
    const updatedTags = [...existingLink.tags, ...newTags];

    // Update the link with the new tags
    return await saveLink({ ...existingLink.toObject(), tags: updatedTags });
  } catch (error) {
    throw new Error(error);
  }
};

const removeTagsFromLink = async (linkId, tagsToRemove) => {
  try {
    // Find the existing link
    const existingLink = await getLinkById(linkId);
    if (!existingLink) {
      throw new Error("Link not found");
    }

    // Remove tagsToRemove from the existing tags array
    const updatedTags = existingLink.tags.filter(
      (tag) => !tagsToRemove.includes(tag)
    );

    // Update the link without the removed tags
    return await saveLink({ ...existingLink.toObject(), tags: updatedTags });
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getAllLinks,
  createLink,
  updateLink,
  deleteLink,
  getLinkById,
  getLinksByTag,
  addTagsToLink,
  removeTagsFromLink,
};
