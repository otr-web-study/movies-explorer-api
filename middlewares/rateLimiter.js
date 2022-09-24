const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

module.exports = limiter;
