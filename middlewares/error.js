const { SERVER_ERROR_CODE, SERVER_ERROR_TEXT } = require('../utils/errorConstants');

const error = (err, _, res, next) => {
  const { status = SERVER_ERROR_CODE, message } = err;

  res.status(status).send({
    message: status === SERVER_ERROR_CODE ? SERVER_ERROR_TEXT : message,
  });

  next();
};

module.exports = error;
