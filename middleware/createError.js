const errorMessages = {
  400: "Bad Request",
  403: "Forbidden",
  404: "Not Found",
};

const createError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createError;
