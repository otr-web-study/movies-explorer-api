const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { secret } = require('../config/config');
const { MESSAGE_NEEDS_AUTHORIZATION, MESSAGE_WRONG_JWT } = require('../config/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(MESSAGE_NEEDS_AUTHORIZATION);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    throw new AuthError(MESSAGE_WRONG_JWT);
  }

  req.user = payload;
  next();
};
