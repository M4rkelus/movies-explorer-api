const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
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
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(
          'Переданы некорректные данные в методы создания карточки',
        ));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(`Фильм с id: ${movieId} не найден`);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(movieId).then(() => res.send(movie));
      } else {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(
          `Передан некорректны id: ${movieId} в методы удаления фильма`,
        ));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError(`Фильм с id: ${movieId} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
