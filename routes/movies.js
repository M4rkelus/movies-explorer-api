const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { movieValidate, movieIdValidate } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', movieValidate, addMovie);
router.delete('/:movieId', movieIdValidate, deleteMovie);

module.exports = router;
