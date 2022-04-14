const { createError } = require("../../middleware");
const { User } = require("../../models/user");

const updateUserSub = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    fields: { _id: 1, email: 1, subscription: 1 },
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateUserSub;
