const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const uploadUserAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const [extention] = originalname.split(".").reverse();
    const filename = `${_id}_avatar.${extention}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    const { path: tempUpload } = req.file;
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = uploadUserAvatar;
