const { Contact } = require("../../models/contact");

const getContacts = async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;

  const { _id } = req.user;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner: _id, ...filter },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "email subscription");
  res.status(200).json(result);
};

module.exports = { getContacts };
