const { Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const ValidationError = require('../errors/ValidationError');

const URL_PATTERN = /^(http|https):\/\/(www.)?[\w-]+\.[\w]{2,5}(\/[\w-]+|\/)*/;

function validateId(value) {
  if (!isValidObjectId(value)) {
    throw new ValidationError('Некорректный id.');
  }
  return value;
}

module.exports.ruleCreateMovie = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_PATTERN),
    trailerLink: Joi.string().required().pattern(URL_PATTERN),
    thumbnail: Joi.string().required().pattern(URL_PATTERN),
    movieId: Joi.string.required().min(24).max(24),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

module.exports.ruleParamsContainsMovieId = {
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(validateId),
  }),
};
