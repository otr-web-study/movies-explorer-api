const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { ruleCreateMovie, ruleParamsContainsId } = require('../validators/movies');

router.get('/', getMovies);
router.post('/', celebrate(ruleCreateMovie), createMovie);
router.delete('/:_id', celebrate(ruleParamsContainsId), deleteMovie);

module.exports = router;
