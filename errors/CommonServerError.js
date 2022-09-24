const { ERROR_SERVER_INTERNAL } = require('../config/constants');

module.exports = class CommonServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CommonServerError';
    if (!this.message) {
      this.message = ERROR_SERVER_INTERNAL;
    }
    this.statusCode = 500;
  }
};
