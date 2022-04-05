// const { createError } = require("../middleware/createError");

// const ctrlWrapper = (ctrl) => {
//   const func = async (req, res, next) => {
//     try {
//       await ctrl(req, res);
//     } catch (error) {
//       if (
//         error.message.includes("validation failed") ||
//         error.message.includes("required")
//       ) {
//         next(createError(400, error.message));
//       }
//       next(error);
//     }
//   };

//   return func;
// };

// module.exports = ctrlWrapper;
