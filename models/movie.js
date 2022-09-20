const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
  },
  director: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле обязательно к заполнению.'],
  },
  year: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    minlength: [4, 'Минимальная длина значения: 4'],
    maxlength: [4, 'Максимальная длина значения: 4'],
  },
  description: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
  },
  image: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    validate: [isURL, 'Некорректный url.'],
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    validate: [isURL, 'Некорректный url.'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    validate: [isURL, 'Некорректный url.'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    minlength: [24, 'Минимальная длина значения: 24'],
    maxlength: [24, 'Максимальная длина значения: 24'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
