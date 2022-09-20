const Movie = require('../models/movie');
const { handleObjectNotFound, isCurrentUserOwner } = require('../utils/utils');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
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
    trailer,
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then(handleObjectNotFound)
    .then((movie) => isCurrentUserOwner(req, movie))
    .then((movie) => movie.remove())
    .then(() => res.send({ message: 'Фильм удалён' }))
    .catch(next);
};
