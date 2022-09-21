const { Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const ValidationError = require('../errors/ValidationError');

const URL_PATTERN = /^http(s)?:\/\/(www.)?([\w-]+\.)*[\w-]+\.[\w]{2,5}(\/[\w\-?=.&]+|\/)*/;

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
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_PATTERN),
    trailerLink: Joi.string().required().pattern(URL_PATTERN),
    thumbnail: Joi.string().required().pattern(URL_PATTERN),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

module.exports.ruleParamsContainsId = {
  params: Joi.object().keys({
    _id: Joi.string().required().custom(validateId),
  }),
};
