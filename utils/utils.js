const ObjectNotFoundError = require('../errors/ObjectNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const AuthError = require('../errors/AuthError');

const handleObjectNotFound = (obj, isAuth = false) => {
  if (!obj) {
    throw isAuth ? new AuthError() : new ObjectNotFoundError();
  }
  return obj;
};

const isCurrentUserOwner = (req, obj) => {
  if (obj.owner._id.toString() !== req.user._id) {
    throw new ForbiddenError();
  }
  return obj;
};

module.exports = {
  handleObjectNotFound,
  isCurrentUserOwner,
};
