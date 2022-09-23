const { Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { isURL } = require('validator');
const ValidationError = require('../errors/ValidationError');
const { ERROR_WRONG_ID, ERROR_WRONG_URL } = require('../config/constants');

function validateId(value) {
  if (!isValidObjectId(value)) {
    throw new ValidationError(ERROR_WRONG_ID);
  }
  return value;
}

function validateURL(value) {
  if (!isURL(value)) {
    throw new ValidationError(ERROR_WRONG_URL);
  }
  return value;
}

module.exports.ruleCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailerLink: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

module.exports.ruleParamsContainsId = {
  params: Joi.object().keys({
    _id: Joi.string().required().custom(validateId),
  }),
};
