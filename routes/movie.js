const moviesRouter = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validator');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateCreateMovie, createMovie);
moviesRouter.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = moviesRouter;
