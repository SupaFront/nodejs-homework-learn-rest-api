const { createError } = require("../../middleware");
const { Contact } = require("../../models/contact");

const updateFavProp = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = { updateFavProp };
