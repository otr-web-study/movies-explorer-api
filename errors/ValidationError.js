const { ERROR_VALIDATION } = require('../config/constants');

module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    if (!this.message) {
      this.message = ERROR_VALIDATION;
    }
    this.statusCode = 400;
  }
};
