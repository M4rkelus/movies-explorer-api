const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const {
  DUPLICATE_EMAIL_ERROR_TEXT,
  INVALID_USER_DATA_ERROR_TEXT,
  INVALID_PROFILE_DATA_ERROR_TEXT,
  USER_ID_NOT_FOUND_ERROR_TEXT,
} = require('../utils/errorConstants');

const {
  NODE_ENV,
  JWT_SECRET,
  DEV_JWT_SECRET,
} = require('../utils/configConstants');

/* POST /signup - create new user */
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_USER_DATA_ERROR_TEXT));
      } else if (err.code === 11000) {
        next(new ConflictError(DUPLICATE_EMAIL_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

/* GET /users/me - get current user data by Id */
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  return User.findById(_id)
    .orFail(() => next(new NotFoundError(USER_ID_NOT_FOUND_ERROR_TEXT)))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

/* PATCH /users/me - update current user data */
const updProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => next(new NotFoundError(USER_ID_NOT_FOUND_ERROR_TEXT)))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(INVALID_PROFILE_DATA_ERROR_TEXT));
      } else if (err.code === 11000) {
        next(new ConflictError(DUPLICATE_EMAIL_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

/* POST /signin - authentication */
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(next);
};

/* GET /signout - logout current user */
const logout = (_, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

module.exports = {
  createUser,
  getCurrentUser,
  updProfile,
  login,
  logout,
};
