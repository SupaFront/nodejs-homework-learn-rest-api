const nodemailer = require("nodemailer");
const { createError } = require("../middleware");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "bluewotka@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const nodemailerSendEmail = async (data) => {
  try {
    const mail = { ...data, from: "bluewotka@meta.ua" };
    await transporter.sendMail(mail);
    console.log("ss2");
    return true;
  } catch (error) {
    console.log(error);
    throw createError(409, "Email has not been sent");
  }
};

module.exports = nodemailerSendEmail;
