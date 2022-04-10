const express = require("express");

const contactCtrl = require("../../controllers/contacts");
const { contactJoiSchemas } = require("../../models/contact");
const { ctrlWrapper, validation, authenticate } = require("../../middleware/");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(contactCtrl.getContacts));

router.get("/:id", ctrlWrapper(contactCtrl.getById));

router.post(
  "/",
  authenticate,
  validation(contactJoiSchemas.add),
  ctrlWrapper(contactCtrl.addContact)
);

router.delete("/:id", ctrlWrapper(contactCtrl.deleteContact));

router.put(
  "/:id",
  validation(contactJoiSchemas.add),
  ctrlWrapper(contactCtrl.editContact)
);

router.patch(
  "/:id/favorite",
  validation(contactJoiSchemas.updateFav),
  ctrlWrapper(contactCtrl.editFavProp)
);

module.exports = router;
