const express = require("express");

const { contactSchema, updateStatusSchema } = require("../../schemas/contact");
const Contact = require("../../models/contact");
const { createError } = require("../../middleware/");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id, "-createdAt -updatedAt");
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result);
  } catch (err) {
    if (err.message.includes("Cast to ObjectId failed for value")) {
      next(createError(404));
    }
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err.message.includes("validation failed")) {
      err.status = 400;
    }
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) throw createError(404);
    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    if (err.message.includes("Cast to ObjectId failed for value")) {
      next(createError(404));
    }
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (err) {
    if (err.message.includes("Cast to ObjectId failed for value")) {
      next(createError(404));
    }
    next(err);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { id } = req.params;
    // if (!("favorite" in req.body))
    //   throw createError(400, 'missing field: "favorite"');
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) throw createError(404);
    res.json(result);
  } catch (err) {
    if (err.message.includes("Cast to ObjectId failed for value")) {
      next(createError(404));
    }
    next(err);
  }
});

module.exports = router;
