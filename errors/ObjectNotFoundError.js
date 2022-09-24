const { ERROR_OBJECT_NOT_FOUND } = require('../config/constants');

module.exports = class ObjectNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ObjectNotFoundError';
    if (!this.message) {
      this.message = ERROR_OBJECT_NOT_FOUND;
    }
    this.statusCode = 404;
  }
};
