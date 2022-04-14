const { createError } = require("../../middleware");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id, "-createdAt -updatedAt");
  if (!result) {
    throw createError(404);
  }
  res.status(200).json(result);
};

module.exports = { getById };
