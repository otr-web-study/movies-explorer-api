const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const { handleObjectNotFound } = require('../utils/utils');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина значения: 2'],
    maxlength: [30, 'Максимальная длина значения: 30'],
  },
  email: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    unique: [true, 'Пользователь с таким email уже существует.'],
    validate: [isEmail, 'Некорректный email.'],
  },
  password: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    select: false,
  },
});

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
