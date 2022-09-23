const Movie = require('../models/movie');
const { handleObjectNotFound, isCurrentUserOwner } = require('../utils/utils');
const { MESSAGE_MOVIE_DELETED } = require('../config/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .then(handleObjectNotFound)
    .then((movie) => isCurrentUserOwner(req, movie))
    .then((movie) => movie.remove())
    .then(() => res.send({ message: MESSAGE_MOVIE_DELETED }))
    .catch(next);
};
