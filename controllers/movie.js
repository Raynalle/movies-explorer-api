const Movie = require('../models/movie');

const BadRequest = require('../utils/errors/BadRequest');
const Forbidden = require('../utils/errors/Forbidden');
const NotFound = require('../utils/errors/NotFound');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  req.owner = req.user_id;

  Movie.create(req.body)
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFound('Фильм с таким id не найден'));
        return;
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        next(new Forbidden('Вы не можете удалять фильмы других пользователей'));
        return;
      }

      Movie.deleteOne(movie)
        .then(() => res.status(200).json({ message: 'Фильм успешно удален' }));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
