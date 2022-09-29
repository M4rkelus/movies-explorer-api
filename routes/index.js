const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { authValidate, registerValidate } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const { URL_NOT_FOUND_ERROR_TEXT } = require('../utils/errorConstants');

router.post('/signup', registerValidate, createUser);
router.post('/signin', authValidate, login);
router.get('/signout', logout);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, _, next) => {
  next(new NotFoundError(`${URL_NOT_FOUND_ERROR_TEXT} ${req.baseUrl}`));
});

module.exports = router;
