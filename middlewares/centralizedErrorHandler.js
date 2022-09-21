const ValidationError = require('../errors/ValidationError');
const CommonServerError = require('../errors/CommonServerError');
const ConflictError = require('../errors/ConflictError');

const handleError = (err) => {
  if (err.statusCode) {
    return err;
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new ValidationError(`Validation error: ${err.message}`);
  }

  if (err.code === 11000) {
    return new ConflictError();
  }

  return new CommonServerError();
};

module.exports = (err, req, res, next) => {
  const { statusCode, message } = handleError(err);

  res.status(statusCode).send({
    message: `Произошла ошибка: ${message}`,
  });
  next();
};
