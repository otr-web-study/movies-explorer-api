const { ERROR_WRONG_EMAIL_PASSWORD } = require('../config/constants');

module.exports = class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    if (!this.message) {
      this.message = ERROR_WRONG_EMAIL_PASSWORD;
    }
    this.statusCode = 401;
  }
};
