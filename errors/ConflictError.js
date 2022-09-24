const { ERROR_RECORD_EXIST } = require('../config/constants');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    if (!this.message) {
      this.message = ERROR_RECORD_EXIST;
    }
    this.statusCode = 409;
  }
};
