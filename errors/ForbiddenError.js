const { ERROR_FORBIDDEN } = require('../config/constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    if (!this.message) {
      this.message = ERROR_FORBIDDEN;
    }
    this.statusCode = 403;
  }
};
