const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res);
    } catch (error) {
      if (
        error.message.includes("validation failed") ||
        error.message.includes("required")
      ) {
        error.status = 400;
        next(error);
      }
      if (error.message.includes("Cast to ObjectId failed for value")) {
        error.status = 404;
        next(error);
      }
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
