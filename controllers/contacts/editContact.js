const { createError } = require("../../middleware");
const { Contact } = require("../../models/contact");

const editContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = { editContact };
