const Joi = require("joi");

const contactSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactSchema, updateStatusSchema };
