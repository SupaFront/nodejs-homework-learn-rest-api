const Joi = require("joi");
const { Schema, model } = require("mongoose");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionTypes = ["starter", "pro", "business"];
const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
    },
    subscription: {
      type: String,
      enum: subscriptionTypes,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const updSubSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

const userJoiSchemas = {
  register: registerJoiSchema,
  updateSub: updSubSchema,
};

const User = model("user", userSchema);

module.exports = { userJoiSchemas, User };
