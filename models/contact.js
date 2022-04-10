const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateFavSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactJoiSchemas = {
  add: addSchema,
  updateFav: updateFavSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactJoiSchemas };
