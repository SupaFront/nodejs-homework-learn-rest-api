const express = require("express");
const { getCurrentUser } = require("../../controllers/users");
const userCtrl = require("../../controllers/users");
const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require("../../middleware");
const { userJoiSchemas } = require("../../models/user");
const router = express.Router();

router.get("/current", authenticate, getCurrentUser);

router.post(
  "/signup",
  validation(userJoiSchemas.register),
  ctrlWrapper(userCtrl.registerUser)
);
router.post(
  "/login",
  validation(userJoiSchemas.register),
  ctrlWrapper(userCtrl.loginUser)
);

router.post("/logout", authenticate, ctrlWrapper(userCtrl.logoutUser));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(userCtrl.uploadUserAvatar)
);

router.patch(
  "/:id",
  validation(userJoiSchemas.updateSub),
  ctrlWrapper(userCtrl.updateUserSub)
);

router.post(
  "/verify",
  validation(userJoiSchemas.verify),
  ctrlWrapper(userCtrl.sendVerificationEmail)
);

router.get("/verify/:verificationToken", ctrlWrapper(userCtrl.verifyUser));

module.exports = router;
