const Movie = require('../models/movie');

const BadRequest = require('../utils/errors/BadRequest');
const Forbidden = require('../utils/errors/Forbidden');
const NotFound = require('../utils/errors/NotFound');
const {
  INVALID_DATA,
  NOT_FOUND_FILM,
  FORBIDDEN_DELETE_FILM,
  VALIDATION_ERROR,
} = require('../utils/constants/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  req.body.owner = req.user._id;

  Movie.create(req.body)
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(INVALID_DATA));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFound(NOT_FOUND_FILM));
        return;
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        next(new Forbidden(FORBIDDEN_DELETE_FILM));
        return;
      }
      Movie.deleteOne(movie)
        .then(() => res.status(200).json({ message: 'Фильм успешно удален' }))
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
