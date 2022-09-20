const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { ruleUpdateUser } = require('../validators/users');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/me', getCurrentUser);
router.patch('/me', celebrate(ruleUpdateUser), updateUser);

module.exports = router;
