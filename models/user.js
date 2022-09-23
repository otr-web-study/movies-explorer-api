const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const { handleObjectNotFound } = require('../utils/utils');
const AuthError = require('../errors/AuthError');
const {
  ERROR_REQUIRED_FIELD, ERROR_MIN_LENGTH, ERROR_MAX_LENGTH, ERROR_UNIQ_EMAIL, ERROR_WRONG_EMAIL,
} = require('../config/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
    minlength: [2, `${ERROR_MIN_LENGTH}${2}`],
    maxlength: [30, `${ERROR_MAX_LENGTH}${30}`],
  },
  email: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
    unique: [true, ERROR_UNIQ_EMAIL],
    validate: [isEmail, ERROR_WRONG_EMAIL],
  },
  password: {
    type: String,
    required: [true, ERROR_REQUIRED_FIELD],
    select: false,
  },
}, { versionKey: false });

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => handleObjectNotFound(user, true))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError());
        }
        return user;
      }));
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
