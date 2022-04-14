const { createError } = require("../../middleware");
const { Contact } = require("../../models/contact");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = { deleteContact };
