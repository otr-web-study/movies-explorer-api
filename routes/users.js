const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { ruleUpdateUser } = require('../validators/users');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate(ruleUpdateUser), updateUser);

module.exports = router;
