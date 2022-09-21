const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const ObjectNotFoundError = require('../errors/ObjectNotFoundError');
const { ERROR_WRONG_PATH } = require('../config/constants');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/', authRouter);
router.all('*', (req, res, next) => {
  next(new ObjectNotFoundError(ERROR_WRONG_PATH));
});

module.exports = router;
