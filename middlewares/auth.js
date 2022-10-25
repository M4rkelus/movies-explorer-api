const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_ERROR_TEXT } = require('../utils/errorConstants');

const {
  NODE_ENV,
  JWT_SECRET,
  DEV_JWT_SECRET,
} = require('../utils/configConstants');

const auth = (req, _, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET}`);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_ERROR_TEXT));
  }

  req.user = payload;

  next();
};

module.exports = auth;
