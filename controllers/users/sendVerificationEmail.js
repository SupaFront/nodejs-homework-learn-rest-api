const { nodemailerSendEmail } = require("../../helpers");
const { createError } = require("../../middleware");
const { User } = require("../../models/user");

const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите для подтверждения email</a>`,
  };
  nodemailerSendEmail(mail);
  res.json({ message: "Verififcation email sent" });
};

module.exports = sendVerificationEmail;
