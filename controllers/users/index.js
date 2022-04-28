const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const updateUserSub = require("./updateUserSub");
const uploadUserAvatar = require("./uploadUserAvatar");
const verifyUser = require("./verifyUser");
const sendVerificationEmail = require("./sendVerificationEmail");

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUserSub,
  uploadUserAvatar,
  verifyUser,
  sendVerificationEmail,
};
