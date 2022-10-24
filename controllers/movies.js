const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  ACCESS_ERROR_TEXT,
  INVALID_MOVIE_DATA_ERROR_TEXT,
  INVALID_MOVIE_DATA_DELETE_ERROR_TEXT,
  MOVIE_ID_NOT_FOUND_ERROR_TEXT,
} = require('../utils/errorConstants');

/* GET /movies - get all current user movies */
const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

/* POST /movies - create new movie */
const addMovie = (req, res, next) => {
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
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_MOVIE_DATA_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

/* DELETE /movies/:movieId - delete movie by Id */
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => next(new NotFoundError(MOVIE_ID_NOT_FOUND_ERROR_TEXT)))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(movieId)
          .then(() => res.send({ message: 'Фильм удален' }))
          .catch(next);
      }
      return next(new ForbiddenError(ACCESS_ERROR_TEXT));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INVALID_MOVIE_DATA_DELETE_ERROR_TEXT));
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
